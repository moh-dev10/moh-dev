import { projects } from "@/data/projects";
import ProjectCard from "../../components/projects/ProjectCard";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import Link from "next/link";

export default function Work() {
    const featuredProjects = projects.filter(
        (project) => project.featured
    );
    return(
        <section id="work" className="section-padding">
           <div className="container-main">
<div className="flex flex-col md:flex-row md:items-end justify-between">
  <Reveal>
    <div>
      <p className="font-mono text-accent uppercase">
        Work
      </p>

      <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Real projects.
        <br />
        <em className="font-serif">Real business value.</em>
      </h2>
    </div>
  </Reveal>

  <Reveal>
    <div className="mt-6 flex items-center gap-6">
      <p className="max-w-sm text-xs leading-4 text-[var(--text-secondary)] md:text-sm md:leading-6">
        No tutorial clones. Every project below solves a real business problem.
      </p>

      <Link
        href="/projects"
        className="group flex shrink-0 items-center gap-2 text-xs font-semibold md:text-sm"
      >
        View all work
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  </Reveal>
</div>

             <div className="mt-14 space-y-8">
                {featuredProjects.slice(0, 3).map((project,index) => (
                    <Reveal 
                    key={project.slug}
                    delay={ index * 120}>

                        <ProjectCard 
                                     project={project} 
                                     />
                    </Reveal>
                ))}
             </div>
           </div>
        </section>
    )
    
}