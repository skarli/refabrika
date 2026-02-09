import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import ContactWrapper from "./_components/contact-wrapper";
import ContactArea from "./_components/contact-area";
import FooterFour from "@/layout/footer/footer-four";
import CtaAreaFour from "@/components/cta/cta-area-4";


export const metadata: Metadata = {
  title: "Contact — re:fabrika",
  description:
    "Get in touch with re:fabrika. Let's talk about your next digital marketing project.",
};

export default function ContactPage() {
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
        <ContactWrapper>

          <main style={{ paddingTop: '120px' }}>

            {/* contact area start */}
            <ContactArea/>
            {/* contact area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </ContactWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
