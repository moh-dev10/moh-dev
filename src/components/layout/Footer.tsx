"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { isRTL, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
          <a
            href="#"
            className="font-heading text-lg font-bold tracking-tight text-[var(--foreground)]"
          >
            Moh<span className="text-accent">.</span>Dev
          </a>

          <span className="hidden sm:inline text-[var(--border-strong)]">|</span>

          <p className="font-mono text-xs text-[var(--text-secondary)]">
            {isRTL
              ? "© 2026 محمد حدو (Moh Dev). جميع الحقوق محفوظة."
              : "© 2026 Mohamed Hadou (Moh Dev). All rights reserved."}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5 font-mono text-xs text-[var(--text-secondary)]">
            <a href="#work" className="hover:text-accent transition-colors">
              {t.nav.work}
            </a>
            <a href="#services" className="hover:text-accent transition-colors">
              {t.nav.services}
            </a>
            <a href="#about" className="hover:text-accent transition-colors">
              {t.nav.about}
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={isRTL ? "الرجوع إلى أعلى الصفحة" : "Scroll to top"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
