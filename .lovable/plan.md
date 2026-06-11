## Text Styling & Duplicate Removal on /reading

### Scope
1. **Italic + red parenthetical terms in section headers**
   - In `Your Shadow Pattern (Gilgul)` — render *Gilgul* in italic and `C_DAWN` red
   - In `Your Spiritual Work (Tikkun)` — render *Tikkun* in italic and `C_DAWN` red
   - In `Your Daily Mantra (Kavanah)` — render *Kavanah* in italic and `C_DAWN` red
   - Implementation: split each header string in `reading.tsx` into prefix + styled `<span>` + suffix, passed into `SectionLabel`.

2. **Remove duplicate "Spread the Light"**
   - In the Share section, `headers[6]` already renders "Spread the Light" as the `SectionLabel` gold heading.
   - The `<h3>` below it repeats the same text via `sc.shareHeadline`.
   - Remove the `<h3>` block so only the gold `SectionLabel` remains.

### Files changed
- `src/routes/reading.tsx` — header rendering + remove duplicate headline

### No new dependencies or data changes.