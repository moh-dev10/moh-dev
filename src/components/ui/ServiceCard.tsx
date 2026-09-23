import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export default function ServiceCard({ service , index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group flex min-h-[220px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors duration-300 hover:bg-black md:p-6">
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </span>

        <Icon
          aria-hidden="true"
          size={24}
          strokeWidth={1.5}
          className="transition-colors duration-300 group-hover:text-[var(--accent-bright)]"
        />
      </div>

      {/* Main content */}
      <div className="mt-5 flex flex-1 flex-col gap-2">
        <h3 className="font-heading text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>

        <p className="text-sm font-medium text-accent">
          {service.tagline}
        </p>

        <p className="text-sm leading-6 text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-gray-300">
          {service.description}
        </p>

        {/* Bottom metadata */}
        <div className="mt-auto border-t border-[var(--border)] pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium transition-colors duration-300 group-hover:text-white">
              {service.duration}
            </p>

            <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-white">
              {service.startingPrice}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}