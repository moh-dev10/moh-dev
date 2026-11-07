import type { Metadata, Viewport } from "next";
import {
  Inter,
  Inter_Tight,
  JetBrains_Mono,
  Instrument_Serif,
  Cairo,
} from "next/font/google";

import { LanguageProvider } from "@/context/LanguageContext";
import PageShell from "@/components/ui/PageShell";
import StructuredData from "@/components/seo/StructuredData";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://moh-dev.vercel.app");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moh Dev | Full-Stack Web Developer",
    template: "%s | Moh Dev",
  },
  description:
    "Portfolio of Moh Dev — Full-Stack Web Developer building modern websites, eCommerce platforms, and custom web applications with clean architecture and high conversion.",
  keywords: [
    "Moh Dev",
    "Mohamed Hadou",
    "Full-Stack Web Developer",
    "Web Developer Algeria",
    "Développeur Web",
    "مطور ويب",
    "React Developer",
    "Next.js",
    "TypeScript",
    "WordPress WooCommerce",
    "E-Commerce Solutions",
    "Tailwind CSS",
  ],
  authors: [{ name: "Mohamed Hadou (Moh Dev)", url: siteUrl }],
  creator: "Mohamed Hadou (Moh Dev)",
  publisher: "Moh Dev",
  applicationName: "Moh Dev Portfolio",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      ar: "/?lang=ar",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#2563eb",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_DZ"],
    url: siteUrl,
    title: "Moh Dev | Full-Stack Web Developer",
    description:
      "Portfolio of Moh Dev — Full-Stack Web Developer building modern websites, eCommerce platforms, and custom web solutions.",
    siteName: "Moh Dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moh Dev — Full-Stack Web Developer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moh Dev | Full-Stack Web Developer",
    description:
      "Portfolio of Moh Dev — Full-Stack Web Developer building modern websites, eCommerce platforms, and custom web solutions.",
    images: ["/og-image.jpg"],
    creator: "@mohdev10",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable} ${cairo.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body>
        <LanguageProvider>
          <PageShell>{children}</PageShell>
        </LanguageProvider>
      </body>
    </html>
  );
}