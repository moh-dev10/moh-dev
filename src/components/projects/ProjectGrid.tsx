"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FolderSearch, RotateCcw } from "lucide-react";
import type { ProjectTranslation } from "@/data/translations";
import ProjectCard from "@/components/projects/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

type ProjectGridProps = {
  projects?: ProjectTranslation[];
  onResetFilter?: () => void;
};

export default function ProjectGrid({
  projects: propProjects,
  onResetFilter,
}: ProjectGridProps) {
  const { projects: contextProjects, t } = useLanguage();
  const projects = propProjects || contextProjects;

  if (projects.length === 0) {
    return (
      <div
        id="projects-grid"
        role="region"
        aria-live="polite"
        className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-12 text-center sm:p-16"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)]">
          <FolderSearch size={26} strokeWidth={1.75} />
        </div>

        <h3 className="mt-4 font-heading text-lg font-bold text-[var(--text-primary)] sm:text-xl">
          {t.projectsPage.noProjectsTitle}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {t.projectsPage.noProjectsDesc}
        </p>

        {onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 font-mono text-xs font-medium !text-white transition-all duration-200 hover:bg-[var(--accent)] hover:-translate-y-0.5 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>{t.projectsPage.resetFilter}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="projects-grid" role="region" aria-live="polite">
      <motion.div
        layout
        className="project-grid grid gap-8 md:grid-cols-2"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}