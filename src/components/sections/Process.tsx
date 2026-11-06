"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const { t, isRTL, language } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = timelineRef.current;
      const progressLine = progressLineRef.current;
      const nodes = nodesRef.current.filter(
        (node): node is HTMLDivElement => node !== null
      );

      if (!timeline || !progressLine || nodes.length === 0) return;

      const updateTrackPosition = () => {
        const timelineRect = timeline.getBoundingClientRect();

        const firstNodeRect = nodes[0].getBoundingClientRect();
        const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();

        const firstCenter =
          firstNodeRect.top + firstNodeRect.height / 2 - timelineRect.top;

        const lastCenter =
          lastNodeRect.top + lastNodeRect.height / 2 - timelineRect.top;

        gsap.set(progressLine, {
          top: firstCenter,
          height: lastCenter - firstCenter,
        });
      };

      updateTrackPosition();

      // Progress line animation
      gsap.fromTo(
        progressLine,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: nodes[0],
            start: "top 50%",
            endTrigger: nodes[nodes.length - 1],
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Node activation
      nodes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 50%",

          onEnter: () => {
            gsap.to(node, {
              scale: 1.35,
              boxShadow: "0 0 0 6px color-mix(in srgb, var(--accent) 15%, transparent)",
              duration: 0.3,
              ease: "power2.out",
            });
          },

          onLeaveBack: () => {
            gsap.to(node, {
              scale: 1,
              boxShadow: "0 0 0 0px transparent",
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });

      const handleResize = () => {
        updateTrackPosition();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, timelineRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="process" className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-accent uppercase text-xs tracking-wider">
            {t.process.eyebrow}
          </p>

          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            {t.process.title}
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {t.process.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16">
          {/* Base timeline */}
          <div
            className={`
              absolute
              w-px
              bg-[var(--border)]
              md:left-1/2
              md:-translate-x-1/2
              ${isRTL ? "right-[15px] left-auto" : "left-[15px] right-auto"}
            `}
            style={{
              top: 0,
              bottom: 0,
            }}
          />

          {/* Animated progress */}
          <div
            ref={progressLineRef}
            className={`
              absolute
              w-px
              origin-top
              bg-accent
              md:left-1/2
              md:-translate-x-1/2
              ${isRTL ? "right-[15px] left-auto" : "left-[15px] right-auto"}
            `}
          />

          {/* Steps */}
          {t.process.steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.number}
                className="
                  relative
                  grid
                  min-h-48
                  grid-cols-[32px_1fr]
                  gap-5
                  border-t
                  border-[var(--border)]
                  py-8

                  md:grid-cols-2
                  md:gap-0
                  md:border-t-0
                  md:py-14
                "
              >
                {/* Timeline node */}
                <div
                  ref={(element) => {
                    nodesRef.current[index] = element;
                  }}
                  className={`
                    absolute
                    top-1/2
                    z-10
                    h-2.5
                    w-2.5
                    -translate-y-1/2
                    rounded-full
                    bg-accent
                    md:left-1/2
                    md:h-3
                    md:w-3
                    md:-translate-x-1/2
                    ${isRTL ? "right-[11px] left-auto" : "left-[11px] right-auto"}
                  `}
                />

                {/* Content */}
                <div
                  className={`relative z-20 col-start-2 flex flex-col ${
                    isEven
                      ? isRTL
                        ? "md:col-start-2 md:items-start md:pr-16 md:pl-0"
                        : "md:col-start-2 md:items-start md:pl-16 md:pr-0"
                      : isRTL
                        ? "md:col-start-1 md:items-end md:pl-16 md:pr-0"
                        : "md:col-start-1 md:items-end md:pr-16 md:pl-0"
                  }`}
                >
                  <Reveal direction={isEven ? (isRTL ? "left" : "right") : (isRTL ? "right" : "left")}>
                    <span className="font-mono text-xs text-[var(--text-secondary)] md:text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1.5 font-heading text-xl font-bold md:mt-2 md:text-3xl">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-secondary)] md:mt-3 md:text-base">
                      {step.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}