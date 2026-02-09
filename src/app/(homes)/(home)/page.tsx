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

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Landing page",
};

export default function HomePage() {
  return (
    <>
      <CustomCursor />

      <HeaderSeven />

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
                <Image src={shape} alt="image" />
                <Image src={shape} alt="image" />
              </div>
            </div>

            <main>
              <HeroThree />
              <AboutTwo />
              <WorkAreaThree />
              <ServiceAreaFive />
              <ClientArea />
              <BlogArea />
            </main>

            <CtaAreaFour />
            <FooterFour />
          </div>
        </LandingWrapper>
      </MainWrapper>
    </>
  );
}
