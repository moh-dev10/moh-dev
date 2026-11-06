"use client";

import {
  ArrowUpRight,
  ArrowUpLeft,
  Smartphone,
  SlidersHorizontal,
  MessageSquare,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyHireMe() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const icons = [ArrowIcon, Smartphone, SlidersHorizontal, MessageSquare];

  return (
    <section
      id="why-hire-me"
      aria-labelledby="why-hire-me-title"
      className="border-y border-[var(--border)] bg-white section-padding"
    >
      <div className="container-main">
        {/* Section intro */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal delay={200}>
            <div className="max-w-3xl">
              <p className="font-mono text-accent uppercase text-xs tracking-wider">
                {t.whyHireMe.eyebrow}
              </p>

              <h2
                id="why-hire-me-title"
                className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.035em] sm:text-4xl md:text-5xl"
              >
                {t.whyHireMe.titleLine1}
                <br />
                {t.whyHireMe.titleLine2}{" "}
                <em className="font-serif font-normal tracking-normal text-accent not-italic">
                  {t.whyHireMe.titleHighlight}
                </em>
              </h2>
            </div>
          </Reveal>

          <div>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
              {t.whyHireMe.leadText}{" "}
              <strong className="font-semibold text-[var(--foreground)]">
                {t.whyHireMe.leadQuestion}
              </strong>
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-muted)] md:text-base md:leading-7">
              {t.whyHireMe.subText}
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div className="mt-16 grid border-t border-[var(--border)] md:grid-cols-2">
          {t.whyHireMe.reasons.map((reason, index) => {
            const Icon = icons[index] || ArrowIcon;

            return (
              <Reveal key={reason.title} delay={index * 100}>
                <article
                  className={`group border-b border-[var(--border)] py-8 md:p-10 ${
                    index % 2 === 0 ? "md:border-e" : ""
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-muted)] transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                      <Icon
                        aria-hidden="true"
                        size={17}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          0{index + 1}
                        </span>

                        <h3 className="font-heading text-lg font-bold tracking-tight">
                          {reason.title}
                        </h3>
                      </div>

                      <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}