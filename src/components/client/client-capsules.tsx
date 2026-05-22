import { techLogos } from "./tech-logos";

const DARK_CAPSULE_COLOR = "ffffff";
const LIGHT_CAPSULE_COLOR = "0f172a";

export default function ClientCapsules() {
  return (
    <div className="client-capsule-wrapper-box" data-t-throwable-scene="true">
      <div className="client-capsule-wrapper">
        {techLogos.map((tech, idx) => {
          const color = tech.bgTheme ? DARK_CAPSULE_COLOR : LIGHT_CAPSULE_COLOR;
          return (
            <p key={tech.slug ?? `${tech.name}-${idx}`} data-t-throwable-el="">
              <span className={`client-box ${tech.bgTheme ? "bg-theme" : ""}`}>
                {tech.inlineSvg ? (
                  <span
                    className="tech-logo-svg"
                    title={tech.name}
                    dangerouslySetInnerHTML={{ __html: tech.inlineSvg }}
                  />
                ) : (
                  <span className="tech-logo-svg" title={tech.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}/${color}`}
                      alt={tech.name}
                      loading="lazy"
                      decoding="async"
                      width={48}
                      height={48}
                    />
                  </span>
                )}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
