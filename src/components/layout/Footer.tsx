"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/#hero");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      e.preventDefault();
      router.push(`/${href}`);
    }
  };

  const navItems = [
    { label: t.nav.work, href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.stack, href: "#stack" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
          <a
            href="#hero"
            onClick={handleScrollToTop}
            className="font-heading text-lg font-bold tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-85"
            aria-label="Moh.Dev - Back to top"
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

        <div className="flex flex-wrap items-center justify-center gap-6">
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-5 font-mono text-xs text-[var(--text-secondary)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label={isRTL ? "الرجوع إلى أعلى الصفحة" : "Scroll to top"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
