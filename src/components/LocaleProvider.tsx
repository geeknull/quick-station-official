"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { LocaleContext, translations, type Locale } from "@/i18n";

interface LocaleProviderProps {
  children: ReactNode;
  locale: Locale; // 从 URL 参数获取
}

export function LocaleProvider({
  children,
  locale: initialLocale,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // 同步 locale 到 localStorage（用于根路径重定向）
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  // setLocale 用于更新状态
  // 实际的语言切换通过 URL 导航完成
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
