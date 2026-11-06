"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const links = [
    { title: t.nav.work, href: "#work" },
    { title: t.nav.services, href: "#services" },
    { title: t.nav.about, href: "#about" },
    { title: t.nav.process, href: "#process" },
    { title: t.nav.stack, href: "#stack" },
    { title: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isMenuOpen ? (isRTL ? "إغلاق القائمة" : "Close Menu") : (isRTL ? "فتح القائمة" : "Open Menu")}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="group flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] transition-colors duration-200 hover:border-accent"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={{
              d: isMenuOpen ? "M6 5L19 19" : "M6 7H20",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <motion.path
            animate={{
              d: isMenuOpen ? "M6 19L19 5" : "M9 12H19",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M8 17H20"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{
              duration: 0.2,
            }}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full min-h-[calc(100vh-4rem)] border-b border-[var(--border)] bg-[var(--background)] px-6 py-8"
          >
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="pb-4 border-b border-[var(--border)]">
                <LanguageSwitcher variant="mobile" />
              </div>

              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="pb-4 border-b border-[var(--border)]"
                >
                  <motion.a
                    whileHover={{ x: isRTL ? -6 : 6 }}
                    whileTap={{ x: isRTL ? -3 : 3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between font-heading text-2xl font-extrabold"
                  >
                    <span>{link.title}</span>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                </motion.div>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="group mt-4 flex items-center justify-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--accent)] px-5 py-3.5 text-base font-bold !text-white"
              >
                <span>{t.nav.mobileCta}</span>
                <ArrowIcon
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}