import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigasyon",
  type: "document",
  fields: [
    defineField({
      name: "mainMenu",
      title: "Ana Menü",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Menü Adı", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "sideMenuContactTitle",
      title: "Yan Menü İletişim Başlığı",
      type: "string",
      description: "Örn: Contact US",
    }),
    defineField({
      name: "sideMenuButtonText",
      title: "Yan Menü Buton Metni",
      type: "string",
      description: "Örn: Let's Talk",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigasyon Ayarları" };
    },
  },
});
