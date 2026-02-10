import React from "react";
import ClientCapsules from "./client-capsules";

const ClientArea = () => {
  return (
    <section className="client-area">
      <div className="container large">
        <div className="client-area-inner section-spacing-top">
          <div className="section-content">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-instrumentsans-medium word-anim">
                  <span>Technologies:</span> Powered by Modern Tech Stack
                </h2>
              </div>
            </div>
            <div className="text-wrapper fade-anim">
              <p className="text">
                We leverage cutting-edge technologies and industry-leading tools to build
                scalable, high-performance digital solutions that drive real results.
              </p>
            </div>
          </div>

          <ClientCapsules />

          <div className="lines-wrapper">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="line"></div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
