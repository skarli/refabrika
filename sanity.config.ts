import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

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
                          .documentId("siteSettings")
                      ),
                    S.listItem()
                      .title("Navigasyon")
                      .child(
                        S.document()
                          .schemaType("navigation")
                          .documentId("navigation")
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
                          .documentId("homePage")
                      ),
                    S.listItem()
                      .title("Blog Sayfası")
                      .child(
                        S.document()
                          .schemaType("blogPage")
                          .documentId("blogPage")
                      ),
                    S.listItem()
                      .title("Portfolyo Sayfası")
                      .child(
                        S.document()
                          .schemaType("portfolioPage")
                          .documentId("portfolioPage")
                      ),
                    S.listItem()
                      .title("Hizmetler Sayfası")
                      .child(
                        S.document()
                          .schemaType("servicesPage")
                          .documentId("servicesPage")
                      ),
                    S.listItem()
                      .title("SSS Sayfası")
                      .child(
                        S.document()
                          .schemaType("faqPage")
                          .documentId("faqPage")
                      ),
                    S.listItem()
                      .title("İletişim Sayfası")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId("contactPage")
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
  },
});
