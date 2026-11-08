import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
        404 — Not Found
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Case Study or Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm text-[var(--text-muted)]">
        The requested case study or project does not exist yet or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <ArrowLeft size={14} />
          <span>All Projects</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--foreground)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]"
        >
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
