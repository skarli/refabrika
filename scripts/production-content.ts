import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "28nepg2u",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function deleteAllContent() {
  console.log("🗑️  Deleting existing content...");

  const types = [
    "siteSettings",
    "navigation",
    "homePage",
    "blogPage",
    "portfolioPage",
    "servicesPage",
    "faqPage",
    "contactPage",
    "blogPost",
    "portfolio",
    "service",
  ];

  for (const type of types) {
    try {
      const docs = await client.fetch(`*[_type == "${type}"]._id`);
      if (docs.length > 0) {
        for (const id of docs) {
          try {
            await client.delete(id);
          } catch {
            // Skip if can't delete
          }
        }
        console.log(`   Deleted ${docs.length} ${type} documents`);
      }
    } catch {
      console.log(`   Skipped ${type} (no documents or error)`);
    }
  }

  console.log("✅ Cleanup complete\n");
}

async function createSiteSettings() {
  console.log("🏢 Creating site settings...");

  await client.create({
    _type: "siteSettings",
    siteName: "re:fabrika",
    siteDescription:
      "AI-Powered Creative Agency | Since 2009 | Fethiye & Istanbul",
    headerText: "Let's Create Together",
    socialLinks: {
      instagram: "https://instagram.com/refabrika",
      facebook: "https://facebook.com/refabrika",
      twitter: "https://twitter.com/refabrika",
      linkedin: "https://linkedin.com/company/refabrika",
      behance: "https://behance.net/refabrika",
      dribbble: "https://dribbble.com/refabrika",
      youtube: "https://youtube.com/@refabrika",
    },
    contactInfo: {
      email: "hello@refabrika.com",
      phone: "+90 252 612 00 00",
      address: "Fethiye, Muğla, Turkey",
    },
    footerText: "© 2024 re:fabrika. AI-Powered Creative Agency.",
    ctaText: "Start Your Project",
    ctaLink: "/contact",
  });

  console.log("✅ Site settings created\n");
}

async function createNavigation() {
  console.log("🧭 Creating navigation...");

  await client.create({
    _type: "navigation",
    mainMenu: [
      { _key: "home", label: "Home", href: "/" },
      { _key: "portfolio", label: "Portfolio", href: "/portfolio" },
      { _key: "services", label: "Services", href: "/services" },
      { _key: "blog", label: "Blog", href: "/blog" },
      { _key: "contact", label: "Contact", href: "/contact" },
    ],
    sideMenuContactTitle: "Get in Touch",
    sideMenuButtonText: "Let's Talk",
  });

  console.log("✅ Navigation created\n");
}

