import { AdvisorsModalProvider } from "@/components/store/advisors-launcher";
import { CatalogSection } from "@/components/store/catalog-section";
import { FeaturedCollections } from "@/components/store/featured-collections";
import { FooterStorefront } from "@/components/store/footer-storefront";
import { HeroHighlights } from "@/components/store/hero-highlights";
import { HeroStudio } from "@/components/store/hero-studio";
import { NewsletterBand } from "@/components/store/newsletter-band";
import { ProcessBand } from "@/components/store/process-band";
import { ProfileBand } from "@/components/store/profile-band";
import { StoreNavbar } from "@/components/store/navbar";
import { StoreSidebar } from "@/components/store/store-sidebar";
import { TestimonialsBand } from "@/components/store/testimonials-band";
import { TrustStrip } from "@/components/store/trust-strip";
import { getStoreConfigFromApi } from "@/lib/store-api";
import { themeToStyle } from "@/lib/store-types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await getStoreConfigFromApi();

  const hasSlides =
    Array.isArray(store.heroSlides) && store.heroSlides.length > 0;

  // Slug y base URL para el fetch lazy del modal de asesores.
  const advisorSlug =
    store.slug ??
    process.env.NEXT_PUBLIC_STORE_API_SLUG?.trim() ??
    "01";
  const advisorApiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

  return (
    <AdvisorsModalProvider
      slug={advisorSlug}
      apiBaseUrl={advisorApiBaseUrl}
    >
      <div
        className="flex min-h-[100dvh] w-full flex-col text-[var(--store-text)]"
        style={store.theme ? themeToStyle(store.theme) : undefined}
      >
        <StoreNavbar brand={store.brand} links={store.navLinks} sticky />

        <HeroStudio
          hero={{
            eyebrow: "Movimiento industrial",
            headline: "Ruedas y *rodachines* para cada operación.",
            subline:
              store.profile?.description?.trim() ??
              "Capacidad, diámetro y material correctos para tu piso. Asesoría técnica, stock industrial y envío a todo el país.",
            primaryCta: { label: "Ver catálogo", anchor: "#productos" },
            secondaryCta: {
              label: "Hablar con un experto",
              anchor: "#contacto",
            },
          }}
          stats={store.heroStats}
        />

        {store.services && store.services.length > 0 ? (
          <TrustStrip items={store.services} />
        ) : null}

        {hasSlides ? (
          <HeroHighlights slides={store.heroSlides ?? []} />
        ) : null}

        {store.featuredCollections && store.featuredCollections.length > 0 ? (
          <FeaturedCollections
            eyebrow="Líneas industriales"
            headline="Ruedas, rodachines y recambios listos para carga real."
            subline="Cada línea está pensada para un tipo de piso, peso y entorno: planta, bodega, hospital o uso interno."
            collections={store.featuredCollections}
          />
        ) : null}

        {store.profile &&
        (store.profile.description ||
          store.profile.email ||
          store.profile.website ||
          store.profile.schedule ||
          store.profile.paymentMethods) ? (
          <ProfileBand profile={store.profile} />
        ) : null}

        {store.process ? (
          <ProcessBand
            eyebrow={store.process.eyebrow}
            headline={store.process.headline}
            subline={store.process.subline}
            steps={store.process.steps}
          />
        ) : null}

        <main
          id="productos"
          className="w-full min-w-0 flex-1 border-y border-[var(--store-border)] bg-[var(--store-page-bg)]"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10 2xl:px-12">
            <div className="lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-14">
              <aside
                id="contacto"
                className="order-2 mt-12 mb-4 space-y-5 lg:order-1 lg:mt-0 lg:mb-0 lg:sticky lg:top-[5.25rem] lg:self-start"
              >
                <StoreSidebar contact={store.contact} pickup={store.pickup} />
              </aside>
              <div className="order-1 min-w-0">
                <CatalogSection
                  eyebrow={store.catalog.eyebrow}
                  headline={store.catalog.headline}
                  subline={store.catalog.subline}
                  sortLabel={store.catalog.sortLabel}
                  sortOptions={store.catalog.sortOptions}
                  products={store.catalog.products}
                />
              </div>
            </div>
          </div>
        </main>

        {store.testimonials && store.testimonials.items.length > 0 ? (
          <TestimonialsBand
            eyebrow={store.testimonials.eyebrow}
            headline={store.testimonials.headline}
            items={store.testimonials.items}
          />
        ) : null}

        {store.newsletter ? (
          <NewsletterBand
            eyebrow={store.newsletter.eyebrow}
            headline={store.newsletter.headline}
            subline={store.newsletter.subline}
            ctaLabel={store.newsletter.ctaLabel}
            placeholder={store.newsletter.placeholder}
          />
        ) : null}

        {store.footer ? (
          <FooterStorefront
            brand={store.brand}
            footer={store.footer}
            socials={store.socials ?? null}
          />
        ) : null}
      </div>
    </AdvisorsModalProvider>
  );
}