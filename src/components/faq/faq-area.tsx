"use client";
import React, { useState, useEffect } from "react";

interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQAreaProps {
  pageTitle?: string;
  faqs?: FAQItem[];
}

interface FAQState extends FAQItem {
  isOpen: boolean;
}

export const AccordionWrapper = ({ faqs }: { faqs: FAQState[] }) => {
  const [faqState, setFaqState] = useState<FAQState[]>(faqs);

  useEffect(() => {
    setFaqState(faqs);
  }, [faqs]);

  const toggleFAQ = (key: string) => {
    setFaqState((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq._key === key ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    );
  };

  return (
    <div className="accordion-wrapper fade-anim">
      <div className="accordion" id="accordionExample">
        {faqState.map((faq) => (
          <div key={faq._key} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${faq.isOpen ? "" : "collapsed"}`}
                type="button"
                onClick={() => toggleFAQ(faq._key)}
                aria-expanded={faq.isOpen}
                aria-controls={faq._key}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={faq._key}
              className={`accordion-collapse collapse ${faq.isOpen ? "show" : ""}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQArea = ({
  pageTitle = "Learn some common answers about newly projects",
  faqs = [],
}: FAQAreaProps) => {
  // Convert FAQItem to FAQState with isOpen property
  const safeFaqs = faqs || [];
  const faqsWithState: FAQState[] = safeFaqs.map((faq, idx) => ({
    ...faq,
    isOpen: idx === 1, // Second item open by default
  }));

  return (
    <section className="faq-area">
      <div className="container large">
        <div className="faq-area-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">FAQ</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">{pageTitle}</h2>
              </div>
            </div>
          </div>

          {/* accordion wrapper */}
          <AccordionWrapper faqs={faqsWithState} />
          {/* accordion wrapper */}
        </div>
      </div>
    </section>
  );
};

export default FAQArea;
