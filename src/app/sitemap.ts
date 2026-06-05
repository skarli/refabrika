import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_URL as siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    { url: "", changeFrequency: "weekly" as const, priority: 1 },
    { url: "/blog", changeFrequency: "daily" as const, priority: 0.8 },
    { url: "/portfolio", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/faq", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: "/refund-policy", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Fetch dynamic content from Sanity
  const [blogPosts, portfolios, services] = await Promise.all([
    client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
      `*[_type == "blogPost" && defined(slug.current)]{ slug, _updatedAt }`
    ),
    client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
      `*[_type == "portfolio" && defined(slug.current)]{ slug, _updatedAt }`
    ),
    client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
      `*[_type == "service" && defined(slug.current)]{ slug, _updatedAt }`
    ),
  ]);

  // Build sitemap entries
  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    // Blog posts
    ...(blogPosts || [])
      .filter((post) => post.slug?.current)
      .map((post) => ({
        url: `${siteUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),

    // Portfolio projects
    ...(portfolios || [])
      .filter((project) => project.slug?.current)
      .map((project) => ({
        url: `${siteUrl}/portfolio/${project.slug.current}`,
        lastModified: new Date(project._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),

    // Services
    ...(services || [])
      .filter((service) => service.slug?.current)
      .map((service) => ({
        url: `${siteUrl}/services/${service.slug.current}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];

  return sitemap;
}
