import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import BlogWrapper from "../_components/blog-wrapper";
import RecentBlogs from "@/components/blog/recent-blogs";
import CtaAreaFour from "@/components/cta/cta-area-4";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/seo/json-ld";
import {
  getBlogPost,
  getAllBlogSlugs,
  getBlogPosts,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

// Fallback placeholder image
const PLACEHOLDER_IMAGE = "/assets/imgs/placeholder.svg";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, siteSettings] = await Promise.all([
    getBlogPost(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} — ${siteSettings?.siteName || "re:fabrika"}`,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, siteSettings, navigation, recentPosts] = await Promise.all([
    getBlogPost(slug),
    getSiteSettings(),
    getNavigation(),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Get recent posts excluding current post
  const filteredRecentPosts = recentPosts
    .filter((p) => p.slug?.current !== slug)
    .slice(0, 3);

  return (
    <>
      <BlogPostingSchema post={post} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug?.current}` },
        ]}
      />

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
          <main>
            {/* Blog Details Area */}
            <section className="blog-details-area">
              <div className="blog-details-area-inner section-spacing-top">
                <div className="container large">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                    <div className="meta">
                      <span className="name">
                        By <span>{typeof post.author === "string" ? post.author : "re:fabrika"}</span>
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="tag has-left-line">{post.tags[0]}</span>
                      )}
                      {post.publishedAt && (
                        <span className="date has-left-line">
                          {new Date(post.publishedAt).getFullYear()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="image-wrapper parallax-view fade-anim">
                  <Image
                    className="w-100"
                    src={post.thumbnail ? urlFor(post.thumbnail).width(1920).height(800).url() : PLACEHOLDER_IMAGE}
                    alt={post.title}
                    width={1920}
                    height={800}
                    data-speed="0.8"
                    style={{ height: "auto" }}
                    priority
                  />
                </div>

                {/* Content */}
                <div className="container">
                  <div className="section-details fade-anim">
                    {post.content && (
                      <PortableText
                        value={post.content}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <div className="text-wrapper">
                                <p className="text">{children}</p>
                              </div>
                            ),
                            h2: ({ children }) => (
                              <div className="details-info">
                                <h3 className="title">{children}</h3>
                              </div>
                            ),
                            h3: ({ children }) => (
                              <div className="details-info">
                                <h3 className="title">{children}</h3>
                              </div>
                            ),
                          },
                          list: {
                            bullet: ({ children }) => (
                              <div className="feature-list">
                                <ul>{children}</ul>
                              </div>
                            ),
                          },
                          listItem: {
                            bullet: ({ children }) => <li>{children}</li>,
                          },
                        }}
                      />
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="tags-wrapper">
                        <span className="heading">Tags:</span>
                        <div className="tags">
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Blogs */}
            <RecentBlogs blogs={filteredRecentPosts} />
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
