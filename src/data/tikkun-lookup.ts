// tikkun-lookup.ts
// Single source of truth for Tikkun reading + spin-snippet logic.
// Pure, client-side, no network. Import the JSON content alongside this file.
//
// Place both files in src/data/:
//   src/data/tikkun-data.json
//   src/data/tikkun-lookup.ts
//
// Requires "resolveJsonModule": true in tsconfig (Vite/TanStack already supports this).

import tikkunData from "./tikkun-data.json";
import tikkunContentUpdate from "./tikkun-content-update.json";

export interface DateRange {
  start: string; // ISO "YYYY-MM-DD" inclusive
  end: string;   // ISO "YYYY-MM-DD" inclusive
}

export interface TikkunSign {
  order: number;
  id: string;                  // e.g. "capricorn"  (lowercase signId)
  name: string;                // "Capricorn"
  hebrewName: string;          // "Gedi"
  signId: string;              // "Capricorn"
  tikkunLetterHebrew: string;  // single Hebrew glyph, e.g. "ע"  (render as the letter image at top)
  spinSnippet: string;         // short snippet for the wheel/spin
  northNode: string;           // "Capricorn"
  southNode: string;           // "Cancer"
  quote: string;
  shadowGilgul: string;        // multi-paragraph (\n\n between paragraphs)
  shadowArchetype: string;
  spiritualWorkTikkun: string; // multi-paragraph
  tikkunLetterFull: string;    // transliteration + translation + explanation (multi-paragraph)
  dailyMantra: string;
  dateRanges: DateRange[];
}

interface TikkunData {
  meta: {
    coverageStart: string; // "1901-01-22"
    coverageEnd: string;   // "2051-06-28"
    totalSigns: number;
    totalRanges: number;
  };
  signs: TikkunSign[];
}

const DATA = tikkunData as TikkunData;
type TikkunContentUpdate = Pick<
  TikkunSign,
  | "signId"
  | "spinSnippet"
  | "quote"
  | "shadowGilgul"
  | "shadowArchetype"
  | "spiritualWorkTikkun"
  | "tikkunLetterFull"
  | "dailyMantra"
>;

const CONTENT_UPDATES = tikkunContentUpdate as TikkunContentUpdate[];
const CONTENT_BY_SIGN = new Map(
  CONTENT_UPDATES.map((sign) => [sign.signId.toLowerCase(), sign]),
);

export const SIGNS: TikkunSign[] = DATA.signs.map((sign) => ({
  ...sign,
  ...(CONTENT_BY_SIGN.get(sign.signId.toLowerCase()) ?? {}),
}));
export const COVERAGE_START = DATA.meta.coverageStart; // "1901-01-22"
export const COVERAGE_END = DATA.meta.coverageEnd;     // "2051-06-28"
export const MAX_SPINS = 4;

// ---------------------------------------------------------------------------
// 1) FULL READING BY DATE OF BIRTH
// ---------------------------------------------------------------------------

export type ReadingResult =
  | { outOfRange: false; sign: TikkunSign }
  | { outOfRange: true; reason: "before-coverage" | "after-coverage" | "invalid" };

const ISO = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Look up the full Tikkun reading for a date of birth.
 * @param dob ISO date string "YYYY-MM-DD" (exactly what an <input type="date"> returns).
 *
 * NOTE: ISO date strings sort lexicographically == chronologically, so we compare
 * strings directly. This avoids all timezone bugs that come from `new Date(dob)`.
 * Both range bounds are INCLUSIVE.
 */
export function getReadingByDOB(dob: string): ReadingResult {
  if (!dob || !ISO.test(dob)) return { outOfRange: true, reason: "invalid" };
  if (dob < COVERAGE_START) return { outOfRange: true, reason: "before-coverage" };
  if (dob > COVERAGE_END) return { outOfRange: true, reason: "after-coverage" };

  for (const sign of SIGNS) {
    for (const r of sign.dateRanges) {
      if (dob >= r.start && dob <= r.end) {
        return { outOfRange: false, sign };
      }
    }
  }
  // Should never happen: ranges are validated gapless & contiguous across coverage.
  return { outOfRange: true, reason: "invalid" };
}

/** UI helper: the message to show when a DOB is outside the supported window. */
export const OUT_OF_RANGE_MESSAGE =
  "That date of birth is outside the supported range (Jan 22, 1901 – Jun 28, 2051). " +
  "Please check the date and try again.";

// ---------------------------------------------------------------------------
// 2) RANDOM SPIN SNIPPET — up to MAX_SPINS (4) DISTINCT signs, never repeating
// ---------------------------------------------------------------------------

export interface SpinResult {
  exhausted: boolean;       // true once 4 distinct signs have been shown
  sign?: TikkunSign;        // the newly selected sign (undefined if exhausted)
  seen: string[];           // updated list of sign ids shown so far (persist this)
  remaining: number;        // spins left after this one
}

/**
 * Pick a random sign NOT already seen, enforcing max 4 distinct, no repeats.
 *
 * @param seen Array of sign ids already shown this session. The FIRST spin from the
 *             home wheel passes [] (counts as spin #1). Persist the returned `seen`
 *             array in sessionStorage and pass it back on each subsequent "spin again".
 *
 * Persist `seen` (the array) — NOT just a count — so repeats are impossible.
 */
export function getSpinSnippet(seen: string[] = []): SpinResult {
  const used = new Set(seen);
  if (used.size >= MAX_SPINS) {
    return { exhausted: true, seen, remaining: 0 };
  }
  const pool = SIGNS.filter((s) => !used.has(s.id));
  // pool is never empty here (12 signs >> 4), but guard anyway:
  if (pool.length === 0) return { exhausted: true, seen, remaining: 0 };

  const pick = pool[Math.floor(Math.random() * pool.length)];
  const nextSeen = [...seen, pick.id];
  return {
    exhausted: false,
    sign: pick,
    seen: nextSeen,
    remaining: MAX_SPINS - nextSeen.length,
  };
}

// ---------------------------------------------------------------------------
// 3) RENDERING HELPER — preserve the exact paragraphs from the source
// ---------------------------------------------------------------------------

/**
 * Split a multi-paragraph field into paragraphs for rendering as <p> blocks.
 * Paragraphs are separated by a blank line ("\n\n") in the data.
 * (Alternatively, render the raw string in a container with CSS `white-space: pre-line`.)
 */
export function toParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
