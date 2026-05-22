import { Metadata } from "next";
import Image from "next/image";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import LandingWrapper from "./_components/landing-wrapper";
import HeroThree from "@/components/hero/hero-three";
import AboutTwo from "@/components/about/about-two";
import WorkAreaThree from "@/components/work/work-area-3";
import ServiceAreaFive from "@/components/services/service-area-5";
import ClientArea from "@/components/client/client-area";
import CtaAreaFour from "@/components/cta/cta-area-4";
import BlogArea from "@/components/blog/blog-area";
import FooterFour from "@/layout/footer/footer-four";
import shape from "@/assets/imgs/shape/shape-9.webp";
import CustomCursor from "@/components/common/custom-cursor";
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import {
  getHomePage,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [homePage, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: siteSettings?.siteName || "re:fabrika — Digital Marketing & Brand Growth Agency",
    description:
      siteSettings?.siteDescription ||
      "Digital marketing & brand growth agency since 2009. Social media, Google & Meta ads, brand strategy.",
    seo: homePage?.seo,
    path: "/",
  });
}

export default async function HomePage() {
  const [homePage, siteSettings, navigation] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getNavigation(),
  ]);

  return (
    <>
      <OrganizationSchema siteSettings={siteSettings} />
      <WebSiteSchema siteSettings={siteSettings} />
      <LocalBusinessSchema siteSettings={siteSettings} />

      <CustomCursor />

      <HeaderSeven
        logoImage={siteSettings?.logo}
        navigation={navigation || undefined}
        siteSettings={siteSettings || undefined}
      />

      <MainWrapper
        bodyCls={[
          "body-wrapper",
          "dark",
          "body-creative-agency",
          "body-marketing-agency",
          "body-startup-agency",
          "body-digital-agency",
          "body-portfolio-agency",
          "font-heading-sequelsans-romanbody",
        ]}
      >
        <LandingWrapper>
          <div>
            <div className="body-bg">
              <div className="container large">
                <Image src={shape} alt="" aria-hidden="true" priority style={{ width: "auto", height: "auto" }} />
                <Image src={shape} alt="" aria-hidden="true" style={{ width: "auto", height: "auto" }} />
              </div>
            </div>

            <main>
              <HeroThree
                subtitle={homePage?.heroSubtitle}
                title={homePage?.heroTitle}
                location={homePage?.heroLocation}
                locationImage={homePage?.heroLocationImage}
                description={homePage?.heroDescription}
                buttonText={homePage?.heroButtonText}
                buttonLink={homePage?.heroButtonLink}
                stats={homePage?.heroStats}
                socialLinks={homePage?.heroSocialLinks}
              />
              <AboutTwo
                title={homePage?.aboutTitle}
                yearStart={homePage?.aboutYearStart}
                yearEnd={homePage?.aboutYearEnd}
                description={homePage?.aboutDescription}
                buttonText={homePage?.aboutButtonText}
                buttonLink={homePage?.aboutButtonLink}
              />
              <WorkAreaThree
                sectionTitle={homePage?.workSectionTitle}
                buttonText={homePage?.workButtonText}
                works={homePage?.featuredWorks}
              />
              <ServiceAreaFive
                subtitle={homePage?.servicesSubtitle}
                sectionTitle={homePage?.servicesSectionTitle}
                description={homePage?.servicesDescription}
                services={homePage?.featuredServices}
              />
              <ClientArea />
              <BlogArea
                sectionTitle={homePage?.blogSectionTitle}
                buttonText={homePage?.blogButtonText}
                blogs={homePage?.featuredBlogs}
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
          </div>
        </LandingWrapper>
      </MainWrapper>
    </>
  );
}
