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
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
        <header className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="highlights-heading"
            className="font-display text-3xl tracking-tight text-[var(--store-text)] sm:text-4xl"
          >
            {headline}
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className="store-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 sm:p-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-[var(--store-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--store-border)] font-display text-[13px] text-[var(--store-primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--store-text-soft)]">
                {slide.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-[1.35rem] leading-tight tracking-tight text-[var(--store-text)]">
                {slide.headline}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--store-text-soft)]">
                {slide.body}
              </p>
              {slide.cta ? (
                slide.cta.kind === "advisors" ? (
                  <button
                    type="button"
                    onClick={() => advisorsModal?.open()}
                    disabled={!advisorsModal}
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-[var(--store-primary)] transition hover:gap-2.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {slide.cta.label}
                    <IconArrowRight className="h-[13px] w-[13px]" />
                  </button>
                ) : (
                  <a
                    href={slide.cta.href}
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-[var(--store-primary)] transition hover:gap-2.5"
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
