"use client";

import { useEffect, useState } from "react";
type IntroLoaderProps = {
  onComplete?:() => void;
}

export default function IntroLoader({
  onComplete,
}: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);
          return 100;
        }

        return current + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 150);

    return () => clearTimeout(timer);
  }, [progress,onComplete]);

  if (!isVisible) return null;

  return (
     <div
       className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-white transition-all duration-500 ease-out ${
         progress >= 100
           ? "pointer-events-none scale-[1.02] opacity-0"
           : "scale-100 opacity-100"
       }`}
     >    <div className="w-[min(540px,calc(100%-40px))]">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
        <span>MOH_DEV — PORTFOLIO</span>

        <span>{progress}%</span>
      </div>

      <h1 className="mt-8 font-heading text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">
        MOH<span className="text-[var(--accent)]">°</span>DEV
      </h1>

      <div className="mt-8 h-0.75 w-full bg-white/15">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-100 "
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        INITIALIZING / WEB SYSTEMS — READY
      </p>
    </div>
    </div>
  );
}