import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import FaqWrapper from "./_components/faq-wrapper";
import { AccordionWrapper } from "@/components/faq/faq-area";
import CtaAreaFour from "@/components/cta/cta-area-4";

export const metadata: Metadata = {
  title: "FAQ — re:fabrika",
  description:
    "Frequently asked questions about re:fabrika's digital marketing and advertising services.",
};

export default function FaqPage() {
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
        <FaqWrapper>
          <main style={{ paddingTop: '120px' }}>

            {/* faq area start */}
            <section className="faq-area-faq-page">
              <div className="container large">
                <div className="faq-area-faq-page-inner">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">FAQ</span>
                      </div>
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">Learn some common
                          answers about newly
                          projects</h2>
                      </div>
                    </div>
                  </div>

                  {/* accordion wrapper */}
                  <AccordionWrapper />
                  {/* accordion wrapper */}

                </div>
              </div>
            </section>
            {/* faq area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </FaqWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
