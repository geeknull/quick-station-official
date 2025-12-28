"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  LocaleContext,
  defaultLocale,
  translations,
  type Locale,
} from "@/i18n";

interface LocaleProviderProps {
  children: ReactNode;
}

function getClientLocale(): Locale {
  const saved = localStorage.getItem("locale") as Locale | null;
  if (saved === "zh" || saved === "en") return saved;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("zh") ? "zh" : "en";
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  // 两阶段渲染：始终以 defaultLocale 开始，确保 hydration 一致
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // 客户端挂载后检测实际 locale（会有短暂语言闪烁，但无 hydration error）
  useEffect(() => {
    const clientLocale = getClientLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 两阶段渲染需要在挂载后设置实际 locale
    setLocaleState(clientLocale);
    document.documentElement.lang = clientLocale;
  }, []);

  // locale 变化时更新 html lang
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
