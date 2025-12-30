"use client";

import { useLocale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/Button";
import { DownloadButton } from "./ui/DownloadButton";
import { RingLauncher } from "./ui/RingLauncher";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-clip pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl animate-pulse-ring" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse-ring delay-500" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="gradient-text">{siteConfig.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted)] mb-4 animate-fade-in-up delay-100">
              {t.hero.tagline}
            </p>
            <p className="text-base md:text-lg text-[var(--muted)] mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <DownloadButton size="lg" />
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.learnMore}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Ring launcher visual */}
          <div className="flex-1 flex justify-center animate-fade-in delay-400 relative z-0">
            <RingLauncher animated showLabels />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
