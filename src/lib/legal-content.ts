// Built-in, Stripe-ready English legal content for re:fabrika.
// Rendered when the matching Sanity `legalPage` document has no body yet,
// so the pages are never blank. Edit in Sanity Studio to override.

import type { LegalPageType } from "@/types/sanity";

export const LEGAL_COMPANY = {
  brand: "re:fabrika",
  legalName: "Refabrika Technologies LLC",
  email: "sadettin@refabrika.com",
  phone: "+1 727 301 79 80",
  addressLines: [
    "7901 4th St N # 26088",
    "St. Petersburg, Florida 33702",
    "United States",
  ],
  website: "https://refabrika.com",
  // Plain-text effective date shown as a fallback "Last updated".
  effectiveDate: "5 June 2026",
};

export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalContent {
  subtitle: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

const addr = LEGAL_COMPANY.addressLines.join(", ");
const company = `${LEGAL_COMPANY.legalName} ("${LEGAL_COMPANY.brand}", "we", "us" or "our")`;

const PRIVACY: LegalContent = {
  subtitle: "Legal",
  title: "Privacy Policy",
  intro: `This Privacy Policy explains how ${company} collects, uses, and protects information when you visit refabrika.com or engage our digital services. We respect your privacy and are committed to handling your personal data responsibly.`,
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        `${LEGAL_COMPANY.legalName} is a digital agency providing web and software development, design, and digital marketing services. Our registered address is ${addr}. For any privacy-related questions you can reach us at ${LEGAL_COMPANY.email}.`,
      ],
    },
    {
      heading: "2. Information we collect",
      paragraphs: [
        "We only collect information that is necessary to respond to your enquiries and deliver our services. This may include:",
      ],
      list: [
        "Contact details you provide through our contact form, such as your name, email address, phone number, and company name.",
        "Project details and any message content you choose to share with us.",
        "Payment-related information processed through our payment provider (we do not store full card numbers ourselves).",
        "Technical data such as IP address, browser type, and usage data collected automatically through cookies and similar technologies.",
      ],
    },
    {
      heading: "3. How we use your information",
      paragraphs: ["We use the information we collect to:"],
      list: [
        "Respond to your enquiries and provide quotes or proposals.",
        "Deliver, manage, and invoice the services you engage us for.",
        "Process payments securely through our payment provider.",
        "Improve our website, services, and customer experience.",
        "Comply with legal, accounting, and regulatory obligations.",
      ],
    },
    {
      heading: "4. Payments",
      paragraphs: [
        "Payments are processed by third-party payment processors (such as Stripe). When you make a payment, your card and billing details are submitted directly to the payment processor and handled in accordance with their privacy policy and PCI-DSS standards. We do not store your full payment card details on our servers.",
      ],
    },
    {
      heading: "5. Cookies",
      paragraphs: [
        "Our website may use cookies and similar technologies to keep the site working, understand how it is used, and improve performance. You can control or disable cookies through your browser settings, though some features may not function correctly without them.",
      ],
    },
    {
      heading: "6. Sharing your information",
      paragraphs: [
        "We do not sell your personal data. We may share information with trusted service providers who help us operate our business (for example, hosting, analytics, and payment processing) and only to the extent necessary to perform their services. We may also disclose information where required by law.",
      ],
    },
    {
      heading: "7. Data retention",
      paragraphs: [
        "We keep personal data only for as long as necessary to fulfil the purposes described in this policy, including any legal, accounting, or reporting requirements. When data is no longer needed, we securely delete or anonymise it.",
      ],
    },
    {
      heading: "8. Your rights",
      paragraphs: [
        "Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data, and to object to certain processing. To exercise any of these rights, contact us at " +
          LEGAL_COMPANY.email + ".",
      ],
    },
    {
      heading: "9. Security",
      paragraphs: [
        "We apply reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "10. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
      ],
    },
    {
      heading: "11. Contact us",
      paragraphs: [
        `If you have any questions about this Privacy Policy or how we handle your data, please contact us:`,
      ],
      list: [
        `${LEGAL_COMPANY.legalName}`,
        addr,
        `Email: ${LEGAL_COMPANY.email}`,
        `Phone: ${LEGAL_COMPANY.phone}`,
      ],
    },
  ],
};

