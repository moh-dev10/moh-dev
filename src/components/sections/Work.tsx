"use client";

import { useState } from "react";
import ProjectCoverflow from "@/components/projects/ProjectCoverflow";
import ProjectSlider from "@/components/projects/ProjectSlider";
import ProjectSnapShowcase from "@/components/projects/ProjectSnapShowcase";
import { ArrowRight, ArrowLeft, Box, SlidersHorizontal, LayoutTemplate } from "lucide-react";
import Reveal from "../ui/Reveal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Work() {
  const { t, projects, isRTL } = useLanguage();
  // Switch between "coverflow" (3D Coverflow), "slider" (Horizontal Project Slider), and "snap" (Full-Screen Snap Showcase)
  const [showcaseMode, setShowcaseMode] = useState<"coverflow" | "slider" | "snap">("coverflow");

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const ArrowForward = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="work" className="section-padding">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="font-mono text-accent uppercase text-xs tracking-wider">
                {t.work.eyebrow}
              </p>

              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
                {t.work.titleLine1}
                <br />
                <em className="font-serif text-accent not-italic">
                  {t.work.titleHighlight}
                </em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Experimental View Switcher (Compare 3D Coverflow vs Slider vs Snap) */}
              <div
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 shadow-2xs"
                role="group"
                aria-label="Showcase View Mode"
              >
                <button
                  type="button"
                  onClick={() => setShowcaseMode("coverflow")}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-200
                    ${
                      showcaseMode === "coverflow"
                        ? "bg-[var(--foreground)] text-white shadow-xs font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  <Box size={13} />
                  <span>{isRTL ? "عرض 3D" : "3D Coverflow"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseMode("slider")}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-200
                    ${
                      showcaseMode === "slider"
                        ? "bg-[var(--foreground)] text-white shadow-xs font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  <SlidersHorizontal size={13} />
                  <span>{isRTL ? "سلايدر أفقي" : "Horizontal Slider"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseMode("snap")}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-200
                    ${
                      showcaseMode === "snap"
                        ? "bg-[var(--foreground)] text-white shadow-xs font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  <LayoutTemplate size={13} />
                  <span>{isRTL ? "عرض Snap" : "Snap Showcase"}</span>
                </button>
              </div>

              <Link
                href="/projects"
                className="group flex shrink-0 items-center gap-2 text-xs font-semibold md:text-sm text-[var(--foreground)] hover:text-accent transition-colors duration-200"
              >
                <span>{t.work.viewAll}</span>
                <ArrowForward
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Showcase Presentation Area */}
        <div className="mt-12 md:mt-16">
          {showcaseMode === "coverflow" ? (
            <Reveal delay={120}>
              <ProjectCoverflow projects={featuredProjects} />
            </Reveal>
          ) : showcaseMode === "slider" ? (
            <Reveal delay={120}>
              <ProjectSlider projects={featuredProjects} />
            </Reveal>
          ) : (
            <ProjectSnapShowcase projects={featuredProjects} />
          )}
        </div>
      </div>
    </section>
  );
}