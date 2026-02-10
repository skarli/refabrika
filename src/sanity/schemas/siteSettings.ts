import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "general", title: "Genel" },
    { name: "social", title: "Sosyal Medya" },
    { name: "contact", title: "İletişim" },
    { name: "footer", title: "Footer & CTA" },
  ],
  fields: [
    // General
    defineField({
      name: "siteName",
      title: "Site Adı",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Açıklaması",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "headerText",
      title: "Header Açıklama Metni",
      type: "text",
      rows: 3,
      group: "general",
      description: "Header'da logo yanındaki metin (örn: re:fabrika — digital marketing & brand growth agency [since 2009])",
    }),

    // Social Links
    defineField({
      name: "socialLinks",
      title: "Sosyal Medya Linkleri",
      type: "object",
      group: "social",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "twitter", title: "Twitter/X", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
        { name: "dribbble", title: "Dribbble", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
      ],
    }),

    // Contact Info
    defineField({
      name: "contactInfo",
      title: "İletişim Bilgileri",
      type: "object",
      group: "contact",
      fields: [
        { name: "email", title: "E-posta", type: "string" },
        { name: "phone", title: "Telefon", type: "string" },
        { name: "address", title: "Adres", type: "text", rows: 2 },
      ],
    }),

    // Footer & CTA
    defineField({
      name: "footerText",
      title: "Footer Copyright Metni",
      type: "string",
      group: "footer",
      description: "Örn: Crafted with intent, built to stand out.",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Başlık",
      type: "string",
      group: "footer",
      description: "Örn: Let's build a brand now",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
      group: "footer",
      description: "Örn: /contact",
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
