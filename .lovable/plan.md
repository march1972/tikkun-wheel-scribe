Task: Replace the 7 per-sign reading-copy fields in `src/data/tikkun-data.json` with the new text from `tikkun-content-update.json`, matching by `signId`.

Plan:
1. Write a one-off script that:
   - Loads `src/data/tikkun-data.json` and `tikkun-content-update.json`
   - Iterates over `signs[]` in the original file
   - For each sign, finds the matching entry in the update file by `signId`
   - Replaces exactly these 7 fields: `spinSnippet`, `quote`, `shadowGilgul`, `shadowArchetype`, `spiritualWorkTikkun`, `tikkunLetterFull`, `dailyMantra`
   - Leaves all other fields (`order`, `name`, `hebrewName`, `signId`, `tikkunLetterHebrew`, `northNode`, `southNode`, `dateRanges`, `id`) and the top-level `meta` object completely untouched
   - Writes the result back to `src/data/tikkun-data.json` with `JSON.stringify(..., null, 2)` to preserve valid JSON and embedded `\n` newlines
2. Run the script.
3. Verify the output:
   - `src/data/tikkun-data.json` remains valid JSON
   - `signs[]` still has exactly 12 entries
   - `dateRanges` and `meta` are byte-for-byte unchanged
   - `tikkun-lookup.ts` and every other file in the project are untouched
4. Run the build/typecheck to confirm no TypeScript errors.
5. Do a quick functional check: date `2024-03-01` should still resolve to Aries, and the new copy fields should be present.