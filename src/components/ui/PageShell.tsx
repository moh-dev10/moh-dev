"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import IntroLoader from "./IntroLoader";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIsLoaded(true)} />

      <div className={isLoaded ? "page-loaded flex flex-col min-h-screen" : "page-loading flex flex-col min-h-screen"}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}