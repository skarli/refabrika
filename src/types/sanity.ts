// Sanity Image Type
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// SEO Type
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

// Site Settings
export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  headerText?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    behance?: string;
    dribbble?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  footerText?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Navigation
export interface NavItem {
  _key: string;
  label: string;
  href: string;
}

export interface Navigation {
  mainMenu: NavItem[];
  sideMenuContactTitle?: string;
  sideMenuButtonText?: string;
}

// Home Page Hero
export interface HeroSocialLink {
  _key: string;
  label: string;
  url: string;
}

export interface HomePageData {
  // Hero
  heroSubtitle?: string;
  heroTitle?: string;
  heroLocation?: string;
  heroLocationImage?: SanityImage;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroStats?: string;
  heroSocialLinks?: HeroSocialLink[];

  // About
  aboutTitle?: string;
  aboutYearStart?: string;
  aboutYearEnd?: string;
  aboutDescription?: string;
  aboutButtonText?: string;
  aboutButtonLink?: string;

  // Work
  workSectionTitle?: string;
  workButtonText?: string;
  featuredWorks?: PortfolioItem[];

  // Services
  servicesSectionTitle?: string;
  servicesSubtitle?: string;
  servicesDescription?: string;
  featuredServices?: ServiceItem[];

  // Clients
  clientTitle?: string;
  clientDescription?: string;
  clientLogos?: ClientLogo[];

  // Blog
  blogSectionTitle?: string;
  blogButtonText?: string;
  featuredBlogs?: BlogPostItem[];

  seo?: SEO;
}

// Blog
export interface BlogPostItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  thumbnail?: SanityImage;
  author?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface BlogPost extends BlogPostItem {
  content?: any[];
  seo?: SEO;
}

// Portfolio
export interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: SanityImage;
  year?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Portfolio extends PortfolioItem {
  client?: string;
  service?: string;
  date?: string;
  technology?: string;
  shortDescription?: string;
  fullDescription?: any[];
  gallery?: SanityImage[];
  features?: string[];
  seo?: SEO;
}

// Service
export interface ServiceItem {
  _id: string;
  title: string;
  slug: { current: string };
  number?: string;
  shortDescription?: string;
  thumbnail?: SanityImage;
}

export interface ApproachStep {
  _key: string;
  title: string;
  description: string;
}

export interface FeatureCard {
  _key: string;
  title: string;
  description: string;
}

export interface ValueStat {
  _key: string;
  value: string;
  description: string;
}

export interface ServiceFAQ {
  _key: string;
  question: string;
  answer: string;
}

export interface Service extends ServiceItem {
  serialNumber?: string;
  tagLabel?: string;
  heroDescription?: string;
  heroFeatures?: string[];
  approachTitle?: string;
  approachDescription?: string;
  approachSteps?: ApproachStep[];
  featureCards?: FeatureCard[];
  valueSectionTitle?: string;
  valueStats?: ValueStat[];
  faqs?: ServiceFAQ[];
  seo?: SEO;
}

// Client Logo
export interface ClientLogo {
  _key: string;
  logo: SanityImage;
  bgTheme?: boolean;
}

// FAQ
export interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

export interface FAQPage {
  pageTitle?: string;
  faqs?: FAQItem[];
  seo?: SEO;
}

// Contact
export interface FormLabels {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  companyPlaceholder?: string;
  budgetPlaceholder?: string;
  solutionPlaceholder?: string;
  messagePlaceholder?: string;
  buttonText?: string;
}

export interface ContactPage {
  pageTitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  followTitle?: string;
  formLabels?: FormLabels;
  budgetOptions?: string[];
  seo?: SEO;
}

// Pages
export interface BlogPage {
  pageTitle?: string;
  seo?: SEO;
}

export interface PortfolioPage {
  pageTitle?: string;
  seo?: SEO;
}

export interface ServicesPage {
  pageTitle?: string;
  pageSubtitle?: string;
  pageDescription?: string;
  seo?: SEO;
}

// Aliases for component props
export type NavigationData = Navigation;
export type SiteSettingsData = SiteSettings;
export type ServiceData = Service;
