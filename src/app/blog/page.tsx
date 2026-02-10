import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import BlogWrapper from "./_components/blog-wrapper";
import CtaAreaFour from "@/components/cta/cta-area-4";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogPage,
  getBlogPosts,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [blogPage, siteSettings] = await Promise.all([
    getBlogPage(),
    getSiteSettings(),
  ]);

  return {
    title: blogPage?.seo?.metaTitle || `Blog — ${siteSettings?.siteName || "re:fabrika"}`,
    description:
      blogPage?.seo?.metaDescription ||
      "Latest news, insights, and articles from re:fabrika digital marketing agency.",
  };
}

export default async function BlogPage() {
  const [blogPage, blogPosts, siteSettings, navigation] = await Promise.all([
    getBlogPage(),
    getBlogPosts(),
    getSiteSettings(),
    getNavigation(),
  ]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <HeaderSeven
        headerText={siteSettings?.headerText}
        logoImage={siteSettings?.logo}
        navigation={navigation || undefined}
        siteSettings={siteSettings || undefined}
      />

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
          <main style={{ paddingTop: "120px" }}>
            <section className="blog-area-2">
              <div className="container large">
                <div className="blog-area-2-inner">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">Blog</span>
                      </div>
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {blogPage?.pageTitle || "Latest news and insights"}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="blogs-wrapper-box">
                    <div className="blogs-wrapper">
                      {blogPosts.map((blog, idx) => (
                        <Link href={`/blog/${blog.slug?.current}`} key={blog._id || idx}>
                          <article className="blog fade-anim" data-delay={`0.${(idx % 3) + 1}s`}>
                            <div className="thumb">
                              {blog.thumbnail ? (
                                <Image
                                  src={urlFor(blog.thumbnail).width(500).height(353).url()}
                                  alt={blog.title}
                                  width={500}
                                  height={353}
                                  style={{ height: "auto" }}
                                />
                              ) : (
                                <div style={{ width: 500, height: 353, background: "#222" }} />
                              )}
                            </div>
                            <div className="content-wrapper">
                              <div className="content">
                                <h2 className="title">
                                  {blog.title}
                                  <span className="arrow">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 13 14"
                                      fill="none"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.98834 0.661257C8.91884 0.781628 8.85302 0.903885 8.79094 1.02786C8.47298 1.49122 8.0835 1.90234 7.63629 2.2455C7.07879 2.67328 6.4425 2.98707 5.76373 3.16894C5.08497 3.35082 4.37702 3.39722 3.68033 3.3055C2.98363 3.21377 2.31182 2.98572 1.70325 2.63437L0.869521 4.07843C1.66772 4.53928 2.54888 4.83839 3.46268 4.95869C4.37648 5.079 5.30502 5.01814 6.1953 4.77959C6.36565 4.73394 6.53397 4.68196 6.6999 4.62381L2.03475 12.7041L3.47584 13.5361L8.16052 5.42201C8.19489 5.61171 8.23713 5.80022 8.28719 5.98704C8.52574 6.87732 8.9373 7.71189 9.49839 8.44311C10.0595 9.17433 10.7591 9.78788 11.5573 10.2487L12.391 8.80466C11.7825 8.4533 11.2491 7.98552 10.8213 7.42803C10.3935 6.87053 10.0797 6.23423 9.89783 5.55547C9.71595 4.8767 9.66955 4.16876 9.76128 3.47206C9.83484 2.91326 9.99611 2.37047 10.2384 1.86349C10.3146 1.74781 10.3875 1.62977 10.457 1.50948L10.4323 1.49521L10.4324 1.49499L8.98834 0.661257Z"
                                        fill="#111111"
                                      />
                                    </svg>
                                  </span>
                                </h2>
                                <div className="meta">
                                  <span className="name">
                                    By <span>{typeof blog.author === "string" ? blog.author : "re:fabrika"}</span>
                                  </span>
                                  <span className="date has-left-line">
                                    {formatDate(blog.publishedAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
        </BlogWrapper>
      </MainWrapper>
    </>
  );
}
