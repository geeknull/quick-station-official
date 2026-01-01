"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

interface HtmlLangUpdaterProps {
  locale: Locale;
}

export function HtmlLangUpdater({ locale }: HtmlLangUpdaterProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
