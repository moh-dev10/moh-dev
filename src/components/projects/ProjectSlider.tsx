"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import type { ProjectTranslation } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

type ProjectSliderProps = {
  projects: ProjectTranslation[];
};

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isRTL } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => (prev + newDirection + total) % total);
    },
    [total]
  );

  // Auto-swipe every 4.5s (pauses on hover, touch, or user interaction)
  useEffect(() => {
    if (isPaused || shouldReduceMotion || total <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, total, paginate, currentIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

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
    const swipeThreshold = 50;
    const swipeVelocity = 400;
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

  const currentProject = projects[currentIndex];

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? (isRTL ? -80 : 80) : (isRTL ? 80 : -80),
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35, ease: "easeOut" },
        scale: { duration: 0.35, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? (isRTL ? 80 : -80) : (isRTL ? -80 : 80),
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.25, ease: "easeIn" },
        scale: { duration: 0.25, ease: "easeIn" },
      },
    }),
  };

  return (
    <div
      ref={sliderRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Projects Slider"
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-2xl"
    >
      {/* Slider Viewport Window */}
      <div className="relative overflow-hidden min-h-[380px] sm:min-h-[400px] lg:min-h-[360px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={currentProject.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="
              touch-pan-y cursor-grab active:cursor-grabbing
              grid grid-cols-1 lg:grid-cols-12
              overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]
              shadow-xs hover:border-[var(--border-strong)]
              transition-colors duration-200
            "
          >
            {/* Left side — Project Visual */}
            <div
              className="
                group relative lg:col-span-7 xl:col-span-7
                min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[340px]
                overflow-hidden bg-[var(--surface-muted)]
                rounded-t-xl lg:rounded-t-none lg:rounded-s-xl
                border-b lg:border-b-0 lg:border-e border-[var(--border)]
              "
            >
              <Image
                src={currentProject.image}
                alt={`${currentProject.title} project showcase`}
                fill
                priority
                className="
                  object-cover object-center
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Category pill on image */}
              <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-[var(--foreground)] shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{currentProject.category}</span>
              </div>
            </div>

            {/* Right side — Project Information (Compact) */}
            <div
              className="
                lg:col-span-5 xl:col-span-5
                flex flex-col justify-between
                p-5 sm:p-6 lg:p-7 xl:p-8
              "
            >
              <div>
                {/* 1. Category + Year */}
                <div className="flex items-center justify-between gap-4">
                  <span className="mono-label text-accent font-semibold text-xs tracking-wider">
                    {currentProject.category}
                  </span>

                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {currentProject.year}
                  </span>
                </div>

                {/* 2. Project Title */}
                <h3 className="mt-2.5 font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-3xl text-[var(--foreground)]">
                  {currentProject.title}
                </h3>

                {/* 3. Short Description (max 2-3 lines) */}
                <p className="mt-2.5 text-xs sm:text-sm leading-6 text-[var(--text-secondary)] line-clamp-2 md:line-clamp-3">
                  {currentProject.description}
                </p>

                {/* 4. Technology Stack (Top 3-4 badges only) */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {currentProject.stack.slice(0, 4).map((tech) => (
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

              {/* 5. Primary CTA Button Only */}
              <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <a
                  href={currentProject.liveUrl || "/projects"}
                  target={currentProject.liveUrl ? "_blank" : undefined}
                  rel={currentProject.liveUrl ? "noopener noreferrer" : undefined}
                  className="
                    group/link inline-flex items-center gap-2 rounded-md
                    border border-black bg-black px-4 sm:px-5 py-2.5
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

                {/* Subtle project index */}
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  0{currentIndex + 1} / 0{total}
                </span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Slider Controls Bar */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Pagination tabs / pills */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Project slide selector"
        >
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={project.slug}
                onClick={() => goToSlide(idx)}
                role="tab"
                aria-selected={isActive}
                aria-label={`${project.title} (${idx + 1} of ${total})`}
                className={`
                  group relative flex items-center gap-2 rounded-full px-3.5 py-1.5 overflow-hidden
                  font-mono text-xs transition-all duration-300
                  ${
                    isActive
                      ? "bg-[var(--foreground)] text-white shadow-xs font-semibold"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                {isActive && !isPaused && (
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="absolute inset-0 bg-white/15 pointer-events-none"
                  />
                )}
                <span
                  className={`relative z-10 h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-accent" : "bg-[var(--text-muted)] group-hover:bg-accent"
                  }`}
                />
                <span className="relative z-10 font-mono text-[11px] opacity-75">0{idx + 1}</span>
                <span className="relative z-10 hidden sm:inline font-sans text-xs font-medium max-w-[120px] truncate">
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter & Arrows */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          {/* Numerical Counter */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--foreground)] text-sm">
              0{currentIndex + 1}
            </span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">0{total}</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause toggle */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={
                isPaused
                  ? isRTL
                    ? "تشغيل التمرير التلقائي"
                    : "Resume auto-swipe"
                  : isRTL
                  ? "إيقاف التمرير التلقائي"
                  : "Pause auto-swipe"
              }
              className="
                flex h-11 w-11 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]
                shadow-xs transition-all duration-200
                hover:border-[var(--accent)] hover:text-[var(--accent)]
                active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
              "
              title={isPaused ? "Play auto-swipe" : "Pause auto-swipe"}
            >
              {isPaused ? (
                <Play size={13} className="fill-current ms-0.5" />
              ) : (
                <Pause size={13} className="fill-current" />
              )}
            </button>

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
