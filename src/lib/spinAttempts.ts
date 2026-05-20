// Tracks free spin attempts within the current browser session.
// Resets on a fresh visit to the landing page.

const KEY = "tikkun_spin_count_v2";
const CURRENT_SPIN_KEY = "tikkun_current_spin_v2";
export const MAX_SPINS = 12;
export const FREE_SPINS_BEFORE_FORM = 3;

function read(): number {
  if (typeof sessionStorage === "undefined") return 0;
  const raw = sessionStorage.getItem(KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function write(n: number) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(KEY, String(n));
}

function readCurrent(): number {
  if (typeof sessionStorage === "undefined") return 0;
  const raw = sessionStorage.getItem(CURRENT_SPIN_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function writeCurrent(n: number) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(CURRENT_SPIN_KEY, String(n));
}

export function getAttempts(): number {
  return read();
}

export function getCurrentSpinNumber(): number {
  const current = readCurrent();
  return current > 0 ? current : read();
}

export function setCurrentSpinNumber(n: number): number {
  const next = Math.min(MAX_SPINS, Math.max(1, n));
  write(next);
  writeCurrent(next);
  return next;
}

export function spinsRemaining(): number {
  return Math.max(0, MAX_SPINS - read());
}

export function resetAttempts(): void {
  write(0);
  writeCurrent(0);
}

export function recordInitialSpin(): void {
  // kept for compatibility; no-op
}

/** Increment attempt. Returns the new count (so the 4th call returns 4). */
export function incrementAttempt(): number {
  const next = read() + 1;
  write(next);
  if (next <= MAX_SPINS) writeCurrent(next);
  return next;
}

