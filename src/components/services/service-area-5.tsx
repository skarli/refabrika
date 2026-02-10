import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/sanity/lib/image";
import type { ServiceItem } from "@/types/sanity";

interface ServiceAreaFiveProps {
  subtitle?: string;
  sectionTitle?: string;
  description?: string;
  services?: ServiceItem[];
  spacing?: string;
  titleFont?: string;
}

const ServiceAreaFive = ({
  subtitle = "Services",
  sectionTitle = "Services we provide",
  description = "We are here to build solid and courageous brands that can leave a strong mark on the world.",
  services = [],
  spacing = "section-spacing-top",
  titleFont = "font-bdogrotesk-regular",
}: ServiceAreaFiveProps) => {
  return (
    <section className="service-area-5">
      <div className="container large">
        <div className={`service-area-5-inner ${spacing}`}>
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">
                  {subtitle}
                  <svg
                    viewBox="0 0 99 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.41291 5.98894C1.41291 5.98894 3.65997 6.01383 4.51655 5.98894C7.19358 5.56824 10.4255 5.80978 13.363 5.56824C17.8256 5.20128 22.1327 4.79415 26.6187 4.79415C31.6715 4.79415 36.6774 4.21934 41.7162 4.18834C46.981 4.15594 52.2465 4.18834 57.5114 4.18834C68.6462 4.18834 79.781 4.18834 90.9158 4.18834C121.155 6.61149 47.6583 -1.30401 1 1.68408"
                      stroke="#111111"
                      strokeLinecap="round"
                      className="svg-elem-1"
                    />
                  </svg>
                </span>
              </div>
              <div className="title-wrapper tt_title_anim">
                <h2 className={`section-title ${titleFont}`}>{sectionTitle}</h2>
              </div>
            </div>
          </div>

          <div className="services-wrapper-box">
            <div className="text-wrapper fade-anim">
              <p className="info-text">{description}</p>
            </div>

            <div className="services-wrapper-5">
              {(services || []).map((service, idx) => (
                <Link href={`/services/${service.slug?.current}`} key={service._id || idx}>
                  <div className="service-box fade-anim">
                    <div className="count">
                      <span className="number">{service.number || `(00${idx + 1})`}</span>
                    </div>
                    <div className="content">
                      <h3 className="title">{service.title}</h3>
                      <p className="text">{service.shortDescription}</p>
                    </div>
                    <div className="thumb">
                      <Image
                        src={getImageUrl(service.thumbnail, 165, 92)}
                        alt={service.title || "Service"}
                        width={165}
                        height={92}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaFive;
