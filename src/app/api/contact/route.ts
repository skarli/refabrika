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
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.budget || !data.solution || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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
