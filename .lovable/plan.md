## Goal
Replace the content driving the Tikkun "API" (the lookup + reading copy) with the freshly authored content in `Tikkun_API_for_Tikkun_Wheel_June_10_2026_final.xlsx`, with zero runtime errors.

## Where the data lives today
The "API" is not an HTTP API — it's a static JSON file consumed by serverFns:
- `src/data/tikkun-flow-content.json` — the source of truth (date ranges + all screen copy)
- `src/lib/tikkun-data.ts` — loads/typed-wraps the JSON, exports `lookupSignByDob`, `signById`, `randomTikkunSign`
- `src/lib/tikkun.functions.ts` — server functions that wrap the above

So "replacing the API" = regenerating that one JSON file from the new XLSX while keeping the existing schema (so no component/typing changes are needed).

## XLSX → JSON mapping
The workbook has two sheets:

**Sheet `Dates`** (one row per sign): `Birth Date Ranges` (multi-line `YYYY-MM-DD → YYYY-MM-DD`), `Tikkun Sign`, `South Node`, `Tikkun direction` → drives `birthDateRanges`, `sign`, `southNode`, `tikkunDirection`.

**Sheet `Original`** (blocks of ~8 rows per sign): header rows give `Sign ID`, `Hebrew Letter (Zodiac)` (letter + name), then Category/Value rows:

| XLSX Category | JSON field |
|---|---|
| Spin Snippet | `screen3.spinSnippet` |
| Mantra Quote | `screen6.mantraQuote` (strip surrounding curly/straight quotes) |
| Your Shadow Pattern | `screen6.lifesPattern` |
| Shadow Archetype | `screen6.archetype` |
| Your Life's Work (Tikkun) | `screen6.lifesWork` |
| Your Tikkun Letter | split into `screen6.letterMeaning` + `screen6.letterTeaching` |
| Daily Mantra | `screen6.dailyMantra` |

The "Your Tikkun Letter" cell starts with `"<Letter> — <meaning>. <teaching…>"` (e.g. `"Hei — the window. Hei is the window —…"`). Split on the first `". "` after the em-dash: left side's text after `—` becomes `letterMeaning`, the remainder becomes `letterTeaching`. This preserves the current JSON shape used by the reading screen.

`staticCopy` (screen3/screen6 fixed UI strings) is NOT in the XLSX — keep the current values as-is.

## Steps
1. Write a one-off Python script (openpyxl) that:
   - Reads `Dates` → builds `{ sign → birthDateRanges[] }`.
   - Walks `Original` row-by-row, splitting on the `"N. SignName"` headers, capturing `Sign ID`, the Hebrew letter glyph + name, then the seven Category/Value rows.
   - Merges both into the existing JSON shape (12 signs, in zodiac order), keeps `_README` and `staticCopy` from the current file.
   - Writes back to `src/data/tikkun-flow-content.json` (UTF-8, 2-space indent, `ensure_ascii=false` so Hebrew + curly quotes survive).
2. Run the script.
3. Validate:
   - `signs.length === 12`, every id present, every `birthDateRanges[*]` is a valid `YYYY-MM-DD` pair with `from <= to`.
   - Every `screen6.*` field non-empty.
   - Quick TS sanity: `bun run` a tiny check that imports `SIGNS` from `src/lib/tikkun-data.ts` and asserts shape.
4. Spot-check by spinning a couple of DOBs (e.g. `1987-06-01`, `2024-03-15`) through `lookupSignByDob` to confirm the lookup still resolves.

## Why this is the safest approach
- No schema change → `tikkun-data.ts`, `tikkun.functions.ts`, `snippet.tsx`, `reading.tsx`, `spinning.tsx` all keep working untouched.
- No DB/migration involved (this content is bundled JSON, not Supabase).
- Single file diff, easy to revert.

## One question before I build
The "Your Tikkun Letter" cell in the new XLSX is a single combined paragraph, while the current JSON splits it into `letterMeaning` (short, e.g. "the window") and `letterTeaching` (the full sentence). I plan to auto-split as described above. If you'd rather collapse both into one field (and update the reading screen to render just one), say the word and I'll adjust the plan.
