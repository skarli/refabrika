import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import HeaderSeven from "@/layout/header/header-seven";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterFour from "@/layout/footer/footer-four";
import PortfolioWrapper from "../_components/portfolio-wrapper";
import CtaAreaFour from "@/components/cta/cta-area-4";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { buildMetadata } from "@/lib/seo";
import {
  getPortfolioProject,
  getPortfolioProjects,
  getAllPortfolioSlugs,
  getSiteSettings,
  getNavigation,
} from "@/sanity/lib/fetch";

// Fallback gallery images
import gallery_1 from "@/assets/imgs/gallery/image-26.webp";

interface Props {
  params: Promise<{ slug: string }>;
}

const imgStyle: CSSProperties = {
  height: "auto",
};

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project, siteSettings] = await Promise.all([
    getPortfolioProject(slug),
    getSiteSettings(),
  ]);

  if (!project) {
    return { title: "Project Not Found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: `${project.title} — ${siteSettings?.siteName || "re:fabrika"}`,
    description: project.shortDescription,
    seo: project.seo,
    path: `/portfolio/${project.slug?.current}`,
    type: "article",
    images: project.thumbnail ? [project.thumbnail] : undefined,
  });
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects, siteSettings, navigation] = await Promise.all([
    getPortfolioProject(slug),
    getPortfolioProjects(),
    getSiteSettings(),
    getNavigation(),
  ]);

  if (!project) {
    notFound();
  }

  // Find prev/next projects for navigation
  const currentIndex = allProjects.findIndex(
    (p) => p.slug?.current === slug
  );
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  // Get first gallery image or thumbnail for header
  const headerImage =
    project.gallery && project.gallery.length > 0
      ? project.gallery[0]
      : project.thumbnail;

  // Get main image (second gallery image or thumbnail)
  const mainImage =
    project.gallery && project.gallery.length > 1
      ? project.gallery[1]
      : project.thumbnail;

  // Get remaining gallery images (excluding first two)
  const galleryImages =
    project.gallery && project.gallery.length > 2
      ? project.gallery.slice(2)
      : [];

  return (
    <>
      <HeaderSeven
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
        <PortfolioWrapper>
          <section className="work-details-area">
            <div className="work-details-area-inner section-spacing">
              <div className="container large">
                {/* Section Header */}
                <div className="section-header fade-anim">
                  <div className="section-title-wrapper">
                    <div className="title-thumb">
                      {headerImage ? (
                        <Image
                          src={urlFor(headerImage).width(400).height(300).url()}
                          alt={project.title}
                          width={400}
                          height={300}
                          style={imgStyle}
                        />
                      ) : (
                        <Image src={gallery_1} alt="image" style={imgStyle} />
                      )}
                    </div>
                    <div className="title-wrapper">
                      <h2 className="section-title font-sequelsans-romanbody">
                        {project.title.split(" ").map((word, idx, arr) => (
                          <span key={idx}>
                            {word}
                            {idx < arr.length - 1 && (idx === 0 ? <br /> : " ")}
                          </span>
                        ))}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Meta Wrapper */}
                <div className="meta-wrapper fade-anim">
                  {project.service && (
                    <div className="meta-item">
                      <p className="title">Service</p>
                      <p className="text">{project.service}</p>
                    </div>
                  )}
                  {project.client && (
                    <div className="meta-item">
                      <p className="title">Client</p>
                      <p className="text">{project.client}</p>
                    </div>
                  )}
                  {project.date && (
                    <div className="meta-item">
                      <p className="title">Date</p>
                      <p className="text">{project.date}</p>
                    </div>
                  )}
                  {project.technology && (
                    <div className="meta-item">
                      <p className="title">Technology</p>
                      <p className="text">{project.technology}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Image */}
              {mainImage && (
                <div className="image-wrapper parallax-view fade-anim">
                  <Image
                    className="w-100"
                    src={urlFor(mainImage).width(1920).height(1080).url()}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    data-speed="0.8"
                    style={imgStyle}
                  />
                </div>
              )}

              <div className="container large">
                {/* Section Info */}
                <div className="section-info fade-anim">
                  <div className="title-wrapper">
                    <h2 className="title">
                      {project.shortDescription ||
                        "Build streamline and evolve together with solution"}
                    </h2>
                  </div>
                  <div className="content">
                    {project.fullDescription && (
                      <div className="text-wrapper">
                        <div className="text">
                          <PortableText value={project.fullDescription} />
                        </div>
                      </div>
                    )}
                    {project.features && project.features.length > 0 && (
                      <div className="feature-list">
                        <ul>
                          {project.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Gallery - 2 Column Layout */}
              {galleryImages.length > 0 && (
                <div className="gallery-wrapper fade-anim">
                  {galleryImages.map((image, idx) => (
                    <div key={idx} className="image parallax-view">
                      <Image
                        src={urlFor(image).width(1200).height(800).url()}
                        alt={`${project.title} - Image ${idx + 1}`}
                        width={1200}
                        height={800}
                        data-speed="0.8"
                        style={imgStyle}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Additional Section Details */}
              {project.tags && project.tags.length > 0 && (
                <div className="container large">
                  <div className="section-details fade-anim">
                    <div className="details-info">
                      <h3 className="title">Project Tags</h3>
                      <p className="text">{project.tags.join(", ")}</p>
                    </div>
                    {project.year && (
                      <div className="details-info">
                        <h3 className="title">Year</h3>
                        <p className="text">{project.year}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="container large">
              <div className="pagination fade-anim">
                {prevProject ? (
                  <Link href={`/portfolio/${prevProject.slug?.current}`}>
                    <svg
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.87111 10.8964C7.02203 10.2784 6.09262 9.77888 5.11148 9.40696C4.6913 9.24769 4.26163 9.11181 3.82472 9.00006C3.82464 9.00008 3.82457 9.0001 3.82449 9.00012C5.28169 9.37281 6.65834 10.0138 7.87111 10.8966C9.8992 12.3726 11.3571 14.4421 12.0189 16.7842L12.019 16.7842C11.9496 16.5388 11.8716 16.2965 11.785 16.0575C11.0455 14.015 9.68677 12.2179 7.87111 10.8964ZM12.019 1.21564C12.019 1.2156 12.019 1.21556 12.019 1.21552L10.8974 0.930425C10.3017 3.03841 8.98963 4.90113 7.16402 6.22966C5.3384 7.5582 3.10175 8.27831 0.800956 8.27831L0.800956 8.27843C3.10175 8.27843 5.3384 7.55832 7.16402 6.22979C8.98963 4.90125 10.3017 3.03854 10.8974 0.930547L12.019 1.21564ZM8.35872 10.2937C7.66151 9.78628 6.91367 9.35356 6.12905 9C6.91367 8.64643 7.66151 8.21372 8.35872 7.70624C10.5268 6.12829 12.0853 3.91587 12.7927 1.41215L13 0.678382L10.3311 -4.51585e-07L10.1237 0.733776C9.57372 2.68028 8.36214 4.40024 6.67645 5.62696C4.9907 6.85371 2.92542 7.51863 0.800955 7.51863L-4.58155e-07 7.51863L-3.2865e-07 10.4814L0.800956 10.4814C2.92542 10.4814 4.9907 11.1463 6.67645 12.373C8.36214 13.5997 9.57372 15.3197 10.1237 17.2662L10.3311 18L13 17.3216L12.7927 16.5878C12.0853 14.0841 10.5268 11.8717 8.35872 10.2937Z"
                        fill="#111111"
                      />
                    </svg>
                    Prev
                  </Link>
                ) : (
                  <span className="disabled">
                    <svg
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.87111 10.8964C7.02203 10.2784 6.09262 9.77888 5.11148 9.40696C4.6913 9.24769 4.26163 9.11181 3.82472 9.00006C3.82464 9.00008 3.82457 9.0001 3.82449 9.00012C5.28169 9.37281 6.65834 10.0138 7.87111 10.8966C9.8992 12.3726 11.3571 14.4421 12.0189 16.7842L12.019 16.7842C11.9496 16.5388 11.8716 16.2965 11.785 16.0575C11.0455 14.015 9.68677 12.2179 7.87111 10.8964ZM12.019 1.21564C12.019 1.2156 12.019 1.21556 12.019 1.21552L10.8974 0.930425C10.3017 3.03841 8.98963 4.90113 7.16402 6.22966C5.3384 7.5582 3.10175 8.27831 0.800956 8.27831L0.800956 8.27843C3.10175 8.27843 5.3384 7.55832 7.16402 6.22979C8.98963 4.90125 10.3017 3.03854 10.8974 0.930547L12.019 1.21564ZM8.35872 10.2937C7.66151 9.78628 6.91367 9.35356 6.12905 9C6.91367 8.64643 7.66151 8.21372 8.35872 7.70624C10.5268 6.12829 12.0853 3.91587 12.7927 1.41215L13 0.678382L10.3311 -4.51585e-07L10.1237 0.733776C9.57372 2.68028 8.36214 4.40024 6.67645 5.62696C4.9907 6.85371 2.92542 7.51863 0.800955 7.51863L-4.58155e-07 7.51863L-3.2865e-07 10.4814L0.800956 10.4814C2.92542 10.4814 4.9907 11.1463 6.67645 12.373C8.36214 13.5997 9.57372 15.3197 10.1237 17.2662L10.3311 18L13 17.3216L12.7927 16.5878C12.0853 14.0841 10.5268 11.8717 8.35872 10.2937Z"
                        fill="#666666"
                      />
                    </svg>
                    Prev
                  </span>
                )}
                {nextProject ? (
                  <Link href={`/portfolio/${nextProject.slug?.current}`}>
                    Next
                    <svg
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.12889 10.8964C5.97797 10.2784 6.90738 9.77888 7.88852 9.40696C8.3087 9.24769 8.73837 9.11181 9.17528 9.00006C9.17536 9.00008 9.17543 9.0001 9.17551 9.00012C7.71831 9.37281 6.34166 10.0138 5.12889 10.8966C3.1008 12.3726 1.64286 14.4421 0.981079 16.7842L0.981047 16.7842C1.05037 16.5388 1.12844 16.2965 1.21498 16.0575C1.95453 14.015 3.31323 12.2179 5.12889 10.8964ZM0.981001 1.21564C0.98099 1.2156 0.980979 1.21556 0.980968 1.21552L2.10262 0.930425C2.69825 3.03841 4.01037 4.90113 5.83598 6.22966C7.6616 7.5582 9.89825 8.27831 12.199 8.27831L12.199 8.27843C9.89825 8.27843 7.6616 7.55832 5.83598 6.22979C4.01037 4.90125 2.69825 3.03854 2.10262 0.930547L0.981001 1.21564ZM4.64128 10.2937C5.33849 9.78628 6.08633 9.35356 6.87095 9C6.08633 8.64643 5.33849 8.21372 4.64128 7.70624C2.4732 6.12829 0.914665 3.91587 0.207307 1.41215L-1.96522e-07 0.678382L2.66894 -4.51585e-07L2.87627 0.733776C3.42628 2.68028 4.63786 4.40024 6.32355 5.62696C8.0093 6.85371 10.0746 7.51863 12.199 7.51863L13 7.51863L13 10.4814L12.199 10.4814C10.0746 10.4814 8.0093 11.1463 6.32355 12.373C4.63786 13.5997 3.42628 15.3197 2.87627 17.2662L2.66894 18L-9.24021e-07 17.3216L0.207306 16.5878C0.914663 14.0841 2.4732 11.8717 4.64128 10.2937Z"
                        fill="#111111"
                      />
                    </svg>
                  </Link>
                ) : (
                  <span className="disabled">
                    Next
                    <svg
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.12889 10.8964C5.97797 10.2784 6.90738 9.77888 7.88852 9.40696C8.3087 9.24769 8.73837 9.11181 9.17528 9.00006C9.17536 9.00008 9.17543 9.0001 9.17551 9.00012C7.71831 9.37281 6.34166 10.0138 5.12889 10.8966C3.1008 12.3726 1.64286 14.4421 0.981079 16.7842L0.981047 16.7842C1.05037 16.5388 1.12844 16.2965 1.21498 16.0575C1.95453 14.015 3.31323 12.2179 5.12889 10.8964ZM0.981001 1.21564C0.98099 1.2156 0.980979 1.21556 0.980968 1.21552L2.10262 0.930425C2.69825 3.03841 4.01037 4.90113 5.83598 6.22966C7.6616 7.5582 9.89825 8.27831 12.199 8.27831L12.199 8.27843C9.89825 8.27843 7.6616 7.55832 5.83598 6.22979C4.01037 4.90125 2.69825 3.03854 2.10262 0.930547L0.981001 1.21564ZM4.64128 10.2937C5.33849 9.78628 6.08633 9.35356 6.87095 9C6.08633 8.64643 5.33849 8.21372 4.64128 7.70624C2.4732 6.12829 0.914665 3.91587 0.207307 1.41215L-1.96522e-07 0.678382L2.66894 -4.51585e-07L2.87627 0.733776C3.42628 2.68028 4.63786 4.40024 6.32355 5.62696C8.0093 6.85371 10.0746 7.51863 12.199 7.51863L13 7.51863L13 10.4814L12.199 10.4814C10.0746 10.4814 8.0093 11.1463 6.32355 12.373C4.63786 13.5997 3.42628 15.3197 2.87627 17.2662L2.66894 18L-9.24021e-07 17.3216L0.207306 16.5878C0.914663 14.0841 2.4732 11.8717 4.64128 10.2937Z"
                        fill="#666666"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </section>

          <CtaAreaFour
            text={siteSettings?.ctaText}
            link={siteSettings?.ctaLink}
          />

          <FooterFour
            logoImage={siteSettings?.logo}
            footerText={siteSettings?.footerText}
            navigation={navigation || undefined}
          />
        </PortfolioWrapper>
      </MainWrapper>
    </>
  );
}
