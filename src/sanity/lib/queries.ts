import { groq } from "next-sanity";

// ==================== SITE SETTINGS ====================
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  logo,
  favicon,
  headerText,
  socialLinks,
  contactInfo,
  footerText,
  ctaText,
  ctaLink
}`;

// ==================== NAVIGATION ====================
export const navigationQuery = groq`*[_type == "navigation"][0]{
  mainMenu[]{
    _key,
    label,
    href
  },
  sideMenuContactTitle,
  sideMenuButtonText
}`;

// ==================== HOME PAGE ====================
export const homePageQuery = groq`*[_id == "G7CUbMmRwwvddJXAlE6AvQ"][0]{
  // Hero
  heroSubtitle,
  heroTitle,
  heroLocation,
  heroLocationImage,
  heroDescription,
  heroButtonText,
  heroButtonLink,
  heroStats,
  heroSocialLinks[]{
    _key,
    label,
    url
  },

  // About
  aboutTitle,
  aboutYearStart,
  aboutYearEnd,
  aboutDescription,
  aboutButtonText,
  aboutButtonLink,

  // Work
  workSectionTitle,
  workButtonText,
  featuredWorks[]->{
    _id,
    title,
    slug,
    thumbnail,
    year,
    tags
  },

  // Services
  servicesSectionTitle,
  servicesSubtitle,
  servicesDescription,
  featuredServices[]->{
    _id,
    title,
    slug,
    number,
    shortDescription,
    thumbnail
  },

  // Clients
  clientTitle,
  clientDescription,
  clientLogos[]{
    _key,
    logo,
    bgTheme
  },

  // Blog
  blogSectionTitle,
  blogButtonText,
  featuredBlogs[]->{
    _id,
    title,
    slug,
    thumbnail,
    author,
    publishedAt
  },

  seo
}`;

// ==================== BLOG ====================
export const blogPageQuery = groq`*[_type == "blogPage"][0]{
  pageTitle,
  seo
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  thumbnail,
  author,
  publishedAt,
  tags
}`;

export const blogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  content,
  thumbnail,
  author,
  publishedAt,
  tags,
  seo
}`;

export const blogPostSlugsQuery = groq`*[_type == "blogPost"]{ "slug": slug.current }`;

// ==================== PORTFOLIO ====================
export const portfolioPageQuery = groq`*[_type == "portfolioPage"][0]{
  pageTitle,
  seo
}`;

export const portfolioProjectsQuery = groq`*[_type == "portfolio"] | order(order asc, year desc){
  _id,
  title,
  slug,
  thumbnail,
  year,
  tags,
  featured
}`;

export const portfolioProjectQuery = groq`*[_type == "portfolio" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  thumbnail,
  year,
  tags,
  client,
  service,
  date,
  technology,
  shortDescription,
  fullDescription,
  gallery,
  features,
  seo
}`;

export const portfolioSlugsQuery = groq`*[_type == "portfolio"]{ "slug": slug.current }`;

// ==================== SERVICES ====================
export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  pageTitle,
  pageSubtitle,
  pageDescription,
  seo
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  slug,
  number,
  shortDescription,
  thumbnail
}`;

export const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  number,
  shortDescription,
  thumbnail,
  serialNumber,
  tagLabel,
  heroDescription,
  heroFeatures,
  approachTitle,
  approachDescription,
  approachSteps[]{
    _key,
    title,
    description
  },
  featureCards[]{
    _key,
    title,
    description
  },
  valueSectionTitle,
  valueStats[]{
    _key,
    value,
    description
  },
  faqs[]{
    _key,
    question,
    answer
  },
  seo
}`;

export const serviceSlugsQuery = groq`*[_type == "service"]{ "slug": slug.current }`;

// ==================== FAQ ====================
export const faqPageQuery = groq`*[_type == "faqPage"][0]{
  pageTitle,
  faqs[]{
    _key,
    question,
    answer
  },
  seo
}`;

// ==================== CONTACT ====================
export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  pageTitle,
  sectionTitle,
  sectionDescription,
  followTitle,
  formLabels,
  budgetOptions,
  seo
}`;

// ==================== LEGAL ====================
export const legalPageQuery = groq`*[_type == "legalPage" && pageType == $pageType][0]{
  pageType,
  title,
  subtitle,
  lastUpdated,
  body,
  seo
}`;

// ==================== SITEMAP ====================
export const sitemapQuery = groq`{
  "posts": *[_type == "blogPost"]{ "slug": slug.current, _updatedAt },
  "portfolios": *[_type == "portfolio"]{ "slug": slug.current, _updatedAt },
  "services": *[_type == "service"]{ "slug": slug.current, _updatedAt }
}`;
