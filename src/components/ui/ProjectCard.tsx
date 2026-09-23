import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index :number;
  total: number;
};

export default function ProjectCard({ project , index , total}: ProjectCardProps) {
  return (
    <article className="grid gap-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] md:grid-cols-[1.1fr_0.9fr] md:gap-12 transition-all duration-200">
      {/* Project image */}
      <div className="group relative min-h-[240px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none bg-[var(--surface-muted)] md:min-h-full">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          className="rounded-l-lg object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>

      {/* Project information */}
      <div className="flex flex-col justify-center p-5">
        {/* Category + year */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
             {String(index + 1).padStart(2, "0")} / {" "}
             {String(total).padStart(2, "0")}
          </span> 
          <span className="mono-label text-accent">
            {project.category}
          </span>

          <span className="font-mono text-xs text-[var(--text-muted)]">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Featured point */}
        <div className="mt-8 border-l-2 border-[var(--accent)] pl-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Key feature
          </span>

          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
            {project.featuredPoint}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-wrap gap-3">
          {/* Case study */}
          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              className="group/link inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-transparent px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Case study

              <ArrowUpRight
                aria-hidden="true"
                size={14}
                className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}

          {/* Live demo */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-md border border-black bg-black px-5 py-3 font-mono text-[10px] uppercase tracking-wider !text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
            >
              Live demo

              <ExternalLink
                aria-hidden="true"
                size={13}
                className="text-white transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}