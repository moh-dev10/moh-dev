"use client";

import { ArrowRight, ArrowLeft, ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import HeroVisual from "./HeroVisual";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const ArrowForward = isRTL ? ArrowLeft : ArrowRight;
  const ArrowCorner = isRTL ? ArrowUpLeft : ArrowUpRight;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      e.preventDefault();
      router.push(`/${targetId}`);
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="tech-grid relative overflow-hidden min-h-screen pt-16"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-40 h-64 w-64 rounded-full border border-[var(--accent)]/10 ${
          isRTL ? "right-[-120px]" : "left-[-120px]"
        }`}
      />
      <div className="container-main grid min-h-[calc(100vh-4rem)] items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        {/* Content */}
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-enter hero-enter-delay-1 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-green-500"
              />
              {t.hero.availableBadge}
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {t.hero.roleBadge}
            </span>
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className="hero-enter hero-enter-delay-2 mt-8 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem]"
          >
            {t.hero.titlePrefix}{" "}
            <em className="font-serif font-normal tracking-normal text-accent not-italic">
              {t.hero.titleHighlight}
            </em>
            <span aria-hidden="true" className="text-accent">
              .
            </span>
          </h1>

          {/* Description */}
          <p className="hero-enter hero-enter-delay-3 mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="hero-enter hero-enter-delay-4 mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] !text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowForward
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </a>

            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "#work")}
              className="group inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-white/50 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowCorner
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              />
            </a>
          </div>

          {/* Availability / Languages */}
          <div className="hero-enter hero-enter-delay-5 mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="font-medium text-[var(--foreground)]">
              {t.hero.repliesTime}
            </span>

            <span
              aria-hidden="true"
              className="text-[var(--text-muted)]"
            >
              /
            </span>

            <span className="text-[var(--text-secondary)] font-mono text-[11px]">
              {t.hero.languages}
            </span>
          </div>

          {/* Stats */}
          <dl className="hero-enter hero-enter-delay-6 mt-10 grid max-w-2xl grid-cols-3 border-t border-[var(--border)] pt-6">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="pe-4">
                <dd className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                  {stat.value}
                </dd>

                <dt className="font-mono text-[10px] md:text-sm uppercase leading-4 tracking-[0.08em] text-[var(--text-muted)] mt-1">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="hero-enter hero-enter-delay-3">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}