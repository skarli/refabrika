import { PortableText } from "@/sanity/lib/portable-text";
import type { LegalContent, LegalSection } from "@/lib/legal-content";

interface LegalAreaProps {
  subtitle: string;
  title: string;
  lastUpdated?: string;
  // Sanity PortableText body. When present it takes priority over `fallback`.
  body?: any[];
  // Built-in structured content shown when no Sanity body exists.
  fallback: LegalContent;
}

function FallbackSection({ section }: { section: LegalSection }) {
  return (
    <div className="legal-section">
      {section.heading && <h2>{section.heading}</h2>}
      {section.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {section.list && (
        <ul>
          {section.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LegalArea({
  subtitle,
  title,
  lastUpdated,
  body,
  fallback,
}: LegalAreaProps) {
  const hasBody = Array.isArray(body) && body.length > 0;

  return (
    <section className="legal-area">
      <div className="container large">
        <div className="legal-area-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">{subtitle}</span>
              </div>
              <div className="title-wrapper">
                <h1 className="section-title font-sequelsans-romanbody">
                  {title}
                </h1>
              </div>
            </div>
            {lastUpdated && (
              <p className="legal-updated">Last updated: {lastUpdated}</p>
            )}
          </div>

          <div className="legal-content fade-anim">
            {hasBody ? (
              <PortableText value={body} />
            ) : (
              <>
                <p className="legal-intro">{fallback.intro}</p>
                {fallback.sections.map((section, i) => (
                  <FallbackSection key={i} section={section} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
