"use client";

import Image from "next/image";
import Reveal from "../ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="container-main flex flex-col gap-4 items-center">
        <p className="font-mono text-accent uppercase text-xs tracking-wider">
          {t.about.eyebrow}
        </p>

        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14 lg:gap-16 w-full">
          {/* Profile image */}
          <Reveal direction={isRTL ? "right" : "left"}>
            <div className="relative min-h-[420px] h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]">
              <Image
                src="/moha.webp"
                alt={isRTL ? "محمد — مطور ويب Full-Stack" : "Mohamed — Full-Stack Web Developer"}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal direction={isRTL ? "left" : "right"}>
            <div className="flex flex-col justify-center gap-5">
              <h2 className="max-w-xl font-heading text-3xl sm:text-4xl font-bold leading-tight">
                {t.about.titleLine1}{" "}
                <em className="font-serif text-accent not-italic">
                  {t.about.titleHighlight}
                </em>
              </h2>

              <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">
                {t.about.p1}
              </p>

              <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">
                {t.about.p2}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {t.about.principles.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-start gap-3 bg-white border border-[var(--border)] p-4 rounded-xl"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-bold text-white">
                      ✓
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold font-heading text-sm md:text-base">
                        {p.label}
                      </span>
                      <span className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
                        {p.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}