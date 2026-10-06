import { skillGroups } from "@/data/stack";

export default function TechnicalStack() {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Technical Skills
          </p>

          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Tools I use to
            <br />
            <span className="font-serif font-normal italic">
              build things.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            A practical stack built around modern web development, full-stack
            applications, and eCommerce.
          </p>
        </div>

        {/* Skill groups */}
        <div className="mt-16">
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className="grid gap-6 border-t border-[var(--border)] py-8 md:grid-cols-[180px_1fr] md:gap-12"
            >
              {/* Group label */}
              <div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-2 font-heading text-lg font-semibold">
                  {group.title}
                </h3>
              </div>

              {/* Skills */}
              <div>
                <p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                  {group.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 font-mono text-xs text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}