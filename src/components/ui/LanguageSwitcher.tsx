"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, type Locale } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();

  // 计算目标语言
  const targetLocale: Locale = locale === "zh" ? "en" : "zh";

  // 替换路径中的语言前缀
  // 例如: /zh/privacy -> /en/privacy
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Link
      href={targetPath}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-[var(--card-hover)] border border-[var(--border)]"
      aria-label="Switch language"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
      <span>{locale === "zh" ? t.language.en : t.language.zh}</span>
    </Link>
  );
}
