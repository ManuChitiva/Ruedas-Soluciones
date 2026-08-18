import { NextResponse } from "next/server";
import {
  extractAdvisorList,
  mapAdvisors,
} from "@/lib/store-advisor-mapper";

/**
 * Proxy same-origin para el listado de asesores.
 * El navegador no llama al backend (evita CORS); Next.js sí lo hace.
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const slug = process.env.NEXT_PUBLIC_STORE_API_SLUG?.trim() || "01";

  if (!baseUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
      { status: 500 },
    );
  }

  const endpoint = `${baseUrl.replace(/\/$/, "")}/stores/${encodeURIComponent(slug)}/personal`;

  try {
    const upstream = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "No se pudo cargar el equipo de asesores." },
        { status: upstream.status },
      );
    }

    const payload: unknown = await upstream.json();
    return NextResponse.json(mapAdvisors(extractAdvisorList(payload)));
  } catch {
    return NextResponse.json(
      { error: "Error de red al cargar asesores." },
      { status: 502 },
    );
  }
}
