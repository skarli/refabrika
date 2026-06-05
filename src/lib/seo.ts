import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { SITE_URL as siteUrl } from "@/lib/site-url";

interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: any;
  noIndex?: boolean;
  canonicalUrl?: string;
}

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  seo?: SeoData;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  images?: any[];
}

export function buildMetadata({
  title,
  description,
  seo,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  images,
}: GenerateMetadataOptions): Metadata {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description || "";
  const canonical = seo?.canonicalUrl || `${siteUrl}${path}`;

  // Get OG image. If neither Sanity seo.ogImage nor article images,
  // we rely on Next.js root opengraph-image.tsx auto-generation.
  let ogImage: string | undefined;
  if (seo?.ogImage) {
    ogImage = urlFor(seo.ogImage).width(1200).height(630).url();
  } else if (images && images.length > 0) {
    ogImage = urlFor(images[0]).width(1200).height(630).url();
  }

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical,
    },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: "Re:Fabrika",
      type: type,
      locale: "tr_TR",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: metaTitle,
          },
        ],
      }),
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// JSON-LD Schema Generators
export function generateOrganizationSchema(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName || "Re:Fabrika",
    url: siteUrl,
    logo: settings?.logo ? urlFor(settings.logo).url() : `${siteUrl}/logo.png`,
    contactPoint: settings?.contactInfo
      ? {
          "@type": "ContactPoint",
          telephone: settings.contactInfo.phone,
          email: settings.contactInfo.email,
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: "Turkish",
        }
      : undefined,
    sameAs: settings?.socialLinks
      ? Object.values(settings.socialLinks).filter(Boolean)
      : [],
    address: settings?.contactInfo?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.contactInfo.address,
          addressCountry: "TR",
        }
      : undefined,
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Re:Fabrika",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBlogPostSchema(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail ? urlFor(post.thumbnail).width(1200).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.avatar
            ? urlFor(post.author.avatar).url()
            : undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Re:Fabrika",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug?.current}`,
    },
  };
}

export function generatePortfolioSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    image: project.thumbnail
      ? urlFor(project.thumbnail).width(1200).url()
      : undefined,
    creator: {
      "@type": "Organization",
      name: "Re:Fabrika",
    },
    dateCreated: project.publishedAt,
    url: `${siteUrl}/portfolio/${project.slug?.current}`,
    keywords: project.technologies?.join(", "),
  };
}

export function generateServiceSchema(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: "Re:Fabrika",
    },
    url: `${siteUrl}/services/${service.slug?.current}`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
