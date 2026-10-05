import Link from "next/link";

import ProjectGrid from "@/components/projects/ProjectGrid";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding decorative-hero">
        <div className="container-main">
          <Reveal>
            <div className="max-w-3xl pt-12">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Projects
              </p>

              <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Projects that
                <br />
                <span className="font-serif font-normal italic">
                  shipped
                </span>{" "}
                &amp; sell
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                A collection of websites, eCommerce stores, and web
                applications built to solve real business and product
                problems.
              </p>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {projects.length} Projects
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main">
          <Reveal>
            <div className="border-t border-[var(--border)] pt-12 sm:pt-16">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Have a project in mind?
              </p>

              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Let&apos;s build something
                <br />
                <span className="font-serif font-normal italic">
                  that matters.
                </span>
              </h2>

              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center rounded-full bg-[var(--text-primary)] px-6 py-3 font-medium !text-white transition-transform duration-300 hover:-translate-y-1"
              >
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}