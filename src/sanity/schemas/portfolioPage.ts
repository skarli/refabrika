import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolyo Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "text",
      rows: 2,
      description: "Portfolyo sayfası başlığı",
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Portfolyo Sayfası" };
    },
  },
});
