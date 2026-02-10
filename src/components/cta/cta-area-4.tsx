import Image from "next/image";
import Link from "next/link";

interface CtaAreaFourProps {
  text?: string;
  link?: string;
}

export default function CtaAreaFour({
  text = "Let's build a brand now",
  link = "/contact",
}: CtaAreaFourProps) {
  // Split text to handle "Let's" and rest separately for styling
  const safeText = text || "Let's build a brand now";
  const safeLink = link || "/contact";
  const parts = safeText.split(" ");
  const firstWord = parts[0];
  const restWords = parts.slice(1).join(" ");

  return (
    <section className="cta-area-4">
      <div className="container large">
        <div className="cta-area-4-inner section-spacing-top">
          <div className="section-header fade-anim" data-direction="left">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-bdogrotesk-regular">
                  <Link href={safeLink}>
                    {firstWord}
                    <span className="icon">
                      <Image
                        className="first"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt="icon"
                        width={101}
                        height={101}
                        style={{ height: "auto" }}
                      />
                      <Image
                        className="second"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt="icon"
                        width={101}
                        height={101}
                        style={{ height: "auto" }}
                      />
                    </span>{" "}
                    <br />
                    {restWords}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
