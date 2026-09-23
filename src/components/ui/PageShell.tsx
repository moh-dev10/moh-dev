"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import IntroLoader from "./IntroLoader";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIsLoaded(true)} />

      <div className={isLoaded ? "page-loaded" : "page-loading"}>
        {children}
      </div>
    </>
  );
}