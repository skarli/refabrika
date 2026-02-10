import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import ContactWrapper from "./_components/contact-wrapper";
import ContactArea from "./_components/contact-area";
import FooterFour from "@/layout/footer/footer-four";
import CtaAreaFour from "@/components/cta/cta-area-4";
import {
  getContactPage,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return {
    title: contactPage?.seo?.metaTitle || `Contact — ${siteSettings?.siteName || "re:fabrika"}`,
    description:
      contactPage?.seo?.metaDescription ||
      "Get in touch with re:fabrika. Let's talk about your next digital marketing project.",
  };
}

export default async function ContactPage() {
  const [contactPage, siteSettings, navigation] = await Promise.all([
    getContactPage(),
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
        <ContactWrapper>
          <main style={{ paddingTop: "120px" }}>
            <ContactArea
              contactPage={contactPage || undefined}
              siteSettings={siteSettings || undefined}
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
        </ContactWrapper>
      </MainWrapper>
    </>
  );
}
