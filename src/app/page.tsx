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

  // Asesores resueltos en el servidor para el widget flotante.
  const initialAdvisors = store.advisors ?? [];

  return (
    <AdvisorsModalProvider initialAdvisors={initialAdvisors}>
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

        <main
          id="productos"
          className="w-full min-w-0 flex-1 border-y border-[var(--store-border)] bg-[var(--store-page-bg)]"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10 2xl:px-12">
            <CatalogSection
              eyebrow={store.catalog.eyebrow}
              headline={store.catalog.headline}
              subline={store.catalog.subline}
              sortLabel={store.catalog.sortLabel}
              sortOptions={store.catalog.sortOptions}
              products={store.catalog.products}
            />
            <aside
              id="contacto"
              className="mt-12 max-w-xl lg:mt-16"
            >
              <StoreSidebar contact={store.contact} pickup={store.pickup} />
            </aside>
          </div>
        </main>

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