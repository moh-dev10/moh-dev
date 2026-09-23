const navLinks = [
  { title: "Work", href: "#work" },
  { title: "Services", href: "#services" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-[var(--border)] bg-[var(--background)]/90  backdrop-blur-md border-b">
      <nav className="container-main flex h-16 items-center justify-between ">
        
        {/* Brand */}
        <a
          href="#"
          className="font-heading text-xl font-700 tracking-tight"
        >
          Moh<span className="text-accent">.</span>Dev
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] transition-colors duration-200 hover:text-accent"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-md border border-[var(--foreground)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-accent hover:bg-[var(--accent)] hover:text-white md:block"
        >
          Let&apos;s work together →
        </a>

        {/* Mobile button — functionality later */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center border border-[var(--border)] md:hidden"
        >
          <span className="font-mono text-sm">☰</span>
        </button>
      </nav>
    </header>
  );
}