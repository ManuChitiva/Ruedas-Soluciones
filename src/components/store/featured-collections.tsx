import Image from "next/image";
import { IconArrowUpRight } from "@/components/store/icons";
import type { StoreFeaturedCollection } from "@/lib/store-types";

export type FeaturedCollectionsProps = {
  eyebrow?: string;
  headline?: string;
  subline?: string;
  collections: StoreFeaturedCollection[];
};

export function FeaturedCollections({
  eyebrow = "Colecciones",
  headline = "Explora nuestras líneas principales.",
  subline = "Cada colección está curada con productos originales y el respaldo de marcas reconocidas.",
  collections,
}: FeaturedCollectionsProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-collections-heading"
      className="relative w-full bg-[var(--store-muted)]/55"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
        <header className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--store-primary)]">
            {eyebrow}
          </p>
          <h2
            id="featured-collections-heading"
            className="font-display text-3xl tracking-tight text-[var(--store-text)] sm:text-4xl lg:text-[2.75rem]"
          >
            {headline}
          </h2>
          <p className="text-[15px] leading-relaxed text-[var(--store-text-soft)] sm:text-[16px]">
            {subline}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
}: {
  collection: StoreFeaturedCollection;
}) {
  return (
    <a
      href={collection.href}
      className="store-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)]"
    >
      <div className="store-studio relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={collection.imageSrc}
          alt={collection.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-8 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] sm:p-10"
        />
      </div>
      <div className="flex flex-1 items-end justify-between gap-4 p-6">
        <div className="min-w-0">
          <h3 className="font-display text-[1.35rem] tracking-tight text-[var(--store-text)]">
            {collection.name}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--store-text-soft)]">
            {collection.description}
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--store-primary)] text-[var(--store-on-primary)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <IconArrowUpRight className="h-[16px] w-[16px]" />
        </span>
      </div>
    </a>
  );
}
