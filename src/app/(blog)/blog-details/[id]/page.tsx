import { Metadata } from "next";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import { allBlogs } from "@/data/blog-data";
import BlogWrapper from "../../blog/_components/blog-wrapper";
import BlogDetailsArea from "@/components/blog/blog-details-area";
import RecentBlogs from "@/components/blog/recent-blogs";
import CtaAreaFour from "@/components/cta/cta-area-4";


type Props = {
  params: Promise<{ id: string }>
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).id;
 
  // fetch post information
  const post = await allBlogs.find((post) => post.id === Number(slug));
 
  return {
    title: post?.title || "Blog Details",
  }
}


export default async function BlogDetailsPage({ params }: Props) {
  const {id} = await params;
  const post = await allBlogs.find((post) => post.id === Number(id));
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
          <main>

            {/* blog details area start */}
            <BlogDetailsArea/>
            {/* blog details area end */}

            {/* recent blog area start */}
            <RecentBlogs/>
            {/* recent blog area end */}

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