async function createServices() {
  console.log("🛠️  Creating services with FAQs...");

  const services = [
    {
      _type: "service",
      title: "Branding & Identity",
      slug: { _type: "slug", current: "branding-identity" },
      number: "(001)",
      order: 1,
      shortDescription:
        "We craft distinctive brand identities that resonate with your audience and stand the test of time. From logo design to complete brand systems.",
      serialNumber: "[SL: 001]",
      tagLabel: "[Branding]",
      heroDescription:
        "Your brand is more than a logo—it's the complete experience your customers have with your company. We build brand identities that capture your essence, communicate your values, and create lasting connections with your audience. Since 2009, we've helped brands from startups to established companies redefine their visual identity.",
      heroFeatures: [
        "Logo Design",
        "Brand Strategy",
        "Visual Identity",
        "Brand Guidelines",
        "Rebranding",
      ],
      approachTitle: "Our Branding Process",
      approachDescription:
        "We follow a strategic approach that combines research, creativity, and collaboration to build brands that make an impact.",
      approachSteps: [
        {
          _key: "step1",
          title: "Brand Discovery",
          description:
            "We dive deep into your business, audience, competitors, and market to understand what makes you unique. This phase includes stakeholder interviews, market research, and competitive analysis.",
        },
        {
          _key: "step2",
          title: "Strategy Development",
          description:
            "Based on our findings, we define your brand positioning, messaging framework, and visual direction. We create a roadmap that guides all creative decisions.",
        },
        {
          _key: "step3",
          title: "Visual Identity Creation",
          description:
            "Our design team brings your brand to life through logo concepts, color palettes, typography, and visual elements that tell your story.",
        },
        {
          _key: "step4",
          title: "Brand Guidelines & Rollout",
          description:
            "We deliver a comprehensive brand book that ensures consistency across all touchpoints. We also assist with the implementation across your digital and print materials.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Strategic Foundation",
          description:
            "Every design decision is backed by research and strategy. We don't just make things look good—we make them work for your business goals.",
        },
        {
          _key: "f2",
          title: "Memorable Design",
          description:
            "We create visual identities that stand out in crowded markets and stick in people's minds long after they've seen them.",
        },
        {
          _key: "f3",
          title: "Complete Brand Systems",
          description:
            "From business cards to billboards, we design cohesive systems that work seamlessly across every medium and platform.",
        },
        {
          _key: "f4",
          title: "Future-Proof Approach",
          description:
            "We build flexible brand systems that can evolve with your company while maintaining the core identity that makes you unique.",
        },
      ],
      valueSectionTitle:
        "We've helped brands across industries establish strong market presence and connect authentically with their audiences.",
      valueStats: [
        {
          _key: "v1",
          value: "150+",
          description:
            "Brands transformed since 2009. From local businesses to international companies, we've crafted identities that drive recognition and growth.",
        },
        {
          _key: "v2",
          value: "95%",
          description:
            "Client satisfaction rate. Our collaborative approach ensures we deliver exactly what your brand needs to succeed.",
        },
        {
          _key: "v3",
          value: "3x",
          description:
            "Average increase in brand recognition after rebranding. Strong visual identity directly impacts how customers perceive and remember you.",
        },
      ],
      faqs: [
        {
          _key: "faq1",
          question: "How long does the branding process take?",
          answer:
            "A complete brand identity project typically takes 6-8 weeks, depending on the scope. This includes discovery, strategy, design iterations, and final delivery. Rush projects can be accommodated with adjusted timelines.",
        },
        {
          _key: "faq2",
          question: "What's included in a brand guidelines document?",
          answer:
            "Our brand guidelines include logo usage rules, color specifications (CMYK, RGB, Pantone), typography system, imagery style, iconography, voice and tone guidelines, and application examples for various media.",
        },
        {
          _key: "faq3",
          question: "How many logo concepts will I receive?",
          answer:
            "We typically present 3-5 distinct logo concepts in the initial round. After your feedback, we refine the chosen direction through 2-3 revision rounds until we achieve the perfect result.",
        },
        {
          _key: "faq4",
          question: "Do you handle trademark registration?",
          answer:
            "While we don't handle legal trademark registration directly, we design with trademark viability in mind and can recommend trusted legal partners for the registration process.",
        },
      ],
    },
    {
      _type: "service",
      title: "Web Development",
      slug: { _type: "slug", current: "web-development" },
      number: "(002)",
      order: 2,
      shortDescription:
        "Custom web solutions built with cutting-edge technology. From corporate websites to complex web applications, we deliver performance and elegance.",
      serialNumber: "[SL: 002]",
      tagLabel: "[Development]",
      heroDescription:
        "We build websites and web applications that don't just look beautiful—they perform exceptionally. Using the latest technologies like Next.js, Laravel, and headless CMS solutions, we create digital experiences that load fast, rank high, and convert visitors into customers.",
      heroFeatures: [
        "Next.js & React",
        "Laravel & PHP",
        "Headless CMS",
        "E-commerce",
        "Custom APIs",
      ],
      approachTitle: "Our Development Process",
      approachDescription:
        "We combine agile methodology with meticulous planning to deliver web projects that exceed expectations on time and budget.",
      approachSteps: [
        {
          _key: "step1",
          title: "Discovery & Planning",
          description:
            "We analyze your requirements, define user stories, plan the architecture, and select the optimal technology stack for your project needs.",
        },
        {
          _key: "step2",
          title: "UX/UI Design",
          description:
            "Our design team creates wireframes and high-fidelity prototypes. We test user flows and iterate until the experience is perfect.",
        },
        {
          _key: "step3",
          title: "Development & Testing",
          description:
            "We build your solution using modern frameworks and best practices. Continuous integration and testing ensure quality at every step.",
        },
        {
          _key: "step4",
          title: "Launch & Optimization",
          description:
            "After thorough QA, we deploy to production and monitor performance. We provide ongoing support and continuous improvements.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Modern Tech Stack",
          description:
            "We use Next.js 15, Laravel 12, PostgreSQL, Redis, and AI integrations. Your project is built on proven, scalable technologies.",
        },
        {
          _key: "f2",
          title: "Performance First",
          description:
            "Every site we build achieves 90+ PageSpeed scores. Fast loading means better user experience and higher search rankings.",
        },
        {
          _key: "f3",
          title: "SEO Ready",
          description:
            "Server-side rendering, structured data, and semantic HTML ensure your site is optimized for search engines from day one.",
        },
        {
          _key: "f4",
          title: "Scalable Architecture",
          description:
            "We build systems that grow with you. Whether you're expecting 100 or 100,000 users, your site will perform flawlessly.",
        },
      ],
      valueSectionTitle:
        "We leverage cutting-edge technology to build web solutions that drive real business results.",
      valueStats: [
        {
          _key: "v1",
          value: "200+",
          description:
            "Websites and applications delivered. From landing pages to complex platforms, we've built solutions for every need.",
        },
        {
          _key: "v2",
          value: "99.9%",
          description:
            "Uptime guarantee on managed projects. We use Vercel, AWS, and enterprise-grade infrastructure for reliability.",
        },
        {
          _key: "v3",
          value: "<1s",
          description:
            "Average page load time. Our performance-focused approach ensures visitors never wait.",
        },
      ],
      faqs: [
        {
          _key: "faq1",
          question: "Which technologies do you use for web development?",
          answer:
            "We primarily use Next.js 15 with React for frontend, Laravel 12 for complex backends, Sanity CMS for content management, PostgreSQL/Supabase for databases, and Redis/Upstash for caching. We choose the best stack based on your specific requirements.",
        },
        {
          _key: "faq2",
          question: "How long does it take to build a website?",
          answer:
            "A standard corporate website takes 4-8 weeks. E-commerce projects typically require 8-12 weeks. Complex web applications can take 3-6 months. We provide detailed timelines during the discovery phase.",
        },
        {
          _key: "faq3",
          question: "Do you provide hosting and maintenance?",
          answer:
            "Yes, we offer managed hosting on Vercel or AWS with 24/7 monitoring, automatic backups, security updates, and performance optimization. Maintenance packages include content updates and ongoing improvements.",
        },
        {
          _key: "faq4",
          question: "Can you integrate with existing systems and APIs?",
          answer:
            "Absolutely. We have experience integrating with payment gateways, ERPs, CRMs, marketing automation tools, and custom APIs. We build secure, well-documented integrations.",
        },
      ],
    },
    {
      _type: "service",
      title: "Digital Marketing",
      slug: { _type: "slug", current: "digital-marketing" },
      number: "(003)",
      order: 3,
      shortDescription:
        "Data-driven marketing strategies that deliver measurable results. SEO, SEM, and performance marketing powered by AI and server-side tracking.",
      serialNumber: "[SL: 003]",
      tagLabel: "[Marketing]",
      heroDescription:
        "We don't just run ads—we build complete digital marketing ecosystems. With server-side tracking, Conversion API integration, and AI-powered optimization, we deliver marketing that's accurate, efficient, and profitable. Our technical approach sets us apart in a post-iOS 14 world.",
      heroFeatures: [
        "SEO/SEM",
        "Meta & Google Ads",
        "Conversion API",
        "GTM Server",
        "Analytics",
      ],
      approachTitle: "Our Marketing Process",
      approachDescription:
        "We combine technical excellence with creative strategy to build marketing systems that scale profitably.",
      approachSteps: [
        {
          _key: "step1",
          title: "Audit & Analysis",
          description:
            "We analyze your current marketing efforts, tracking setup, competitor landscape, and identify opportunities for growth and optimization.",
        },
        {
          _key: "step2",
          title: "Strategy Development",
          description:
            "Based on data, we create a comprehensive marketing strategy including channel mix, budget allocation, and conversion funnel design.",
        },
        {
          _key: "step3",
          title: "Technical Setup",
          description:
            "We implement server-side tracking, Conversion API, enhanced conversions, and proper attribution. This is the foundation for accurate measurement.",
        },
        {
          _key: "step4",
          title: "Launch & Optimize",
          description:
            "We launch campaigns and continuously optimize based on real data. Weekly reports keep you informed of progress and ROI.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Server-Side Tracking",
          description:
            "We implement GTM Server and Conversion API for accurate tracking in a cookie-less world. No more lost conversions or inaccurate data.",
        },
        {
          _key: "f2",
          title: "AI-Powered Optimization",
          description:
            "We use AI tools and custom scripts to analyze data, identify patterns, and optimize campaigns faster than humanly possible.",
        },
        {
          _key: "f3",
          title: "Full-Funnel Strategy",
          description:
            "From awareness to conversion, we design complete funnels that guide prospects through their journey efficiently.",
        },
        {
          _key: "f4",
          title: "Transparent Reporting",
          description:
            "Real-time dashboards and weekly reports show exactly where your budget goes and what results it generates. No vanity metrics.",
        },
      ],
      valueSectionTitle:
        "Our technical approach to digital marketing delivers measurable results that directly impact your bottom line.",
      valueStats: [
        {
          _key: "v1",
          value: "30%",
          description:
            "Average increase in tracked conversions after implementing server-side tracking. Better data means better decisions.",
        },
        {
          _key: "v2",
          value: "4.5x",
          description:
            "Average ROAS across client campaigns. We focus on profitability, not just traffic or impressions.",
        },
        {
          _key: "v3",
          value: "50M+",
          description:
            "Ad spend managed annually. We have the experience to handle campaigns of any scale efficiently.",
        },
      ],
      faqs: [
        {
          _key: "faq1",
          question: "What is server-side tracking and why is it important?",
          answer:
            "Server-side tracking sends data directly from your server to platforms like Meta and Google, bypassing browser restrictions. After iOS 14+ updates, client-side tracking lost up to 40% of conversions. Server-side tracking recovers this data for accurate attribution and optimization.",
        },
        {
          _key: "faq2",
          question: "What is the minimum ad budget you work with?",
          answer:
            "We recommend a minimum monthly ad spend of $3,000-5,000 to generate meaningful data for optimization. Our management fee is separate and scales with your budget complexity.",
        },
        {
          _key: "faq3",
          question: "How quickly can we expect to see results?",
          answer:
            "SEO typically shows significant results in 3-6 months. Paid advertising can generate leads immediately, but optimization takes 4-8 weeks of data collection. We set realistic expectations based on your industry and competition.",
        },
        {
          _key: "faq4",
          question: "Do you provide reports and analytics?",
          answer:
            "Yes, we provide real-time dashboards plus weekly written reports that explain performance, insights, and optimization actions. We focus on business metrics like ROAS and CPA, not just clicks and impressions.",
        },
      ],
    },
    {
      _type: "service",
      title: "Social Media Management",
      slug: { _type: "slug", current: "social-media" },
      number: "(004)",
      order: 4,
      shortDescription:
        "Strategic social media presence that builds community and drives engagement. Content creation, community management, and growth strategies.",
      serialNumber: "[SL: 004]",
      tagLabel: "[Social Media]",
      heroDescription:
        "Social media is where brands become human. We create content strategies that tell your story, engage your audience, and build genuine community around your brand. From content creation to community management, we handle everything so you can focus on your business.",
      heroFeatures: [
        "Content Strategy",
        "Visual Design",
        "Community Management",
        "Influencer Marketing",
        "Analytics",
      ],
      approachTitle: "Our Social Strategy",
      approachDescription:
        "We build social media presence that reflects your brand voice and connects authentically with your audience.",
      approachSteps: [
        {
          _key: "step1",
          title: "Research & Audit",
          description:
            "We analyze your current presence, audience demographics, competitor strategies, and industry trends to inform our strategy.",
        },
        {
          _key: "step2",
          title: "Content Strategy",
          description:
            "We develop a content calendar, define content pillars, establish your brand voice, and create templates for consistent visual identity.",
        },
        {
          _key: "step3",
          title: "Content Production",
          description:
            "Our team creates engaging content—graphics, videos, copywriting—that stops the scroll and drives engagement.",
        },
        {
          _key: "step4",
          title: "Publish & Engage",
          description:
            "We manage posting schedules, respond to comments and messages, and actively engage with your community to build relationships.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Strategic Content",
          description:
            "Every post has a purpose. We align content with business goals, whether it's awareness, engagement, or conversion.",
        },
        {
          _key: "f2",
          title: "Visual Excellence",
          description:
            "Our design team creates thumb-stopping visuals that maintain brand consistency while standing out in crowded feeds.",
        },
        {
          _key: "f3",
          title: "Active Community",
          description:
            "We don't just post and ghost. We actively engage with your audience, building real relationships and brand loyalty.",
        },
        {
          _key: "f4",
          title: "Data-Driven Growth",
          description:
            "Monthly analytics reviews inform strategy adjustments. We double down on what works and pivot from what doesn't.",
        },
      ],
      valueSectionTitle:
        "We transform social media from a time sink into a powerful channel for brand building and business growth.",
      valueStats: [
        {
          _key: "v1",
          value: "300%",
          description:
            "Average engagement increase in the first 6 months. Strategic content and active community management drive real interaction.",
        },
        {
          _key: "v2",
          value: "50+",
          description:
            "Brands managed across platforms. From startups to established companies, we know what works for different audiences.",
        },
        {
          _key: "v3",
          value: "24hr",
          description:
            "Maximum response time for community management. We keep your audience engaged and your reputation protected.",
        },
      ],
      faqs: [
        {
          _key: "faq1",
          question: "Which platforms do you manage?",
          answer:
            "We manage Instagram, Facebook, LinkedIn, Twitter/X, TikTok, and YouTube. We recommend focusing on 2-3 platforms where your audience is most active rather than spreading thin across all channels.",
        },
        {
          _key: "faq2",
          question: "How many posts per week do you create?",
          answer:
            "Our standard packages include 12-20 posts per month, depending on platforms. We focus on quality and strategy over quantity. Custom content volumes can be arranged based on your needs.",
        },
        {
          _key: "faq3",
          question: "Do you handle influencer partnerships?",
          answer:
            "Yes, we identify relevant influencers, negotiate partnerships, manage campaigns, and track results. We focus on authentic partnerships that align with your brand values.",
        },
        {
          _key: "faq4",
          question: "What happens if there's a social media crisis?",
          answer:
            "We have crisis management protocols in place. We monitor mentions, respond quickly to issues, and escalate to you when needed. We can help develop crisis communication guidelines proactively.",
        },
      ],
    },
    {
      _type: "service",
      title: "E-commerce Solutions",
      slug: { _type: "slug", current: "ecommerce" },
      number: "(005)",
      order: 5,
      shortDescription:
        "Complete e-commerce solutions from platform selection to launch. We build online stores that sell, scale, and succeed.",
      serialNumber: "[SL: 005]",
      tagLabel: "[E-commerce]",
      heroDescription:
        "We build e-commerce experiences that convert browsers into buyers. Whether you need a quick launch on İkas or a custom-built solution, we handle everything from store design to payment integration, inventory management, and growth optimization.",
      heroFeatures: [
        "İkas & Shopify",
        "Custom Development",
        "Payment Integration",
        "Inventory Systems",
        "Conversion Optimization",
      ],
      approachTitle: "Our E-commerce Process",
      approachDescription:
        "We build online stores that are beautiful, functional, and optimized for sales from day one.",
      approachSteps: [
        {
          _key: "step1",
          title: "Platform Selection",
          description:
            "We analyze your products, volume, budget, and growth plans to recommend the optimal platform—İkas, Shopify, or custom development.",
        },
        {
          _key: "step2",
          title: "Store Design",
          description:
            "We design your store with conversion in mind. User experience, mobile optimization, and brand consistency guide every design decision.",
        },
        {
          _key: "step3",
          title: "Development & Integration",
          description:
            "We build your store, integrate payment gateways, shipping providers, inventory systems, and any third-party tools you need.",
        },
        {
          _key: "step4",
          title: "Launch & Growth",
          description:
            "After thorough testing, we launch your store and continue optimizing. We track conversions, identify bottlenecks, and improve performance.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Platform Expertise",
          description:
            "We're certified partners with İkas and experienced in Shopify, WooCommerce, and custom solutions. We pick the right tool for your needs.",
        },
        {
          _key: "f2",
          title: "Conversion Focused",
          description:
            "Every element is designed to drive sales—from product pages to checkout flow. We obsess over the details that impact conversion rates.",
        },
        {
          _key: "f3",
          title: "Seamless Integration",
          description:
            "Payment gateways, cargo companies, accounting software, ERP systems—we integrate everything you need for smooth operations.",
        },
        {
          _key: "f4",
          title: "Growth Ready",
          description:
            "We build stores that can handle your growth. From 10 to 10,000 orders per day, your infrastructure will scale with your success.",
        },
      ],
      valueSectionTitle:
        "We've helped businesses of all sizes launch and scale their online stores successfully.",
      valueStats: [
        {
          _key: "v1",
          value: "100+",
          description:
            "E-commerce stores launched. From fashion to agriculture, we've built successful online stores in diverse industries.",
        },
        {
          _key: "v2",
          value: "25%",
          description:
            "Average conversion rate improvement after our optimization. Small changes in UX can have massive impact on sales.",
        },
        {
          _key: "v3",
          value: "10M+",
          description:
            "Processed in transactions through stores we've built. We understand what it takes to handle serious volume.",
        },
      ],
      faqs: [
        {
          _key: "faq1",
          question: "Should I use İkas, Shopify, or custom development?",
          answer:
            "İkas is excellent for Turkish market with local payment/cargo integrations. Shopify is great for international sales. Custom development is ideal for unique requirements or very high volume. We recommend based on your specific situation.",
        },
        {
          _key: "faq2",
          question: "What payment methods can you integrate?",
          answer:
            "We integrate all major Turkish payment gateways (iyzico, PayTR, Param), international options (Stripe, PayPal), and installment solutions. We also handle 3D Secure and PCI compliance requirements.",
        },
        {
          _key: "faq3",
          question: "Can you migrate from another platform?",
          answer:
            "Yes, we handle complete migrations including products, customers, orders, and SEO preservation. We ensure minimal disruption and maintain your search rankings during the transition.",
        },
        {
          _key: "faq4",
          question: "Do you handle inventory and shipping integrations?",
          answer:
            "Absolutely. We integrate with major cargo companies (Aras, Yurtiçi, MNG, PTT), marketplace syncs (Trendyol, Hepsiburada, N11), and inventory management systems.",
        },
      ],
    },
  ];

  for (const service of services) {
    await client.create(service);
    console.log(`   Created service: ${service.title}`);
  }

  console.log("✅ Services created with FAQs\n");
}

