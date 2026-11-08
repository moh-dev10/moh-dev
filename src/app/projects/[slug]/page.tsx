import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { getCaseStudy, getAllCaseStudySlugs } from "@/data/caseStudies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug, "en");

  if (!study) {
    return {
      title: "Project Not Found | Moh Dev",
    };
  }

  const title = `${study.title} — Case Study`;
  const description = study.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        en: `/projects/${slug}?lang=en`,
        ar: `/projects/${slug}?lang=ar`,
      },
    },
    openGraph: {
      title: `${title} | Moh Dev`,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: [
        {
          url: study.heroImage,
          width: 1200,
          height: 675,
          alt: `${study.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Moh Dev`,
      description,
      images: [study.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug, "en");

  if (!study) {
    notFound();
  }

  return <CaseStudyView slug={slug} />;
}
