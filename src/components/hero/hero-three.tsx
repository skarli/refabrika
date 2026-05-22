import Image from "next/image";
import shape_1 from "@/assets/imgs/shape/shape-10.webp";
import shape_2 from "@/assets/imgs/shape/shape-11.webp";
import Link from "next/link";
import { getImageUrl } from "@/sanity/lib/image";
import type { HeroSocialLink, SanityImage } from "@/types/sanity";

interface HeroThreeProps {
  subtitle?: string;
  title?: string;
  location?: string;
  locationImage?: SanityImage;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  stats?: string;
  socialLinks?: HeroSocialLink[];
}

export default function HeroThree({
  subtitle = "Full-service digital agency — Since 2009®",
  title = "Strategy-driven digital agency, based in",
  location = "Fethiye",
  locationImage,
  description = "We build brands that perform. From social media management and Google & Meta ads to full-scale digital marketing strategy, we turn visibility into measurable growth.",
  buttonText = "Get started",
  buttonLink = "/contact",
  stats = "17 years of digital excellence",
  socialLinks = [],
}: HeroThreeProps) {
  return (
    <section className="hero-area-3">
      <div className="container large">
        <div className="hero-area-3-inner">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">{subtitle}</span>
              </div>
              <div className="title-wrapper">
                <h1
                  className="section-title font-sequelsans-romanbody fade-anim"
                  data-delay="0.45"
                >
                  {title}
                  <Image
                    className="title-shape-1"
                    src={shape_1}
                    alt=""
                    aria-hidden="true"
                    priority
                    style={{ filter: "grayscale(100%) brightness(0.7)", width: "auto", height: "auto" }}
                  />
                  {" "}
                  <span
                    className="text-underline hover-image-wrpper"
                    data-label="location"
                  >
                    {location}{" "}
                    <Image
                      className="image-hover"
                      src={getImageUrl(locationImage, 400, 300)}
                      alt={location}
                      width={400}
                      height={300}
                      data-image="location"
                      style={{ height: "auto" }}
                    />
                  </span>
                  <Image
                    className="title-shape-2"
                    src={shape_2}
                    alt=""
                    aria-hidden="true"
                    style={{ filter: "grayscale(100%) brightness(0.7)", width: "auto", height: "auto" }}
                  />
                </h1>
              </div>
            </div>
          </div>
          <div className="section-content">
            {Array.isArray(socialLinks) && socialLinks.length > 0 && (
              <ul className="social-links fade-anim" data-delay="0.60">
                {socialLinks.map((link) => (
                  <li key={link._key}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <div className="content-middle fade-anim" data-delay="0.75">
              <p
                className="text info-text"
                dangerouslySetInnerHTML={{
                  __html: (stats || "17 years of digital excellence").replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <div className="content-last fade-anim" data-delay="0.90">
              <div className="text-wrapper">
                <p className="text about-text rr_title_anim">{description}</p>
              </div>
              <div className="btn-wrapper">
                <Link href={buttonLink || "/contact"} className="rr-btn-group">
                  <span className="b">{buttonText}</span>
                  <span className="c">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
