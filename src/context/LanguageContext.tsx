"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  Language,
  translations,
  localizedProjects,
  localizedServices,
  localizedSkillGroups,
  ProjectTranslation,
  ServiceTranslation,
  SkillGroupTranslation,
} from "@/data/translations";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
  projects: ProjectTranslation[];
  services: ServiceTranslation[];
  skillGroups: SkillGroupTranslation[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_lang") as Language | null;
      if (saved === "ar" || saved === "en") {
        return saved;
      }
    }
    return "en";
  });

  useEffect(() => {
    const isArabic = language === "ar";
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    if (document.body) {
      document.body.lang = language;
      document.body.dir = isArabic ? "rtl" : "ltr";
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_lang", next);
      }
      return next;
    });
  }, []);

  const dir = language === "ar" ? "rtl" : "ltr";
  const isRTL = language === "ar";

  const value = useMemo<LanguageContextType>(() => {
    return {
      language,
      dir,
      isRTL,
      setLanguage,
      toggleLanguage,
      t: translations[language],
      projects: localizedProjects[language],
      services: localizedServices[language],
      skillGroups: localizedSkillGroups[language],
    };
  }, [language, dir, isRTL, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
