// Tracks free spin attempts. Persists in localStorage AND a first-party cookie.
// 24-hour TTL. Cap = 3.

const KEY = "tikkun_attempts_v1";
const TTL_MS = 24 * 60 * 60 * 1000;
export const MAX_SPINS = 3;

type Record = { count: number; expiresAt: number };

function readCookie(): Record | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(KEY + "="));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1])) as Record;
  } catch {
    return null;
  }
}

function writeCookie(r: Record) {
  if (typeof document === "undefined") return;
  const maxAge = Math.max(0, Math.floor((r.expiresAt - Date.now()) / 1000));
  document.cookie = `${KEY}=${encodeURIComponent(
    JSON.stringify(r)
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function readLS(): Record | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record;
  } catch {
    return null;
  }
}

function writeLS(r: Record) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(r));
}

function read(): Record {
  const ls = readLS();
  const ck = readCookie();
  const candidate =
    [ls, ck]
      .filter((r): r is Record => !!r && r.expiresAt > Date.now())
      .sort((a, b) => b.count - a.count)[0] ?? null;
  if (!candidate) return { count: 0, expiresAt: Date.now() + TTL_MS };
  return candidate;
}

function write(r: Record) {
  writeLS(r);
  writeCookie(r);
}

export function getAttempts(): number {
  return read().count;
}

export function spinsRemaining(): number {
  return Math.max(0, MAX_SPINS - getAttempts());
}

export function recordInitialSpin(): void {
  const current = read();
  if (current.count > 0) return;
  write({ count: 0, expiresAt: current.expiresAt });
}

/** Increment attempt. Returns the new count (so the 4th call returns 4). */
export function incrementAttempt(): number {
  const current = read();
  const next: Record = {
    count: current.count + 1,
    expiresAt:
      current.expiresAt > Date.now() ? current.expiresAt : Date.now() + TTL_MS,
  };
  write(next);
  return next.count;
}
