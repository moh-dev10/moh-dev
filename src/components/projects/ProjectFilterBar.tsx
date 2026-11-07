"use client";

export interface FilterCategory {
  id: string;
  label: string;
  count: number;
}

interface ProjectFilterBarProps {
  categories: FilterCategory[];
  activeFilter: string;
  onSelectFilter: (id: string) => void;
  ariaLabel?: string;
}

export default function ProjectFilterBar({
  categories,
  activeFilter,
  onSelectFilter,
  ariaLabel = "Filter projects by category",
}: ProjectFilterBarProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="mb-10 sm:mb-12"
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="
          flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:flex-wrap sm:overflow-visible sm:pb-0
        "
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`filter-tab-${cat.id}`}
              aria-selected={isActive}
              aria-controls="projects-grid"
              onClick={() => onSelectFilter(cat.id)}
              className={`
                group relative inline-flex shrink-0 items-center gap-2 rounded-full
                border px-4 py-2 sm:px-5 sm:py-2.5
                font-mono text-xs sm:text-sm font-medium tracking-wide
                transition-all duration-200 cursor-pointer
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
                ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent)]/25"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                }
              `}
            >
              <span>{cat.label}</span>

              {/* Count badge */}
              <span
                className={`
                  inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5
                  font-mono text-[11px] font-semibold transition-colors duration-200
                  ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--surface-muted)] text-[var(--text-muted)] group-hover:bg-[var(--border)] group-hover:text-[var(--text-primary)]"
                  }
                `}
                aria-label={`${cat.count} projects`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
