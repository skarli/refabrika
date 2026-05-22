import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  budget: string;
  solution: string;
  message: string;
  website?: string; // honeypot
}

// Simple in-memory rate limiter (per IP). 5 requests / 10 min.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const bucket = (rateBuckets.get(ip) || []).filter((t) => t > cutoff);
  if (bucket.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, bucket);
    return true;
  }
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  return false;
}

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  try {
    const data: ContactFormData = await request.json();

    // Honeypot — silent reject if bots fill the hidden field
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.budget || !data.solution || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic length limits to prevent abuse
    if (data.message.length > 5000 || data.name.length > 200) {
      return NextResponse.json(
        { error: "Field length exceeded" },
        { status: 400 }
      );
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Save to Sanity
    const submission = await sanityClient.create({
      _type: "contactSubmission",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "",
      budget: data.budget,
      solution: data.solution,
      message: data.message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    // Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: process.env.CONTACT_EMAIL || "sadettin@refabrika.com",
            subject: `New Contact Form Submission from ${data.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Company:</strong> ${data.company || "Not provided"}</p>
              <p><strong>Budget:</strong> ${data.budget}</p>
              <p><strong>Solution:</strong> ${data.solution}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message}</p>
              <hr />
              <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send email:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email fails, the submission is already saved
      }
    }

    return NextResponse.json(
      { success: true, id: submission._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
