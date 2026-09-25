import { projects } from "@/data/projects";
import ProjectCard from "../ui/ProjectCard";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function Work() {
    const featuredProjects = projects.filter(
        (project) => project.featured
    );
    return(
        <section id="work" className="section-padding">
           <div className="container-main">
             <div className="md:flex items-center justify-between">
                 <Reveal>
                     <div>
        
                        <p className="font-mono text-accent uppercase">
                            Work
                        </p>
        
                        <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
                            Real projects.<br />
                            <em className="font-serif ">Real business value.</em>
                        </h2>
        
                     </div>
                     
                    <div className="flex items-center gap-4 md:max-w-2xl mt-6 md:mt-0">
                            <p className="max-w-sm text-xs md:text-sm font-heading leading-4 md:leading-6  text-[var(--text-secondary)] ">
                                No tutorial clones. Every project below solves a real business problem.
                            </p>
                            <a href="/work" className="group flex items-center gap-2 text-xs md:text-sm font-semibold">
                                View all work 
                                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1"/>
                            </a>
                    </div>
                 </Reveal>
             </div>

             <div className="mt-14 space-y-8">
                {featuredProjects.slice(0, 3).map((project,index) => (
                    <Reveal 
                    key={project.title}
                    delay={ index * 120}>

                        <ProjectCard 
                                     project={project} 
                                     index={index}
                                     total={3}/>
                    </Reveal>
                ))}
             </div>
           </div>
        </section>
    )
    
}