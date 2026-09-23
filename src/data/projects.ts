
export type Project = {
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
  title: "Delivery Manager",
  category: "Business System",
  year: "2026",
  description:
    "A custom WooCommerce system for managing orders, couriers, stock, returns, and delivery operations.",
  stack: ["WordPress", "WooCommerce", "PHP", "REST API"],
  featuredPoint: "Courier integration with order, stock, and return workflows.",
  image: "/projects/delivery-manager.webp",
  featured:false
},

{
  title: "Data Science Portfolio",
  category: "Portfolio",
  year: "2026",
  description:
    "A modern portfolio website built for a Data Science student to showcase projects, skills, and academic work.",
  stack: ["Next.js", "JavaScript", "Tailwind CSS", "Supabase"],
  featuredPoint: "Custom portfolio architecture built around projects and dynamic content.",
  image: "/projects/data-science-portfolio.webp",
  featured:true,
},

{
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