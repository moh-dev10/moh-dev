"use client";

import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <nav className="container-main flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-tight shrink-0"
        >
          Moh<span className="text-accent">.</span>Dev
        </a>

        {/* Navigation */}
        <DesktopNav />

        {/* Language switcher & CTA */}
        <div className="hidden items-center gap-4 md:flex shrink-0">
          <LanguageSwitcher />

          <a
            href="#contact"
            className="rounded-3xl bg-[var(--dark)] !text-white border border-[var(--foreground)] px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-accent hover:bg-[var(--accent)] hover:!text-white whitespace-nowrap"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}