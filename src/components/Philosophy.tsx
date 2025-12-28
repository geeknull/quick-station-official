"use client";

import { useLocale } from "@/i18n";

export function Philosophy() {
  const { t } = useLocale();

  return (
    <section className="section bg-[var(--card)]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t.philosophy.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto">
          {/* Simple */}
          <div className="text-center">
            <div className="mb-6">
              <span className="text-8xl md:text-9xl font-bold text-[var(--foreground)]/10">
                {t.philosophy.simple.title}
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              {t.philosophy.simple.subtitle}
            </h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.philosophy.simple.description}
            </p>
          </div>

          {/* Efficient */}
          <div className="text-center">
            <div className="mb-6">
              <span className="text-8xl md:text-9xl font-bold text-[var(--foreground)]/10">
                {t.philosophy.efficient.title}
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              {t.philosophy.efficient.subtitle}
            </h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.philosophy.efficient.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
