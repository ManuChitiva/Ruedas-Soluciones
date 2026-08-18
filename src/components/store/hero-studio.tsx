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
      <div className="relative z-[2] mx-auto flex w-full max-w-6xl flex-col px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-14 lg:min-h-[calc(100vh-4.75rem)] lg:justify-between lg:px-8 lg:pt-16 lg:pb-14 xl:px-10 2xl:px-12">
        <div className="relative z-10 flex max-w-xl flex-col gap-5 sm:gap-6 lg:max-w-[34rem] lg:pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--store-primary)] sm:text-[12px]">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-balance text-[clamp(2.15rem,8.4vw,2.75rem)] leading-[1.06] tracking-tight text-[var(--store-text)] sm:text-6xl sm:leading-[1.02] lg:text-[4.35rem]"
          >
            {renderHeadline(hero.headline)}
          </h1>
          {hero.subline ? (
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--store-text-soft)] sm:text-[17.5px]">
              {hero.subline}
            </p>
          ) : null}

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:pt-2">
            <a
              href={hero.primaryCta.anchor}
              className="store-btn-solid inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium sm:w-auto"
            >
              {hero.primaryCta.label}
              <IconArrowRight className="h-[14px] w-[14px]" />
            </a>
            {hero.secondaryCta ? (
              <a
                href={hero.secondaryCta.anchor}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--store-border)] bg-[var(--store-surface)]/80 px-7 py-3.5 text-[14px] font-medium text-[var(--store-text)] backdrop-blur-sm transition hover:border-[var(--store-primary)]/55 hover:text-[var(--store-primary)] sm:w-auto sm:bg-transparent sm:backdrop-blur-none"
              >
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>

        <div className="caster-hero-frame mt-8 sm:mt-10 lg:mt-0">
          <CasterHeroVideo />
          <div aria-hidden className="hero-studio-scrim" />
        </div>

        {stats && stats.length > 0 ? (
          <dl className="relative z-10 mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-[var(--store-border)] pt-7 sm:mt-10 sm:grid-cols-4 sm:gap-y-6 lg:mt-0 lg:max-w-3xl lg:border-t-0 lg:pt-0">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex flex-col gap-1.5 ${
                  index === 0
                    ? ""
                    : "sm:border-l sm:border-[var(--store-border)] sm:px-5"
                } ${index === 0 ? "sm:pl-0" : ""}`}
              >
                <dd className="font-display text-[1.55rem] leading-none tracking-tight text-[var(--store-text)] sm:text-[1.75rem]">
                  {stat.value}
                </dd>
                <dt className="max-w-[9.5rem] text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--store-text-soft)] sm:text-[11px]">
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
