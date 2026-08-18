import type { StoreAdvisor } from "@/lib/store-types";

/**
 * Respuesta del endpoint público `GET /stores/{slug}/personal` del backend.
 * Espejo de `PersonalMemberResponse` (Java) — solo expone datos visibles
 * para que un cliente contacte al asesor.
 */
export type AdvisorApiResponse = {
  id: number;
  name: string;
  phone: string | null;
  whatsapp: string | null;
  photoUrl: string | null;
  active: boolean;
  sortOrder: number;
};

/**
 * Extrae el array de asesores de payloads heterogéneos del backend
 * (lista plana o envoltorio tipo Spring `{ content | data | members }`).
 */
export function extractAdvisorList(payload: unknown): AdvisorApiResponse[] {
  if (Array.isArray(payload)) return payload as AdvisorApiResponse[];
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of ["content", "data", "members", "items", "personal"]) {
      const value = record[key];
      if (Array.isArray(value)) return value as AdvisorApiResponse[];
    }
  }
  return [];
}

/**
 * Mapea un asesor del backend al shape del storefront. Conserva miembros
 * activos (si `active` no viene, se asume publicado). Si el nombre viene
 * vacío, cae a "Asesor"; si falta la foto, usa un avatar estable por id.
 *
 * Es seguro llamarlo desde el cliente (no toca I/O ni hace fetch).
 */
export function mapAdvisors(data: AdvisorApiResponse[]): StoreAdvisor[] {
  return data
    .filter((item) => item && item.active !== false)
    .map((entry) => ({
      sortOrder: Number(entry.sortOrder ?? 0),
      advisor: {
        id: String(entry.id),
        name: entry.name?.trim() || "Asesor",
        photoSrc:
          entry.photoUrl?.trim() ||
          `https://picsum.photos/seed/rs-asesor-api-${entry.id}/240/240`,
        photoAlt: `Foto de ${entry.name}`,
        whatsapp: entry.whatsapp ?? undefined,
        phone: entry.phone ?? undefined,
      },
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((entry) => entry.advisor);
}