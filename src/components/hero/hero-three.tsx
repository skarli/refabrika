import Image from "next/image";
import shape_1 from "@/assets/imgs/shape/shape-10.webp";
import shape_2 from "@/assets/imgs/shape/shape-11.webp";
import gallery_img from "@/assets/imgs/gallery/image-10.webp";
import Link from "next/link";

export default function HeroThree() {
  return (
    <section className="hero-area-3">
      <div className="container large">
        <div className="hero-area-3-inner">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">
                  Full-service digital agency — Since 2009®
                </span>
              </div>
              <div className="title-wrapper">
                <h1
                  className="section-title font-sequelsans-romanbody fade-anim"
                  data-delay="0.45"
                >
                  Strategy-driven digital
                  <Image
                    className="title-shape-1"
                    src={shape_1}
                    alt="image"
                  />
                  agency, based in {" "}
                  <span
                    className="text-underline hover-image-wrpper"
                    data-label="activewear"
                  >
                    Fethiye{" "}
                    <Image
                      className="image-hover"
                      src={gallery_img}
                      alt="activewear"
                      data-image="activewear"
                      style={{ height: "auto" }}
                    />{" "}
                  </span>
                  <Image
                    className="title-shape-2"
                    src={shape_2}
                    alt="image"
                  />
                </h1>
              </div>
            </div>
          </div>
          <div className="section-content">
            <ul className="social-links fade-anim" data-delay="0.60">
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Linkedin</a>
              </li>
              <li>
                <a href="#">Behance</a>
              </li>
              <li>
                <a href="#">X (Twitter)</a>
              </li>
            </ul>
            <div className="content-middle fade-anim" data-delay="0.75">
              <p className="text info-text">
                17 years of <br /> digital excellence
              </p>
            </div>
            <div className="content-last fade-anim" data-delay="0.90">
              <div className="text-wrapper">
                <p className="text about-text rr_title_anim">
                  We build brands that perform. From social media management
                  and Google & Meta ads to full-scale digital marketing strategy,
                  we turn visibility into measurable growth.
                </p>
              </div>
              <div className="btn-wrapper">
                <Link href="/contact" className="rr-btn-group">
                  <span className="b">Get started</span>
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
