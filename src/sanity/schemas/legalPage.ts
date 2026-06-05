import { defineType, defineField } from "sanity";

// Singleton-per-type legal document (privacy, terms, refund).
// One document exists for each `pageType`. The website renders a built-in
// English fallback when a field is empty, so pages are never blank.
export default defineType({
  name: "legalPage",
  title: "Yasal Sayfa",
  type: "document",
  fields: [
    defineField({
      name: "pageType",
      title: "Sayfa Tipi",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy" },
          { title: "Terms of Service", value: "terms" },
          { title: "Refund & Cancellation Policy", value: "refund" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Privacy Policy",
    }),
    defineField({
      name: "subtitle",
      title: "Üst Başlık (küçük etiket)",
      type: "string",
      description: "Örn: Legal",
    }),
    defineField({
      name: "lastUpdated",
      title: "Son Güncelleme Tarihi",
      type: "date",
      options: { dateFormat: "DD MMMM YYYY" },
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Yeni sekmede aç" },
                ],
              },
            ],
          },
        },
      ],
      description:
        "Boş bırakılırsa sitede yerleşik İngilizce metin gösterilir.",
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
  preview: {
    select: { pageType: "pageType", title: "title" },
    prepare({ pageType, title }) {
      const labels: Record<string, string> = {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        refund: "Refund & Cancellation Policy",
      };
      return { title: title || labels[pageType] || "Yasal Sayfa" };
    },
  },
});
