import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/sanity/lib/image";
import type { PortfolioItem } from "@/types/sanity";

interface WorkAreaThreeProps {
  sectionTitle?: string;
  buttonText?: string;
  works?: PortfolioItem[];
}

export default function WorkAreaThree({
  sectionTitle = "We find the unique, easy solution for each creative project",
  buttonText = "View all work",
  works = [],
}: WorkAreaThreeProps) {
  return (
    <section className="work-area-3">
      <div className="container large">
        <div className="work-area-3-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody rr_title_anim">
                  {sectionTitle}{" "}
                  <span className="mb-14">
                    <Link href="/portfolio" className="rr-btn-group">
                      <span className="b">{buttonText}</span>
                      <span className="c">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="works-wrapper-box">
            <div className="works-wrapper-3">
              {(works || []).map((item, idx) => (
                <div className="work-box fade-anim" key={item._id || idx}>
                  <div className="thumb">
                    <div className="image scale" data-cursor-text="View Project">
                      <Link href={`/portfolio/${item.slug?.current}`}>
                        <Image
                          src={getImageUrl(item.thumbnail, 900, 630)}
                          alt={item.title || "Portfolio"}
                          width={900}
                          height={630}
                          style={{ height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="title">
                      <Link href={`/portfolio/${item.slug?.current}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <div className="meta">
                      <span className="date">{item.year}</span>
                      {item.tags && item.tags[0] && (
                        <span className="tag">{item.tags[0]}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
