"use client";

import { useLocale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { DownloadButton } from "./ui/DownloadButton";

export function Download() {
  const { t, locale } = useLocale();

  return (
    <section id="download" className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative elements */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full blur-2xl opacity-20 animate-pulse-ring" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-2xl shadow-[var(--primary)]/30">
              <svg
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.download.title}
          </h2>
          <p className="text-lg text-[var(--muted)] mb-8">
            {t.download.subtitle}
          </p>

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
              {t.download.features.free}
            </span>
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
              {t.download.features.noAds}
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium">
              {t.download.features.privacy}
            </span>
          </div>

          {/* Download button */}
          <DownloadButton size="lg" className="mb-4" />

          <p className="text-sm text-[var(--muted)]">
            {locale === "zh"
              ? siteConfig.systemRequirements.zh
              : siteConfig.systemRequirements.en}
          </p>
        </div>
      </div>
    </section>
  );
}
