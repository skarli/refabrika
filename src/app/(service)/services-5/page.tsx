import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import ServiceFiveWrapper from "./_components/service-5-wrapper";
import ClientAreaFour from "@/components/client/client-area-4";
import ServiceContentWrapper from "@/components/services/service-content-wrapper";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";

export const metadata: Metadata = {
  title: "Services — re:fabrika",
  description:
    "Explore re:fabrika's digital marketing services including social media management, Google & Meta ads, and brand strategy.",
};

export default function ServicesFivePage() {
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
        <ServiceFiveWrapper>
          <main style={{ paddingTop: '120px' }}>
            {/* services area start */}
            <section className="service-area-service-page">
              <div className="service-area-service-page-inner">
                <ServiceAreaFive
                  spacing=""
                  title_font="font-sequelsans-romanbody"
                />
                <div className="container large">
                  <ServiceContentWrapper />
                </div>
              </div>
            </section>
            {/* services area end */}

            {/* client area start  */}
            <ClientAreaFour />
            {/* client area end  */}
          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </ServiceFiveWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
