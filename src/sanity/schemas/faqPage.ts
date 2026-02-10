import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqPage",
  title: "SSS Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "text",
      rows: 2,
      description: "Örn: Learn some common answers about newly projects",
    }),
    defineField({
      name: "faqs",
      title: "Sorular ve Cevaplar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Soru",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Cevap",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "SSS Sayfası" };
    },
  },
});
