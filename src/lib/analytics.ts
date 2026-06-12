import { trackEvent } from "./analytics.functions";

const SESSION_KEY = "tikkun_analytics_session";

function makeId(): string {
  // 16 bytes -> 22 chars base64url
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = makeId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return makeId();
  }
}

export function track(
  eventName: string,
  opts: { ctaId?: string; page?: string; metadata?: Record<string, unknown> } = {},
): void {
  if (typeof window === "undefined") return;
  const sessionId = getSessionId();
  const page = opts.page ?? window.location.pathname;
  // Fire-and-forget. Never block UI or surface errors.
  trackEvent({
    data: {
      sessionId,
      eventName,
      page,
      ctaId: opts.ctaId ?? null,
      metadata: opts.metadata ?? {},
    },
  }).catch((e) => {
    console.warn("track failed", e);
  });
}
