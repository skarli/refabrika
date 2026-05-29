import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import FaqWrapper from "./_components/faq-wrapper";
import FAQArea from "@/components/faq/faq-area";
import CtaAreaFour from "@/components/cta/cta-area-4";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import {
  getFaqPage,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [faqPage, siteSettings] = await Promise.all([
    getFaqPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: `FAQ — ${siteSettings?.siteName || "re:fabrika"}`,
    description: "Frequently asked questions about re:fabrika's digital marketing and advertising services.",
    seo: faqPage?.seo,
    path: "/faq",
  });
}

export default async function FaqPage() {
  const [faqPage, siteSettings, navigation] = await Promise.all([
    getFaqPage(),
    getSiteSettings(),
    getNavigation(),
  ]);

  return (
    <>
      {faqPage && <FAQPageSchema faqPage={faqPage} />}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      <HeaderSeven
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
        <FaqWrapper>
          <main style={{ paddingTop: "120px" }}>
            <FAQArea
              pageTitle={faqPage?.pageTitle}
              faqs={faqPage?.faqs}
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
        </FaqWrapper>
      </MainWrapper>
    </>
  );
}
