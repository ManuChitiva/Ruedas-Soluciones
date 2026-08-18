"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  readDocumentTheme,
  type StoreColorMode,
} from "@/lib/theme-storage";

const LIGHT_SRC = "/videos/caster-hero-light.mp4";
const DARK_SRC = "/videos/caster-hero-dark.mp4";

function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}

export function CasterHeroVideo() {
  const lightRef = useRef<HTMLVideoElement>(null);
  const darkRef = useRef<HTMLVideoElement>(null);
  const mode = useSyncExternalStore(
    subscribeTheme,
    readDocumentTheme,
    (): StoreColorMode => "light",
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const active = mode === "dark" ? darkRef.current : lightRef.current;
    const idle = mode === "dark" ? lightRef.current : darkRef.current;
    if (!active) return;

    active.muted = true;
    idle?.pause();

    if (reduced) {
      active.pause();
      active.currentTime = 0.2;
      return;
    }

    const tryPlay = () => {
      void active.play().catch(() => undefined);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else active.pause();
      },
      { threshold: 0.12 },
    );
    io.observe(active);
    tryPlay();

    return () => io.disconnect();
  }, [mode]);

  return (
    <div className="caster-hero-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="caster-hero-glow" />
      <video
        ref={lightRef}
        className="caster-hero-video caster-hero-video-light"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={LIGHT_SRC} type="video/mp4" />
      </video>
      <video
        ref={darkRef}
        className="caster-hero-video caster-hero-video-dark"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={DARK_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
