import {
  ArrowUpRight,
  Check,
  Code2,
  Globe2,
  Zap,
} from "lucide-react";

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "WooCommerce",
];

export default function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative"
    >
      <div className="animate-float-slow relative mx-auto w-full max-w-[620px]">

        {/* Main browser / developer card */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">

          {/* Browser bar */}
          <div className="flex h-12 items-center justify-between border-b border-[var(--border)] px-4">

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            <span className="font-mono text-[10px] text-[var(--text-muted)]">
              mohdev — portfolio
            </span>

            <span className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[9px] text-[var(--text-muted)]">
              v1.0
            </span>
          </div>

          {/* Developer identity */}
          <div className="px-6 pt-6">

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--dark)] font-heading text-lg font-bold text-white">
                  M.
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-bold">
                      Moh Dev
                    </span>

                    <span className="rounded bg-[var(--surface-muted)] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[var(--text-secondary)]">
                      Full-Stack
                    </span>
                  </div>

                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Web Developer
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-[var(--text-muted)]">
              <Globe2 size={12} />

              Algeria · Remote
            </div>
          </div>

          {/* Code panel */}
          <div className="mx-6 mt-5 overflow-hidden rounded-xl bg-[#0b0d10]">

            {/* Code header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

              <div className="flex items-center gap-2">
                <Code2
                  size={13}
                  className="text-blue-400"
                />

                <span className="font-mono text-[10px] text-gray-400">
                  developer.ts
                </span>
              </div>

              <span className="font-mono text-[9px] text-gray-600">
                TypeScript
              </span>
            </div>

            {/* Code */}
            <div className="px-5 py-5 font-mono text-[11px] leading-6">

              <p>
                <span className="text-purple-400">
                  const
                </span>{" "}
                <span className="text-blue-300">
                  developer
                </span>{" "}
                <span className="text-gray-500">
                  =
                </span>{" "}
                <span className="text-gray-300">
                  {"{"}
                </span>
              </p>

              <p className="pl-5">
                <span className="text-gray-500">
                  stack:
                </span>{" "}
                <span className="text-green-400">
                  [&quot;React&quot;, &quot;Next.js&quot;,
                </span>
              </p>

              <p className="pl-14 text-green-400">
                &quot;Node.js&quot;, &quot;PostgreSQL&quot;]
              </p>

              <p className="pl-5">
                <span className="text-gray-500">
                  focus:
                </span>{" "}
                <span className="text-yellow-300">
                  &quot;business results&quot;
                </span>
                <span className="text-gray-500">
                  ,
                </span>
              </p>

              <p className="pl-5">
                <span className="text-gray-500">
                  architecture:
                </span>{" "}
                <span className="text-cyan-400">
                  &quot;maintainable&quot;
                </span>
              </p>

              <p className="pl-5">
                <span className="text-gray-500">
                  performance:
                </span>{" "}
                <span className="text-cyan-400">
                  &quot;optimized&quot;
                </span>
              </p>

              <p>
                <span className="text-gray-300">
                  {"};"}
                </span>
              </p>
            </div>
          </div>

          {/* Build output */}
          <div className="mx-6 mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">

            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="text-[var(--text-muted)]">
                $
              </span>

              <span className="text-[var(--text-secondary)]">
                npm run build
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 font-mono text-[10px]">
              <Check
                size={12}
                className="text-green-500"
              />

              <span className="text-[var(--text-secondary)]">
                Production build ready
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 px-6 py-5">

            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-[9px] text-[var(--text-secondary)]"
              >
                {technology}
              </span>
            ))}

            <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 font-mono text-[9px] text-white">
              + more
            </span>
          </div>
        </div>

        {/* Floating conversion card */}
        <div className="animate-float absolute -left-10 top-24 z-20 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-3 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.12)]">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
            <ArrowUpRight size={18} />
          </div>

          <div >
            <p className="font-heading text-xs font-bold">
              Conversion-first
            </p>

            <p className="font-mono text-[9px] text-[var(--text-muted)]">
              design & code
            </p>
          </div>
        </div>

        {/* Floating performance card */}
        <div className="animate-float absolute -bottom-8 -right-7 z-20 rounded-xl bg-[var(--dark)] px-4 py-3 shadow-[0_20px_50px_rgba(15,23,42,0.2)]">

          <div className="flex items-center gap-2">
            <Zap
              size={13}
              className="text-blue-400"
            />

            <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
              Engineering
            </span>
          </div>

          <p className="mt-1 font-heading text-sm font-bold text-white">
            Built to scale
          </p>
        </div>

        {/* Decorative accent */}
        <div className="absolute -right-9 top-1/2 z-20 h-5 w-5 -translate-y-1/2 rounded-full border border-[var(--accent)] bg-white p-1">
          <div className="h-full w-full rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}