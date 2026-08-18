import { CasterHeroVideo } from "@/components/store/caster-hero-video";
import { IconArrowRight } from "@/components/store/icons";
import type { StoreHero, StoreStat } from "@/lib/store-types";

export type HeroStudioProps = {
  hero: StoreHero;
  stats?: StoreStat[];
};

export function HeroStudio({ hero, stats }: HeroStudioProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-studio relative w-full overflow-hidden"
    >
      <CasterHeroVideo />
      <div aria-hidden className="hero-studio-scrim" />

      <div className="relative z-[2] mx-auto flex min-h-[36rem] w-full max-w-6xl flex-col justify-end px-4 pt-10 pb-14 sm:min-h-[42rem] sm:px-6 sm:pb-16 lg:min-h-[calc(100vh-4.75rem)] lg:justify-between lg:px-8 lg:pt-16 lg:pb-14 xl:px-10 2xl:px-12">
        <div className="flex max-w-xl flex-col gap-6 lg:max-w-[34rem] lg:pt-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--store-primary)]">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-[2.6rem] leading-[1.02] tracking-tight text-[var(--store-text)] sm:text-6xl lg:text-[4.35rem]"
          >
            {renderHeadline(hero.headline)}
          </h1>
          {hero.subline ? (
            <p className="max-w-md text-[16px] leading-relaxed text-[var(--store-text-soft)] sm:text-[17.5px]">
              {hero.subline}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={hero.primaryCta.anchor}
              className="store-btn-solid inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium"
            >
              {hero.primaryCta.label}
              <IconArrowRight className="h-[14px] w-[14px]" />
            </a>
            {hero.secondaryCta ? (
              <a
                href={hero.secondaryCta.anchor}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--store-border)] bg-transparent px-7 py-3.5 text-[14px] font-medium text-[var(--store-text)] transition hover:border-[var(--store-primary)]/55 hover:text-[var(--store-primary)]"
              >
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>

        {stats && stats.length > 0 ? (
          <dl className="mt-14 grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:mt-0 lg:max-w-3xl">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex flex-col gap-1.5 sm:px-5 ${
                  index === 0 ? "sm:pl-0" : "sm:border-l sm:border-[var(--store-border)]"
                }`}
              >
                <dd className="font-display text-[1.75rem] leading-none tracking-tight text-[var(--store-text)]">
                  {stat.value}
                </dd>
                <dt className="max-w-[9.5rem] text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--store-text-soft)]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

function renderHeadline(headline: string) {
  const parts = headline.split(/(\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={idx} className="text-[var(--store-primary)]">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}
