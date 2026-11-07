
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  featuredPoint:string;
  image:string;
  caseStudyUrl?:string;
  liveUrl?:string;
  featured?:boolean;
}

export const projects: Project[] = [
  {
    slug: "darna",
    title: "DARNA",
    category: "E-Commerce Business System",
    year: "2026",
    description:
      "A conversion-focused landing page solution built for the Algerian e-commerce market, backed by a custom dashboard that centralizes order management, delivery operations, shipping rates, and marketing tracking.",
    stack: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Tailwind CSS",
      "REST API",
      "Custom WordPress Plugin Architecture",
      "External Shipping API Integrations",
      "Meta Pixel",
      "TikTok Pixel",
      "Google Tracking",
    ],
    featuredPoint:
      "A centralized business management system combining custom landing pages, order processing, 58-Wilaya shipping rate management, scalable multi-carrier integrations targeting 80+ delivery companies, and multi-platform marketing tracking.",
    image: "/projects/darna.webp",
    liveUrl: "https://darna.wldelroudjishoes.com",
    featured: true,
  },
  {
  slug: "lumen-store",
  title: "Lumen Store",
  category: "eCommerce",
  year: "2026",
  description:
    "A custom WooCommerce fashion store focused on a clean shopping experience and flexible store management.",
  stack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS"],
  featuredPoint: "Custom storefront and WooCommerce management experience.",
  image: "/projects/lumen-store.webp",
  liveUrl:"https://lumen-store.42web.io",
  featured:true,
},

  {
  slug:"delivery-manager",
  title: "Delivery Manager",
  category: "Business System",
  year: "2026",
  description:
    "A custom WooCommerce system for managing orders, couriers, stock, returns, and delivery operations.",
  stack: ["WordPress", "WooCommerce", "PHP", "REST API"],
  image: "/projects/Delivery-manager.webp",
  featuredPoint: "Courier integration with order, stock, and return workflows.",
  featured:false
},
{
  slug: "3alemni",
  title: "3alemni",
  category: "Education Platform / LMS",
  year: "2026",
  description:
    "A bilingual online learning platform built with WordPress and Tutor LMS, featuring a custom-designed learning environment tailored to students and instructors, with structured course management and dedicated user experiences.",
  stack: [
    "WordPress",
    "PHP",
    "Tutor LMS",
    "JavaScript",
    "Tailwind CSS",
    "Custom WordPress Theme",
    "Custom UI Components",
  ],
  featuredPoint:
    "A customized bilingual LMS experience built on WordPress and Tutor LMS, with dedicated student and instructor interfaces and a structured course management environment.",
  image: "/projects/3alemni.webp",
  liveUrl: "https://3alemni.42web.io",
  featured: false,
},

{
  slug:"data-science-portfolio",
  title: "Data Science Portfolio",
  category: "Portfolio",
  year: "2026",
  description:
    "A modern portfolio website built for a Data Science student to showcase projects, skills, and academic work.",
  stack: ["Next.js", "JavaScript", "Tailwind CSS", "Supabase"],
  featuredPoint: "Custom portfolio architecture built around projects and dynamic content.",
  image: "/projects/data-science-portfolio.webp",
  liveUrl:"https://mehdimadi.vercel.app",
  featured:true,
},

{
  slug:"wldelroudjishoes",
  title: "WldElroudjiShoes",
  category: "eCommerce",
  year: "2026",
  description:
    "A mobile-first WooCommerce store for a local footwear business with a streamlined ordering and Algerian delivery experience.",
  stack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS"],
  featuredPoint: "One-click ordering with an Algerian delivery flow.",
  image: "/projects/wldelroudji-shoes.webp",
  liveUrl:"https://wldelroudjishoes.com",
  featured:true,
},
];