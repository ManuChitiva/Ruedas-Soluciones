import type { StoreTestimonial } from "@/lib/store-types";

export type TestimonialsBandProps = {
  eyebrow?: string;
  headline: string;
  items: StoreTestimonial[];
};

export function TestimonialsBand({
  eyebrow = "Testimonios",
  headline,
  items,
}: TestimonialsBandProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://estructuramex.com/wp-content/uploads/2021/10/Tipos-de-bodega.jpg')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/72 to-black/88"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--store-primary)]/12 mix-blend-overlay"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
        <header className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {headline}
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {items.map((testimonial) => (
            <li
              key={testimonial.id}
              className="store-card group flex h-full flex-col gap-5 rounded-2xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl sm:p-7"
            >
              <span
                aria-hidden
                className="font-display text-[3.5rem] leading-none tracking-tight text-[var(--store-primary)]/50"
              >
                “
              </span>

              <blockquote className="-mt-4 flex-1">
                <p className="text-[15px] leading-relaxed text-white/90 sm:text-[15.5px]">
                  {testimonial.quote}
                </p>
              </blockquote>

              <div
                className="flex items-center gap-0.5 text-[var(--store-primary)]"
                aria-label="Calificación 5 de 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} active={i < 5} />
                ))}
              </div>

              <footer className="flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-[12px] font-semibold text-white"
                  aria-hidden
                >
                  {initials(testimonial.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold tracking-tight text-white">
                    {testimonial.name}
                  </p>
                  {testimonial.role ? (
                    <p className="text-[12px] text-white/60">
                      {testimonial.role}
                    </p>
                  ) : null}
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Star({ active }: { active: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={active ? "opacity-100" : "opacity-30"}
      aria-hidden
    >
      <path d="m12 2 3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
