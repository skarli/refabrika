"use client";
import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqItems: FAQItem[] = [
  {
    id: "collapseOne",
    question: "What services does re:fabrika offer?",
    answer:
      "We provide social media management, Google & Meta advertising, digital marketing strategy, brand identity design, and web development. Our full-service approach means we handle everything from strategy to execution.",
    isOpen: false,
  },
  {
    id: "collapseTwo",
    question: "How do you measure the success of a campaign?",
    answer:
      "We track key performance indicators (KPIs) specific to each project — from engagement rates and reach on social media to conversion rates and ROAS on paid advertising. Monthly reports keep you informed on progress and ROI.",
    isOpen: true,
  },
  {
    id: "collapseThree",
    question: "What is your typical project timeline?",
    answer:
      "Timelines vary by scope. A social media strategy launch typically takes 2-3 weeks, brand identity projects 4-6 weeks, and full digital marketing campaigns 3-4 weeks from brief to go-live. We always align on deadlines before starting.",
    isOpen: false,
  },
  {
    id: "collapseFour",
    question: "Do you work with small businesses or only large brands?",
    answer:
      "We work with businesses of all sizes. Whether you are a startup looking to build your first digital presence or an established brand scaling your marketing efforts, we tailor our approach to your budget and goals.",
    isOpen: false,
  },
  {
    id: "collapseFive",
    question: "How does the onboarding process work?",
    answer:
      "It starts with a discovery call where we learn about your brand, goals, and target audience. From there we prepare a tailored proposal and strategy. Once approved, we kick off with a detailed roadmap and content calendar.",
    isOpen: false,
  },
  {
    id: "collapseSix",
    question: "Can you manage our existing ad accounts?",
    answer:
      "Absolutely. We can audit your current Google Ads, Meta Ads, or other platforms, identify optimization opportunities, and take over management to improve performance while maintaining your existing campaigns.",
    isOpen: false,
  },
  {
    id: "collapseSeven",
    question: "What makes re:fabrika different from other agencies?",
    answer:
      "With 17 years of experience, we combine strategic thinking with hands-on execution. We are a boutique agency that gives every client personal attention — no junior account managers, no cookie-cutter solutions. Your growth is our priority.",
    isOpen: false,
  },
];

export const AccordionWrapper = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(faqItems);

  const toggleFAQ = (id: string) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    );
  };
  return (
    <div className="accordion-wrapper fade-anim">
      <div className="accordion" id="accordionExample">
        {faqs.map((faq) => (
          <div key={faq.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${faq.isOpen ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={faq.isOpen}
                aria-controls={faq.id}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={faq.id}
              className={`accordion-collapse collapse ${faq.isOpen ? 'show' : ''}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const FAQArea = () => {

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
                <h2 className="section-title font-sequelsans-romanbody">
                  Learn some common answers about newly projects
                </h2>
              </div>
            </div>
          </div>

          {/* accordion wrapper */}
          <AccordionWrapper />
          {/* accordion wrapper */}

        </div>
      </div>
    </section>
  );
};

export default FAQArea;