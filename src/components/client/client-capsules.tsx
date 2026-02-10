import { techLogos } from "./tech-logos";

export default function ClientCapsules() {
  return (
    <div className="client-capsule-wrapper-box" data-t-throwable-scene="true">
      <div className="client-capsule-wrapper">
        {techLogos.map((tech, index) => (
          <p key={index} data-t-throwable-el="">
            <span className={`client-box ${tech.bgTheme ? "bg-theme" : ""}`}>
              <span
                className="tech-logo-svg"
                dangerouslySetInnerHTML={{ __html: tech.svg }}
                title={tech.name}
              />
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
