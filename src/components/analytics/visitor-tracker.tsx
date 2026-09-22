"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const COOKIE_NAME = "chub_vid";
const HEARTBEAT_INTERVAL_MS = 15_000;
const COOKIE_MAX_AGE_DAYS = 400; // Chrome's cap on cookie lifetime.

function getOrCreateVisitorId(): string {
  const existing = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  if (existing) return existing;

  const id = crypto.randomUUID();
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${id}; path=/; max-age=${maxAge}; SameSite=Lax`;
  return id;
}

export function VisitorTracker() {
  const pathname = usePathname();
  const accumulatedMs = useRef(0);
  const lastTickAt = useRef<number | null>(null);
  const isNewPageView = useRef(true);

  useEffect(() => {
    const sessionId = getOrCreateVisitorId();

    function tick() {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (lastTickAt.current !== null) {
        accumulatedMs.current += now - lastTickAt.current;
      }
      lastTickAt.current = now;
    }

    function send(useBeacon: boolean) {
      tick();
      if (accumulatedMs.current <= 0 && !isNewPageView.current) return;

      const payload = JSON.stringify({
        sessionId,
        deltaMs: Math.round(accumulatedMs.current),
        path: window.location.pathname,
        isNewPageView: isNewPageView.current,
      });
      accumulatedMs.current = 0;
      isNewPageView.current = false;

      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/heartbeat",
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch("/api/analytics/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch((err) => {
          throw new Error(err);
        });
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        lastTickAt.current = Date.now();
      } else {
        send(true);
        lastTickAt.current = null;
      }
    }

    lastTickAt.current = document.visibilityState === "visible" ? Date.now() : null;
    const interval = window.setInterval(() => send(false), HEARTBEAT_INTERVAL_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", () => send(true));

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      send(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New pathname (client-side navigation) counts as a fresh page view.
  useEffect(() => {
    isNewPageView.current = true;
  }, [pathname]);

  return null;
}
