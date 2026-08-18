import {
  IconChat,
  IconInstall,
  IconShield,
  IconShipping,
} from "@/components/store/icons";
import type { StoreServiceTile } from "@/lib/store-types";

export type TrustStripProps = {
  eyebrow?: string;
  headline?: string;
  items: StoreServiceTile[];
};

const ICONS = {
  shipping: IconShipping,
  shield: IconShield,
  support: IconChat,
  install: IconInstall,
  warranty: IconShield,
} as const;

export function TrustStrip({
  eyebrow = "Por qué elegirnos",
  headline = "Hecho para piso industrial, no para vitrina.",
  items,
}: TrustStripProps) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="trust-heading"
      className="relative w-full border-y border-[var(--store-border)] bg-[var(--store-muted)]/70"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
        <header className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="trust-heading"
            className="font-display text-3xl tracking-tight text-[var(--store-text)] sm:text-4xl"
          >
            {headline}
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.id}
                className="store-card rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--store-primary)]/12 text-[var(--store-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.1rem] tracking-tight text-[var(--store-text)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--store-text-soft)]">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
