"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, type Locale } from "@/i18n/config";

function getPreferredLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (saved === "zh" || saved === "en") return saved;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) return "zh";
    if (browserLang.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const locale = getPreferredLocale();
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ opacity: 0.5 }}>Loading...</div>
    </div>
  );
}