async function createPortfolio() {
  console.log("📂 Creating portfolio projects...");

  const projects = [
    {
      _type: "portfolio",
      title: "Online Çiftçi",
      slug: { _type: "slug", current: "online-ciftci" },
      year: "2024",
      order: 1,
      featured: true,
      tags: ["E-commerce", "Branding", "Marketing"],
      client: "Online Çiftçi",
      service: "Full Digital Transformation",
      date: "January 2024",
      technology: "İkas, Next.js, Figma, Meta Ads",
      shortDescription:
        "A comprehensive digital transformation for Turkey's innovative farm-to-table e-commerce platform.",
      fullDescription: [
        {
          _type: "block",
          _key: "block1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Online Çiftçi is revolutionizing how Turkish consumers access fresh, local produce. When they approached us, they had a vision but needed a complete digital presence to bring it to life. We delivered a full-stack solution that transformed their business.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "The Challenge",
            },
          ],
        },
        {
          _type: "block",
          _key: "block3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Online Çiftçi needed to stand out in the competitive Turkish e-commerce market while conveying their unique value proposition—fresh products directly from local farmers. They needed everything: brand identity, e-commerce platform, packaging design, and a marketing strategy to acquire customers.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span4",
              text: "Our Solution",
            },
          ],
        },
        {
          _type: "block",
          _key: "block5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span5",
              text: "We created a warm, earthy brand identity that reflects the connection between farmers and consumers. The İkas-powered e-commerce platform features intuitive navigation, subscription options for regular deliveries, and a seamless checkout experience optimized for mobile users.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span6",
              text: "Our packaging design extends the brand experience to the physical product, using sustainable materials that align with the company's eco-conscious values. The marketing strategy leverages Meta Ads with server-side tracking for accurate attribution and continuous optimization.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block7",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span7",
              text: "Results",
            },
          ],
        },
        {
          _type: "block",
          _key: "block8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span8",
              text: "Within 6 months of launch, Online Çiftçi achieved a 400% increase in monthly orders, established a loyal subscriber base, and became recognized as a leading farm-to-table platform in their region. The brand identity has received industry recognition and customer praise.",
            },
          ],
        },
      ],
      features: [
        "Complete Brand Identity & Logo Design",
        "İkas E-commerce Platform Development",
        "Custom Product Page Templates",
        "Subscription & Recurring Order System",
        "Sustainable Packaging Design",
        "Social Media Content Strategy",
        "Meta Ads Campaign Management",
        "Server-Side Tracking Implementation",
      ],
      seo: {
        metaTitle: "Online Çiftçi Case Study | E-commerce & Branding | re:fabrika",
        metaDescription:
          "How we helped Online Çiftçi launch a successful farm-to-table e-commerce platform with complete branding, web development, and marketing solutions.",
      },
    },
    {
      _type: "portfolio",
      title: "Blue More Yachting",
      slug: { _type: "slug", current: "blue-more-yachting" },
      year: "2024",
      order: 2,
      featured: true,
      tags: ["Web Development", "Branding", "SEO"],
      client: "Blue More Yachting",
      service: "Full Digital Solution",
      date: "March 2024",
      technology: "Laravel 12, PostgreSQL, Redis, Sanity CMS",
      shortDescription:
        "A luxury yacht charter platform built for performance, featuring real-time availability and booking management.",
      fullDescription: [
        {
          _type: "block",
          _key: "block1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Blue More Yachting operates in the competitive Turkish Riviera yacht charter market. They needed a digital presence that matched the luxury of their fleet and streamlined their booking operations. We delivered a complete solution from brand to backend.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "The Challenge",
            },
          ],
        },
        {
          _type: "block",
          _key: "block3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Managing yacht availability, pricing, and bookings was handled through spreadsheets and email. The existing website didn't reflect the premium nature of the service and performed poorly in search rankings. International clients struggled with the booking process.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span4",
              text: "Our Solution",
            },
          ],
        },
        {
          _type: "block",
          _key: "block5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span5",
              text: "We built a custom Laravel 12 application with a sophisticated booking engine that handles real-time availability, dynamic pricing, and multi-currency payments. The PostgreSQL database with Redis caching ensures lightning-fast performance even during peak season.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span6",
              text: "The frontend presents an immersive visual experience with full-screen yacht galleries and smooth interactions. Sanity CMS allows the team to update content, pricing, and availability without technical knowledge. Our SEO strategy targets high-value keywords in multiple languages.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block7",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span7",
              text: "Results",
            },
          ],
        },
        {
          _type: "block",
          _key: "block8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span8",
              text: "The new platform reduced booking administration time by 80% and increased online conversions by 150%. Organic search traffic grew 300% within the first year, establishing Blue More as a leading digital presence in the yacht charter industry.",
            },
          ],
        },
      ],
      features: [
        "Premium Brand Identity Design",
        "Custom Laravel 12 Backend",
        "Real-Time Booking Engine",
        "Multi-Currency Payment Processing",
        "Sanity CMS Integration",
        "PostgreSQL with Redis Caching",
        "Multi-Language SEO Strategy",
        "Social Media Management",
        "Performance Analytics Dashboard",
      ],
      seo: {
        metaTitle: "Blue More Yachting Case Study | Web Development | re:fabrika",
        metaDescription:
          "How we built a luxury yacht charter platform with Laravel 12, real-time booking, and achieved 300% organic traffic growth.",
      },
    },
    {
      _type: "portfolio",
      title: "Villa Kalkan",
      slug: { _type: "slug", current: "villa-kalkan" },
      year: "2024",
      order: 3,
      featured: true,
      tags: ["Full Service", "Next.js", "Marketing"],
      client: "Villa Kalkan",
      service: "Complete Digital Transformation",
      date: "May 2024",
      technology: "Next.js 15, Vercel, Supabase, Sanity CMS",
      shortDescription:
        "End-to-end digital solution for a luxury villa rental company, from branding to booking platform to marketing.",
      fullDescription: [
        {
          _type: "block",
          _key: "block1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Villa Kalkan manages an exclusive portfolio of luxury villas in one of Turkey's most prestigious coastal destinations. They needed a complete digital transformation to compete with international booking platforms and attract high-net-worth travelers directly.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "The Challenge",
            },
          ],
        },
        {
          _type: "block",
          _key: "block3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Villa Kalkan was dependent on third-party platforms like Airbnb and Booking.com, paying significant commissions and losing brand visibility. Their existing website was outdated, mobile-unfriendly, and provided no direct booking capability. They needed to own their customer relationships.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span4",
              text: "Our Solution",
            },
          ],
        },
        {
          _type: "block",
          _key: "block5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span5",
              text: "We delivered a comprehensive A-to-Z solution. The elegant brand identity reflects Kalkan's sophistication. The Next.js 15 website on Vercel delivers exceptional performance with sub-second load times. Supabase powers the booking system with real-time availability sync and secure payment processing.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span6",
              text: "Sanity CMS gives the team complete control over villa listings, photography, and content. Our digital marketing strategy includes SEO targeting luxury travel keywords, Google Ads for high-intent searches, and retargeting campaigns for past visitors.",
            },
          ],
        },
        {
          _type: "block",
          _key: "block7",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span7",
              text: "Results",
            },
          ],
        },
        {
          _type: "block",
          _key: "block8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span8",
              text: "Direct bookings now account for 60% of revenue, eliminating platform commissions. The average booking value increased 40% as customers engage directly with the premium brand experience. Website traffic from organic search grew 500% year-over-year.",
            },
          ],
        },
      ],
      features: [
        "Luxury Brand Identity Design",
        "Next.js 15 Website Development",
        "Vercel Edge Deployment",
        "Supabase Booking System",
        "Sanity CMS Integration",
        "Multi-Language Support (EN/RU/TR)",
        "Google & Meta Ads Management",
        "Server-Side Tracking Setup",
        "Email Marketing Automation",
        "Review & Reputation Management",
      ],
      seo: {
        metaTitle: "Villa Kalkan Case Study | Full Service Digital | re:fabrika",
        metaDescription:
          "How we helped Villa Kalkan achieve 60% direct bookings through complete digital transformation including branding, Next.js development, and marketing.",
      },
    },
  ];

  for (const project of projects) {
    await client.create(project);
    console.log(`   Created portfolio: ${project.title}`);
  }

  console.log("✅ Portfolio projects created\n");
}

