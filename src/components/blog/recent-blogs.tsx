import Link from "next/link";
import Image from "next/image";
import { blogItemsTwo } from "@/data/blog-data";
import type { BlogPostItem } from "@/types/sanity";
import { getImageUrl } from "@/sanity/lib/image";

interface RecentBlogsProps {
  blogs?: BlogPostItem[];
}

export default function RecentBlogs({ blogs }: RecentBlogsProps) {
  // Use Sanity blogs if provided, otherwise fallback to static data
  const hasSanityBlogs = blogs && blogs.length > 0;
  const fallbackBlogs = blogItemsTwo.slice(0, 3);

  return (
    <section className="blog-area-3">
      <div className="container large">
        <div className="blog-area-3-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">Recent blog</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">
                  Learn more related journals
                </h2>
              </div>
            </div>
          </div>
          <div className="blogs-wrapper-box">
            <div className="blogs-wrapper">
              {hasSanityBlogs
                ? (blogs as BlogPostItem[]).slice(0, 3).map((blog) => (
                    <Link key={blog._id} href={`/blog/${blog.slug?.current}`}>
                      <article className="blog-box fade-anim">
                        <div className="thumb">
                          {blog.thumbnail && (
                            <Image
                              src={getImageUrl(blog.thumbnail, 400)}
                              alt={blog.title}
                              width={400}
                              height={300}
                              style={{ height: "auto" }}
                            />
                          )}
                        </div>
                        <div className="content">
                          <div className="meta">
                            <span className="author">{blog.author || "re:fabrika"}</span>
                            <span className="date">
                              {blog.publishedAt
                                ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : "2024"}
                            </span>
                          </div>
                          <h3 className="title">{blog.title}</h3>
                        </div>
                      </article>
                    </Link>
                  ))
                : fallbackBlogs.map((item) => (
                    <Link key={item.id} href={`/blog/${item.id}`}>
                      <article className="blog-box fade-anim">
                        <div className="thumb">
                          <Image
                            src={item.img}
                            alt={item.title}
                            width={400}
                            height={300}
                            style={{ height: "auto" }}
                          />
                        </div>
                        <div className="content">
                          <div className="meta">
                            <span className="author">{item.author}</span>
                            <span className="date">{item.date}</span>
                          </div>
                          <h3 className="title">{item.title}</h3>
                        </div>
                      </article>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
