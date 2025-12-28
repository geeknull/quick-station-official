"use client";

import { useLocale } from "@/i18n";

export function HowItWorks() {
  const { t } = useLocale();

  const steps = [
    {
      key: "step1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M6 8h.01M10 8h.01M14 8h.01" />
          <rect x="6" y="12" width="12" height="4" rx="1" />
        </svg>
      ),
    },
    {
      key: "step2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="M8 12l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "step3",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section id="how-it-works" className="section bg-[var(--card)]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t.howItWorks.title}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          {steps.map(({ key, icon }, index) => (
            <div key={key} className="flex items-center">
              <div className="flex flex-col items-center text-center max-w-xs">
                {/* Step number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/30">
                    <div className="w-10 h-10">{icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--background)] border-2 border-[var(--primary)] flex items-center justify-center text-sm font-bold text-[var(--primary)]">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">
                  {t.howItWorks.steps[key].title}
                </h3>
                <p className="text-[var(--muted)]">
                  {t.howItWorks.steps[key].description}
                </p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block mx-8">
                  <svg
                    className="w-8 h-8 text-[var(--border)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
