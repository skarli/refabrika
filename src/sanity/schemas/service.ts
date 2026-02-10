import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Hizmetler",
  type: "document",
  groups: [
    { name: "basic", title: "Temel Bilgiler" },
    { name: "hero", title: "Hero Bölümü" },
    { name: "approach", title: "Yaklaşım" },
    { name: "features", title: "Özellikler" },
    { name: "value", title: "Değer/İstatistik" },
    { name: "faq", title: "SSS (FAQ)" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // BASIC INFO
    defineField({
      name: "title",
      title: "Hizmet Adı",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Numara",
      type: "string",
      group: "basic",
      description: "Örn: (001), (002)",
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      group: "basic",
      description: "Liste görünümünde kullanılacak",
    }),
    defineField({
      name: "thumbnail",
      title: "Liste Görseli",
      type: "image",
      group: "basic",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      group: "basic",
    }),

    // HERO SECTION
    defineField({
      name: "serialNumber",
      title: "Seri Numarası",
      type: "string",
      group: "hero",
      description: "Örn: [SL: 005]",
    }),
    defineField({
      name: "tagLabel",
      title: "Etiket",
      type: "string",
      group: "hero",
      description: "Örn: [Brand Guideline]",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Açıklama",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroFeatures",
      title: "Hero Özellik Listesi",
      type: "array",
      group: "hero",
      of: [{ type: "string" }],
      description: "Örn: Strategy, Brand Identity, Communication",
    }),

    // APPROACH SECTION
    defineField({
      name: "approachTitle",
      title: "Yaklaşım Bölüm Başlığı",
      type: "string",
      group: "approach",
      description: "Örn: Our comprehensive design process",
    }),
    defineField({
      name: "approachDescription",
      title: "Yaklaşım Açıklaması",
      type: "text",
      rows: 3,
      group: "approach",
    }),
    defineField({
      name: "approachSteps",
      title: "Yaklaşım Adımları",
      type: "array",
      group: "approach",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "description", title: "Açıklama", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // FEATURES SECTION
    defineField({
      name: "featureCards",
      title: "Özellik Kartları",
      type: "array",
      group: "features",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "description", title: "Açıklama", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // VALUE SECTION
    defineField({
      name: "valueSectionTitle",
      title: "Değer Bölüm Başlığı",
      type: "text",
      rows: 2,
      group: "value",
    }),
    defineField({
      name: "valueStats",
      title: "Değer İstatistikleri",
      type: "array",
      group: "value",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Değer", type: "string", description: "Örn: 2750, 92%, 75%" },
            { name: "description", title: "Açıklama", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "value", subtitle: "description" },
          },
        },
      ],
    }),

    // FAQ SECTION
    defineField({
      name: "faqs",
      title: "Sık Sorulan Sorular",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Soru", type: "string" },
            { name: "answer", title: "Cevap", type: "text", rows: 4 },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      number: "number",
      media: "thumbnail",
    },
    prepare({ title, number, media }) {
      return {
        title: `${number || ""} ${title}`,
        media,
      };
    },
  },
});
