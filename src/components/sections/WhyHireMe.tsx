import {
  ArrowUpRight,
  Smartphone,
  SlidersHorizontal,
  MessageSquare,
} from "lucide-react";

import Reveal from "../ui/Reveal";

const reasons = [
  {
    icon: ArrowUpRight,
    title: "Built to convert",
    description:
      "Clear offers, strong CTAs, and contact options placed where customers are ready to act.",
  },
  {
    icon: Smartphone,
    title: "Fast on real phones",
    description:
      "Optimized for mobile users, including 4G connections and lower-end devices.",
  },
  {
    icon: SlidersHorizontal,
    title: "Easy to manage",
    description:
      "WordPress/WooCommerce or clean custom code — structured so the business can maintain and extend it.",
  },
  {
    icon: MessageSquare,
    title: "Direct & honest",
    description:
      "You talk directly to the person building your project. Clear scope, realistic timelines, and no unnecessary jargon.",
  },
];

export default function WhyHireMe() {
  return (
    <section
      id="why-hire-me"
      aria-labelledby="why-hire-me-title"
      className="border-y border-[var(--border)] bg-white section-padding"
    >
      <div className="container-main">
        {/* Section intro */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal delay={200}>
          <div className="max-w-3xl">
            <p className="font-mono text-accent uppercase">
              Why businesses hire me
            </p>

              <h2
                id="why-hire-me-title"
                className="font-heading text-3xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-4xl md:text-5xl"
              >
                Not just a website.
                <br />
                A tool built to{" "}
                <em className="font-serif font-normal tracking-normal text-accent">
                  bring business.
                </em>
              </h2>
          </div>
            </Reveal>

          <div className="">
            

            <p className="mt-7 max-w-2xl text-base leading-6 text-[var(--text-secondary)] md:text-lg md:leading-8">
              Good-looking websites aren&apos;t enough. I build with one question:
              <strong className="font-semibold text-[var(--foreground)]">
                {" "}will this help you get contacted, booked, or paid?
              </strong>
            </p>
            
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-muted)] md:text-base md:leading-7">
              Speed, clarity, strong CTAs, WhatsApp, checkout, and SEO — built around
              your business.
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div className="mt-20 grid border-t border-[var(--border)] md:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <Reveal 
              key={reason.title}
              delay={ index * 100}>
              <article
                key={reason.title}
                className={`group border-b border-[var(--border)] py-8 md:p-10 ${
                  index % 2 === 0
                    ? "md:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-muted)] transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                    <Icon
                      aria-hidden="true"
                      size={17}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        0{index + 1}
                      </span>

                      <h3 className="font-heading text-lg font-bold tracking-tight">
                        {reason.title}
                      </h3>
                    </div>

                    <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}