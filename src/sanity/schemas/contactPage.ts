import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  groups: [
    { name: "content", title: "İçerik" },
    { name: "form", title: "Form Ayarları" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // CONTENT
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "text",
      rows: 2,
      group: "content",
      description: "Örn: Let's drop us a line and get the project started.",
    }),
    defineField({
      name: "sectionTitle",
      title: "Bölüm Başlığı",
      type: "string",
      group: "content",
      description: "Örn: Get in touch",
    }),
    defineField({
      name: "sectionDescription",
      title: "Bölüm Açıklaması",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "followTitle",
      title: "Sosyal Medya Başlığı",
      type: "string",
      group: "content",
      description: "Örn: Follow",
    }),

    // FORM LABELS
    defineField({
      name: "formLabels",
      title: "Form Etiketleri",
      type: "object",
      group: "form",
      fields: [
        { name: "namePlaceholder", title: "İsim Placeholder", type: "string" },
        { name: "emailPlaceholder", title: "E-posta Placeholder", type: "string" },
        { name: "phonePlaceholder", title: "Telefon Placeholder", type: "string" },
        { name: "companyPlaceholder", title: "Şirket Placeholder", type: "string" },
        { name: "budgetPlaceholder", title: "Bütçe Placeholder", type: "string" },
        { name: "solutionPlaceholder", title: "Çözüm Placeholder", type: "string" },
        { name: "messagePlaceholder", title: "Mesaj Placeholder", type: "string" },
        { name: "buttonText", title: "Gönder Butonu Metni", type: "string" },
      ],
    }),
    defineField({
      name: "budgetOptions",
      title: "Bütçe Seçenekleri",
      type: "array",
      group: "form",
      of: [{ type: "string" }],
      description: "Örn: 5,000 - 10,000",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "İletişim Sayfası" };
    },
  },
});
