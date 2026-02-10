import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import ServicesWrapper from "./_components/services-wrapper";
import CtaAreaFour from "@/components/cta/cta-area-4";
import ServiceAreaFive from "@/components/services/service-area-5";
import {
  getServicesPage,
  getServices,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [servicesPage, siteSettings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ]);

  return {
    title: servicesPage?.seo?.metaTitle || `Services — ${siteSettings?.siteName || "re:fabrika"}`,
    description:
      servicesPage?.seo?.metaDescription ||
      "Explore our digital marketing and branding services.",
  };
}

export default async function ServicesPage() {
  const [servicesPage, services, siteSettings, navigation] = await Promise.all([
    getServicesPage(),
    getServices(),
    getSiteSettings(),
    getNavigation(),
  ]);

  return (
    <>
      <HeaderSeven
        headerText={siteSettings?.headerText}
        logoImage={siteSettings?.logo}
        navigation={navigation || undefined}
        siteSettings={siteSettings || undefined}
      />

      <MainWrapper
        bodyCls={[
          "body-wrapper",
          "dark",
          "body-page-inner",
          "body-portfolio-agency",
          "font-heading-sequelsans-romanbody",
        ]}
      >
        <ServicesWrapper>
          <main style={{ paddingTop: "120px" }}>
            <ServiceAreaFive
              subtitle={servicesPage?.pageSubtitle}
              sectionTitle={servicesPage?.pageTitle}
              description={servicesPage?.pageDescription}
              services={services}
              spacing="section-spacing-top"
            />
          </main>

          <CtaAreaFour
            text={siteSettings?.ctaText}
            link={siteSettings?.ctaLink}
          />

          <FooterFour
            logoImage={siteSettings?.logo}
            footerText={siteSettings?.footerText}
            navigation={navigation || undefined}
          />
        </ServicesWrapper>
      </MainWrapper>
    </>
  );
}
