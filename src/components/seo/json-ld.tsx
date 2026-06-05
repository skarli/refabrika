import type { SiteSettings, BlogPost, Portfolio, Service, FAQPage } from "@/types/sanity";
import { SITE_URL } from "@/lib/site-url";

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const jsonLdArray = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// Organization Schema
export function OrganizationSchema({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings?.siteName || "re:fabrika",
    description: siteSettings?.siteDescription || "Digital marketing & brand growth agency",
    url: SITE_URL,
    email: siteSettings?.contactInfo?.email || "sadettin@refabrika.com",
    telephone: siteSettings?.contactInfo?.phone || "+90 532 374 55 68",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings?.contactInfo?.address || "Mustafa Kemal Blv., 158A",
      addressLocality: "Fethiye",
      addressRegion: "Muğla",
      addressCountry: "TR",
    },
    sameAs: [
      siteSettings?.socialLinks?.instagram,
      siteSettings?.socialLinks?.facebook,
      siteSettings?.socialLinks?.twitter,
      siteSettings?.socialLinks?.linkedin,
      siteSettings?.socialLinks?.behance,
      siteSettings?.socialLinks?.dribbble,
    ].filter(Boolean),
  };

  return <JsonLd data={data} />;
}

// WebSite Schema
export function WebSiteSchema({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const siteUrl = SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings?.siteName || "re:fabrika",
    description: siteSettings?.siteDescription || "Digital marketing & brand growth agency",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

// LocalBusiness Schema
export function LocalBusinessSchema({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: siteSettings?.siteName || "re:fabrika",
    description: siteSettings?.siteDescription || "Digital marketing & brand growth agency",
    url: SITE_URL,
    telephone: siteSettings?.contactInfo?.phone || "+90 532 374 55 68",
    email: siteSettings?.contactInfo?.email || "sadettin@refabrika.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings?.contactInfo?.address || "Mustafa Kemal Blv., 158A",
      addressLocality: "Fethiye",
      addressRegion: "Muğla",
      postalCode: "48300",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.6221,
      longitude: 29.1199,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  return <JsonLd data={data} />;
}

// BlogPosting Schema
export function BlogPostingSchema({ post, siteUrl }: { post: BlogPost; siteUrl?: string }) {
  const url = siteUrl || SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author || "re:fabrika",
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "re:fabrika",
      url: url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug?.current}`,
    },
  };

  return <JsonLd data={data} />;
}

// CreativeWork Schema (for Portfolio)
export function CreativeWorkSchema({ project, siteUrl }: { project: Portfolio; siteUrl?: string }) {
  const url = siteUrl || SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    creator: {
      "@type": "Organization",
      name: "re:fabrika",
    },
    dateCreated: project.year,
    keywords: project.tags?.join(", "),
    url: `${url}/portfolio/${project.slug?.current}`,
  };

  return <JsonLd data={data} />;
}

// Service Schema
export function ServiceSchema({ service, siteUrl }: { service: Service; siteUrl?: string }) {
  const url = siteUrl || SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription || service.heroDescription,
    provider: {
      "@type": "Organization",
      name: "re:fabrika",
    },
    url: `${url}/services/${service.slug?.current}`,
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
  };

  return <JsonLd data={data} />;
}

// FAQ Schema
export function FAQPageSchema({ faqPage }: { faqPage: FAQPage }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPage.faqs?.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const siteUrl = SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}

// CollectionPage Schema (blog/portfolio/services listing)
export function CollectionPageSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description?: string;
  path: string;
  items: { name: string; url: string }[];
}) {
  const siteUrl = SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteUrl}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: "re:fabrika",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
      })),
    },
  };
  return <JsonLd data={data} />;
}

// ContactPage Schema
export function ContactPageSchema({
  siteSettings,
}: {
  siteSettings?: SiteSettings | null;
}) {
  const siteUrl = SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteSettings?.siteName || "re:fabrika",
      email: siteSettings?.contactInfo?.email,
      telephone: siteSettings?.contactInfo?.phone,
      address: siteSettings?.contactInfo?.address
        ? {
            "@type": "PostalAddress",
            streetAddress: siteSettings.contactInfo.address,
            addressCountry: "TR",
          }
        : undefined,
    },
  };
  return <JsonLd data={data} />;
}
