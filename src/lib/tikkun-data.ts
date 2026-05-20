import content from "@/data/tikkun-flow-content.json";

export interface TikkunSign {
  id: string;
  sign: string;
  hebrewLetter: string;
  letterName: string;
  southNode: string;
  tikkunDirection: string;
  birthDateRanges: Array<{ from: string; to: string }>;
  screen3: { spinSnippet: string };
  screen6: {
    mantraQuote: string;
    lifesPattern: string;
    archetype: string;
    lifesWork: string;
    letterMeaning: string;
    letterTeaching: string;
    dailyMantra: string;
  };
}

export interface StaticCopy {
  screen3: {
    eyebrow: string;
    prompt: string;
    primaryButton: string;
    reassurance: string;
    secondaryButton: string;
  };
  screen6: {
    eyebrow: string;
    label: string;
    scrollHint: string;
    reflectionPrompt: string;
    shareHeadline: string;
    shareSub: string;
    shareChannels: string;
    deeperSub: string;
    deeperButton: string;
    sectionHeaders: string[];
  };
}

const data = content as unknown as { signs: TikkunSign[]; staticCopy: StaticCopy };

export const SIGNS: TikkunSign[] = data.signs;
export const STATIC_COPY: StaticCopy = data.staticCopy;

// Map sign id -> letter index in the TikkunWheel (zodiac order = letter order).
export const SIGN_ID_TO_INDEX: Record<string, number> = {
  aries: 0, taurus: 1, gemini: 2, cancer: 3, leo: 4, virgo: 5,
  libra: 6, scorpio: 7, sagittarius: 8, capricorn: 9, aquarius: 10, pisces: 11,
};

export function signById(id: string | null | undefined): TikkunSign | null {
  if (!id) return null;
  return SIGNS.find((s) => s.id === id) ?? null;
}

export function randomTikkunSign(exclude?: string | null): TikkunSign {
  const pool = exclude ? SIGNS.filter((s) => s.id !== exclude) : SIGNS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Date-range lookup. dob is "YYYY-MM-DD". Returns null if outside coverage. */
export function lookupSignByDob(dob: string): TikkunSign | null {
  for (const sign of SIGNS) {
    for (const range of sign.birthDateRanges) {
      if (dob >= range.from && dob <= range.to) return sign;
    }
  }
  return null;
}

export const COVERAGE = { from: "1901-01-22", to: "2051-06-28" };
