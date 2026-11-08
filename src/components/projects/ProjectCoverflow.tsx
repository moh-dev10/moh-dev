"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectTranslation } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

type ProjectCoverflowProps = {
  projects: ProjectTranslation[];
};

export default function ProjectCoverflow({ projects }: ProjectCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const shouldReduceMotion = useReducedMotion();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  // Pagination navigation helper
  const paginate = useCallback(
    (newDirection: number) => {
      setActiveIndex((prev) => (prev + newDirection + total) % total);
    },
    [total]
  );

  // Trigger manual interaction pause & auto-resume after 5 seconds of inactivity
  const triggerUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      triggerUserInteraction();
      setActiveIndex(index);
    },
    [triggerUserInteraction]
  );

  const handleManualPaginate = useCallback(
    (direction: number) => {
      triggerUserInteraction();
      paginate(direction);
    },
    [triggerUserInteraction, paginate]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        triggerUserInteraction();
        if (isRTL) {
          paginate(1);
        } else {
          paginate(-1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        triggerUserInteraction();
        if (isRTL) {
          paginate(-1);
        } else {
          paginate(1);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        triggerUserInteraction();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        triggerUserInteraction();
        setActiveIndex(total - 1);
      } else if (e.key === " " || e.key === "Spacebar") {
        // Spacebar toggles autoplay
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    },
    [isRTL, paginate, triggerUserInteraction, total]
  );

  // Swipe / Drag handling
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    triggerUserInteraction();
    const swipeThreshold = 40;
    const swipeVelocity = 300;
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

  // Browser visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Cleanup inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Autoplay active calculation
  const isAutoplayActive =
    isPlaying && !isHovered && !isUserInteracting && isTabVisible && !shouldReduceMotion;

  // Autoplay interval (advance every 5s)
  useEffect(() => {
    if (!isAutoplayActive) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplayActive, paginate]);

  if (!projects || projects.length === 0) {
    return null;
  }

  // Calculate 3D placement, progressive blur, scale, and depth for each card
  const getCardTransform = (index: number) => {
    let diff = index - activeIndex;

    // Wrap around for circular loop
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    if (diff === 0) {
      // Active Center Card: sharp, dominant, zero blur
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px) brightness(100%)",
        isSide: false,
      };
    }

    if (diff === 1) {
      // Next Card (on the right in LTR, left in RTL)
      const xOffset = isRTL ? "-54%" : "54%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? 15 : -15;
      return {
        x: xOffset,
        scale: 0.86,
        rotateY: rotY,
        opacity: 0.62,
        zIndex: 20,
        filter: shouldReduceMotion ? "none" : "blur(2px) brightness(92%)",
        isSide: true,
      };
    }

    if (diff === -1) {
      // Previous Card (on the left in LTR, right in RTL)
      const xOffset = isRTL ? "54%" : "-54%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? -15 : 15;
      return {
        x: xOffset,
        scale: 0.86,
        rotateY: rotY,
        opacity: 0.62,
        zIndex: 20,
        filter: shouldReduceMotion ? "none" : "blur(2px) brightness(92%)",
        isSide: true,
      };
    }

    if (diff === 2) {
      // Secondary Next Card (far right in LTR)
      const xOffset = isRTL ? "-94%" : "94%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? 22 : -22;
      return {
        x: xOffset,
        scale: 0.72,
        rotateY: rotY,
        opacity: 0.22,
        zIndex: 10,
        filter: shouldReduceMotion ? "none" : "blur(5px) brightness(80%)",
        isSide: true,
      };
    }

    if (diff === -2) {
      // Secondary Previous Card (far left in LTR)
      const xOffset = isRTL ? "94%" : "-94%";
      const rotY = shouldReduceMotion ? 0 : isRTL ? -22 : 22;
      return {
        x: xOffset,
        scale: 0.72,
        rotateY: rotY,
        opacity: 0.22,
        zIndex: 10,
        filter: shouldReduceMotion ? "none" : "blur(5px) brightness(80%)",
        isSide: true,
      };
    }

    // Distant cards
    const dir = diff > 0 ? 1 : -1;
    const xOffset = isRTL ? `${-dir * 120}%` : `${dir * 120}%`;
    return {
      x: xOffset,
      scale: 0.6,
      rotateY: 0,
      opacity: 0,
      zIndex: 5,
      filter: "blur(8px) brightness(70%)",
      isSide: false,
    };
  };

  const formatIndex = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="3D Coverflow Featured Projects"
      className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-3xl select-none"
    >
      {/* 3D Stage Container */}
      <div
        className="
          relative w-full overflow-hidden
          py-6 md:py-10
          flex items-center justify-center
          min-h-[480px] sm:min-h-[500px] md:min-h-[490px] lg:min-h-[510px]
        "
        style={{ perspective: "1200px" }}
      >
        {/* Soft edge fades to avoid harsh side card clipping */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 w-8 md:w-20 bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--background)] to-transparent z-25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-0 w-8 md:w-20 bg-gradient-to-l rtl:bg-gradient-to-r from-[var(--background)] to-transparent z-25"
        />

        {/* Floating Navigation Controls (Desktop) */}
        <button
          type="button"
          onClick={() => handleManualPaginate(-1)}
          aria-label={isRTL ? "المشروع التالي" : "Previous project"}
          className="
            hidden md:flex absolute start-3 lg:start-6 top-1/2 -translate-y-1/2 z-35
            h-11 w-11 items-center justify-center rounded-full
            border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md
            text-[var(--foreground)] shadow-md transition-all duration-200
            hover:border-accent hover:bg-accent hover:text-white hover:scale-105
            active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
          "
        >
          {isRTL ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
        </button>

        <button
          type="button"
          onClick={() => handleManualPaginate(1)}
          aria-label={isRTL ? "المشروع السابق" : "Next project"}
          className="
            hidden md:flex absolute end-3 lg:end-6 top-1/2 -translate-y-1/2 z-35
            h-11 w-11 items-center justify-center rounded-full
            border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md
            text-[var(--foreground)] shadow-md transition-all duration-200
            hover:border-accent hover:bg-accent hover:text-white hover:scale-105
            active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
          "
        >
          {isRTL ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
        </button>

        {/* 3D Perspective Canvas */}
        <div
          className="relative w-full max-w-[960px] flex items-center justify-center"
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
                onDragStart={() => triggerUserInteraction()}
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
                  absolute w-[88vw] sm:w-[500px] md:w-[620px] lg:w-[680px]
                  rounded-2xl border bg-[var(--surface)] shadow-lg
                  overflow-hidden transition-shadow duration-300
                  ${
                    isActive
                      ? "border-[var(--border-strong)] shadow-2xl cursor-grab active:cursor-grabbing pointer-events-auto"
                      : transform.isSide
                      ? "border-[var(--border)] cursor-pointer pointer-events-auto hover:opacity-85"
                      : "border-[var(--border)] pointer-events-none"
                  }
                `}
              >
                {/* 2-column card body */}
                <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                  {/* Left: Project Image */}
                  <div
                    className="
                      group relative md:col-span-7
                      h-[190px] sm:h-[220px] md:h-[300px] lg:h-[320px]
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
                      sizes="(max-width: 768px) 90vw, 50vw"
                      referrerPolicy="no-referrer"
                    />

                    {/* Category pill on image */}
                    <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-[var(--foreground)] shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{project.category}</span>
                    </div>

                    {/* Corner index badge */}
                    <div className="absolute bottom-3.5 end-3.5 z-10 flex items-center gap-1.5 rounded-full border border-black/15 bg-black/65 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-xs">
                      <span className="text-accent">{formatIndex(idx + 1)}</span>
                      <span className="text-white/60">/</span>
                      <span>{formatIndex(total)}</span>
                    </div>
                  </div>

                  {/* Right: Project Information */}
                  <div className="md:col-span-5 p-5 md:p-6 flex flex-col justify-between">
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
                      <h3 className="mt-2.5 font-heading text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                        {project.title}
                      </h3>

                      {/* Description (2-3 lines max) */}
                      <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--text-secondary)] line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack badges (top 3-4 only) */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
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
                    <div className="mt-5 pt-3.5 border-t border-[var(--border)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {project.caseStudyUrl && (
                          <Link
                            href={project.caseStudyUrl}
                            onClick={(e) => {
                              if (!isActive) {
                                e.preventDefault();
                                goToSlide(idx);
                              }
                            }}
                            className="
                              group/link inline-flex items-center gap-1.5 rounded-md
                              border border-[var(--border-strong)] bg-transparent px-3 py-1.5
                              font-mono text-xs uppercase tracking-wider text-[var(--foreground)]
                              transition-all duration-200
                              hover:-translate-y-0.5 hover:border-accent hover:text-accent
                              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
                            "
                          >
                            <span>{isRTL ? "دراسة الحالة" : "Case Study"}</span>
                          </Link>
                        )}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!isActive) {
                                e.preventDefault();
                                goToSlide(idx);
                              }
                            }}
                            className="
                              group/link inline-flex items-center gap-2 rounded-md
                              border border-black bg-black px-3.5 py-1.5
                              font-mono text-xs uppercase tracking-wider !text-white
                              transition-all duration-200
                              hover:-translate-y-0.5 hover:border-accent hover:bg-accent
                              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
                            "
                          >
                            <span>{isRTL ? "معاينة حية" : "Live Demo"}</span>
                            <ExternalLink
                              aria-hidden="true"
                              size={13}
                              className="text-white transition-transform duration-200 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5"
                            />
                          </a>
                        ) : !project.caseStudyUrl ? (
                          <Link
                            href="/projects"
                            onClick={(e) => {
                              if (!isActive) {
                                e.preventDefault();
                                goToSlide(idx);
                              }
                            }}
                            className="
                              group/link inline-flex items-center gap-2 rounded-md
                              border border-[var(--border-strong)] bg-[var(--surface-muted)] px-3.5 py-1.5
                              font-mono text-xs uppercase tracking-wider text-[var(--foreground)]
                              transition-all duration-200
                              hover:-translate-y-0.5 hover:border-accent hover:text-accent
                              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
                            "
                          >
                            <Lock size={12} className="text-accent" />
                            <span>{isRTL ? "مشروع خاص" : "Private Project"}</span>
                          </Link>
                        ) : null}
                      </div>

                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {formatIndex(idx + 1)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Autoplay Progress Line Indicator */}
      <div className="mt-3 mb-3 w-full flex items-center justify-center px-4">
        <div
          className="h-1 w-full max-w-[800px] bg-[var(--border)] overflow-hidden rounded-full"
          role="progressbar"
          aria-label="Autoplay slide progress"
          aria-valuenow={isAutoplayActive ? 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            key={`progress-${activeIndex}-${isAutoplayActive}`}
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: isAutoplayActive ? "100%" : "0%" }}
            transition={{
              duration: isAutoplayActive ? 5 : 0.2,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* Slider Controls Bar */}
      <div className="mt-4 flex flex-col-reverse gap-3.5 sm:flex-row sm:items-center sm:justify-between px-1">
        {/* Pagination tabs / pills */}
        <div
          className="flex flex-wrap items-center gap-1.5 sm:gap-2"
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
                  group relative flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1.5
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
                <span className="font-mono text-[11px] opacity-75">{formatIndex(idx + 1)}</span>
                <span className="hidden md:inline text-xs font-medium max-w-[110px] truncate">
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter, Play/Pause, and Navigation Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          {/* Autoplay status label */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full transition-colors ${
                isAutoplayActive ? "bg-accent animate-pulse" : "bg-[var(--text-muted)]"
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider hidden sm:inline">
              {isAutoplayActive
                ? isRTL
                  ? "تلقائي"
                  : "Auto"
                : isRTL
                ? "موقّف"
                : "Paused"}
            </span>
          </div>

          {/* Numerical Counter */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--foreground)] text-sm">
              {formatIndex(activeIndex + 1)}
            </span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">{formatIndex(total)}</span>
          </div>

          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsPlaying((prev) => {
                const next = !prev;
                if (next) {
                  setIsUserInteracting(false);
                }
                return next;
              });
            }}
            aria-label={
              isPlaying
                ? isRTL
                  ? "إيقاف التشغيل التلقائي"
                  : "Pause autoplay"
                : isRTL
                ? "تشغيل تلقائي"
                : "Start autoplay"
            }
            title={
              isPlaying
                ? isRTL
                  ? "إيقاف التشغيل التلقائي"
                  : "Pause autoplay"
                : isRTL
                ? "تشغيل تلقائي"
                : "Start autoplay"
            }
            className="
              flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full
              border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]
              shadow-xs transition-all duration-200
              hover:border-accent hover:bg-accent hover:text-white
              active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            "
          >
            {isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} className={isRTL ? "-translate-x-0.5" : "translate-x-0.5"} />
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => handleManualPaginate(-1)}
              aria-label={isRTL ? "المشروع التالي" : "Previous project"}
              className="
                flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]
                shadow-xs transition-all duration-200
                hover:border-accent hover:bg-accent hover:text-white
                active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
              "
            >
              {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <button
              type="button"
              onClick={() => handleManualPaginate(1)}
              aria-label={isRTL ? "المشروع السابق" : "Next project"}
              className="
                flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]
                shadow-xs transition-all duration-200
                hover:border-accent hover:bg-accent hover:text-white
                active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
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
