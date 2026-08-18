import type { StoreProcessStep } from "@/lib/store-types";

export type ProcessBandProps = {
  eyebrow: string;
  headline: string;
  subline?: string;
  steps: StoreProcessStep[];
};

export function ProcessBand({
  eyebrow,
  headline,
  subline,
  steps,
}: ProcessBandProps) {
  if (!steps.length) return null;

  return (
    <section
      aria-labelledby="process-heading"
      className="relative w-full bg-[var(--store-muted)]/55"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
        <header className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="process-heading"
            className="font-display text-3xl tracking-tight text-[var(--store-text)] sm:text-4xl"
          >
            {headline}
          </h2>
          {subline ? (
            <p className="text-[15px] leading-relaxed text-[var(--store-text-soft)] sm:text-[16px]">
              {subline}
            </p>
          ) : null}
        </header>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step) => (
            <li
              key={step.id}
              className="store-card flex flex-col gap-4 rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--store-primary)]/35 font-display text-[13px] text-[var(--store-primary)]">
                {step.number}
              </span>
              <h3 className="font-display text-[1.15rem] tracking-tight text-[var(--store-text)]">
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[var(--store-text-soft)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
