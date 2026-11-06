"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import ServiceCard from "../ui/ServiceCard";
import Reveal from "../ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t, services, isRTL } = useLanguage();
  const ArrowForward = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="section-padding">
      <div className="container-main">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div>
              <span className="mono-label text-accent font-semibold">
                {t.services.eyebrow}
              </span>

              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {t.services.titleLine1} <br />
                <em className="font-serif text-accent not-italic">
                  {t.services.titleHighlight}
                </em>
              </h2>
            </div>

            <a
              href="#contact"
              className="mt-4 group max-w-fit flex items-center gap-2 font-semibold px-4 py-2.5 border border-[var(--border)] rounded-full hover:!text-white hover:!bg-black transition-all duration-200 text-xs md:text-sm"
            >
              <span>{t.services.detailedPricing}</span>

              <ArrowForward
                size={14}
                className="transition-all duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 100}
            >
              <ServiceCard
                service={service}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
