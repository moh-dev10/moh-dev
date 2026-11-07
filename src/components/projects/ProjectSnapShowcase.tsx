"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectTranslation } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

type ProjectSnapShowcaseProps = {
  projects: ProjectTranslation[];
};

export default function ProjectSnapShowcase({ projects }: ProjectSnapShowcaseProps) {
  const { isRTL } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const slideElements = document.querySelectorAll("[data-snap-slide]");
    if (!slideElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-snap-slide");
            if (indexStr !== null) {
              setActiveProjectIndex(parseInt(indexStr, 10));
            }
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    slideElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  const scrollToSlide = (index: number) => {
    const el = document.getElementById(`snap-project-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div ref={showcaseContainerRef} className="relative w-full">
      {/* Sticky Quick-Nav Rail (Desktop) */}
      <div
        className="
          hidden lg:flex fixed top-1/2 -translate-y-1/2 z-30
          end-6 flex-col items-center gap-3
          rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md
          px-2.5 py-4 shadow-sm
        "
        role="navigation"
        aria-label="Snap Showcase Project Indicator"
      >
        <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold">
          0{activeProjectIndex + 1}
        </span>

        <div className="flex flex-col gap-2 py-1">
          {projects.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                key={proj.slug}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Jump to ${proj.title} (0${idx + 1})`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center justify-center p-1.5 focus-visible:outline-2 focus-visible:outline-accent rounded-full"
              >
                <span
                  className={`
                    block rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "h-5 w-2 bg-accent shadow-xs"
                        : "h-2 w-2 bg-[var(--border-strong)] group-hover:bg-[var(--foreground)]"
                    }
                  `}
                />

                {/* Floating tooltip on hover */}
                <span
                  className={`
                    pointer-events-none absolute font-mono text-[11px] whitespace-nowrap
                    rounded-md bg-[var(--dark)] px-2.5 py-1 text-white shadow-md
                    opacity-0 transition-opacity duration-200 group-hover:opacity-100
                    ${isRTL ? "start-full ms-3" : "end-full me-3"}
                  `}
                >
                  0{idx + 1} · {proj.title}
                </span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          0{total}
        </span>
      </div>

      {/* Snap Project Slides Stack */}
      <div className="space-y-16 md:space-y-24 lg:space-y-28">
        {projects.map((project, index) => {
          return (
            <motion.section
              key={project.slug}
              id={`snap-project-${index}`}
              data-snap-slide={index}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="
                relative min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh]
                flex items-center justify-center
                scroll-mt-24
              "
            >
              <div
                className="
                  w-full grid grid-cols-1 lg:grid-cols-12
                  gap-8 lg:gap-12 xl:gap-16 items-center
                  rounded-3xl border border-[var(--border)] bg-[var(--surface)]
                  p-6 sm:p-8 lg:p-10 xl:p-12 shadow-sm
                  hover:border-[var(--border-strong)] transition-colors duration-300
                "
              >
                {/* Left Visual Column */}
                <div
                  className="
                    group relative lg:col-span-7 xl:col-span-7
                    w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[520px]
                    overflow-hidden rounded-2xl bg-[var(--surface-muted)]
                    border border-[var(--border)]
                  "
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
                    whileInView={shouldReduceMotion ? { scale: 1 } : { scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project showcase`}
                      fill
                      priority={index === 0}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </motion.div>

                  {/* Category Chip */}
                  <div className="absolute top-4 start-4 z-10 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-medium text-[var(--foreground)] shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{project.category}</span>
                  </div>

                  {/* Corner Index Tag */}
                  <div className="absolute bottom-4 end-4 z-10 flex items-center gap-1.5 rounded-full border border-black/10 bg-black/60 backdrop-blur-md px-3.5 py-1 font-mono text-xs font-semibold text-white shadow-xs">
                    <span className="text-accent">0{index + 1}</span>
                    <span className="text-white/60">/</span>
                    <span>0{total}</span>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="mono-label text-accent font-semibold text-xs tracking-wider">
                      {project.category}
                    </span>

                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl text-[var(--foreground)]">
                    {project.title}
                  </h3>

                  {/* Short Description (2-3 lines max) */}
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Stack (3-4 badges) */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-md border border-[var(--border)]
                          bg-[var(--surface-muted)]
                          px-3 py-1
                          font-mono text-[10px] uppercase tracking-wider
                          text-[var(--text-secondary)]
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between gap-4">
                    <a
                      href={project.liveUrl || "/projects"}
                      target={project.liveUrl ? "_blank" : undefined}
                      rel={project.liveUrl ? "noopener noreferrer" : undefined}
                      className="
                        group/link inline-flex items-center gap-2 rounded-md
                        border border-black bg-black px-6 py-3
                        font-mono text-xs uppercase tracking-wider !text-white
                        transition-all duration-200
                        hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]
                        focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]
                      "
                    >
                      <span>{isRTL ? "مشاهدة المشروع" : "View Project"}</span>
                      <ExternalLink
                        aria-hidden="true"
                        size={14}
                        className="text-white transition-transform duration-200 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5"
                      />
                    </a>

                    <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
                      0{index + 1} of 0{total}
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
