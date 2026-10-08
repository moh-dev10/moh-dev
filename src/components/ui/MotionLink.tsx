"use client";

import { motion } from "framer-motion";

type MotionLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function MotionLink({
  href,
  children,
}: MotionLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className="mt-8 inline-block rounded-3xl bg-[var(--text-primary)] px-6 py-3 text-sm font-semibold text-white! transition-colors duration-200 hover:bg-accent/80"
    >
      {children}
    </motion.a>
  );
}