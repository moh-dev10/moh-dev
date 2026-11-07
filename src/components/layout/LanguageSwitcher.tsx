"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({
  className = "",
  variant = "desktop",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className={`flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-2 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
          <Globe size={14} className="text-accent" />
          <span>Language / اللغة</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-[var(--surface)] p-1 border border-[var(--border)]">
          <button
            type="button"
            lang="en"
            onClick={() => setLanguage("en")}
            className={`rounded-md px-3 py-1 font-mono text-xs transition-colors duration-200 ${
              language === "en"
                ? "bg-[var(--dark)] text-white font-bold"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            English
          </button>
          <button
            type="button"
            lang="ar"
            onClick={() => setLanguage("ar")}
            className={`rounded-md px-3 py-1 text-xs transition-colors duration-200 ${
              language === "ar"
                ? "bg-[var(--dark)] text-white font-bold"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            العربية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-0.5 text-xs font-mono transition-colors duration-200 hover:border-[var(--border-strong)] ${className}`}
    >
      <button
        type="button"
        lang="en"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
        className={`rounded-full px-2.5 py-1 text-[10px] tracking-wider transition-all duration-200 ${
          language === "en"
            ? "bg-white font-bold text-[var(--foreground)] shadow-xs"
            : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        lang="ar"
        onClick={() => setLanguage("ar")}
        aria-pressed={language === "ar"}
        aria-label="التبديل إلى العربية"
        className={`rounded-full px-2.5 py-1 text-[10px] transition-all duration-200 ${
          language === "ar"
            ? "bg-white font-bold text-[var(--foreground)] shadow-xs"
            : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
        }`}
      >
        عربي
      </button>
    </div>
  );
}
