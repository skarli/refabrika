import Image from "next/image";
import Link from "next/link";
import gallery_img from "@/assets/imgs/gallery/image-24.webp";
import { urlFor } from "@/sanity/lib/image";
import type { ServiceData } from "@/types/sanity";

interface ServiceDetailsHeroProps {
  service?: ServiceData;
}

export default function ServiceDetailsHero({ service }: ServiceDetailsHeroProps) {
  // Fallback values
  const serialNumber = service?.serialNumber || service?.number || "[SL: 001]";
  const tagLabel = service?.tagLabel || "[Service]";
  const title = service?.title || "Brand Guideline";
  const description = service?.heroDescription ||
    "You'll need to provide your brand information, and starting history to visualize identity. We speak fluent branding, as we apply a solid base understanding to everything we do in thought and action.";
  const features = service?.heroFeatures || [
    "Strategy",
    "Brand Identity",
    "Communication",
    "Research",
    "Consultation",
  ];
  const thumbnail = service?.thumbnail;

  return (
    <section className="hero-area-service-details">
      <div className="container large">
        <div className="hero-area-service-details-inner section-spacing-top">
          <div className="service-meta fade-anim">
            <span className="serial">{serialNumber}</span>
            <span className="tag">{tagLabel}</span>
            <span className="next-item">
              <Link href="/services">[Back]</Link>
            </span>
          </div>
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">
                  {title.split(" ").map((word, idx, arr) => (
                    <span key={idx}>
                      {word}
                      {idx < arr.length - 1 && (idx === 0 ? <br /> : " ")}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
          </div>
          <div className="section-content-wrapper fade-anim">
            <div className="section-content">
              <div className="text-wrapper">
                <p className="text">{description}</p>
              </div>
              <div className="feature-list">
                <ul>
                  {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="section-thumb parallax-view">
              <Image
                src={thumbnail ? urlFor(thumbnail).width(800).height(600).url() : gallery_img}
                alt={title}
                width={800}
                height={600}
                data-speed="0.8"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
