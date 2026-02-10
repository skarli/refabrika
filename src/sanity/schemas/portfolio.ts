import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolyo",
  type: "document",
  groups: [
    { name: "basic", title: "Temel Bilgiler" },
    { name: "detail", title: "Detay Sayfası" },
    { name: "gallery", title: "Galeri" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // BASIC INFO
    defineField({
      name: "title",
      title: "Proje Adı",
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
      name: "thumbnail",
      title: "Kapak Görseli",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "year",
      title: "Yıl",
      type: "string",
      group: "basic",
      description: "Örn: 2025",
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      type: "array",
      group: "basic",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Örn: Branding, Marketing, Design",
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      group: "basic",
      description: "Düşük sayı önce görünür",
    }),
    defineField({
      name: "featured",
      title: "Öne Çıkan",
      type: "boolean",
      group: "basic",
      initialValue: false,
    }),

    // DETAIL PAGE
    defineField({
      name: "client",
      title: "Müşteri",
      type: "string",
      group: "detail",
      description: "Örn: Confidential",
    }),
    defineField({
      name: "service",
      title: "Hizmet",
      type: "string",
      group: "detail",
      description: "Örn: Digital Marketing, Social Media",
    }),
    defineField({
      name: "date",
      title: "Proje Tarihi",
      type: "string",
      group: "detail",
      description: "Örn: January 2025",
    }),
    defineField({
      name: "technology",
      title: "Teknoloji",
      type: "string",
      group: "detail",
      description: "Örn: Meta Ads, Google Ads, Social Media",
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      group: "detail",
    }),
    defineField({
      name: "fullDescription",
      title: "Detaylı Açıklama",
      type: "array",
      group: "detail",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Özellikler",
      type: "array",
      group: "detail",
      of: [{ type: "string" }],
      description: "Örn: Brand Development, UX/UI Design, Front-end Development",
    }),

    // GALLERY
    defineField({
      name: "gallery",
      title: "Galeri Görselleri",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
          ],
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
    {
      title: "Yıl (Yeni)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "thumbnail",
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year || "",
        media,
      };
    },
  },
});
