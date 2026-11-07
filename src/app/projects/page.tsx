"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFilterBar, { type FilterCategory } from "@/components/projects/ProjectFilterBar";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import type { ProjectTranslation } from "@/data/translations";

/**
 * Data-driven category matching helper that evaluates project categories
 * seamlessly across English and Arabic localization.
 */
export function matchesProjectCategory(
  project: ProjectTranslation,
  filterId: string
): boolean {
  if (filterId === "all") return true;

  const categoryLower = project.category.toLowerCase();

  if (filterId === "ecommerce") {
    return (
      categoryLower.includes("e-commerce") ||
      categoryLower.includes("ecommerce") ||
      project.category.includes("تجارة إلكترونية")
    );
  }

  if (filterId === "business-systems") {
    return (
      categoryLower.includes("business system") ||
      project.category.includes("أنظمة أعمال") ||
      project.category.includes("إدارة التجارة")
    );
  }

  if (filterId === "education") {
    return (
      categoryLower.includes("education") ||
      categoryLower.includes("lms") ||
      project.category.includes("تعليم")
    );
  }

  if (filterId === "portfolio") {
    return (
      categoryLower.includes("portfolio") ||
      project.category.includes("بورتفوليو") ||
      project.category.includes("شخصية")
    );
  }

  // Fallback for direct string or slug matching (scalable for any newly added categories)
  return (
    categoryLower === filterId.toLowerCase() ||
    project.category === filterId
  );
}

export default function ProjectsPage() {
  const { t, projects } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  // Derive filter categories directly from existing project data
  const categories = useMemo<FilterCategory[]>(() => {
    const list: FilterCategory[] = [
      {
        id: "all",
        label: t.projectsPage.filterAll,
        count: projects.length,
      },
      {
        id: "ecommerce",
        label: t.projectsPage.filterEcommerce,
        count: projects.filter((p) => matchesProjectCategory(p, "ecommerce")).length,
      },
      {
        id: "business-systems",
        label: t.projectsPage.filterBusinessSystems,
        count: projects.filter((p) => matchesProjectCategory(p, "business-systems")).length,
      },
      {
        id: "education",
        label: t.projectsPage.filterEducation,
        count: projects.filter((p) => matchesProjectCategory(p, "education")).length,
      },
      {
        id: "portfolio",
        label: t.projectsPage.filterPortfolio,
        count: projects.filter((p) => matchesProjectCategory(p, "portfolio")).length,
      },
    ];

    // Guarantee: Only show categories that have actual projects in the data,
    // avoiding artificial categories while always keeping 'all'.
    return list.filter((cat) => cat.id === "all" || cat.count > 0);
  }, [projects, t.projectsPage]);

  // Compute filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => matchesProjectCategory(p, activeFilter));
  }, [projects, activeFilter]);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding decorative-hero">
        <div className="container-main">
          <Reveal>
            <div className="max-w-3xl pt-12">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t.projectsPage.eyebrow}
              </p>

              <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                {t.projectsPage.titleLine1}
                <br />
                <span className="font-serif font-normal italic text-accent not-italic">
                  {t.projectsPage.titleHighlight}
                </span>{" "}
                {t.projectsPage.titleSuffix}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                {t.projectsPage.leadText}
              </p>

              {/* Dynamic project count matching currently active filter */}
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {filteredProjects.length} {t.projectsPage.countSuffix}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects Grid Section with Filter Bar */}
      <section className="section-padding pt-0">
        <div className="container-main">
          {/* Polished pill-shaped filter bar */}
          <ProjectFilterBar
            categories={categories}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            ariaLabel={t.projectsPage.filterAriaLabel}
          />

          {/* Animated projects grid */}
          <ProjectGrid
            projects={filteredProjects}
            onResetFilter={() => setActiveFilter("all")}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main">
          <Reveal>
            <div className="border-t border-[var(--border)] pt-12 sm:pt-16">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t.projectsPage.ctaEyebrow}
              </p>

              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t.projectsPage.ctaTitleLine1}
                <br />
                <span className="font-serif font-normal italic text-accent not-italic">
                  {t.projectsPage.ctaTitleHighlight}
                </span>
              </h2>

              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center rounded-full bg-[var(--text-primary)] px-6 py-3 font-medium !text-white transition-transform duration-300 hover:-translate-y-1"
              >
                {t.projectsPage.ctaButton}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}