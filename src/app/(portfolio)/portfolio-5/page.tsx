import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import PortfolioWrapper from "./_components/portfolio-5-wrapper";
import { WorksWrapperSix } from "@/components/work/work-area-6";
import CustomCursor from "@/components/common/custom-cursor";
import CtaAreaFour from "@/components/cta/cta-area-4";

export const metadata: Metadata = {
  title: "Portfolio — re:fabrika",
  description:
    "Browse re:fabrika's portfolio of digital campaigns, brand identities, and marketing projects.",
};

export default function PortfolioFivePage() {
  return (
    <>
      {/* custom cursor start */}
      <CustomCursor />
      {/* custom cursor end */}

      {/* Header area start */}
      <HeaderSeven />
      {/* Header area end */}

      {/* Main wrapper start */}
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
          <main style={{ paddingTop: '120px' }}>
            {/* portfolio area start */}
            <section className="work-area-work-page">
              <div className="work-area-work-page-inner">
                <div className="works-wrapper-box">
                  <div className="container large">
                    <WorksWrapperSix />
                  </div>
                </div>
              </div>
            </section>
            {/* portfolio area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </PortfolioWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
