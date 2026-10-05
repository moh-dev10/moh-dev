import type { Project } from "@/data/projects";

import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/ui/Reveal";

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
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