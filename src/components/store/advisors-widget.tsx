"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
  IconAlert,
  IconClose,
  IconPhone,
  IconWhatsApp,
} from "@/components/store/icons";
import type { AdvisorsFetchState, StoreAdvisor } from "@/lib/store-types";

const TEASER_STORAGE_KEY = "rs-advisors-teaser-dismissed";

export type AdvisorsWidgetProps = {
  open: boolean;
  state: AdvisorsFetchState;
  onOpen: () => void;
  onClose: () => void;
  onRetry?: () => void;
};

/**
 * Botón flotante estilo WhatsApp: permanece en la esquina de la página,
 * invita a pedir asesoría y despliega el listado de asesores sin bloquear
 * el resto del storefront.
 */
export function AdvisorsWidget({
  open,
  state,
  onOpen,
  onClose,
  onRetry,
}: AdvisorsWidgetProps) {
  const panelId = useId();
  const titleId = useId();
  const [teaserVisible, setTeaserVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setTeaserVisible(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(TEASER_STORAGE_KEY) === "1") return;

    const timer = window.setTimeout(() => setTeaserVisible(true), 1600);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function dismissTeaser() {
    setTeaserVisible(false);
    try {
      window.sessionStorage.setItem(TEASER_STORAGE_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex w-[min(calc(100vw-2rem),22.5rem)] max-h-[min(32rem,calc(100dvh-7.5rem))] flex-col overflow-hidden rounded-2xl border border-[var(--store-border-subtle)] bg-[var(--store-surface)] shadow-[var(--store-shadow-hover)]"
        >
          <header className="flex shrink-0 items-start gap-3 bg-[#128C7E] px-4 py-3.5 text-white">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
              <IconWhatsApp className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                Asesoría
              </p>
              <h2 id={titleId} className="font-display text-[17px] leading-snug">
                Habla con un experto
              </h2>
              <p className="mt-0.5 text-[12px] text-white/80">
                Te recomendamos la rueda exacta por WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Cerrar asesoría"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <AdvisorsBody state={state} onRetry={onRetry} />
          </div>
        </div>
      ) : null}

      {!open && teaserVisible ? (
        <div className="pointer-events-auto relative max-w-[min(calc(100vw-5.5rem),17.5rem)] rounded-2xl rounded-br-md border border-[var(--store-border-subtle)] bg-[var(--store-surface)] px-3.5 py-3 shadow-[var(--store-shadow-soft)]">
          <button
            type="button"
            onClick={dismissTeaser}
            className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border border-[var(--store-border)] bg-[var(--store-surface)] text-[var(--store-text-soft)] shadow-sm transition hover:text-[var(--store-text)]"
            aria-label="Ocultar mensaje"
          >
            <IconClose className="h-3.5 w-3.5" />
          </button>
          <p className="pr-3 text-[13px] font-medium leading-snug text-[var(--store-text)]">
            ¿Necesitas asesoría?
          </p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--store-text-soft)]">
            Un experto te responde por WhatsApp en minutos.
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-2 text-[12.5px] font-semibold text-[#128C7E] transition hover:underline"
          >
            Elegir asesor
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={open ? onClose : onOpen}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Cerrar asesoría" : "Abrir asesoría por WhatsApp"}
        className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-[1.04] hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--store-page-bg)]"
      >
        {open ? null : (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/45 motion-reduce:animate-none"
          />
        )}
        {open ? (
          <IconClose className="relative h-6 w-6" />
        ) : (
          <IconWhatsApp className="relative h-7 w-7" />
        )}
      </button>
    </div>
  );
}

function AdvisorsBody({
  state,
  onRetry,
}: {
  state: AdvisorsFetchState;
  onRetry?: () => void;
}) {
  if (state.kind === "loading" || state.kind === "idle") {
    return <LoadingState />;
  }

  if (state.kind === "error") {
    return <ErrorState message={state.message} onRetry={onRetry} />;
  }

  if (state.advisors.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="divide-y divide-[var(--store-border-subtle)]">
      {state.advisors.map((advisor) => (
        <AdvisorRow key={advisor.id} advisor={advisor} />
      ))}
    </ul>
  );
}

function LoadingState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-5 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <Spinner />
      <p className="text-sm font-medium text-[var(--store-text)]">
        Cargando asesores…
      </p>
      <p className="max-w-[16rem] text-xs text-[var(--store-text-soft)]">
        Estamos trayendo el equipo disponible para asesorarte.
      </p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-5 py-12 text-center"
      role="alert"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--store-primary)]/10 text-[var(--store-primary)]">
        <IconAlert className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-[var(--store-text)]">
        No pudimos cargar los asesores
      </p>
      <p className="max-w-[16rem] text-xs text-[var(--store-text-soft)]">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex h-9 items-center justify-center rounded-lg border border-[var(--store-border)] bg-[var(--store-surface)] px-3.5 text-[13px] font-medium text-[var(--store-text)] transition hover:border-[var(--store-primary)]/45 hover:text-[var(--store-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--store-ring-focus)]"
        >
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-5 py-12 text-center">
      <p className="text-sm font-semibold text-[var(--store-text)]">
        Aún no hay asesores publicados
      </p>
      <p className="max-w-[16rem] text-xs text-[var(--store-text-soft)]">
        Vuelve pronto o usa los canales de contacto de la tienda.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[var(--store-border)] border-t-[#25D366]"
    />
  );
}

function AdvisorRow({ advisor }: { advisor: StoreAdvisor }) {
  const whatsappHref = advisor.whatsapp
    ? `https://wa.me/${digitsOnly(advisor.whatsapp)}`
    : null;
  const phoneHref = advisor.phone ? `tel:+${digitsOnly(advisor.phone)}` : null;

  return (
    <li className="flex items-center gap-3 px-3.5 py-3.5">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--store-muted)] ring-1 ring-inset ring-[var(--store-border-subtle)]">
        <Image
          src={advisor.photoSrc}
          alt={advisor.photoAlt ?? advisor.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[14px] leading-snug text-[var(--store-text)]">
          {advisor.name}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-[var(--store-text-soft)]">
          {advisor.role ?? "Disponible por WhatsApp"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chatear con ${advisor.name} por WhatsApp`}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <IconWhatsApp className="h-[18px] w-[18px]" />
          </a>
        ) : null}
        {phoneHref ? (
          <a
            href={phoneHref}
            aria-label={`Llamar a ${advisor.name}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--store-border)] bg-[var(--store-surface)] text-[var(--store-text)] transition hover:border-[var(--store-primary)]/55 hover:text-[var(--store-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--store-ring-focus)]"
          >
            <IconPhone className="h-[18px] w-[18px]" />
          </a>
        ) : null}
      </div>
    </li>
  );
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}
