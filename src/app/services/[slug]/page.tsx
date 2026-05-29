import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import FAQArea from "@/components/faq/faq-area";
import ServiceDetailsWrapper from "./_components/service-details-wrapper";
import ServiceDetailsHero from "./_components/service-details-hero";
import ServiceDetailsApproach from "./_components/service-details-approach";
import ServiceDetailsFeature from "./_components/service-details-feature";
import ServiceDetailsValueArea from "./_components/service-details-value-area";
import CtaAreaFour from "@/components/cta/cta-area-4";
import { buildMetadata } from "@/lib/seo";
import {
  getService,
  getAllServiceSlugs,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, siteSettings] = await Promise.all([
    getService(slug),
    getSiteSettings(),
  ]);

  if (!service) {
    return { title: "Service Not Found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: `${service.title} — ${siteSettings?.siteName || "re:fabrika"}`,
    description: service.shortDescription,
    seo: service.seo,
    path: `/services/${service.slug?.current}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, siteSettings, navigation] = await Promise.all([
    getService(slug),
    getSiteSettings(),
    getNavigation(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <>
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
        <ServiceDetailsWrapper>
          <main>
            <ServiceDetailsHero service={service} />
            <ServiceDetailsApproach service={service} />
            <ServiceDetailsFeature service={service} />
            <ServiceDetailsValueArea service={service} />
            {service.faqs && service.faqs.length > 0 && (
              <FAQArea
                pageTitle={`Frequently Asked Questions about ${service.title}`}
                faqs={service.faqs}
              />
            )}
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
        </ServiceDetailsWrapper>
      </MainWrapper>
    </>
  );
}
