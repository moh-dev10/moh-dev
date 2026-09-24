import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <nav className="container-main flex h-16 items-center justify-between">

        {/* Brand */}
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-tight"
        >
          Moh<span className="text-accent">.</span>Dev
        </a>

        {/* Navigation */}
        <DesktopNav />

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-3xl bg-[var(--dark)] !text-white border border-[var(--foreground)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-accent hover:bg-[var(--accent)] hover:text-white md:block"
        >
          Let&apos;s work together →
        </a>

        {/* Mobile menu */}
        <MobileMenu/>
      </nav>
    </header>
  );
}