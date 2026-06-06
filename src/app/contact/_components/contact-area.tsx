"use client";
import { FormEvent, useState } from "react";
import type { ContactPage, SiteSettings } from "@/types/sanity";

interface ContactAreaProps {
  contactPage?: ContactPage;
  siteSettings?: SiteSettings;
}

export default function ContactArea({ contactPage, siteSettings }: ContactAreaProps) {
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const pageTitle = contactPage?.pageTitle || "Let's drop us a line and get the project started.";
  const sectionTitle = contactPage?.sectionTitle || "Get in touch";
  const sectionDescription =
    contactPage?.sectionDescription ||
    "We're excited to hear from you and let's start something special together";
  const followTitle = contactPage?.followTitle || "Follow";
  const formLabels = contactPage?.formLabels || {};
  const budgetOptions = contactPage?.budgetOptions || [
    "5,000 - 10,000",
    "10,000 - 15,000",
    "15,000 - 20,000",
    "20,000 - 25,000",
    "25,000 - Above",
  ];

  const contactEmail = siteSettings?.contactInfo?.email || "sadettin@refabrika.com";
  const socialLinks = siteSettings?.socialLinks || {};
  const hasSocial = Boolean(
    socialLinks.instagram ||
      socialLinks.linkedin ||
      socialLinks.behance ||
      socialLinks.dribbble
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      budget: budget,
      solution: formData.get("solution"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
        setBudget("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-area-contact-page">
      <div className="container large">
        <div className="contact-area-contact-page-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">Contact</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">{pageTitle}</h2>
              </div>
            </div>
          </div>
          <div className="section-content-wrapper fade-anim">
            <div className="section-content">
              <div className="contact-mail">
                <p className="title">{sectionTitle}</p>
                <p className="text">
                  {sectionDescription} <br />
                  <a href={`mailTo:${contactEmail}`}>{contactEmail}</a>
                </p>
              </div>
              <div className="contact-offices">
                <div className="contact-office">
                  <p className="contact-office__tag">Headquarters</p>
                  <p className="contact-office__addr">
                    7901 4th St N # 26088
                    <br />
                    St. Petersburg, Florida 33702
                    <br />
                    United States
                  </p>
                  <a className="contact-office__phone" href="tel:+17273017980">
                    +1 727 301 79 80
                  </a>
                </div>

                <div className="contact-office">
                  <p className="contact-office__tag">Liaison Office</p>
                  <p className="contact-office__addr">
                    Akarca, Mustafa Kemal Blv. No:158/A
                    <br />
                    48300 Fethiye, Muğla
                    <br />
                    Türkiye
                  </p>
                  <a className="contact-office__phone" href="tel:+905323745568">
                    +90 532 374 55 68
                  </a>
                </div>

                {hasSocial && (
                  <div className="contact-social">
                    <p className="contact-office__tag">{followTitle}</p>
                    <div className="social-links">
                      {socialLinks.instagram && (
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          Instagram
                        </a>
                      )}
                      {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      )}
                      {socialLinks.behance && (
                        <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer">
                          Behance
                        </a>
                      )}
                      {socialLinks.dribbble && (
                        <a href={socialLinks.dribbble} target="_blank" rel="noopener noreferrer">
                          Dribbble
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="contact-wrap">
              <form onSubmit={handleSubmit} id="contact__form">
                <div className="contact-formwrap">
                  <div className="contact-formfield">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={formLabels.namePlaceholder || "Name*"}
                      required
                    />
                  </div>
                  <div className="contact-formfield">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={formLabels.emailPlaceholder || "Email*"}
                      required
                    />
                  </div>
                  <div className="contact-formfield">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder={formLabels.phonePlaceholder || "Phone*"}
                      required
                    />
                  </div>
                  <div className="contact-formfield">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder={formLabels.companyPlaceholder || "Company"}
                    />
                  </div>
                  <div className="contact-formfield">
                    <select
                      name="Budget"
                      id="Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        {formLabels.budgetPlaceholder || "Budget*"}
                      </option>
                      {budgetOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="contact-formfield">
                    <input
                      type="text"
                      name="solution"
                      id="solution"
                      placeholder={formLabels.solutionPlaceholder || "Solution*"}
                      required
                    />
                  </div>
                  <div className="contact-formfield message">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      placeholder={formLabels.messagePlaceholder || "Message*"}
                      required
                    />
                  </div>
                </div>
                <div className="submit-btn">
                  <button type="submit" className="rr-btn" disabled={isSubmitting}>
                    <span className="btn-wrap">
                      <span className="text-one">
                        {isSubmitting ? "Sending..." : formLabels.buttonText || "Send Message"}
                      </span>
                      <span className="text-two">
                        {isSubmitting ? "Sending..." : formLabels.buttonText || "Send Message"}
                      </span>
                    </span>
                  </button>
                </div>
                <div id="response-message">
                  {submitStatus === "success" && (
                    <p style={{ color: "green", marginTop: "1rem" }}>
                      Thank you! Your message has been sent successfully.
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p style={{ color: "red", marginTop: "1rem" }}>
                      Sorry, there was an error. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
