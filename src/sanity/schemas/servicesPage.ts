import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Hizmetler Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "string",
      description: "Örn: Services we provide",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık",
      type: "string",
      description: "Örn: Services",
    }),
    defineField({
      name: "pageDescription",
      title: "Açıklama",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hizmetler Sayfası" };
    },
  },
});