async function createBlogPosts() {
  console.log("📝 Creating blog posts...");

  const posts = [
    {
      _type: "blogPost",
      title: "The Critical Role of Server-Side Tracking in Meta Advertising",
      slug: { _type: "slug", current: "server-side-tracking-meta-advertising" },
      excerpt:
        "Learn why server-side tracking is essential for accurate Meta advertising in a post-iOS 14 world and how to implement it correctly.",
      author: "re:fabrika",
      publishedAt: "2024-12-15T10:00:00Z",
      tags: ["Digital Marketing", "Meta Ads", "Tracking"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Since Apple's iOS 14.5 update introduced App Tracking Transparency, advertisers have been struggling with significant data loss in their Meta advertising campaigns. Server-side tracking has emerged as the essential solution to recover lost conversions and maintain campaign performance.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "The Problem with Client-Side Tracking",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Traditional pixel-based tracking relies on cookies and browser JavaScript to capture user actions. However, several factors now limit its effectiveness: browser privacy features blocking third-party cookies, ad blockers preventing pixel fires, iOS App Tracking Transparency opt-outs, and network issues causing data loss. Studies show that client-side tracking now misses 20-40% of conversions.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "How Server-Side Tracking Works",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Server-side tracking sends conversion data directly from your server to Meta's servers through the Conversion API (CAPI). This bypasses browser limitations entirely. When a user completes a purchase, your server sends the event directly to Meta with all relevant data including email, phone, and order value.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Implementation with GTM Server",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Google Tag Manager Server provides a flexible platform for server-side implementation. You deploy a server container on Google Cloud or your preferred hosting, configure the Facebook CAPI tag, and route events through your first-party domain. This setup provides both improved tracking accuracy and enhanced data privacy compliance.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Results We've Seen",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "After implementing server-side tracking for our clients, we typically see: 25-35% increase in tracked conversions, improved match quality scores from 'Poor' to 'Great', better campaign optimization due to complete data, and significant ROAS improvements as Meta can optimize on accurate conversion data.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Server-side tracking is no longer optional—it's essential for any serious Meta advertising effort. The initial setup complexity is quickly offset by dramatically improved campaign performance and data accuracy.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Server-Side Tracking for Meta Ads | Complete Guide 2024",
        metaDescription:
          "Learn how server-side tracking and Conversion API can recover 30%+ lost conversions in your Meta advertising campaigns. Implementation guide included.",
      },
    },
    {
      _type: "blogPost",
      title: "Why You Should Migrate to Google Tag Manager Server",
      slug: { _type: "slug", current: "migrate-to-gtm-server" },
      excerpt:
        "GTM Server provides better data accuracy, improved privacy compliance, and faster page performance. Here's why and how to make the switch.",
      author: "re:fabrika",
      publishedAt: "2024-12-10T10:00:00Z",
      tags: ["GTM", "Analytics", "Performance"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Google Tag Manager Server-Side represents a fundamental shift in how we collect and process marketing data. Unlike traditional client-side GTM that runs in the browser, server-side GTM runs on your own server infrastructure, giving you unprecedented control over your data.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Key Benefits of Server-Side Tracking",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "First-party data collection: Data flows through your domain, establishing a first-party relationship with browsers. This bypasses many third-party cookie restrictions. Improved page speed: Moving heavy analytics processing to the server can reduce client-side JavaScript by 50-70%, significantly improving Core Web Vitals scores.",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Enhanced data control: You can enrich, transform, or filter data before sending it to third parties. This enables PII stripping, data quality improvements, and compliance with privacy regulations. Ad blocker immunity: Since requests go to your first-party domain, they're not blocked by ad blockers that target known analytics endpoints.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Infrastructure Options",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "You can run GTM Server on Google Cloud (App Engine or Cloud Run), AWS, or any platform supporting Docker containers. Costs typically range from $50-500/month depending on traffic volume. For most sites, the basic setup handles millions of events monthly without issues.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Migration Strategy",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "We recommend a parallel running approach: keep your client-side setup active while building and testing the server-side implementation. Use the comparison to validate data accuracy before fully transitioning. Start with your most critical conversions (purchases, leads) and expand coverage gradually.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "The investment in GTM Server pays dividends in data quality, page performance, and future-proofing your analytics infrastructure. As privacy regulations tighten and browsers add more restrictions, server-side tracking becomes increasingly critical.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "GTM Server Migration Guide 2024 | Benefits & Implementation",
        metaDescription:
          "Complete guide to migrating from client-side to server-side GTM. Improve data accuracy, page speed, and privacy compliance.",
      },
    },
    {
      _type: "blogPost",
      title: "Boost Your Conversion Tracking by 30% with Conversion API",
      slug: { _type: "slug", current: "conversion-api-implementation-guide" },
      excerpt:
        "A practical guide to implementing Meta and Google Conversion APIs to recover lost conversion data and improve campaign optimization.",
      author: "re:fabrika",
      publishedAt: "2024-12-05T10:00:00Z",
      tags: ["Conversion API", "Meta Ads", "Google Ads"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Conversion APIs represent the future of digital advertising measurement. By sending conversion data directly from your server to advertising platforms, you bypass browser limitations and recover data that would otherwise be lost. Here's how to implement them effectively.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Understanding Conversion API Architecture",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Both Meta's CAPI and Google's Enhanced Conversions work similarly: when a conversion occurs (purchase, lead, signup), your server sends the event data directly to the platform's API. The key difference from pixel tracking is the data path—it never touches the browser, making it immune to client-side limitations.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Event Deduplication is Critical",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "When running both pixel and CAPI, you must implement proper deduplication to avoid counting conversions twice. Use consistent event IDs across both channels. Platforms will deduplicate events with matching IDs, keeping the one received with higher data quality (typically the server-side event).",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Data Quality Best Practices",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Hash user data (email, phone) using SHA256 before sending. Send as many customer parameters as possible—email, phone, address, name—for better match rates. Include accurate event values and currency for proper optimization. Always send events as close to real-time as possible; delayed events are less valuable.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Measuring Implementation Success",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "After implementation, monitor Meta's Event Match Quality score (aim for 'Great'), compare conversion counts before/after, track cost per result changes, and watch for improved campaign learning phases. Most clients see 25-35% more conversions tracked within the first week.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Conversion API implementation is now table stakes for serious advertisers. The data you're missing without it directly impacts your campaign optimization, leading to higher costs and lower performance. Invest the time in proper implementation.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Conversion API Implementation Guide | Recover 30%+ Conversions",
        metaDescription:
          "Step-by-step guide to implementing Meta and Google Conversion APIs. Learn how to recover lost conversions and improve ad performance.",
      },
    },
    {
      _type: "blogPost",
      title: "Laravel 12: The Future of PHP and Modern Web Development",
      slug: { _type: "slug", current: "laravel-12-modern-php-development" },
      excerpt:
        "Explore the latest features in Laravel 12 and why it remains our framework of choice for complex web applications.",
      author: "re:fabrika",
      publishedAt: "2024-11-28T10:00:00Z",
      tags: ["Laravel", "PHP", "Web Development"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Laravel continues to push PHP development forward. With Laravel 12, we see further refinements that make building complex web applications faster, more secure, and more enjoyable. Here's why we continue to choose Laravel for our enterprise projects.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Performance Improvements",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Laravel 12 introduces significant performance optimizations in the routing layer and ORM. Lazy collections reduce memory usage for large datasets. Improved caching mechanisms and better query optimization reduce database load. Benchmark tests show 20-30% improvement in response times for typical CRUD operations.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Developer Experience Enhancements",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "The artisan CLI receives new commands and improved output formatting. Better error messages with more context help debugging. Native TypeScript support for Inertia stacks. Hot module replacement works out of the box with Vite. These improvements compound to significant time savings across projects.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Why We Choose Laravel",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "For projects requiring complex business logic, queue processing, scheduled tasks, and robust authentication, Laravel provides battle-tested solutions. The ecosystem—Forge, Vapor, Nova, Horizon—covers infrastructure and administration needs. The community and documentation are unmatched in the PHP world.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Real-World Application",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "Our Blue More Yachting project showcases Laravel 12's capabilities: handling complex booking logic, real-time availability sync, multi-currency processing, and integration with payment gateways. The application processes thousands of requests daily with sub-100ms response times.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Laravel 12 reinforces PHP's position as a mature, performant choice for modern web development. When you need reliability, scalability, and rapid development, Laravel delivers.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Laravel 12 Features & Benefits | Why We Use Laravel in 2024",
        metaDescription:
          "Discover Laravel 12's new features and why it remains the best choice for modern PHP web application development.",
      },
    },
    {
      _type: "blogPost",
      title: "Headless CMS Integration with Next.js 15: A Complete Guide",
      slug: { _type: "slug", current: "nextjs-15-headless-cms-sanity" },
      excerpt:
        "Learn how to build blazing-fast websites by combining Next.js 15's performance features with Sanity's flexible content management.",
      author: "re:fabrika",
      publishedAt: "2024-11-20T10:00:00Z",
      tags: ["Next.js", "Sanity CMS", "Jamstack"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "The combination of Next.js and a headless CMS like Sanity creates websites that are fast for users, flexible for content editors, and maintainable for developers. Next.js 15 introduces new features that make this integration even more powerful.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Why Headless Architecture",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Traditional CMS platforms like WordPress couple content and presentation. This creates limitations: themes restrict design, plugins cause conflicts, and scaling requires complex infrastructure. Headless CMS separates content from presentation, letting you use the best tools for each job.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Next.js 15 Performance Features",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Partial Prerendering combines static and dynamic content at the component level. Server Components reduce JavaScript sent to browsers. Improved Image and Font optimization. These features, combined with Vercel's edge network, deliver sub-second page loads globally.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Sanity as Content Backend",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Sanity provides real-time collaboration, structured content modeling, and a customizable studio. Content is delivered via a global CDN with <50ms response times. GROQ query language offers flexibility beyond GraphQL. The generous free tier covers most project needs.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "ISR and On-Demand Revalidation",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "Incremental Static Regeneration keeps pages fresh without rebuilding the entire site. Configure revalidation times per route. Use Sanity webhooks to trigger on-demand revalidation when content changes. This gives you the speed of static sites with the freshness of dynamic content.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "The Next.js + Sanity stack powers re:fabrika.com and many client projects. The developer experience, content flexibility, and end-user performance make it our go-to architecture for modern websites.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Next.js 15 + Sanity CMS Guide | Headless Website Development",
        metaDescription:
          "Complete guide to building fast, SEO-optimized websites with Next.js 15 and Sanity headless CMS.",
      },
    },
    {
      _type: "blogPost",
      title: "AI-Powered Personalization Strategies for E-commerce",
      slug: { _type: "slug", current: "ai-personalization-ecommerce" },
      excerpt:
        "How to implement AI-driven product recommendations, personalized content, and dynamic pricing to boost e-commerce conversions.",
      author: "re:fabrika",
      publishedAt: "2024-11-15T10:00:00Z",
      tags: ["AI", "E-commerce", "Personalization"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "AI personalization is no longer exclusive to Amazon-scale operations. Modern tools and APIs make sophisticated personalization accessible to e-commerce businesses of all sizes. Here's how to implement it effectively and the results you can expect.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Types of E-commerce Personalization",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Product recommendations: 'Customers who bought this also bought...' drives 35% of Amazon's revenue. Search personalization: Adjust search results based on browsing history and purchase patterns. Dynamic content: Show different hero banners, promotions, and messaging based on user segments. Personalized pricing: Strategic discounting for price-sensitive or high-value customers.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Implementation Approaches",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Start with collaborative filtering for product recommendations—it's proven and relatively simple. Use customer segments based on purchase history, browse behavior, and demographics. Integrate email personalization with on-site experience. Consider AI chatbots for personalized product discovery.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Tools and Platforms",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Algolia provides AI-powered search and recommendations. Dynamic Yield offers comprehensive personalization. Nosto specializes in e-commerce personalization. For custom implementations, OpenAI's APIs enable building sophisticated recommendation engines. Choose based on your platform, budget, and technical resources.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Measuring ROI",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "Track revenue per visitor for personalized vs. control groups. Measure recommendation click-through and conversion rates. Monitor average order value changes. Most implementations show 10-30% revenue lift when done correctly. Start small, prove value, then expand.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "AI personalization is a competitive necessity in modern e-commerce. The technology is accessible; the key is thoughtful implementation focused on genuine customer value rather than just technical novelty.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "AI Personalization for E-commerce | Implementation Guide",
        metaDescription:
          "Learn how to implement AI-powered product recommendations and personalization to boost e-commerce conversions by 10-30%.",
      },
    },
    {
      _type: "blogPost",
      title: "Digital Marketing Trends in Tourism Industry 2025",
      slug: { _type: "slug", current: "tourism-digital-marketing-trends-2025" },
      excerpt:
        "From AI chatbots to virtual tours, discover the digital marketing strategies reshaping the tourism and hospitality industry.",
      author: "re:fabrika",
      publishedAt: "2024-11-08T10:00:00Z",
      tags: ["Tourism", "Digital Marketing", "Trends"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "The tourism industry is experiencing a digital transformation. Travelers expect seamless digital experiences from discovery to booking to post-trip engagement. Here are the trends defining tourism marketing in 2025 and how to capitalize on them.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "AI-Powered Customer Service",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "AI chatbots handle booking inquiries, provide personalized recommendations, and offer 24/7 support in multiple languages. Modern chatbots understand context, remember preferences, and escalate to humans when needed. They reduce response times from hours to seconds while cutting support costs.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Virtual and Augmented Reality",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Virtual property tours are now expected for vacation rentals and hotels. 360° videos transport potential guests before booking. AR apps enhance on-site experiences with historical overlays and navigation. These technologies reduce booking hesitation and increase engagement.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Hyper-Personalized Marketing",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Generic email blasts don't work anymore. Travelers expect recommendations based on past trips, stated preferences, and implicit behavior signals. Dynamic website content, personalized email sequences, and targeted advertising create relevant experiences that convert.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Direct Booking Strategies",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "OTA commissions eat into margins. Smart tourism businesses invest in direct booking channels—optimized websites, Google Hotel Ads, metasearch presence, and loyalty programs. Our Villa Kalkan project achieved 60% direct bookings through comprehensive digital strategy.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Tourism marketing in 2025 is about meeting travelers where they are with personalized, technology-enhanced experiences. Those who embrace these trends will capture more direct bookings and build stronger customer relationships.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Tourism Digital Marketing Trends 2025 | AI, VR & Personalization",
        metaDescription:
          "Discover the digital marketing trends transforming tourism in 2025: AI chatbots, virtual tours, personalization, and direct booking strategies.",
      },
    },
    {
      _type: "blogPost",
      title: "PostgreSQL and Supabase: Building Modern Backend Infrastructure",
      slug: { _type: "slug", current: "postgresql-supabase-backend-guide" },
      excerpt:
        "How Supabase combines PostgreSQL's power with modern features like real-time subscriptions, auth, and edge functions.",
      author: "re:fabrika",
      publishedAt: "2024-11-01T10:00:00Z",
      tags: ["PostgreSQL", "Supabase", "Backend"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Supabase has emerged as a powerful alternative to Firebase, providing PostgreSQL's proven reliability with modern developer experience features. We've adopted it for projects requiring real-time capabilities, robust authentication, and scalable storage.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Why PostgreSQL",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "PostgreSQL is the world's most advanced open-source database. It handles complex queries, provides ACID compliance, supports JSON and geospatial data, and scales to massive workloads. Unlike proprietary databases, your data isn't locked into any platform.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Supabase Features",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Real-time subscriptions: Listen to database changes in your frontend. Built-in auth: Email, OAuth, magic links, and more. Edge Functions: Serverless functions at the edge. Storage: S3-compatible file storage with transformations. Row Level Security: Database-level access control. All features work with your existing PostgreSQL knowledge.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Use Cases",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "We use Supabase for applications requiring real-time updates (booking systems, dashboards), user authentication, file uploads, and rapid development. The Villa Kalkan project uses Supabase for booking management, customer auth, and document storage with great results.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "When to Use Supabase",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "Supabase excels for MVPs and products needing quick iteration, applications with real-time requirements, projects where PostgreSQL fits the data model, and teams wanting to avoid managing infrastructure. For complex custom backends, Laravel may still be preferred.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Supabase demonstrates that developer experience and PostgreSQL's power aren't mutually exclusive. It's become a core part of our stack for appropriate projects.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "PostgreSQL & Supabase Backend Guide | Modern Infrastructure",
        metaDescription:
          "Complete guide to building modern backends with Supabase and PostgreSQL. Real-time, auth, storage, and edge functions explained.",
      },
    },
    {
      _type: "blogPost",
      title: "Redis Caching Strategies: How to 10x Your Site Speed",
      slug: { _type: "slug", current: "redis-caching-strategies-performance" },
      excerpt:
        "Practical caching patterns using Redis and Upstash to dramatically improve web application performance.",
      author: "re:fabrika",
      publishedAt: "2024-10-25T10:00:00Z",
      tags: ["Redis", "Performance", "Caching"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Caching is the most effective way to improve application performance. Redis, especially through serverless providers like Upstash, makes implementing sophisticated caching strategies straightforward. Here's how we use caching to deliver sub-100ms response times.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "Understanding Cache Layers",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Effective caching uses multiple layers: CDN edge caching for static assets, application-level caching for computed results, and database query caching. Each layer reduces load on the layer behind it. The goal is serving most requests without hitting your database.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Common Caching Patterns",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Cache-aside: Check cache, fetch from DB if missing, store in cache. Write-through: Update cache and DB together. Time-based invalidation: TTL for data that can be slightly stale. Event-based invalidation: Clear cache when source data changes. Choose based on your data consistency requirements.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Upstash for Serverless",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Traditional Redis requires managing servers. Upstash provides serverless Redis with per-request pricing and global edge deployment. It integrates seamlessly with Vercel and Next.js. For most projects, the free tier (10K requests/day) is sufficient for development.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "Real-World Implementation",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "In Blue More Yachting, we cache yacht availability, pricing calculations, and search results. Cache invalidation triggers when bookings change. The result: complex availability queries that took 500ms from the database now return in 20ms from cache. User experience is dramatically improved.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "Caching isn't premature optimization—it's essential architecture. Start with simple patterns, measure everything, and expand coverage where you see database bottlenecks.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Redis Caching Strategies | 10x Performance Guide",
        metaDescription:
          "Learn effective Redis caching patterns with Upstash to dramatically improve web application performance and reduce database load.",
      },
    },
    {
      _type: "blogPost",
      title: "AI Agents and Automation: Maximizing Agency Productivity",
      slug: { _type: "slug", current: "ai-agents-agency-automation" },
      excerpt:
        "How we use AI agents to automate repetitive tasks, generate content, and multiply our team's effectiveness.",
      author: "re:fabrika",
      publishedAt: "2024-10-18T10:00:00Z",
      tags: ["AI", "Automation", "Productivity"],
      content: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "At re:fabrika, AI agents are integral team members. They handle research, generate content drafts, analyze data, and automate repetitive workflows. Here's how we've implemented AI automation to multiply our 5-person team's output.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h1",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "What We Mean by AI Agents",
            },
          ],
        },
        {
          _type: "block",
          _key: "p1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "AI agents are automated workflows powered by language models. Unlike simple chatbots, they can take actions: searching the web, analyzing documents, writing to databases, sending emails. We build agents for specific tasks—content research, competitor analysis, report generation—that run independently.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "Our AI Workflows",
            },
          ],
        },
        {
          _type: "block",
          _key: "p2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Content research agents gather industry news and trends. Writing agents generate first drafts for social posts and blog articles (humans edit). Analytics agents prepare weekly reports from ad platforms. Code review agents catch common issues before human review. Each saves hours of repetitive work.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h3",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s6",
              text: "Building Effective Agents",
            },
          ],
        },
        {
          _type: "block",
          _key: "p3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s7",
              text: "Start with well-defined, repetitive tasks. Provide clear instructions and examples. Include verification steps—agents make mistakes. Build in human review for anything client-facing. Use appropriate models: GPT-4 for complex reasoning, Claude for writing, cheaper models for simple tasks.",
            },
          ],
        },
        {
          _type: "block",
          _key: "h4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "s8",
              text: "The Human-AI Balance",
            },
          ],
        },
        {
          _type: "block",
          _key: "p4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s9",
              text: "AI handles research, first drafts, and data processing. Humans provide strategy, creativity, client relationships, and quality control. The combination is more powerful than either alone. Our 10+ AI agents effectively multiply team capacity without losing the human touch clients value.",
            },
          ],
        },
        {
          _type: "block",
          _key: "conclusion",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s10",
              text: "AI automation isn't about replacing people—it's about freeing them from repetitive tasks to focus on high-value work. Start small, measure impact, and expand what works.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "AI Agents for Agency Productivity | Automation Guide",
        metaDescription:
          "Learn how AI agents and automation can multiply your team's productivity. Practical guide from a 5-person agency using 10+ AI agents.",
      },
    },
  ];

  for (const post of posts) {
    await client.create(post);
    console.log(`   Created blog post: ${post.title}`);
  }

  console.log("✅ Blog posts created\n");
}

