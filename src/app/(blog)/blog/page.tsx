import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import BlogAreaTwo from "@/components/blog/blog-area-2";
import BlogWrapper from "./_components/blog-wrapper";
import CtaAreaFour from "@/components/cta/cta-area-4";


export const metadata: Metadata = {
  title: "Blog — re:fabrika",
  description:
    "Insights, trends, and strategies from re:fabrika's digital marketing experts.",
};

export default function BlogPage() {
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
        <BlogWrapper>
          <main style={{ paddingTop: '120px' }}>

            {/* blog area start */}
            <BlogAreaTwo />
            {/* blog area end */}

          </main>

          {/* CTA area start */}
          <CtaAreaFour />
          {/* CTA area end */}

          {/* Footer area start */}
          <FooterFour />
          {/* Footer area end */}
        </BlogWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
