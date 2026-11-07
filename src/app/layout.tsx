import type { Metadata } from "next";
import {
  Inter,
  Inter_Tight,
  JetBrains_Mono,
  Instrument_Serif,
  Cairo,
} from "next/font/google";

import { LanguageProvider } from "@/context/LanguageContext";
import PageShell from "@/components/ui/PageShell";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moh Dev | Full-Stack Web Developer",
  description:
    "Portfolio of Moh Dev — Full-Stack Web Developer building modern websites, eCommerce platforms and custom web solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable} ${cairo.variable}`}
    >
      <body>
        <LanguageProvider>
          <PageShell>{children}</PageShell>
        </LanguageProvider>
      </body>
    </html>
  );
}