async function createHomePage() {
  console.log("🏠 Creating home page...");

  // First get references to created content
  const services = await client.fetch(`*[_type == "service"]{ _id, title }`);
  const portfolios = await client.fetch(`*[_type == "portfolio"]{ _id, title }`);
  const blogs = await client.fetch(`*[_type == "blogPost"]{ _id, title } | order(publishedAt desc)[0...3]`);

  await client.create({
    _type: "homePage",
    // Hero Section
    heroSubtitle: "Creative Agency",
    heroTitle: "We craft digital experiences that transform businesses",
    heroLocation: "Fethiye, Turkey",
    heroDescription:
      "AI-powered creative agency delivering innovative digital solutions since 2009. We combine cutting-edge technology with strategic thinking to help brands stand out in the digital landscape.",
    heroButtonText: "Start a Project",
    heroButtonLink: "/contact",
    heroStats: "150+ Brands Transformed",
    heroSocialLinks: [
      { _key: "ig", label: "Instagram", url: "https://instagram.com/refabrika" },
      { _key: "be", label: "Behance", url: "https://behance.net/refabrika" },
      { _key: "li", label: "LinkedIn", url: "https://linkedin.com/company/refabrika" },
    ],

    // About Section
    aboutTitle: "About re:fabrika",
    aboutYearStart: "2009",
    aboutYearEnd: "Present",
    aboutDescription:
      "Since 2009, we've been at the forefront of digital innovation. Our journey began with a vision to transform how brands connect with their audiences. Today, we're an AI-powered creative agency that combines cutting-edge technology with human creativity. Our team has collaborated with leading brands including Turkcell, Garanti Bank, İşbank, Tunçmatik, Dedeman Hotels, and Lukoil, delivering innovative digital solutions that drive measurable results. Based in Fethiye with a liaison office in Istanbul, we serve clients across Turkey and internationally.",
    aboutButtonText: "Learn More",
    aboutButtonLink: "/about",

    // Work Section
    workSectionTitle: "Selected Work",
    workButtonText: "View All Projects",
    featuredWorks: portfolios.map((p: {_id: string}) => ({
      _type: "reference",
      _ref: p._id,
      _key: p._id,
    })),

    // Services Section
    servicesSectionTitle: "What We Do",
    servicesSubtitle: "Our Services",
    servicesDescription:
      "From brand identity to full-stack development, we offer comprehensive digital solutions powered by the latest technologies and AI tools.",
    featuredServices: services.map((s: {_id: string}) => ({
      _type: "reference",
      _ref: s._id,
      _key: s._id,
    })),

    // Clients Section
    clientTitle: "Trusted by Leading Brands",
    clientDescription:
      "We've had the privilege of working with some amazing brands across various industries, from startups to Fortune 500 companies.",

    // Blog Section
    blogSectionTitle: "Latest Insights",
    blogButtonText: "Read All Articles",
    featuredBlogs: blogs.map((b: {_id: string}) => ({
      _type: "reference",
      _ref: b._id,
      _key: b._id,
    })),

    // SEO
    seo: {
      metaTitle: "re:fabrika | AI-Powered Creative Agency | Fethiye & Istanbul",
      metaDescription:
        "AI-powered creative agency delivering branding, web development, and digital marketing solutions since 2009. Transform your digital presence with re:fabrika.",
    },
  });

  console.log("✅ Home page created\n");
}

