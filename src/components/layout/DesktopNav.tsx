"use client";

import { motion } from "framer-motion";
import { navLinks } from "@/data/navLinks";

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
  return (
    <div className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          initial="rest"
          whileHover="hover"
          variants={linkVariants}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
        >
          {link.title}

          <motion.span
            variants={underlineVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent"
          />
        </motion.a>
      ))}
    </div>
  );
}