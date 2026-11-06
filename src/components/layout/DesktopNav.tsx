"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const linkVariants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -2,
  },
};

const underlineVariants = {
  rest: {
    scaleX: 0,
  },
  hover: {
    scaleX: 1,
  },
};

export default function DesktopNav() {
  const { t, isRTL } = useLanguage();

  const links = [
    { title: t.nav.work, href: "#work" },
    { title: t.nav.services, href: "#services" },
    { title: t.nav.about, href: "#about" },
    { title: t.nav.process, href: "#process" },
    { title: t.nav.stack, href: "#stack" },
    { title: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav aria-label="Main Navigation" className="hidden items-center gap-7 md:flex">
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          initial="rest"
          whileHover="hover"
          variants={linkVariants}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 whitespace-nowrap shrink-0"
        >
          {link.title}

          <motion.span
            variants={underlineVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute -bottom-1 h-px w-full bg-accent ${
              isRTL ? "right-0 origin-right" : "left-0 origin-left"
            }`}
          />
        </motion.a>
      ))}
    </nav>
  );
}