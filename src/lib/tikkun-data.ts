// Thin re-export shim. Single source of truth lives in src/data/tikkun-lookup.ts.
export {
  SIGNS,
  MAX_SPINS,
  COVERAGE_START,
  COVERAGE_END,
  OUT_OF_RANGE_MESSAGE,
  getReadingByDOB,
  getSpinSnippet,
  toParagraphs,
} from "@/data/tikkun-lookup";
export type { TikkunSign, DateRange, ReadingResult, SpinResult } from "@/data/tikkun-lookup";
