import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "28nepg2u",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const serviceUpdates = [
  {
    slug: "social-media-management",
    serialNumber: "[SL: 001]",
    tagLabel: "[Social Media]",
    valueSectionTitle: "We sharpen your brands and businesses create exceptional experiences where people live work",
    valueStats: [
      { _key: "v1", value: "500+", description: "Social media posts created and managed across all platforms every month for our clients." },
      { _key: "v2", value: "85%", description: "Average engagement rate increase for brands after implementing our social media strategy." },
      { _key: "v3", value: "24/7", description: "Community monitoring and engagement to ensure your brand stays connected with your audience." },
    ],
  },
  {
    slug: "google-meta-ads",
    serialNumber: "[SL: 002]",
    tagLabel: "[Paid Advertising]",
    valueSectionTitle: "Data-driven advertising that delivers measurable results for your business growth",
    valueStats: [
      { _key: "v1", value: "3.5x", description: "Average return on ad spend (ROAS) achieved for our clients through optimized campaigns." },
      { _key: "v2", value: "45%", description: "Reduction in cost per acquisition through continuous campaign optimization." },
      { _key: "v3", value: "1M+", description: "Total ad impressions generated monthly across Google and Meta platforms." },
    ],
  },
  {
    slug: "digital-marketing-strategy",
    serialNumber: "[SL: 003]",
    tagLabel: "[Strategy]",
    valueSectionTitle: "Strategic marketing solutions that position your brand for sustainable growth",
    valueStats: [
      { _key: "v1", value: "150+", description: "Successful digital strategies developed and implemented for brands across industries." },
      { _key: "v2", value: "92%", description: "Client retention rate, reflecting the long-term value we deliver to our partners." },
      { _key: "v3", value: "60%", description: "Average increase in qualified leads within the first 6 months of strategy implementation." },
    ],
  },
  {
    slug: "brand-identity-design",
    serialNumber: "[SL: 004]",
    tagLabel: "[Brand Guideline]",
    valueSectionTitle: "We sharpen your brands and businesses create exceptional experiences where people live work",
    valueStats: [
      { _key: "v1", value: "2750", description: "A website refresh or redesign is a comprehensive overhaul that includes substantial changes to the content, structure, visuals, and code of your current website." },
      { _key: "v2", value: "92%", description: "High-quality custom logo design for Melbourne businesses. We are here to support you. Our logo design package uniquely blends creative skills and strategic thinking." },
      { _key: "v3", value: "75%", description: "Every creative design begins with a clear objective. Whether it's branding, advertising, product design and user experience, the design must align with the intended purpose." },
    ],
  },
  {
    slug: "web-design-development",
    serialNumber: "[SL: 005]",
    tagLabel: "[Web Development]",
    valueSectionTitle: "Building digital experiences that convert visitors into loyal customers",
    valueStats: [
      { _key: "v1", value: "50+", description: "Websites designed and developed using modern technologies and best practices." },
      { _key: "v2", value: "99.9%", description: "Average uptime for websites we build and maintain, ensuring your business is always online." },
      { _key: "v3", value: "2s", description: "Average page load time achieved through performance optimization and modern tech stack." },
    ],
  },
];

async function updateServices() {
  console.log("🔄 Servisleri güncelliyorum...\n");

  for (const update of serviceUpdates) {
    const service = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]._id`,
      { slug: update.slug }
    );

    if (service) {
      await client.patch(service).set({
        serialNumber: update.serialNumber,
        tagLabel: update.tagLabel,
        valueSectionTitle: update.valueSectionTitle,
        valueStats: update.valueStats,
      }).commit();
      console.log(`✅ ${update.slug} güncellendi`);
    } else {
      console.log(`⚠️ ${update.slug} bulunamadı`);
    }
  }

  console.log("\n✅ Tüm servisler güncellendi!");
}

updateServices().catch(console.error);