async function createPages() {
  console.log("📄 Creating other pages...");

  // Blog Page
  await client.create({
    _type: "blogPage",
    pageTitle: "Blog & Insights",
    seo: {
      metaTitle: "Blog | Digital Marketing & Web Development Insights | re:fabrika",
      metaDescription:
        "Expert insights on digital marketing, web development, AI, and technology. Learn from our experience building successful digital products.",
    },
  });
  console.log("   Created Blog Page");

  // Portfolio Page
  await client.create({
    _type: "portfolioPage",
    pageTitle: "Our Work",
    seo: {
      metaTitle: "Portfolio | Case Studies & Projects | re:fabrika",
      metaDescription:
        "Explore our portfolio of branding, web development, and digital marketing projects. See how we've helped businesses transform their digital presence.",
    },
  });
  console.log("   Created Portfolio Page");

  // Services Page
  await client.create({
    _type: "servicesPage",
    pageTitle: "Our Services",
    pageSubtitle: "What We Offer",
    pageDescription:
      "Comprehensive digital solutions from branding to development to marketing. We combine AI-powered tools with human creativity to deliver exceptional results.",
    seo: {
      metaTitle: "Services | Branding, Web Development, Digital Marketing | re:fabrika",
      metaDescription:
        "Full-service digital agency offering branding, web development, e-commerce, SEO, social media, and AI-powered marketing solutions.",
    },
  });
  console.log("   Created Services Page");

  // FAQ Page
  await client.create({
    _type: "faqPage",
    pageTitle: "Frequently Asked Questions",
    faqs: [
      {
        _key: "faq1",
        question: "What is the minimum project budget?",
        answer:
          "Our minimum project engagement starts at $5,000. This ensures we can deliver quality work with proper attention to strategy, design, and execution. For ongoing services like social media management or ad management, monthly retainers start at $1,000.",
      },
      {
        _key: "faq2",
        question: "How does your project process work?",
        answer:
          "We follow international standards with a structured approach: Discovery (understanding your needs), Strategy (planning the approach), Execution (design and development), and Launch (deployment and optimization). Throughout, you have regular check-ins and approval stages.",
      },
      {
        _key: "faq3",
        question: "What are your payment terms?",
        answer:
          "We offer flexible payment arrangements. Typically, projects start with a 50% deposit, with the remainder due at project milestones or completion. For ongoing services, we bill monthly. We accept bank transfer and international payments.",
      },
      {
        _key: "faq4",
        question: "Which industries do you serve?",
        answer:
          "We specialize in tourism and e-commerce, but our expertise extends to various B2B and B2C sectors. Our methodologies are adaptable—what matters is understanding your specific market and audience.",
      },
      {
        _key: "faq5",
        question: "How big is your team?",
        answer:
          "Our core team consists of 5 senior professionals with 2-3 junior team members. Additionally, we leverage 10+ AI agents for research, content generation, and automation. This combination allows us to deliver enterprise-quality work with boutique agency attention.",
      },
      {
        _key: "faq6",
        question: "How do you use AI in your work?",
        answer:
          "AI is integral to our process. We use AI agents for market research, content drafting, data analysis, and workflow automation. For technical work, AI assists with code review and testing. Human expertise guides strategy, creativity, and quality—AI multiplies our capacity.",
      },
      {
        _key: "faq7",
        question: "Do you work with international clients?",
        answer:
          "Yes, we work with clients globally. With offices in Fethiye and Istanbul, we serve the Turkish market while our English-speaking team handles international projects. We're experienced with remote collaboration across time zones.",
      },
      {
        _key: "faq8",
        question: "What technologies do you use?",
        answer:
          "We use modern, proven technologies: Next.js and React for frontends, Laravel for complex backends, Sanity CMS for content management, PostgreSQL and Redis for data, and Vercel for deployment. We choose the right tools for each project's needs.",
      },
    ],
    seo: {
      metaTitle: "FAQ | Common Questions About Our Services | re:fabrika",
      metaDescription:
        "Find answers to common questions about our services, pricing, process, and team. Learn how re:fabrika can help transform your digital presence.",
    },
  });
  console.log("   Created FAQ Page");

  // Contact Page
  await client.create({
    _type: "contactPage",
    pageTitle: "Get in Touch",
    sectionTitle: "Let's Create Together",
    sectionDescription:
      "Ready to transform your digital presence? Tell us about your project and we'll get back to you within 24 hours.",
    followTitle: "Follow Us",
    formLabels: {
      namePlaceholder: "Your Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone Number",
      companyPlaceholder: "Company Name",
      budgetPlaceholder: "Project Budget",
      solutionPlaceholder: "What solution are you looking for?",
      messagePlaceholder: "Tell us about your project...",
      buttonText: "Send Message",
    },
    budgetOptions: [
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "$25,000 - $50,000",
      "$50,000+",
    ],
    seo: {
      metaTitle: "Contact Us | Start Your Project | re:fabrika",
      metaDescription:
        "Ready to start your project? Contact re:fabrika for branding, web development, and digital marketing services. We respond within 24 hours.",
    },
  });
  console.log("   Created Contact Page");

  console.log("✅ All pages created\n");
}

async function main() {
  console.log("\n🚀 Starting re:fabrika Production Content Migration\n");
  console.log("=".repeat(50) + "\n");

  try {
    await deleteAllContent();
    await createSiteSettings();
    await createNavigation();
    await createServices();
    await createPortfolio();
    await createBlogPosts();
    await createHomePage();
    await createPages();

    console.log("=".repeat(50));
    console.log("\n✨ Production content migration complete!\n");
    console.log("📋 Summary:");
    console.log("   - 1 Site Settings document");
    console.log("   - 1 Navigation document");
    console.log("   - 5 Services with FAQs");
    console.log("   - 3 Portfolio projects");
    console.log("   - 10 Blog posts");
    console.log("   - 1 Home page");
    console.log("   - 5 Other pages (Blog, Portfolio, Services, FAQ, Contact)");
    console.log("\n📸 Next step: Add images in Sanity Studio (/studio)\n");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
