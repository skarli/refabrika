import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import PortfolioWrapper from "./_components/portfolio-wrapper";
import CtaAreaFour from "@/components/cta/cta-area-4";
import WorkAreaSix from "@/components/work/work-area-6";
import { buildMetadata } from "@/lib/seo";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/seo/json-ld";
import {
  getPortfolioPage,
  getPortfolioProjects,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [portfolioPage, siteSettings] = await Promise.all([
    getPortfolioPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: `Portfolio — ${siteSettings?.siteName || "re:fabrika"}`,
    description: "Explore our portfolio of digital marketing and branding projects.",
    seo: portfolioPage?.seo,
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const [portfolioPage, projects, siteSettings, navigation] = await Promise.all([
    getPortfolioPage(),
    getPortfolioProjects(),
    getSiteSettings(),
    getNavigation(),
  ]);

  return (
    <>
      <CollectionPageSchema
        name="Portfolio"
        description="Explore our portfolio of digital marketing and branding projects."
        path="/portfolio"
        items={projects.map((p) => ({
          name: p.title,
          url: `/portfolio/${p.slug?.current}`,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Portfolio", url: "/portfolio" },
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
        <PortfolioWrapper>
          <main style={{ paddingTop: "120px" }}>
            <section className="portfolio-area-portfolio-page">
              <div className="container large">
                <div className="portfolio-area-portfolio-page-inner section-spacing-top">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">Portfolio</span>
                      </div>
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {portfolioPage?.pageTitle || "Our selected works"}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <WorkAreaSix projects={projects} />
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
        </PortfolioWrapper>
      </MainWrapper>
    </>
  );
}
