## Goal

Drop the uploaded `tikkun-data.json` + `tikkun-lookup.ts` in as the only Tikkun content/logic source. Rewire the form→reading and home→spinning→snippet flows, preserving the current visual design and paragraph structure. Remove the old `tikkun-flow-content.json` / `tikkun-data.ts` / `tikkun.functions.ts` data layer so there is only one source of truth.

## File changes

### Add (verbatim, no edits to copy)
- `src/data/tikkun-data.json` — the uploaded JSON, byte-for-byte.
- `src/data/tikkun-lookup.ts` — the uploaded module, byte-for-byte.

### Update
- `tsconfig.json` — add `"resolveJsonModule": true` (and keep `"esModuleInterop": true` if it isn't already implied) so the JSON import compiles.

### Replace data layer
- `src/lib/tikkun-data.ts` → becomes a tiny shim that ONLY re-exports from `@/data/tikkun-lookup` (`SIGNS`, `TikkunSign`, `getReadingByDOB`, `getSpinSnippet`, `toParagraphs`, `OUT_OF_RANGE_MESSAGE`, `MAX_SPINS`, `COVERAGE_START`, `COVERAGE_END`). All `screen3` / `screen6` / `STATIC_COPY` / `signById` / `randomTikkunSign` / `lookupSignByDob` exports are removed.
- Delete `src/data/tikkun-flow-content.json` and `src/lib/tikkun.functions.ts` (no longer referenced; not imported by any route loader).
- Move the static UI copy that used to live in `STATIC_COPY` (section headers, share/closing/reflection text, "Reveal your Tikkun" eyebrow) into a new `src/lib/reading-copy.ts` constant so /reading and /content keep their existing chrome text. No per-sign content lives there.

### Server fn
- `src/lib/lead.functions.ts` — replace `lookupSignByDob(dob)` with `getReadingByDOB(dob)`; on `outOfRange` return the existing error shape with `OUT_OF_RANGE_MESSAGE`; otherwise insert `sign_id: result.sign.id` and return `{ ok: true, signId: result.sign.id }`. No DB/schema change.

### Routes

`src/routes/form.tsx`
- Keep the redirect-to-snippet behavior, but seed `sessionStorage.tikkun_target_sign` with a `getSpinSnippet([])` result (so /snippet has a sign to show) and initialize `tikkun_seen_signs` with `[pick.id]`.

`src/routes/index.tsx` (home)
- `handleSpin`: clear `tikkun_seen_signs`, call `getSpinSnippet([])`, persist `result.seen` to `sessionStorage.tikkun_seen_signs` and `result.sign.id` to `tikkun_target_sign`, then navigate to `/spinning`. Drop the old `randomTikkunSign` import.

`src/routes/spinning.tsx`
- No data change. Continues to read `tikkun_target_sign` and pass it to `TikkunWheel` (the wheel's `SIGN_KEY_TO_INDEX` already keys on lowercase sign ids, which match the new JSON `id`).

`src/routes/snippet.tsx`
- Replace `spinAttempts` + `STATIC_COPY` driven logic with `getSpinSnippet(seen)`:
  - On mount, read `tikkun_seen_signs` (default `[]`) and `tikkun_target_sign` to find the current `sign`.
  - "Spin again" button: call `getSpinSnippet(seen)`; if `result.exhausted` → hide the button and show the inline DOB form (same form UI already present). Otherwise persist `result.seen`, set `tikkun_target_sign` to `result.sign.id`, navigate to `/spinning`.
  - Snippet display uses `sign.spinSnippet`, `sign.name`, `sign.tikkunLetterHebrew` (replacing `sign.screen3.spinSnippet` and `sign.hebrewLetter`).
  - "Reveal My Actual Chart" CTA still flips into form-mode locally.
  - Form submit: keep calling `submitLead`; on success navigate to `/reading?sign=<id>`. On `out-of-range` error from the server, show `OUT_OF_RANGE_MESSAGE`.

`src/routes/reading.tsx` — rewrite the body to render the new sign shape, keeping every existing visual treatment (SkyShell, halo, fade animations, Hairline, Reveal, Column, Body, share pills, closing block). Section order EXACTLY as specified:
  1. Hero halo + `sign.tikkunLetterHebrew` glyph (reuses the existing hero glyph styling).
  2. `sign.signId` as the H1 (italic style preserved).
  3. `sign.quote` rendered with the existing italic mantra-quote style.
  4–5. "North Lunar Node in {sign.northNode}" / "South Lunar Node in {sign.southNode}" in the existing uppercase tracking style.
  6. SectionLabel "Your Shadow Pattern (Gilgul)" + `toParagraphs(sign.shadowGilgul)` mapped to existing `<p>` body styles.
  7. SectionLabel "Shadow Archetype" + `sign.shadowArchetype` in the existing archetype italic block.
  8. SectionLabel "Your Spiritual Work (Tikkun)" + `toParagraphs(sign.spiritualWorkTikkun)`.
  9. SectionLabel "Your Tikkun Letter" + stacked `sign.tikkunLetterHebrew` glyph, then `toParagraphs(sign.tikkunLetterFull)` (keeps centered glyph, hairline, then left-aligned paragraphs).
  10. "Your Daily Mantra (Kavanah)" hero block rendering `sign.dailyMantra`.
- Keep the Reflection, Share, and Closing blocks intact, sourcing their static text from the new `reading-copy.ts` constant.
- Sign lookup: read `?sign=<id>` (or `tikkun_real_sign` session value) and resolve with `SIGNS.find(s => s.id === id)`.

`src/routes/content.tsx` — convert the internal review page to iterate `SIGNS` and render the new fields (`spinSnippet`, `quote`, `shadowGilgul`, `shadowArchetype`, `spiritualWorkTikkun`, `tikkunLetterFull`, `dailyMantra`) with the same per-section labels. Same visual styling.

## Verification

- Run typecheck/build (auto by harness) and confirm clean.
- Spot-check in preview: home → wheel spin → snippet shows new copy + Hebrew glyph; up to 4 distinct signs, no repeats, then form prompt; submitting a valid DOB lands on /reading with the 10 sections in order with paragraph breaks; an out-of-coverage DOB shows `OUT_OF_RANGE_MESSAGE` inline and does not navigate.

## Technical notes

- `tikkun-lookup.ts` and `tikkun-data.json` are dropped in unchanged. JSON paragraph breaks (`\n\n`) are preserved by always rendering long fields through `toParagraphs(...)`.
- The wheel keeps its existing `SIGN_KEY_TO_INDEX` mapping; the new JSON `id` values (`aries`…`pisces`) match those keys, so the spinning animation still targets the correct slot.
- `lead.functions.ts` continues to write `sign_id` as a lowercase id to the existing `leads` table — no migration needed.
- `spinAttempts.ts` is no longer used by snippet/index; left in place only if any other route still imports it (none found), otherwise deleted in the same pass.
