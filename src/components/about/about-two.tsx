import Link from "next/link";

interface AboutTwoProps {
  title?: string;
  yearStart?: string;
  yearEnd?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function AboutTwo({
  title = "Creating virtual emotion in the universe, for the largest brands & market since",
  yearStart = "2009",
  yearEnd = "2026",
  description = "We help brands and people be part of the solution. As a cause-led branding and communications agency, we harness the power of technology and creativity to drive positive changes. Whether your inquiries are big or small, we're prepared to engage, focusing on complex problems",
  buttonText = "Learn More",
  buttonLink = "/contact",
}: AboutTwoProps) {
  return (
    <section className="about-area-2">
      <div className="container large">
        <div className="about-area-2-inner section-spacing-top">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody rr_title_anim">
                  {title}
                </h2>
              </div>
            </div>
          </div>
          <div className="section-content section-spacing-top">
            <div className="year-wrapper">
              <h2 className="year-since">
                <span className="is-fading">
                  <span className="first-text">{yearStart}</span> - {yearEnd}
                </span>
                <span className="last-text">Work</span>
              </h2>
            </div>
            <div className="text-wrapper">
              <p className="text">{description}</p>
            </div>
            <div className="btn-wrapper">
              <Link href={buttonLink || "/contact"} className="rr-btn">
                <span className="btn-wrap">
                  <span className="text-one">{buttonText}</span>
                  <span className="text-two">{buttonText}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
