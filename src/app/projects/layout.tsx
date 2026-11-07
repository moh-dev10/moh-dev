import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects shipped by Moh Dev — eCommerce stores, web applications, custom WordPress systems, and portfolios built for real business value.",
  alternates: {
    canonical: "/projects",
    languages: {
      en: "/projects?lang=en",
      ar: "/projects?lang=ar",
    },
  },
  openGraph: {
    title: "Projects | Moh Dev — Full-Stack Web Developer",
    description:
      "Explore projects shipped by Moh Dev — eCommerce stores, web applications, custom WordPress systems, and portfolios built for real business value.",
    url: "/projects",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moh Dev Projects Showcase Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Moh Dev — Full-Stack Web Developer",
    description:
      "Explore projects shipped by Moh Dev — eCommerce stores, web applications, and custom business systems.",
    images: ["/og-image.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