const TERMS: LegalContent = {
  subtitle: "Legal",
  title: "Terms of Service",
  intro: `These Terms of Service ("Terms") govern your use of the refabrika.com website and the digital services provided by ${company}. By accessing our website or engaging our services, you agree to these Terms.`,
  sections: [
    {
      heading: "1. Our services",
      paragraphs: [
        "re:fabrika provides digital agency services including web and software development, design, and digital marketing. The specific scope, deliverables, timeline, and fees for any engagement are defined in a separate proposal, statement of work, or written agreement (\"Service Agreement\") between you and us.",
      ],
    },
    {
      heading: "2. Quotes and proposals",
      paragraphs: [
        "Quotes and proposals are valid for the period stated within them. A project is confirmed once you accept the proposal in writing and, where applicable, pay the agreed deposit.",
      ],
    },
    {
      heading: "3. Fees and payment",
      paragraphs: ["Unless otherwise agreed in writing:"],
      list: [
        "Project fees and payment milestones are set out in the applicable Service Agreement.",
        "A deposit may be required before work begins.",
        "Invoices are due within the period stated on the invoice.",
        "Payments are processed securely through our payment provider.",
        "Fees are exclusive of any applicable taxes unless stated otherwise.",
      ],
    },
    {
      heading: "4. Client responsibilities",
      paragraphs: ["To deliver our services effectively, you agree to:"],
      list: [
        "Provide accurate information and the materials we need in a timely manner.",
        "Review deliverables and provide feedback within the agreed timeframes.",
        "Ensure you own or have the right to use any content you supply to us.",
      ],
    },
    {
      heading: "5. Intellectual property",
      paragraphs: [
        "Ownership of final deliverables transfers to you upon full payment of all related fees, unless otherwise agreed in writing. We retain the right to display non-confidential work in our portfolio and marketing materials unless you ask us in writing not to. Any third-party assets (such as fonts, stock media, or licensed software) remain subject to their own licences.",
      ],
    },
    {
      heading: "6. Revisions and scope",
      paragraphs: [
        "The number of revision rounds included is defined in the Service Agreement. Work that falls outside the agreed scope may be quoted and billed separately as additional work.",
      ],
    },
    {
      heading: "7. Cancellation and refunds",
      paragraphs: [
        "Cancellation and refund terms are described in our Refund & Cancellation Policy, which forms part of these Terms.",
      ],
    },
    {
      heading: "8. Warranties and liability",
      paragraphs: [
        "We provide our services with reasonable skill and care. To the maximum extent permitted by law, our total liability arising out of or in connection with any engagement is limited to the fees paid by you for the services giving rise to the claim. We are not liable for indirect or consequential losses.",
      ],
    },
    {
      heading: "9. Confidentiality",
      paragraphs: [
        "Each party agrees to keep confidential any non-public information disclosed by the other party and to use it only for the purpose of the engagement.",
      ],
    },
    {
      heading: "10. Termination",
      paragraphs: [
        "Either party may terminate an engagement in accordance with the terms of the Service Agreement and our Refund & Cancellation Policy. Fees for work performed up to the date of termination remain payable.",
      ],
    },
    {
      heading: "11. Governing law",
      paragraphs: [
        "These Terms are governed by the laws applicable at our place of business. Any disputes will be subject to the jurisdiction of the competent courts in that location.",
      ],
    },
    {
      heading: "12. Contact us",
      paragraphs: ["Questions about these Terms can be sent to:"],
      list: [
        `${LEGAL_COMPANY.legalName}`,
        addr,
        `Email: ${LEGAL_COMPANY.email}`,
        `Phone: ${LEGAL_COMPANY.phone}`,
      ],
    },
  ],
};

const REFUND: LegalContent = {
  subtitle: "Legal",
  title: "Refund & Cancellation Policy",
  intro: `This Refund & Cancellation Policy explains how cancellations and refunds work for the digital services provided by ${company}. Because we provide custom, time-based professional services rather than physical products, the terms below reflect the work involved in each engagement.`,
  sections: [
    {
      heading: "1. Nature of our services",
      paragraphs: [
        "re:fabrika provides custom digital services such as web and software development, design, and digital marketing. We do not sell physical goods, so no shipping is involved. Work typically begins after a proposal is accepted and any agreed deposit is paid.",
      ],
    },
    {
      heading: "2. Deposits",
      paragraphs: [
        "A deposit may be required to reserve our time and begin work on a project. Deposits cover the initial planning, scheduling, and onboarding effort and are generally non-refundable once work has started, except as described below.",
      ],
    },
    {
      heading: "3. Cancellation by the client",
      paragraphs: ["If you decide to cancel an ongoing project:"],
      list: [
        "Please notify us in writing at " + LEGAL_COMPANY.email + ".",
        "You will be charged for all work completed up to the date we receive your cancellation notice, including any work in progress.",
        "Any amount you have paid that exceeds the value of completed work will be refunded to you.",
        "Any amount owed for completed work that exceeds payments made will be invoiced and remains due.",
      ],
    },
    {
      heading: "4. Cancellation by us",
      paragraphs: [
        "In the rare event that we are unable to complete a project, we will notify you, deliver all work completed to date, and refund any prepaid fees for work that has not yet been performed.",
      ],
    },
    {
      heading: "5. Refund eligibility",
      paragraphs: ["You may be eligible for a refund if:"],
      list: [
        "We have not yet started work on your project, in which case prepaid amounts (less any non-refundable deposit) are refundable.",
        "Services delivered materially fail to meet the agreed specification and we are unable to remedy the issue within a reasonable time.",
        "A duplicate or incorrect payment was made.",
      ],
    },
    {
      heading: "6. Non-refundable items",
      paragraphs: ["The following are generally non-refundable:"],
      list: [
        "Work that has already been completed and delivered.",
        "Time spent on planning, consultation, and project management.",
        "Third-party costs already incurred on your behalf (such as licences, domains, hosting, fonts, or stock media).",
      ],
    },
    {
      heading: "7. How to request a refund",
      paragraphs: [
        `To request a refund, email us at ${LEGAL_COMPANY.email} with your name, project details, and the reason for your request. We will review your request and respond within a reasonable timeframe.`,
      ],
    },
    {
      heading: "8. Processing of refunds",
      paragraphs: [
        "Approved refunds are issued to the original payment method through our payment provider. Depending on your bank or card issuer, it may take several business days for the refund to appear on your statement.",
      ],
    },
    {
      heading: "9. Contact us",
      paragraphs: ["For any questions about cancellations or refunds, contact:"],
      list: [
        `${LEGAL_COMPANY.legalName}`,
        addr,
        `Email: ${LEGAL_COMPANY.email}`,
        `Phone: ${LEGAL_COMPANY.phone}`,
      ],
    },
  ],
};

export const LEGAL_CONTENT: Record<LegalPageType, LegalContent> = {
  privacy: PRIVACY,
  terms: TERMS,
  refund: REFUND,
};
