import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Başlık",
      type: "string",
      description: "Sayfa başlığı (60 karakterden kısa olmalı)",
      validation: (Rule) => Rule.max(60).warning("60 karakterden kısa olmalı"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Açıklama",
      type: "text",
      rows: 3,
      description: "Sayfa açıklaması (160 karakterden kısa olmalı)",
      validation: (Rule) => Rule.max(160).warning("160 karakterden kısa olmalı"),
    }),
    defineField({
      name: "ogImage",
      title: "Sosyal Medya Görseli",
      type: "image",
      description: "1200x630 piksel önerilen boyut",
    }),
    defineField({
      name: "noIndex",
      title: "Arama motorlarından gizle",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
