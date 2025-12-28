"use client";

import { createContext, useContext } from "react";
import { zh, type Translations } from "./zh";
import { en } from "./en";

export type Locale = "zh" | "en";

export const translations: Record<Locale, Translations> = {
  zh,
  en,
};

export const defaultLocale: Locale = "zh";

// Context for locale
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: zh,
});

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

// Helper to get translation
export const getTranslation = (locale: Locale): Translations => {
  return translations[locale] || translations[defaultLocale];
};
