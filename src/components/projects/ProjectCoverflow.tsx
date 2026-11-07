"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectTranslation } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

type ProjectCoverflowProps = {
  projects: ProjectTranslation[];
};

export default function ProjectCoverflow({ projects }: ProjectCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setActiveIndex((prev) => (prev + newDirection + total) % total);
    },
    [total]
  );

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRTL) {
          paginate(1);
        } else {
          paginate(-1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRTL) {
          paginate(-1);
        } else {
          paginate(1);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(total - 1);
      }
    },
    [isRTL, paginate, goToSlide, total]
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const swipeThreshold = 45;
    const swipeVelocity = 350;
    const isSwipe =
      Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity;

    if (isSwipe) {
      if (info.offset.x < 0) {
        // Swiped left
        if (isRTL) {
          paginate(-1);
        } else {
          paginate(1);
        }
      } else {
        // Swiped right
        if (isRTL) {
          paginate(1);
        } else {
          paginate(-1);
        }
      }
    }
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  // Calculate relative 3D placement for each card
  const getCardTransform = (index: number) => {
    let diff = index - activeIndex;

    // Wrap around for circular flow
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      // Active Center Card
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 30,
        filter: "brightness(100%)",
        isSide: false,
      };
    }

    if (diff === 1) {
      // Next Card (on the right in LTR, left in RTL)
      const xOffset = isRTL ? "-58%" : "58%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? 18 : -18;
      return {
        x: xOffset,
        scale: 0.84,
        rotateY: rotY,
        opacity: 0.52,
        zIndex: 15,
        filter: "brightness(90%)",
        isSide: true,
      };
    }

    if (diff === -1) {
      // Previous Card (on the left in LTR, right in RTL)
      const xOffset = isRTL ? "58%" : "-58%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? -18 : 18;
      return {
        x: xOffset,
        scale: 0.84,
        rotateY: rotY,
        opacity: 0.52,
        zIndex: 15,
        filter: "brightness(90%)",
        isSide: true,
      };
    }

    // Distant cards
    const dir = diff > 0 ? 1 : -1;
    const xOffset = isRTL ? `${-dir * 95}%` : `${dir * 95}%`;
    return {
      x: xOffset,
      scale: 0.72,
      rotateY: 0,
      opacity: 0,
      zIndex: 5,
      filter: "brightness(75%)",
      isSide: true,
    };
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="3D Coverflow Featured Projects"
      className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-3xl"
    >
      {/* 3D Stage Container */}
      <div
        className="
          relative w-full overflow-hidden
          py-8 md:py-12
          flex items-center justify-center
          min-h-[460px] sm:min-h-[480px] md:min-h-[500px] lg:min-h-[520px]
        "
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative w-full max-w-[840px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, idx) => {
            const transform = getCardTransform(idx);
            const isActive = idx === activeIndex;

            return (
              <motion.article
                key={project.slug}
                onClick={() => {
                  if (transform.isSide) {
                    goToSlide(idx);
                  }
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                animate={{
                  x: transform.x,
                  scale: transform.scale,
                  rotateY: transform.rotateY,
                  opacity: transform.opacity,
                  zIndex: transform.zIndex,
                  filter: transform.filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className={`
                  absolute w-full max-w-[340px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[800px]
                  rounded-2xl border bg-[var(--surface)] shadow-lg
                  overflow-hidden transition-shadow duration-300
                  ${
                    isActive
                      ? "border-[var(--border-strong)] shadow-xl cursor-grab active:cursor-grabbing pointer-events-auto"
                      : "border-[var(--border)] cursor-pointer pointer-events-auto hover:opacity-75"
                  }
                `}
              >
                {/* Compact 2-column card body */}
                <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                  {/* Left: Project Image */}
                  <div
                    className="
                      group relative md:col-span-7
                      h-[200px] sm:h-[240px] md:h-[320px] lg:h-[340px]
                      bg-[var(--surface-muted)] overflow-hidden
                      border-b md:border-b-0 md:border-e border-[var(--border)]
                    "
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      priority={isActive}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Category pill on image */}
                    <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-[var(--foreground)] shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{project.category}</span>
                    </div>

                    {/* Corner index badge */}
                    <div className="absolute bottom-3.5 end-3.5 z-10 flex items-center gap-1.5 rounded-full border border-black/15 bg-black/65 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-xs">
                      <span className="text-accent">0{idx + 1}</span>
                      <span className="text-white/60">/</span>
                      <span>0{total}</span>
                    </div>
                  </div>

                  {/* Right: Project Information */}
                  <div className="md:col-span-5 p-5 md:p-6 lg:p-7 flex flex-col justify-between">
                    <div>
                      {/* Category & Year */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="mono-label text-accent font-semibold text-xs tracking-wider">
                          {project.category}
                        </span>

                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-[var(--foreground)]">
                        {project.title}
                      </h3>

                      {/* Description (2-3 lines max) */}
                      <p className="mt-2.5 text-xs sm:text-sm leading-6 text-[var(--text-secondary)] line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack badges (top 3-4 only) */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="
                              rounded-sm border border-[var(--border)]
                              bg-[var(--surface-muted)]
                              px-2 py-0.5
                              font-mono text-[10px] uppercase tracking-wider
                              text-[var(--text-secondary)]
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <a
                        href={project.liveUrl || "/projects"}
                        target={project.liveUrl ? "_blank" : undefined}
                        rel={project.liveUrl ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault();
                            goToSlide(idx);
                          }
                        }}
                        className="
                          group/link inline-flex items-center gap-2 rounded-md
                          border border-black bg-black px-4 py-2
                          font-mono text-xs uppercase tracking-wider !text-white
                          transition-all duration-200
                          hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]
                          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]
                        "
                      >
                        <span>{isRTL ? "مشاهدة المشروع" : "View Project"}</span>
                        <ExternalLink
                          aria-hidden="true"
                          size={13}
                          className="text-white transition-transform duration-200 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5"
                        />
                      </a>

                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Slider Controls Bar */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Pagination tabs / pills */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Coverflow slide selector"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.slug}
                onClick={() => goToSlide(idx)}
                role="tab"
                aria-selected={isActive}
                aria-label={`${project.title} (${idx + 1} of ${total})`}
                className={`
                  group relative flex items-center gap-2 rounded-full px-3.5 py-1.5
                  font-mono text-xs transition-all duration-300
                  ${
                    isActive
                      ? "bg-[var(--foreground)] text-white shadow-xs font-semibold"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-accent" : "bg-[var(--text-muted)] group-hover:bg-accent"
                  }`}
                />
                <span className="font-mono text-[11px] opacity-75">0{idx + 1}</span>
                <span className="hidden sm:inline font-sans text-xs font-medium max-w-[120px] truncate">
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter & Navigation Arrows */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          {/* Numerical Counter */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--foreground)] text-sm">
              0{activeIndex + 1}
            </span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">0{total}</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              aria-label={isRTL ? "المشروع التالي" : "Previous project"}
              className="
                flex h-11 w-11 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]
                shadow-xs transition-all duration-200
                hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white
                active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
              "
            >
              {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <button
              onClick={() => paginate(1)}
              aria-label={isRTL ? "المشروع السابق" : "Next project"}
              className="
                flex h-11 w-11 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]
                shadow-xs transition-all duration-200
                hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white
                active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
              "
            >
              {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
