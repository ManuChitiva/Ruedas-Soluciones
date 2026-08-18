"use client";

import { IconArrowRight } from "@/components/store/icons";
import { useAdvisorsModal } from "@/components/store/advisors-launcher";
import type { StoreHeroSlide } from "@/lib/store-types";

export type HeroHighlightsProps = {
  eyebrow?: string;
  headline?: string;
  slides: StoreHeroSlide[];
};

export function HeroHighlights({
  eyebrow = "Líneas de producto",
  headline = "Tres formas de poner tu operación en movimiento.",
  slides,
}: HeroHighlightsProps) {
  const advisorsModal = useAdvisorsModal();
  if (!slides.length) return null;

  return (
    <section
      aria-labelledby="highlights-heading"
      className="relative w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:px-10 2xl:px-12">
        <header className="mb-8 max-w-2xl space-y-2 sm:mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="highlights-heading"
            className="font-display text-2xl tracking-tight text-[var(--store-text)] sm:text-3xl"
          >
            {headline}
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className="store-card group flex h-full flex-col rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
                {String(index + 1).padStart(2, "0")} · {slide.eyebrow}
              </span>
              <h3 className="mt-4 font-display text-[1.35rem] leading-tight tracking-tight text-[var(--store-text)]">
                {slide.headline}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--store-text-soft)]">
                {slide.body}
              </p>
              {slide.cta ? (
                slide.cta.kind === "advisors" ? (
                  <button
                    type="button"
                    onClick={() => advisorsModal?.open()}
                    disabled={!advisorsModal?.hasAdvisors}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-[var(--store-primary)] transition hover:gap-2.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {slide.cta.label}
                    <IconArrowRight className="h-[13px] w-[13px]" />
                  </button>
                ) : (
                  <a
                    href={slide.cta.href}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-[var(--store-primary)] transition hover:gap-2.5"
                  >
                    {slide.cta.label}
                    <IconArrowRight className="h-[13px] w-[13px]" />
                  </a>
                )
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
