import { client } from "./client";
import {
  siteSettingsQuery,
  navigationQuery,
  homePageQuery,
  blogPageQuery,
  blogPostsQuery,
  blogPostQuery,
  blogPostSlugsQuery,
  portfolioPageQuery,
  portfolioProjectsQuery,
  portfolioProjectQuery,
  portfolioSlugsQuery,
  servicesPageQuery,
  servicesQuery,
  serviceQuery,
  serviceSlugsQuery,
  contactPageQuery,
  faqPageQuery,
} from "./queries";
import type {
  SiteSettings,
  Navigation,
  HomePageData,
  BlogPage,
  BlogPostItem,
  BlogPost,
  PortfolioPage,
  PortfolioItem,
  Portfolio,
  ServicesPage,
  ServiceItem,
  Service,
  ContactPage,
  FAQPage,
} from "@/types/sanity";

// ==================== SITE SETTINGS ====================
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } });
}

export async function getNavigation(): Promise<Navigation | null> {
  return client.fetch(navigationQuery, {}, { next: { revalidate: 3600 } });
}

// ==================== HOME PAGE ====================
export async function getHomePage(): Promise<HomePageData | null> {
  return client.fetch(homePageQuery, {}, { next: { revalidate: 60 } });
}

// ==================== BLOG ====================
export async function getBlogPage(): Promise<BlogPage | null> {
  return client.fetch(blogPageQuery, {}, { next: { revalidate: 3600 } });
}

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  return client.fetch(blogPostsQuery, {}, { next: { revalidate: 60 } }) || [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(blogPostQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await client.fetch<{ slug: string }[]>(
    blogPostSlugsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return posts?.map((post) => post.slug).filter(Boolean) || [];
}

// ==================== PORTFOLIO ====================
export async function getPortfolioPage(): Promise<PortfolioPage | null> {
  return client.fetch(portfolioPageQuery, {}, { next: { revalidate: 3600 } });
}

export async function getPortfolioProjects(): Promise<PortfolioItem[]> {
  return client.fetch(portfolioProjectsQuery, {}, { next: { revalidate: 60 } }) || [];
}

export async function getPortfolioProject(slug: string): Promise<Portfolio | null> {
  return client.fetch(portfolioProjectQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  const projects = await client.fetch<{ slug: string }[]>(
    portfolioSlugsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return projects?.map((project) => project.slug).filter(Boolean) || [];
}

// ==================== SERVICES ====================
export async function getServicesPage(): Promise<ServicesPage | null> {
  return client.fetch(servicesPageQuery, {}, { next: { revalidate: 3600 } });
}

export async function getServices(): Promise<ServiceItem[]> {
  return client.fetch(servicesQuery, {}, { next: { revalidate: 3600 } }) || [];
}

export async function getService(slug: string): Promise<Service | null> {
  return client.fetch(serviceQuery, { slug }, { next: { revalidate: 3600 } });
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const services = await client.fetch<{ slug: string }[]>(
    serviceSlugsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return services?.map((service) => service.slug).filter(Boolean) || [];
}

// ==================== PAGES ====================
export async function getContactPage(): Promise<ContactPage | null> {
  return client.fetch(contactPageQuery, {}, { next: { revalidate: 3600 } });
}

export async function getFaqPage(): Promise<FAQPage | null> {
  return client.fetch(faqPageQuery, {}, { next: { revalidate: 3600 } });
}
