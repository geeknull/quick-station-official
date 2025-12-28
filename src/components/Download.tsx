"use client";

import { useLocale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/Button";

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
          <Button href={siteConfig.downloadUrl} size="lg" className="mb-4">
            <AppleIcon />
            {t.download.button}
          </Button>

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

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
