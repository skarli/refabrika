import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "Hakkımızda" },
    { name: "work", title: "İşlerimiz" },
    { name: "services", title: "Hizmetler" },
    { name: "clients", title: "Müşteriler" },
    { name: "blog", title: "Blog" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // HERO SECTION
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık",
      type: "string",
      group: "hero",
      description: "Örn: Full-service digital agency — Since 2009®",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Örn: Strategy-driven digital agency, based in",
    }),
    defineField({
      name: "heroLocation",
      title: "Hero Lokasyon",
      type: "string",
      group: "hero",
      description: "Örn: Fethiye",
    }),
    defineField({
      name: "heroLocationImage",
      title: "Hero Lokasyon Hover Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Açıklama",
      type: "text",
      rows: 3,
      group: "hero",
      description: "Hero sağ alt köşedeki açıklama metni",
    }),
    defineField({
      name: "heroButtonText",
      title: "Hero Buton Metni",
      type: "string",
      group: "hero",
      description: "Örn: Get started",
    }),
    defineField({
      name: "heroButtonLink",
      title: "Hero Buton Linki",
      type: "string",
      group: "hero",
      description: "Örn: /contact",
    }),
    defineField({
      name: "heroStats",
      title: "Hero İstatistik Metni",
      type: "string",
      group: "hero",
      description: "Örn: 17 years of digital excellence",
    }),
    defineField({
      name: "heroSocialLinks",
      title: "Hero Sosyal Medya Linkleri",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Platform Adı", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),

    // ABOUT SECTION
    defineField({
      name: "aboutTitle",
      title: "About Başlık",
      type: "text",
      rows: 2,
      group: "about",
      description: "Örn: Creating virtual emotion in the universe...",
    }),
    defineField({
      name: "aboutYearStart",
      title: "Başlangıç Yılı",
      type: "string",
      group: "about",
      description: "Örn: 2009",
    }),
    defineField({
      name: "aboutYearEnd",
      title: "Bitiş Yılı",
      type: "string",
      group: "about",
      description: "Örn: 2026",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Açıklama",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "aboutButtonText",
      title: "About Buton Metni",
      type: "string",
      group: "about",
      description: "Örn: Learn More",
    }),
    defineField({
      name: "aboutButtonLink",
      title: "About Buton Linki",
      type: "string",
      group: "about",
      description: "Örn: /contact",
    }),

    // WORK SECTION
    defineField({
      name: "workSectionTitle",
      title: "Work Bölüm Başlığı",
      type: "text",
      rows: 2,
      group: "work",
      description: "Örn: We find the unique, easy solution...",
    }),
    defineField({
      name: "workButtonText",
      title: "Work Buton Metni",
      type: "string",
      group: "work",
      description: "Örn: View all work",
    }),
    defineField({
      name: "featuredWorks",
      title: "Öne Çıkan İşler",
      type: "array",
      group: "work",
      of: [{ type: "reference", to: [{ type: "portfolio" }] }],
      description: "Ana sayfada gösterilecek portfolyo projeleri",
    }),

    // SERVICES SECTION
    defineField({
      name: "servicesSectionTitle",
      title: "Services Bölüm Başlığı",
      type: "string",
      group: "services",
      description: "Örn: Services we provide",
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Services Alt Başlık",
      type: "string",
      group: "services",
      description: "Örn: Services",
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Açıklama",
      type: "text",
      rows: 2,
      group: "services",
    }),
    defineField({
      name: "featuredServices",
      title: "Öne Çıkan Hizmetler",
      type: "array",
      group: "services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Ana sayfada gösterilecek hizmetler",
    }),

    // CLIENT SECTION
    defineField({
      name: "clientTitle",
      title: "Client Bölüm Başlığı",
      type: "text",
      rows: 2,
      group: "clients",
      description: "Örn: Client: Helping brands to grow...",
    }),
    defineField({
      name: "clientDescription",
      title: "Client Açıklama",
      type: "text",
      rows: 3,
      group: "clients",
    }),
    defineField({
      name: "clientLogos",
      title: "Müşteri Logoları",
      type: "array",
      group: "clients",
      of: [
        {
          type: "object",
          fields: [
            { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
            { name: "bgTheme", title: "Koyu Arkaplan", type: "boolean", initialValue: false },
          ],
          preview: {
            select: { media: "logo" },
          },
        },
      ],
    }),

    // BLOG SECTION
    defineField({
      name: "blogSectionTitle",
      title: "Blog Bölüm Başlığı",
      type: "text",
      rows: 2,
      group: "blog",
      description: "Örn: Learn our recent journal",
    }),
    defineField({
      name: "blogButtonText",
      title: "Blog Buton Metni",
      type: "string",
      group: "blog",
      description: "Örn: Learn all news",
    }),
    defineField({
      name: "featuredBlogs",
      title: "Öne Çıkan Bloglar",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      description: "Ana sayfada gösterilecek blog yazıları (4 adet önerilir)",
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
      return { title: "Ana Sayfa" };
    },
  },
});
