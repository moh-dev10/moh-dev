"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  BarChart3,
  Layers,
  Clock,
  User,
  Compass,
  Zap,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCaseStudy, type CaseStudyData } from "@/data/caseStudies";

interface CaseStudyViewProps {
  slug: string;
}

export default function CaseStudyView({ slug }: CaseStudyViewProps) {
  const { language, isRTL } = useLanguage();
  const data: CaseStudyData | null = getCaseStudy(slug, language);

  if (!data) {
    return null;
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <article
      className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background ambient subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden opacity-30"
      >
        <div className="absolute left-1/2 -top-40 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 md:pt-36 lg:px-8">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-6"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <BackArrow
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
            />
            <span>{isRTL ? "العودة إلى كافة المشاريع" : "Back to all projects"}</span>
          </Link>

          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="uppercase">{data.category}</span>
          </div>
        </motion.div>

        {/* SECTION A: HERO */}
        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl"
          >
            {/* Meta tags line */}
            <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
              <span className="rounded bg-[var(--surface-muted)] px-2.5 py-1 text-[var(--accent)] border border-[var(--border)]">
                {data.year}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <User size={12} className="text-[var(--text-muted)]" />
                {data.role}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} className="text-[var(--text-muted)]" />
                {data.timeline}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[var(--foreground)]">
              {data.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl md:leading-relaxed">
              {data.subtitle}
            </p>

            {/* Action Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group inline-flex items-center gap-2 rounded-md
                    border border-[var(--accent)] bg-[var(--accent)] px-6 py-3
                    font-mono text-xs uppercase tracking-wider text-white
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]
                  "
                >
                  <span>{isRTL ? "زيارة الموقع الحي" : "Visit Live Platform"}</span>
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </a>
              )}

              <a
                href="#overview"
                className="
                  inline-flex items-center gap-2 rounded-md
                  border border-[var(--border-strong)] bg-[var(--surface-muted)] px-5 py-3
                  font-mono text-xs uppercase tracking-wider text-[var(--foreground)]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]
                "
              >
                <span>{isRTL ? "استكشاف دراسة الحالة" : "Explore Case Study"}</span>
              </a>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="group relative mt-12 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl"
          >
            <div className="relative aspect-[16/9] w-full bg-neutral-950">
              <Image
                src={data.heroImage}
                alt={`${data.title} - Showcase`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between border-t border-[var(--border)] bg-[var(--surface-muted)]/80 px-4 py-3 text-xs text-[var(--text-muted)] backdrop-blur-sm sm:px-6">
              <span className="font-mono">{isRTL ? "واجهة دارنا الشاملة: لوحة التحكم والشاشات المتجاوبة" : "DARNA Architecture: Management Dashboard & Responsive Surfaces"}</span>
              <span className="font-mono text-[11px] text-[var(--accent)]">Production Verified</span>
            </div>
          </motion.div>
        </header>

        {/* SECTION B: PROJECT OVERVIEW */}
        <section id="overview" className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                <Compass size={14} />
                <span>{isRTL ? "القسم ب • نظرة عامة" : "Section B • Overview"}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                {isRTL ? "مهمة المشروع والجمهور المستهدف" : "System Purpose & Target Audience"}
              </h2>

              <p className="mt-6 text-base leading-relaxed text-[var(--foreground)]/90 sm:text-lg sm:leading-relaxed">
                {data.overview.summary}
              </p>

              <div className="mt-8 space-y-6">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    {isRTL ? "الهدف الأساسي للنظام" : "Primary Objective"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {data.overview.purpose}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    {isRTL ? "الفئات المستفيدة والمستخدمون" : "Target Audience & Users"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {data.overview.targetAudience}
                  </p>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div>
              <div className="sticky top-28 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    {isRTL ? "المواصفات التقنية" : "Technical Specifications"}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">SYSTEM V1.0</span>
                </div>

                <dl className="divide-y divide-[var(--border)]">
                  {data.overview.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between py-3.5 text-xs sm:text-sm">
                      <dt className="font-mono text-[var(--text-muted)]">{spec.label}</dt>
                      <dd className="font-medium text-end text-[var(--foreground)]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: THE CHALLENGE */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <Zap size={14} />
            <span>{isRTL ? "القسم ج • التحديات السوقية" : "Section C • The Challenge"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {data.challenge.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {data.challenge.context}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.challenge.points.map((pt, i) => (
              <div
                key={i}
                className="group relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 hover:border-[var(--accent)]/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)] transition-colors group-hover:bg-[var(--accent)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  {pt.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D: THE SOLUTION */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <Layers size={14} />
            <span>{isRTL ? "القسم د • الحل المبتكر" : "Section D • The Solution"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {data.solution.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {data.solution.summary}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.solution.pillars.map((pillar, i) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
              >
                <div className="mb-3 inline-flex items-center rounded bg-[var(--surface-muted)] px-2.5 py-1 font-mono text-[11px] text-[var(--accent)] border border-[var(--border)]">
                  {pillar.tag}
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E: TECHNICAL ARCHITECTURE */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <Cpu size={14} />
            <span>{isRTL ? "القسم هـ • البنية المعمارية" : "Section E • Technical Architecture"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {data.architecture.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {data.architecture.description}
          </p>

          {/* Tech Categories Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.architecture.techStack.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    {cat.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {cat.note && (
                  <p className="mt-4 border-t border-[var(--border)] pt-3 font-mono text-[10px] text-[var(--text-muted)]">
                    {cat.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Architecture Decisions */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {isRTL ? "القرارات الهندسية والمبررات التقنية" : "Key Architectural Decisions & Trade-Offs"}
            </h3>

            <div className="mt-6 space-y-4">
              {data.architecture.decisions.map((dec, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]/50 p-5"
                >
                  <h4 className="font-semibold text-sm text-[var(--foreground)]">
                    {dec.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                    {dec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION F: KEY FEATURES */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <CheckCircle2 size={14} />
            <span>{isRTL ? "القسم و • الميزات وحالة الإنجاز" : "Section F • Key Features & Status"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {isRTL ? "أهم وظائف وميزات النظام وحالة الجاهزية" : "Key Architectural Features & Readiness"}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {isRTL
              ? "تفصيل دقيق لوظائف المنظومة، مع تمييز صريح بين الميزات المكتملة والمستقرة في بيئة الإنتاج، والأهداف المعمارية المجدولة للتوسع."
              : "A transparent breakdown of system capabilities, explicitly distinguishing completed production features from architectural targets."}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.keyFeatures.map((feat, i) => {
              const isTarget = feat.status === "Architectural Target";
              return (
                <div
                  key={i}
                  className="relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        isTarget
                          ? "border border-amber-500/40 bg-amber-500/10 text-amber-400"
                          : "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isTarget ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      <span>
                        {isTarget
                          ? isRTL
                            ? "هدف معماري مستهدف"
                            : "Architectural Target"
                          : isRTL
                          ? "مكتمل في الإنتاج"
                          : "Completed in Production"}
                      </span>
                    </span>

                    <span className="font-mono text-xs text-[var(--text-muted)]">0{i + 1}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {feat.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION G: DEVELOPMENT PROCESS */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <BarChart3 size={14} />
            <span>{isRTL ? "القسم ز • منهجية التطوير" : "Section G • Engineering Process"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {isRTL ? "مراحل الهندسة والبناء خطوة بخطوة" : "Engineering & Delivery Roadmap"}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {isRTL
              ? "الخطوات المنهجية التي اتبعتها لتحويل المتطلبات المعقدة إلى نظام متكامل ومستقر للتشغيل التجاري."
              : "The methodical roadmap taken from domain discovery to a hardened, production-ready operational system."}
          </p>

          <div className="mt-10 space-y-6">
            {data.developmentProcess.map((st, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-start sm:gap-6"
              >
                <div className="font-mono text-2xl font-bold text-[var(--accent)] sm:w-16">
                  {st.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {st.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION H: VISUAL SHOWCASE */}
        <section className="mb-20 scroll-mt-28 border-t border-[var(--border)] pt-16 md:mb-28">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <Globe2 size={14} />
            <span>{isRTL ? "القسم ح • المعاينة البصرية" : "Section H • Visual Showcase"}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {data.showcase.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
            {data.showcase.description}
          </p>

          <div className="mt-10 space-y-12">
            {data.showcase.items.map((item, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]"
              >
                <div className="relative aspect-[16/9] w-full bg-neutral-950">
                  <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="flex flex-col gap-2 border-t border-[var(--border)] bg-[var(--surface-muted)]/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <p className="text-xs text-[var(--foreground)]/90 sm:text-sm">
                    {item.caption}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                    {item.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* SECTION I: NEXT PROJECT / FOOTER CTA */}
        {data.nextProject ? (
          <nav className="border-t border-[var(--border)] pt-16">
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-8 sm:p-12">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                    {isRTL ? "المشروع التالي" : "Next Project"}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                    {data.nextProject.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                    {data.nextProject.category}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/projects"
                    className="
                      inline-flex items-center gap-2 rounded-md
                      border border-[var(--border-strong)] bg-transparent px-5 py-3
                      font-mono text-xs uppercase tracking-wider text-[var(--foreground)]
                      transition-all duration-200
                      hover:border-[var(--accent)] hover:text-[var(--accent)]
                    "
                  >
                    <BackArrow size={14} />
                    <span>{isRTL ? "كافة المشاريع" : "All Projects"}</span>
                  </Link>

                  <Link
                    href={`/projects#${data.nextProject.slug}`}
                    className="
                      group inline-flex items-center gap-2 rounded-md
                      border border-[var(--accent)] bg-[var(--accent)] px-6 py-3
                      font-mono text-xs uppercase tracking-wider text-white
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20
                    "
                  >
                    <span>{isRTL ? "استعراض المشروع" : "View Project"}</span>
                    <NextArrow
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="border-t border-[var(--border)] pt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
            >
              <BackArrow size={14} />
              <span>{isRTL ? "العودة لكافة المشاريع" : "Return to all projects"}</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
