// Minimal Tikkun bundle stub. Real bundle will be wired in a later step.
// Field names follow tech spec v1.2 (`oneParagraph` lives on signs[key]).

export type Sign = {
  key: string;
  signName: string;
  letter: string; // Hebrew letter
  letterName: string; // transliterated name
  oneParagraph: string; // snippet body, prefixed in UI with "You have a tendency to "
};

export const SIGNS: Sign[] = [
  {
    key: "aries",
    signName: "Aries",
    letter: "ה",
    letterName: "Hei",
    oneParagraph:
      "lead before you've been asked, and to mistake the first move for the right one. The work is learning when stillness is the braver act.",
  },
  {
    key: "taurus",
    signName: "Taurus",
    letter: "ו",
    letterName: "Vav",
    oneParagraph:
      "build slowly, hold what you've made, and resist the small surrenders that growth keeps asking of you.",
  },
  {
    key: "gemini",
    signName: "Gemini",
    letter: "ז",
    letterName: "Zayin",
    oneParagraph:
      "live in motion between two truths at once, and to confuse fluency for arrival. Choosing one room is the practice.",
  },
  {
    key: "cancer",
    signName: "Cancer",
    letter: "ח",
    letterName: "Chet",
    oneParagraph:
      "carry other people's weather inside your body, and to mistake protection for love. The work is naming the line.",
  },
  {
    key: "leo",
    signName: "Leo",
    letter: "ט",
    letterName: "Tet",
    oneParagraph:
      "shine outward before you've been seen inward, and to keep performing the warmth you have not yet given yourself.",
  },
  {
    key: "virgo",
    signName: "Virgo",
    letter: "י",
    letterName: "Yod",
    oneParagraph:
      "refine the surface of things while the root keeps asking for attention. Precision is not the same as care.",
  },
  {
    key: "libra",
    signName: "Libra",
    letter: "ל",
    letterName: "Lamed",
    oneParagraph:
      "balance everyone in the room except the one keeping the scales. The practice is finally placing yourself on them.",
  },
  {
    key: "scorpio",
    signName: "Scorpio",
    letter: "נ",
    letterName: "Nun",
    oneParagraph:
      "go straight for the depth, and then guard the door you opened. Trust is what you owe the people who walked in.",
  },
  {
    key: "sagittarius",
    signName: "Sagittarius",
    letter: "ס",
    letterName: "Samech",
    oneParagraph:
      "chase the next horizon as a way of avoiding the one already in front of you. Staying is the larger journey.",
  },
  {
    key: "capricorn",
    signName: "Capricorn",
    letter: "ע",
    letterName: "Ayin",
    oneParagraph:
      "earn what you already have, and to confuse achievement for permission to rest. The work is letting the climb end.",
  },
  {
    key: "aquarius",
    signName: "Aquarius",
    letter: "צ",
    letterName: "Tzadi",
    oneParagraph:
      "speak for the collective while keeping your own life at arm's length. Coming closer is the harder freedom.",
  },
  {
    key: "pisces",
    signName: "Pisces",
    letter: "ק",
    letterName: "Qof",
    oneParagraph:
      "dissolve into whatever you touch, and to call merging the same thing as loving. Edges are also a form of devotion.",
  },
];

export function signByKey(key: string | null | undefined): Sign | null {
  if (!key) return null;
  return SIGNS.find((s) => s.key === key) ?? null;
}

export function randomSign(): Sign {
  return SIGNS[Math.floor(Math.random() * SIGNS.length)];
}
