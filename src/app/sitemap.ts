import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://moh-dev.vercel.app");

  const lastModified = new Date();
  const caseStudySlugs = getAllCaseStudySlugs();

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}/projects/${slug}?lang=en`,
        ar: `${siteUrl}/projects/${slug}?lang=ar`,
      },
    },
  }));

  return [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}/?lang=en`,
          ar: `${siteUrl}/?lang=ar`,
        },
      },
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${siteUrl}/projects?lang=en`,
          ar: `${siteUrl}/projects?lang=ar`,
        },
      },
    },
    ...caseStudyEntries,
  ];
}
