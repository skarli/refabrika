import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

// Existing singleton document IDs in the production dataset.
// Some were created with random IDs by seed scripts before the structure
// pinned a fixed ID. Keep them mapped here so Studio opens the actual
// content instead of an empty stub at the canonical ID.
const SINGLETON_IDS: Record<string, string> = {
  siteSettings: "mDKndgxqdWywC9tRj4qwYn",
  navigation: "mDKndgxqdWywC9tRj4qwfl",
  homePage: "G7CUbMmRwwvddJXAlE6AvQ",
  blogPage: "G7CUbMmRwwvddJXAlE6B2i",
  portfolioPage: "mDKndgxqdWywC9tRj4qy1N",
  servicesPage: "G7CUbMmRwwvddJXAlE6BA0",
  faqPage: "mDKndgxqdWywC9tRj4qy8L",
  contactPage: "mDKndgxqdWywC9tRj4qyIn",
};

export default defineConfig({
  name: "refabrika",
  title: "Re:Fabrika CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik Yönetimi")
          .items([
            // AYARLAR
            S.listItem()
              .title("⚙️ Ayarlar")
              .child(
                S.list()
                  .title("Ayarlar")
                  .items([
                    S.listItem()
                      .title("Site Ayarları")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId(SINGLETON_IDS.siteSettings)
                      ),
                    S.listItem()
                      .title("Navigasyon")
                      .child(
                        S.document()
                          .schemaType("navigation")
                          .documentId(SINGLETON_IDS.navigation)
                      ),
                  ])
              ),

            S.divider(),

            // SAYFALAR
            S.listItem()
              .title("📄 Sayfalar")
              .child(
                S.list()
                  .title("Sayfalar")
                  .items([
                    S.listItem()
                      .title("Ana Sayfa")
                      .child(
                        S.document()
                          .schemaType("homePage")
                          .documentId(SINGLETON_IDS.homePage)
                      ),
                    S.listItem()
                      .title("Blog Sayfası")
                      .child(
                        S.document()
                          .schemaType("blogPage")
                          .documentId(SINGLETON_IDS.blogPage)
                      ),
                    S.listItem()
                      .title("Portfolyo Sayfası")
                      .child(
                        S.document()
                          .schemaType("portfolioPage")
                          .documentId(SINGLETON_IDS.portfolioPage)
                      ),
                    S.listItem()
                      .title("Hizmetler Sayfası")
                      .child(
                        S.document()
                          .schemaType("servicesPage")
                          .documentId(SINGLETON_IDS.servicesPage)
                      ),
                    S.listItem()
                      .title("SSS Sayfası")
                      .child(
                        S.document()
                          .schemaType("faqPage")
                          .documentId(SINGLETON_IDS.faqPage)
                      ),
                    S.listItem()
                      .title("İletişim Sayfası")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId(SINGLETON_IDS.contactPage)
                      ),
                  ])
              ),

            // YASAL SAYFALAR
            S.listItem()
              .title("⚖️ Yasal Sayfalar")
              .child(
                S.list()
                  .title("Yasal Sayfalar")
                  .items([
                    S.listItem()
                      .title("Privacy Policy")
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("legalPage-privacy")
                          .initialValueTemplate("legalPage-by-type", {
                            pageType: "privacy",
                          })
                      ),
                    S.listItem()
                      .title("Terms of Service")
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("legalPage-terms")
                          .initialValueTemplate("legalPage-by-type", {
                            pageType: "terms",
                          })
                      ),
                    S.listItem()
                      .title("Refund & Cancellation Policy")
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("legalPage-refund")
                          .initialValueTemplate("legalPage-by-type", {
                            pageType: "refund",
                          })
                      ),
                  ])
              ),

            S.divider(),

            // İÇERİK
            S.listItem()
              .title("📝 Blog Yazıları")
              .child(S.documentTypeList("blogPost").title("Blog Yazıları")),

            S.listItem()
              .title("💼 Portfolyo")
              .child(S.documentTypeList("portfolio").title("Portfolyo Projeleri")),

            S.listItem()
              .title("🛠️ Hizmetler")
              .child(S.documentTypeList("service").title("Hizmetler")),

            S.divider(),

            // FORM GÖNDERİLERİ
            S.listItem()
              .title("📬 Form Gönderleri")
              .child(
                S.documentTypeList("contactSubmission")
                  .title("Form Gönderleri")
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,

    // Parameterised template so each legal singleton is created with the
    // correct `pageType` (matched by the website query).
    templates: (prev) => [
      ...prev,
      {
        id: "legalPage-by-type",
        title: "Legal Page (by type)",
        schemaType: "legalPage",
        parameters: [{ name: "pageType", type: "string" }],
        value: (params: { pageType: string }) => ({
          pageType: params.pageType,
        }),
      },
    ],
  },
});
