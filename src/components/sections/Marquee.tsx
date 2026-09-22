const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "WordPress",
  "WooCommerce",
];

export default function Marquee() {
  return (
    <section
      aria-label="Technologies"
      className="overflow-hidden border-y border-[var(--border)] bg-[var(--dark)] text-white"
    >
      <div className="marquee-track flex w-max">
        {[...technologies, ...technologies].map((technology, index) => (
          <div
            key={`${technology}-${index}`}
            className="flex items-center"
          >
            <span className="px-6 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-300 md:px-8 md:text-xs">
              {technology}
            </span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[var(--accent)]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}