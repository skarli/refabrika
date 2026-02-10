import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "28nepg2u",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function deleteAllContent() {
  console.log("🗑️  Mevcut içerikler siliniyor...");

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
    "contactSubmission",
  ];

  for (const type of types) {
    const docs = await client.fetch(`*[_type == "${type}"]._id`);
    if (docs.length > 0) {
      console.log(`  - ${type}: ${docs.length} belge siliniyor`);
      for (const id of docs) {
        await client.delete(id);
      }
    }
  }
  console.log("✅ Tüm içerikler silindi!\n");
}

async function seedContent() {
  console.log("🚀 re:fabrika içerikleri oluşturuluyor...\n");

  // ==================== 1. SITE SETTINGS ====================
  console.log("📝 Site ayarları oluşturuluyor...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "re:fabrika",
    siteDescription:
      "Digital marketing & brand growth agency. We build brands that perform.",
    headerText:
      "re:fabrika — digital marketing\n& brand growth agency\n[since 2009]",
    footerText: "Crafted with intent, built to stand out.",
    ctaText: "Let's build a brand now",
    ctaLink: "/contact",
    socialLinks: {
      instagram: "https://instagram.com/refabrika",
      facebook: "https://facebook.com/refabrika",
      twitter: "https://twitter.com/refabrika",
      linkedin: "https://linkedin.com/company/refabrika",
      behance: "https://behance.net/refabrika",
      dribbble: "https://dribbble.com/refabrika",
    },
    contactInfo: {
      email: "sadettin@refabrika.com",
      phone: "+90 532 374 55 68",
      address: "Mustafa Kemal Blv., 158A Muğla/Fethiye",
    },
  });

  // ==================== 2. NAVIGATION ====================
  console.log("🧭 Navigasyon oluşturuluyor...");
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    mainMenu: [
      { _key: "nav1", label: "Home", href: "/" },
      { _key: "nav2", label: "Services", href: "/services" },
      { _key: "nav3", label: "Portfolio", href: "/portfolio" },
      { _key: "nav4", label: "Blog", href: "/blog" },
      { _key: "nav5", label: "FAQ", href: "/faq" },
      { _key: "nav6", label: "Contact", href: "/contact" },
    ],
    sideMenuContactTitle: "Contact US",
    sideMenuButtonText: "Let's Talk",
  });

  // ==================== 3. SERVICES ====================
  console.log("🛠️  Hizmetler oluşturuluyor...");
  const services = await Promise.all([
    client.create({
      _type: "service",
      title: "Social Media Management",
      slug: { _type: "slug", current: "social-media-management" },
      number: "(001)",
      shortDescription:
        "End-to-end social media strategy, content creation, and community management across all platforms.",
      order: 1,
      heroDescription:
        "We create and manage your social media presence across all platforms. From content creation to community management, we handle it all.",
      heroFeatures: ["Strategy", "Content Creation", "Community Management"],
      approachTitle: "Our social media approach",
      approachDescription:
        "We believe in data-driven social media strategies that connect your brand with your audience.",
      approachSteps: [
        {
          _key: "step1",
          title: "Strategy Development",
          description:
            "We analyze your brand, audience, and competitors to create a tailored social media strategy.",
        },
        {
          _key: "step2",
          title: "Content Creation",
          description:
            "Our creative team produces engaging content that resonates with your target audience.",
        },
        {
          _key: "step3",
          title: "Community Management",
          description:
            "We engage with your followers, respond to comments, and build a loyal community around your brand.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Platform Expertise",
          description:
            "Deep knowledge of Instagram, Facebook, Twitter, LinkedIn, and TikTok.",
        },
        {
          _key: "f2",
          title: "Content Calendar",
          description:
            "Organized and strategic content planning for consistent posting.",
        },
        {
          _key: "f3",
          title: "Analytics & Reporting",
          description:
            "Monthly reports with actionable insights to improve performance.",
        },
      ],
      seo: {
        metaTitle: "Social Media Management | re:fabrika",
        metaDescription:
          "Professional social media management services. Strategy, content creation, and community management for your brand.",
      },
    }),
    client.create({
      _type: "service",
      title: "Google & Meta Ads",
      slug: { _type: "slug", current: "google-meta-ads" },
      number: "(002)",
      shortDescription:
        "Data-driven paid advertising campaigns on Google, Facebook, and Instagram to maximize your ROI.",
      order: 2,
      heroDescription:
        "We create and optimize paid advertising campaigns that deliver results. From Google Ads to Meta Ads, we help you reach your target audience.",
      heroFeatures: ["Google Ads", "Meta Ads", "ROI Optimization"],
      approachTitle: "Our advertising approach",
      approachDescription:
        "Performance-driven campaigns with continuous optimization for maximum return on investment.",
      approachSteps: [
        {
          _key: "step1",
          title: "Campaign Strategy",
          description:
            "We develop comprehensive campaign strategies aligned with your business goals.",
        },
        {
          _key: "step2",
          title: "Ad Creation",
          description:
            "Our team creates compelling ad creatives that convert viewers into customers.",
        },
        {
          _key: "step3",
          title: "Optimization",
          description:
            "Continuous A/B testing and optimization to improve campaign performance.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Targeting Precision",
          description:
            "Reach the right audience with advanced targeting options.",
        },
        {
          _key: "f2",
          title: "Budget Optimization",
          description: "Maximize your ad spend with smart bidding strategies.",
        },
        {
          _key: "f3",
          title: "Conversion Tracking",
          description:
            "Track every conversion to understand your campaign performance.",
        },
      ],
      seo: {
        metaTitle: "Google & Meta Ads | re:fabrika",
        metaDescription:
          "Data-driven Google and Meta advertising campaigns. Maximize your ROI with our expert ad management.",
      },
    }),
    client.create({
      _type: "service",
      title: "Digital Marketing Strategy",
      slug: { _type: "slug", current: "digital-marketing-strategy" },
      number: "(003)",
      shortDescription:
        "Comprehensive digital strategies tailored to your brand goals, audience, and market positioning.",
      order: 3,
      heroDescription:
        "We develop comprehensive digital marketing strategies that align with your business objectives and drive measurable results.",
      heroFeatures: ["Market Analysis", "Strategy Development", "Implementation"],
      approachTitle: "Our strategic approach",
      approachDescription:
        "Data-driven strategies that position your brand for long-term success in the digital landscape.",
      approachSteps: [
        {
          _key: "step1",
          title: "Discovery & Analysis",
          description:
            "We analyze your market, competitors, and target audience to identify opportunities.",
        },
        {
          _key: "step2",
          title: "Strategy Development",
          description:
            "We create a customized digital marketing roadmap for your brand.",
        },
        {
          _key: "step3",
          title: "Execution & Monitoring",
          description:
            "We implement the strategy and continuously monitor performance.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Market Research",
          description:
            "In-depth analysis of your market and competitive landscape.",
        },
        {
          _key: "f2",
          title: "Channel Strategy",
          description: "Optimal channel mix for maximum reach and engagement.",
        },
        {
          _key: "f3",
          title: "KPI Framework",
          description: "Clear metrics to measure and track your success.",
        },
      ],
      seo: {
        metaTitle: "Digital Marketing Strategy | re:fabrika",
        metaDescription:
          "Comprehensive digital marketing strategies tailored to your brand. Data-driven approach for measurable results.",
      },
    }),
    client.create({
      _type: "service",
      title: "Brand Identity & Design",
      slug: { _type: "slug", current: "brand-identity-design" },
      number: "(004)",
      shortDescription:
        "Visual identity systems, logo design, and brand guidelines that make your business stand out.",
      order: 4,
      heroDescription:
        "We create distinctive brand identities that communicate your values and connect with your audience.",
      heroFeatures: ["Logo Design", "Brand Guidelines", "Visual Identity"],
      approachTitle: "Our design approach",
      approachDescription:
        "We believe in creating brands that are not just beautiful, but meaningful and memorable.",
      approachSteps: [
        {
          _key: "step1",
          title: "Brand Discovery",
          description:
            "We dive deep into your brand values, mission, and target audience.",
        },
        {
          _key: "step2",
          title: "Concept Development",
          description:
            "We explore multiple creative directions before refining the final concept.",
        },
        {
          _key: "step3",
          title: "Design & Delivery",
          description:
            "We create comprehensive brand assets and guidelines for consistent application.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Logo Design",
          description:
            "Distinctive logos that capture your brand essence.",
        },
        {
          _key: "f2",
          title: "Brand Guidelines",
          description: "Comprehensive rules for consistent brand application.",
        },
        {
          _key: "f3",
          title: "Visual Assets",
          description: "Complete set of brand materials for all touchpoints.",
        },
      ],
      seo: {
        metaTitle: "Brand Identity & Design | re:fabrika",
        metaDescription:
          "Professional brand identity design services. Logo design, brand guidelines, and visual identity systems.",
      },
    }),
    client.create({
      _type: "service",
      title: "Web Design & Development",
      slug: { _type: "slug", current: "web-design-development" },
      number: "(005)",
      shortDescription:
        "High-performance websites and landing pages built to convert visitors into customers.",
      order: 5,
      heroDescription:
        "We design and develop websites that not only look great but also drive conversions and business growth.",
      heroFeatures: ["Web Design", "Development", "Performance Optimization"],
      approachTitle: "Our development approach",
      approachDescription:
        "We build fast, secure, and scalable websites using modern technologies and best practices.",
      approachSteps: [
        {
          _key: "step1",
          title: "UX/UI Design",
          description:
            "We create user-centered designs that deliver exceptional experiences.",
        },
        {
          _key: "step2",
          title: "Development",
          description:
            "We build your website using modern frameworks and clean code.",
        },
        {
          _key: "step3",
          title: "Launch & Optimize",
          description:
            "We launch your site and continuously optimize for performance.",
        },
      ],
      featureCards: [
        {
          _key: "f1",
          title: "Responsive Design",
          description: "Beautiful on every device, from mobile to desktop.",
        },
        {
          _key: "f2",
          title: "SEO Optimized",
          description: "Built with search engines in mind for better visibility.",
        },
        {
          _key: "f3",
          title: "Fast Performance",
          description: "Lightning-fast load times for better user experience.",
        },
      ],
      seo: {
        metaTitle: "Web Design & Development | re:fabrika",
        metaDescription:
          "Professional web design and development services. High-performance websites that convert visitors into customers.",
      },
    }),
  ]);

  // ==================== 4. PORTFOLIO ====================
  console.log("💼 Portfolyo projeleri oluşturuluyor...");
  const portfolioItems = await Promise.all([
    client.create({
      _type: "portfolio",
      title: "Harash Denmark",
      slug: { _type: "slug", current: "harash-denmark" },
      year: "2010",
      tags: ["Branding"],
      order: 1,
      featured: true,
      client: "Harash Denmark",
      service: "Branding",
      date: "2010",
      shortDescription:
        "Complete brand identity and visual design for Harash Denmark.",
      seo: {
        metaTitle: "Harash Denmark | re:fabrika Portfolio",
        metaDescription:
          "Brand identity project for Harash Denmark. Complete visual design and branding solutions.",
      },
    }),
    client.create({
      _type: "portfolio",
      title: "Saudi Lime Green",
      slug: { _type: "slug", current: "saudi-lime-green" },
      year: "2010",
      tags: ["Marketing"],
      order: 2,
      featured: true,
      client: "Saudi Lime Green",
      service: "Digital Marketing",
      date: "2010",
      shortDescription:
        "Digital marketing strategy and campaign execution for Saudi Lime Green.",
      seo: {
        metaTitle: "Saudi Lime Green | re:fabrika Portfolio",
        metaDescription:
          "Marketing project for Saudi Lime Green. Digital marketing strategy and campaign management.",
      },
    }),
    client.create({
      _type: "portfolio",
      title: "Saudi Venture Capital",
      slug: { _type: "slug", current: "saudi-venture-capital" },
      year: "2010",
      tags: ["Marketing"],
      order: 3,
      featured: true,
      client: "Saudi Venture Capital",
      service: "Marketing Strategy",
      date: "2010",
      shortDescription:
        "Strategic marketing solutions for Saudi Venture Capital.",
      seo: {
        metaTitle: "Saudi Venture Capital | re:fabrika Portfolio",
        metaDescription:
          "Marketing strategy project for Saudi Venture Capital.",
      },
    }),
    client.create({
      _type: "portfolio",
      title: "Nilachal Network",
      slug: { _type: "slug", current: "nilachal-network" },
      year: "2010",
      tags: ["Marketing"],
      order: 4,
      featured: true,
      client: "Nilachal Network",
      service: "Digital Marketing",
      date: "2010",
      shortDescription:
        "Comprehensive marketing solutions for Nilachal Network.",
      seo: {
        metaTitle: "Nilachal Network | re:fabrika Portfolio",
        metaDescription:
          "Marketing project for Nilachal Network. Digital marketing and brand growth.",
      },
    }),
    client.create({
      _type: "portfolio",
      title: "Royal Cash App",
      slug: { _type: "slug", current: "royal-cash-app" },
      year: "2010",
      tags: ["Design"],
      order: 5,
      featured: true,
      client: "Royal Cash",
      service: "App Design",
      date: "2010",
      shortDescription: "Mobile app design for Royal Cash payment application.",
      seo: {
        metaTitle: "Royal Cash App | re:fabrika Portfolio",
        metaDescription:
          "App design project for Royal Cash. Mobile payment application design.",
      },
    }),
    client.create({
      _type: "portfolio",
      title: "Mashup Gradient",
      slug: { _type: "slug", current: "mashup-gradient" },
      year: "2010",
      tags: ["Design"],
      order: 6,
      featured: true,
      client: "Mashup Gradient",
      service: "Visual Design",
      date: "2010",
      shortDescription:
        "Creative visual design and branding for Mashup Gradient.",
      seo: {
        metaTitle: "Mashup Gradient | re:fabrika Portfolio",
        metaDescription:
          "Design project for Mashup Gradient. Creative visual design solutions.",
      },
    }),
  ]);

  // ==================== 5. BLOG POSTS ====================
  console.log("📰 Blog yazıları oluşturuluyor...");
  const blogPosts = await Promise.all([
    client.create({
      _type: "blogPost",
      title: "Beyond the basics, how to take marketing to the next level",
      slug: {
        _type: "slug",
        current: "beyond-the-basics-how-to-take-marketing-to-the-next-level",
      },
      excerpt:
        "Learn advanced marketing strategies that will help your brand stand out and achieve measurable growth.",
      author: "re:fabrika",
      publishedAt: "2023-01-15T10:00:00Z",
      content: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Marketing has evolved significantly over the years, and what worked yesterday may not work today. In this article, we explore advanced marketing strategies that can take your brand to the next level.",
            },
          ],
        },
      ],
      seo: {
        metaTitle:
          "Beyond the Basics: Advanced Marketing Strategies | re:fabrika",
        metaDescription:
          "Learn advanced marketing strategies to help your brand stand out and achieve growth.",
      },
    }),
    client.create({
      _type: "blogPost",
      title: "Allow us to be the cool part of your days are open for now",
      slug: {
        _type: "slug",
        current: "allow-us-to-be-the-cool-part-of-your-days",
      },
      excerpt:
        "Discover how creative partnerships can transform your brand presence and connect with your audience.",
      author: "re:fabrika",
      publishedAt: "2023-02-20T10:00:00Z",
      content: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "In today's fast-paced digital world, standing out requires more than just good products. It requires creative partnerships and innovative approaches to reach your audience.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Creative Partnerships for Brand Growth | re:fabrika",
        metaDescription:
          "Discover how creative partnerships can transform your brand presence.",
      },
    }),
    client.create({
      _type: "blogPost",
      title: "Various ideas and creative concepts based on market research",
      slug: {
        _type: "slug",
        current: "various-ideas-and-creative-concepts-based-on-market-research",
      },
      excerpt:
        "How market research can fuel creative ideas and help you develop concepts that resonate with your target audience.",
      author: "re:fabrika",
      publishedAt: "2023-03-10T10:00:00Z",
      content: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Market research is the foundation of any successful marketing campaign. It provides insights that can fuel creative ideas and help you develop concepts that truly resonate with your audience.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Market Research for Creative Concepts | re:fabrika",
        metaDescription:
          "How market research can fuel creative ideas for your brand.",
      },
    }),
    client.create({
      _type: "blogPost",
      title: "Create compelling visuals that grab attention to your customer",
      slug: {
        _type: "slug",
        current: "create-compelling-visuals-that-grab-attention",
      },
      excerpt:
        "Visual content is key to capturing attention in today's crowded digital landscape. Learn how to create visuals that convert.",
      author: "re:fabrika",
      publishedAt: "2023-04-05T10:00:00Z",
      content: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "In a world where attention spans are shorter than ever, compelling visuals can make the difference between being noticed and being ignored. Here's how to create visuals that capture attention and drive action.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Creating Compelling Visual Content | re:fabrika",
        metaDescription:
          "Learn how to create visual content that grabs attention and converts.",
      },
    }),
  ]);

  // ==================== 6. HOME PAGE ====================
  console.log("🏠 Ana sayfa oluşturuluyor...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    // Hero
    heroSubtitle: "Full-service digital agency — Since 2009®",
    heroTitle: "Strategy-driven digital agency, based in",
    heroLocation: "Fethiye",
    heroDescription:
      "We build brands that perform. From social media management and Google & Meta ads to full-scale digital marketing strategy, we turn visibility into measurable growth.",
    heroButtonText: "Get started",
    heroButtonLink: "/contact",
    heroStats: "17 years of digital excellence",
    heroSocialLinks: [
      { _key: "s1", label: "Instagram", url: "https://instagram.com/refabrika" },
      { _key: "s2", label: "Linkedin", url: "https://linkedin.com/company/refabrika" },
      { _key: "s3", label: "Behance", url: "https://behance.net/refabrika" },
      { _key: "s4", label: "X (Twitter)", url: "https://twitter.com/refabrika" },
    ],
    // About
    aboutTitle:
      "Creating virtual emotion in the universe, for the largest brands & market since",
    aboutYearStart: "2009",
    aboutYearEnd: "2026",
    aboutDescription:
      "We help brands and people be part of the solution. As a cause-led branding and communications agency, we harness the power of technology and creativity to drive positive changes. Whether your inquiries are big or small, we're prepared to engage, focusing on complex problems",
    aboutButtonText: "Learn More",
    aboutButtonLink: "/contact",
    // Work
    workSectionTitle: "We find the unique, easy solution for each creative project",
    workButtonText: "View all work",
    featuredWorks: portfolioItems.map((p) => ({
      _type: "reference",
      _ref: p._id,
      _key: p._id,
    })),
    // Services
    servicesSubtitle: "Services",
    servicesSectionTitle: "Services we provide",
    servicesDescription:
      "We are here to build solid and courageous brands that can leave a strong mark on the world.",
    featuredServices: services.map((s) => ({
      _type: "reference",
      _ref: s._id,
      _key: s._id,
    })),
    // Client
    clientTitle:
      "Client: Helping brands to grow and say their success stories to the world.",
    clientDescription:
      "We're a great team of creatives with a strongest capabilities to helping progressive fields achieve their goals. With the best talent on every project done successfully",
    // Blog
    blogSectionTitle: "Learn our recent journal",
    blogButtonText: "Learn all news",
    featuredBlogs: blogPosts.slice(0, 3).map((b) => ({
      _type: "reference",
      _ref: b._id,
      _key: b._id,
    })),
    // SEO
    seo: {
      metaTitle: "re:fabrika | Digital Marketing & Brand Growth Agency",
      metaDescription:
        "Full-service digital agency based in Fethiye. Social media management, Google & Meta ads, and digital marketing strategy since 2009.",
    },
  });

  // ==================== 7. FAQ PAGE ====================
  console.log("❓ SSS sayfası oluşturuluyor...");
  await client.createOrReplace({
    _id: "faqPage",
    _type: "faqPage",
    pageTitle: "Learn some common answers about newly projects",
    faqs: [
      {
        _key: "faq1",
        question: "What services does re:fabrika offer?",
        answer:
          "We provide social media management, Google & Meta advertising, digital marketing strategy, brand identity design, and web development. Our full-service approach means we handle everything from strategy to execution.",
      },
      {
        _key: "faq2",
        question: "How do you measure the success of a campaign?",
        answer:
          "We track key performance indicators (KPIs) specific to each project — from engagement rates and reach on social media to conversion rates and ROAS on paid advertising. Monthly reports keep you informed on progress and ROI.",
      },
      {
        _key: "faq3",
        question: "What is your typical project timeline?",
        answer:
          "Timelines vary by scope. A social media strategy launch typically takes 2-3 weeks, brand identity projects 4-6 weeks, and full digital marketing campaigns 3-4 weeks from brief to go-live. We always align on deadlines before starting.",
      },
      {
        _key: "faq4",
        question: "Do you work with small businesses or only large brands?",
        answer:
          "We work with businesses of all sizes. Whether you are a startup looking to build your first digital presence or an established brand scaling your marketing efforts, we tailor our approach to your budget and goals.",
      },
      {
        _key: "faq5",
        question: "How does the onboarding process work?",
        answer:
          "It starts with a discovery call where we learn about your brand, goals, and target audience. From there we prepare a tailored proposal and strategy. Once approved, we kick off with a detailed roadmap and content calendar.",
      },
      {
        _key: "faq6",
        question: "Can you manage our existing ad accounts?",
        answer:
          "Absolutely. We can audit your current Google Ads, Meta Ads, or other platforms, identify optimization opportunities, and take over management to improve performance while maintaining your existing campaigns.",
      },
      {
        _key: "faq7",
        question: "What makes re:fabrika different from other agencies?",
        answer:
          "With 17 years of experience, we combine strategic thinking with hands-on execution. We are a boutique agency that gives every client personal attention — no junior account managers, no cookie-cutter solutions. Your growth is our priority.",
      },
    ],
    seo: {
      metaTitle: "FAQ - Frequently Asked Questions | re:fabrika",
      metaDescription:
        "Common questions about our digital marketing services. Learn about our approach, timelines, and how we can help your brand grow.",
    },
  });

  // ==================== 8. CONTACT PAGE ====================
  console.log("📞 İletişim sayfası oluşturuluyor...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    pageTitle: "Let's drop us a line and get the project started.",
    sectionTitle: "Get in touch",
    sectionDescription:
      "We're excited to hear from you and let's start something special together",
    followTitle: "Follow",
    formLabels: {
      namePlaceholder: "Name*",
      emailPlaceholder: "Email*",
      phonePlaceholder: "Phone*",
      companyPlaceholder: "Company",
      budgetPlaceholder: "Budget*",
      solutionPlaceholder: "Solution*",
      messagePlaceholder: "Message*",
      buttonText: "Send Message",
    },
    budgetOptions: [
      "5,000 - 10,000",
      "10,000 - 15,000",
      "15,000 - 20,000",
      "20,000 - 25,000",
      "25,000 - Above",
    ],
    seo: {
      metaTitle: "Contact Us | re:fabrika",
      metaDescription:
        "Get in touch with re:fabrika. Let's discuss your digital marketing needs and start building your brand.",
    },
  });

  console.log("\n✅ Tüm içerikler başarıyla oluşturuldu!");
  console.log("\n📊 Özet:");
  console.log("- 1 Site Settings");
  console.log("- 1 Navigation");
  console.log("- 5 Services");
  console.log("- 6 Portfolio Items");
  console.log("- 4 Blog Posts");
  console.log("- 1 Home Page");
  console.log("- 1 FAQ Page");
  console.log("- 1 Contact Page");
}

async function main() {
  try {
    await deleteAllContent();
    await seedContent();
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
}

main();
