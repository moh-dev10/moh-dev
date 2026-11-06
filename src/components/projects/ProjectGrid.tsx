"use client";

import type { ProjectTranslation } from "@/data/translations";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

type ProjectGridProps = {
  projects?: ProjectTranslation[];
};

export default function ProjectGrid({ projects: propProjects }: ProjectGridProps) {
  const { projects: contextProjects } = useLanguage();
  const projects = propProjects || contextProjects;

  return (
    <div className="project-grid grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 100}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}