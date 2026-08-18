"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AdvisorsWidget } from "@/components/store/advisors-widget";
import type { AdvisorsFetchState, StoreAdvisor } from "@/lib/store-types";

export type { AdvisorsFetchState } from "@/lib/store-types";

type AdvisorsModalContextValue = {
  open: () => void;
  close: () => void;
  hasAdvisors: boolean;
  state: AdvisorsFetchState;
};

const AdvisorsModalContext = createContext<AdvisorsModalContextValue | null>(
  null,
);

export type AdvisorsModalProviderProps = {
  /**
   * Asesores ya resueltos en el servidor. Si llegan, el widget no depende
   * de un fetch cruzado al backend (que suele fallar por CORS).
   */
  initialAdvisors?: StoreAdvisor[];
  children: ReactNode;
};

export function AdvisorsModalProvider({
  initialAdvisors,
  children,
}: AdvisorsModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AdvisorsFetchState>(() =>
    initialAdvisors && initialAdvisors.length > 0
      ? { kind: "ready", advisors: initialAdvisors }
      : { kind: "idle" },
  );

  const fetchAdvisors = useCallback(async () => {
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/advisors", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        setState({
          kind: "error",
          message: `No se pudo cargar el equipo de asesores (HTTP ${res.status}).`,
        });
        return;
      }
      const data = (await res.json()) as StoreAdvisor[];
      if (!Array.isArray(data)) {
        setState({
          kind: "error",
          message: "La respuesta de asesores no es válida.",
        });
        return;
      }
      setState({ kind: "ready", advisors: data });
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Error de red al cargar asesores.",
      });
    }
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    if (state.kind === "idle" || state.kind === "error") {
      void fetchAdvisors();
    }
  }, [state.kind, fetchAdvisors]);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<AdvisorsModalContextValue>(
    () => ({
      open,
      close,
      hasAdvisors: state.kind === "ready" && state.advisors.length > 0,
      state,
    }),
    [open, close, state],
  );

  useEffect(() => {
    if (state.kind === "idle") {
      void fetchAdvisors();
    }
    // Solo al montar si no hubo datos SSR.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdvisorsModalContext.Provider value={value}>
      {children}
      <AdvisorsWidget
        open={isOpen}
        state={state}
        onOpen={open}
        onClose={close}
        onRetry={fetchAdvisors}
      />
    </AdvisorsModalContext.Provider>
  );
}

export function useAdvisorsModal(): AdvisorsModalContextValue | null {
  return useContext(AdvisorsModalContext);
}
