"use client";

import React from "react";

interface BrandLogoProps {
  variant?: "full" | "text" | "mark";
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = "full",
  size = "md",
  inverted = false,
  className = "",
}: BrandLogoProps) {
  const markDimensions = {
    sm: "h-7 w-7 text-xs rounded-lg",
    md: "h-8 w-8 text-sm rounded-xl",
    lg: "h-10 w-10 text-base rounded-xl",
  }[size];

  const textDimensions = {
    sm: "text-base",
    md: "text-lg md:text-xl",
    lg: "text-2xl",
  }[size];

  const textColor = inverted ? "text-white" : "text-[var(--foreground)]";

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-heading font-bold tracking-tight select-none ${className}`}
      dir="ltr"
    >
      {/* Monogram squircle icon mark */}
      {variant !== "text" && (
        <span
          className={`flex shrink-0 items-center justify-center border border-[var(--accent)]/30 bg-[var(--dark)] font-extrabold text-white shadow-xs ${markDimensions}`}
          aria-hidden="true"
        >
          <span className="relative flex items-center">
            <span>M</span>
            <span className="text-accent text-[0.9em] leading-none">.</span>
          </span>
        </span>
      )}

      {/* Wordmark */}
      {variant !== "mark" && (
        <span className={`${textDimensions} ${textColor} leading-none font-extrabold`}>
          Moh<span className="text-accent">.</span>Dev
        </span>
      )}
    </span>
  );
}
