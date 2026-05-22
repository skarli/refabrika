import { NextResponse } from "next/server";
import {
  getBlogPosts,
  getPortfolioProjects,
  getServices,
  getSiteSettings,
} from "@/sanity/lib/fetch";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://refabrika.com";

export const revalidate = 3600;

export async function GET() {
  const [siteSettings, posts, projects, services] = await Promise.all([
    getSiteSettings(),
    getBlogPosts(),
    getPortfolioProjects(),
    getServices(),
  ]);

  const name = siteSettings?.siteName || "re:fabrika";
  const description =
    siteSettings?.siteDescription ||
    "Digital marketing & brand growth agency since 2009 based in Fethiye and Istanbul, Turkey.";

  const lines: string[] = [];
  lines.push(`# ${name}`);
  lines.push("");
  lines.push(`> ${description}`);
  lines.push("");
  lines.push("## Core Pages");
  lines.push(`- [Homepage](${SITE_URL}/): Overview of re:fabrika services and approach.`);
  lines.push(`- [Services](${SITE_URL}/services): Digital marketing and branding services.`);
  lines.push(`- [Portfolio](${SITE_URL}/portfolio): Selected client work.`);
  lines.push(`- [Blog](${SITE_URL}/blog): Articles and insights.`);
  lines.push(`- [FAQ](${SITE_URL}/faq): Frequently asked questions.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Get in touch.`);
  lines.push("");

  if (services.length) {
    lines.push("## Services");
    for (const s of services) {
      const slug = s.slug?.current;
      if (!slug) continue;
      const desc = s.shortDescription || "";
      lines.push(`- [${s.title}](${SITE_URL}/services/${slug}): ${desc}`);
    }
    lines.push("");
  }

  if (projects.length) {
    lines.push("## Portfolio");
    for (const p of projects) {
      const slug = p.slug?.current;
      if (!slug) continue;
      lines.push(`- [${p.title}](${SITE_URL}/portfolio/${slug})`);
    }
    lines.push("");
  }

  if (posts.length) {
    lines.push("## Blog");
    for (const post of posts) {
      const slug = post.slug?.current;
      if (!slug) continue;
      const desc = post.excerpt || "";
      lines.push(`- [${post.title}](${SITE_URL}/blog/${slug}): ${desc}`);
    }
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
