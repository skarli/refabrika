import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import PortfolioDetailsWrapper from "./_components/portfolio-details-wrapper";
import PortfolioDetailsArea from "./_components/portfolio-details-area";
import CtaAreaFour from "@/components/cta/cta-area-4";

export const metadata: Metadata = {
  title: "Project Details — re:fabrika",
  description:
    "Detailed case study of a re:fabrika digital marketing project.",
};

export default function PortfolioDetailsPage() {
  return (
    <>
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
        <PortfolioDetailsWrapper>
          <main style={{ paddingTop: '120px' }}>
            {/* portfolio details area start */}
            <PortfolioDetailsArea/>
            {/* portfolio details area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </PortfolioDetailsWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
