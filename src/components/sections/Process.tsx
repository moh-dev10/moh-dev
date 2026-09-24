import Reveal from "../ui/Reveal";
const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, goals, audience, and requirements before writing a line of code.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Define the structure, features, user flow, and technical approach for the project.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Design and develop the website or application with clean, scalable, and maintainable code.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Test, optimize, and polish the experience across different devices and interactions.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Deploy the project, make sure everything is ready, and prepare it for real users.",
  },
];

export default function Process(){
    return (
        <section id="process" className="section-padding">
            <div className="container-main">
                <div className="max-w-2xl">
                    <p className="font-mono text-accent">MY PROCESS</p>

                    <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
                        From idea to launch.
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                        A clear and structured process to turn your idea into a reliable,
                        polished digital product.
                    </p>
                </div>
                <div className="mt-16">
{processSteps.map((step, index) => {
  const isEven = index % 2 === 0;

  return (
    <div
      key={step.number}
      className="relative grid min-h-48 grid-cols-[32px_1fr] gap-5 border-t border-[var(--border)] py-8 md:grid-cols-2 md:gap-0 md:border-t-0 md:py-14"
    >
      {/* Connector */}
      {index < processSteps.length - 1 && (
        <div className="absolute left-[15px] top-1/2 bottom-0 w-px bg-[var(--border)] md:left-1/2 md:top-1/2 md:bottom-0 md:-translate-x-1/2" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-[11px] top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent md:left-1/2 md:h-3 md:w-3 md:-translate-x-1/2" />

      {/* Content */}
      <div
        className={`relative z-20 col-start-2 flex flex-col ${
          isEven
            ? "md:col-start-2 md:items-start md:pl-16"
            : "md:col-start-1 md:items-end md:pr-16"
        }`}
      >
        <Reveal direction={isEven ? "right" : "left"}>
          <span className="font-mono text-xs text-[var(--text-secondary)] md:text-sm">
            {step.number}
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
    )
}