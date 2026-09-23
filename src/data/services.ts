import type { LucideIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MonitorSmartphone,
  ShoppingCart,
  Store,
  PanelsTopLeft,
  ServerCog,
  Gauge,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  startingPrice: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    tagline: "Look credible and get contacted more.",
    description:
      "Fast, responsive websites for businesses that need a clear online presence and a direct path to inquiries.",
    duration: "1–2 weeks",
    startingPrice: "from 35,000 DZD",
    icon: MonitorSmartphone,
  },
  {
    slug: "ecommerce-websites",
    title: "E-commerce Websites",
    tagline: "Sell online, including cash on delivery.",
    description:
      "Mobile-first stores with product catalogs, checkout, delivery flows, and the tools needed to manage orders.",
    duration: "2–4 weeks",
    startingPrice: "from 70,000 DZD",
    icon: ShoppingCart,
  },
  {
    slug: "wordpress-woocommerce",
    title: "WordPress & WooCommerce",
    tagline: "A store you can manage yourself.",
    description:
      "Custom WordPress and WooCommerce solutions, from tailored themes and checkout flows to business-specific functionality.",
    duration: "1–3 weeks",
    startingPrice: "from 45,000 DZD",
    icon: Store,
  },
  {
    slug: "custom-react-applications",
    title: "Custom React Applications",
    tagline: "Interactive tools, dashboards, booking flows.",
    description:
      "When WordPress isn't enough: fast React and Next.js interfaces with real application logic.",
    duration: "2–5 weeks",
    startingPrice: "On quote",
    icon: PanelsTopLeft,
  },
  {
    slug: "full-stack-web-apps",
    title: "Full-Stack Web Apps",
    tagline: "Frontend + backend + database, end-to-end.",
    description:
      "Node.js APIs, PostgreSQL, authentication, admin panels, and complete web application architecture.",
    duration: "3–6 weeks",
    startingPrice: "On quote",
    icon: ServerCog,
  },
  {
    slug: "optimization-maintenance",
    title: "Optimization & Maintenance",
    tagline: "Faster site, fewer headaches.",
    description:
      "Performance improvements, mobile fixes, SEO basics, updates, backups, and ongoing maintenance.",
    duration: "2–7 days",
    startingPrice: "from 8,000 DZD",
    icon: Gauge,
  },
];