export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    title: "Lumen Store",
    category: "eCommerce",
    year: "2026",
    description:
      "A custom WooCommerce fashion store focused on a clean shopping experience and flexible store management.",
    stack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS"],
  },

  {
    title: "Delivery Manager",
    category: "Business System",
    year: "2026",
    description:
      "A custom WooCommerce system for managing orders, couriers, stock, returns, and delivery operations.",
    stack: ["WordPress", "WooCommerce", "PHP", "REST API"],
  },

  {
    title: "Data Science Portfolio",
    category: "Portfolio",
    year: "2026",
    description:
      "A modern portfolio website built for a Data Science student to showcase projects, skills, and academic work.",
    stack: ["Next.js", "JavaScript", "Tailwind CSS", "Supabase"],
  },

  {
    title: "WldElroudjiShoes",
    category: "eCommerce",
    year: "2026",
    description:
      "A mobile-first WooCommerce store for a local footwear business with a streamlined ordering and Algerian delivery experience.",
    stack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS"],
  },
];