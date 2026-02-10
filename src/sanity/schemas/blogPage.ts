import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPage",
  title: "Blog Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "text",
      rows: 2,
      description: "Örn: Learn our recent journal",
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Blog Sayfası" };
    },
  },
});
