import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

type HeroStat = {
  label: string;
  value: string;
};

const heroStats: HeroStat[] = [
  {
    label: "Projects completed",
    value: "8+",
  },
  {
    label: "Service tracks",
    value: "6",
  },
  {
    label: "Max response",
    value: "24h",
  },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="tech-grid relative overflow-hidden min-h-screen pt-16"
    >
      <div aria-hidden="true"
      className="pointer-events-none absolute left-[-120px] top-40 h-64 w-64 rounded-full
       border border-[var(--accent)]/10"/>
      <div className="container-main grid min-h-[calc(100vh-4rem)] items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        {/* Content */}
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-enter hero-enter-delay-1 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur-sm">
              <span
                aria-hidden="true"
                className=" h-2 w-2 rounded-full bg-green-500"
              />

              Available for new projects
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Full-Stack Developer — DZ / Remote
            </span>
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className="hero-enter hero-enter-delay-2 mt-8 font-heading text-5xl font-bold leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          >
            I build websites
            
            that turn visitors
            
            into{" "}
            <em className="font-serif font-normal tracking-normal text-accent">
              customers
            </em>
            <span aria-hidden="true" className="text-accent">
              .
            </span>
          </h1>

          {/* Description */}
          <p className="hero-enter hero-enter-delay-3 mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
            I&apos;m{" "}
            <span className="font-semibold text-[var(--foreground)]">
              Mohamed
            </span>{" "}
            — a Full-Stack Web Developer building modern websites, eCommerce
            platforms, and custom web solutions with a focus on clean
            architecture, maintainable code, and real business needs.
          </p>

          {/* CTAs */}
          <div className="hero-enter hero-enter-delay-4 mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Let&apos;s work together

              <ArrowRight
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-white/50 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              View my work

              <ArrowUpRight
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Availability / Languages */}
          <div className="hero-enter hero-enter-delay-5 mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="font-medium text-[var(--foreground)]">
              Replies within 24h
            </span>

            <span
              aria-hidden="true"
              className="text-[var(--text-muted)]"
            >
              /
            </span>

            <span className="text-[var(--text-secondary)]">
              FR · AR · EN
            </span>
          </div>

          {/* Stats */}
          <dl className="hero-enter hero-enter-delay-6 mt-10 grid max-w-2xl grid-cols-3 border-t border-[var(--border)] pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label} className="pr-4">

                <dd className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                  {stat.value}
                </dd>

                <dt className="font-mono text-[10px] md:text-sm uppercase leading-4 tracking-[0.08em] text-[var(--text-muted)]">
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