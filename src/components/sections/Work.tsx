"use client";

import ProjectSlider from "@/components/projects/ProjectSlider";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Reveal from "../ui/Reveal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Work() {
  const { t, projects, isRTL } = useLanguage();
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const ArrowForward = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="work" className="section-padding">
      <div className="container-main">
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
            <div className="mt-4 flex items-center gap-6">
              <p className="max-w-sm text-xs leading-4 text-[var(--text-secondary)] md:text-sm md:leading-6">
                {t.work.leadText}
              </p>

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

        <div className="mt-12 md:mt-14">
          <Reveal delay={120}>
            <ProjectSlider projects={featuredProjects} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}