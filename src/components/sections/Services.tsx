import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import ServiceCard from "../ui/ServiceCard";
import Reveal from "../ui/Reveal";
 
export default function Services() {
      return (
        <section id="services" className="py-20 md:py-28">
            <div className="container-main">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
            <Reveal>
                    <div>
                            <span className="mono-label text-accent">   
                                Services
                            </span>
                            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                                What I can build <br />
                                <em className="font-serif">for your business.</em>
                            </h2>
                    </div>
                 
                 <a  href="/services" className="group  max-w-fit flex items-center  gap-2 font-semibold px-3.5 py-2.5 border border-[var(--border)] rounded-full hover:!text-white hover:!bg-black transition-all duration-200">
                        Detailed Pricing 
                        <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1"/>
                 </a>
            </Reveal>
            </div>

            <div className="mt-14 grid gap-5  md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <Reveal
                    key={service.slug}
                    delay={index * 100}>
                        <ServiceCard
                        service={service}
                        index={index}/>
                    </Reveal
                   >
                ))}
            </div>
            </div>
        </section>

      )
}