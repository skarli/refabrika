import siteSettings from "./siteSettings";
import seo from "./seo";
import navigation from "./navigation";
import homePage from "./homePage";
import blogPost from "./blogPost";
import blogPage from "./blogPage";
import portfolio from "./portfolio";
import portfolioPage from "./portfolioPage";
import service from "./service";
import servicesPage from "./servicesPage";
import faqPage from "./faqPage";
import contactPage from "./contactPage";
import contactSubmission from "./contactSubmission";

export const schemaTypes = [
  // Objects
  seo,

  // Singleton Documents - Settings
  siteSettings,
  navigation,

  // Singleton Documents - Pages
  homePage,
  blogPage,
  portfolioPage,
  servicesPage,
  faqPage,
  contactPage,

  // Collection Documents
  blogPost,
  portfolio,
  service,
  contactSubmission,
];
