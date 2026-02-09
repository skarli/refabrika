import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Service Details — re:fabrika",
  description:
    "Learn more about re:fabrika's specialized digital marketing and brand growth services.",
};

export default function ServiceDetailsPage() {
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
        <ServiceDetailsWrapper>
          <main>

            {/* service details hero area start */}
            <ServiceDetailsHero />  
            {/* service details hero area end */}

            {/* service details approach area start */}
            <ServiceDetailsApproach />
            {/* service details approach area end */}

            {/* service details feature area start */}
            <ServiceDetailsFeature/>
            {/* service details feature area end */}

            {/* service details value area start */}
            <ServiceDetailsValueArea/>
            {/* service details value area end */}

            {/* service details faq area start */}
            <FAQArea />
            {/* service details faq area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </ServiceDetailsWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
