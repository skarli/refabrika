import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import CtaAreaFour from "@/components/cta/cta-area-4";
import LegalWrapper from "./legal-wrapper";
import LegalArea from "./legal-area";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { LEGAL_CONTENT, LEGAL_COMPANY } from "@/lib/legal-content";
import {
  getLegalPage,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";
import type { LegalPageType } from "@/types/sanity";

const PATHS: Record<LegalPageType, string> = {
  privacy: "/privacy",
  terms: "/terms",
  refund: "/refund-policy",
};

export async function buildLegalMetadata(
  pageType: LegalPageType
): Promise<Metadata> {
  const [legalPage, siteSettings] = await Promise.all([
    getLegalPage(pageType),
    getSiteSettings(),
  ]);
  const fallback = LEGAL_CONTENT[pageType];
  const siteName = siteSettings?.siteName || "re:fabrika";

  return buildMetadata({
    title: `${legalPage?.title || fallback.title} — ${siteName}`,
    description: fallback.intro.slice(0, 155),
    seo: legalPage?.seo,
    path: PATHS[pageType],
  });
}

export default async function LegalPageView({
  pageType,
}: {
  pageType: LegalPageType;
}) {
  const [legalPage, siteSettings, navigation] = await Promise.all([
    getLegalPage(pageType),
    getSiteSettings(),
    getNavigation(),
  ]);

  const fallback = LEGAL_CONTENT[pageType];
  const title = legalPage?.title || fallback.title;
  const subtitle = legalPage?.subtitle || fallback.subtitle;
  const lastUpdated = formatDate(legalPage?.lastUpdated) || LEGAL_COMPANY.effectiveDate;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: title, url: PATHS[pageType] },
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
        <LegalWrapper>
          <main style={{ paddingTop: "120px" }}>
            <LegalArea
              subtitle={subtitle}
              title={title}
              lastUpdated={lastUpdated}
              body={legalPage?.body}
              fallback={fallback}
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
        </LegalWrapper>
      </MainWrapper>
    </>
  );
}

function formatDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
