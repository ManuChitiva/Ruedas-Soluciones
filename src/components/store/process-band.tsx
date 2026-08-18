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
      className="relative w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
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
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col gap-3">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-5 left-[2.75rem] hidden h-px w-[calc(100%-1.5rem)] bg-[var(--store-border)] lg:block"
                />
              ) : null}
              <span className="font-display text-[2rem] leading-none tracking-tight text-[var(--store-primary)]">
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
