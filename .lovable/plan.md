## Goal

Replace the current `/kabbalistic-astrology` page with the content and structure of the attached HTML, rebuilt in our existing design system. Verbatim copy. No new footer.

## Files

### `src/data/kabbalistic-astrology.ts` — rewrite

- Add `"Modern Paths"` to the `Era` union.
- Replace the `TIMELINE` array with the new full set (17 entries: the existing ones plus `rashash`, `ashlagian`, `centre`, `renewal`, `academic`, all tagged `era: "Modern Paths"`). Copy verbatim.
- Replace `ERAS` with: `["All","Foundations","Antiquity","Medieval","Early Modern","18th Century","18th–19th Century","20th Century","Modern Paths"]`.
- Keep `SEVEN_DOUBLES`, `TWELVE_ELEMENTALS`, `MATRIX`, `GCATS`, `FAQ` as-is (already match).
- Update the `GLOSSARY` entries to the new wording, including the four new Modern entries (Kabbalah Centre, Scanning the Zohar, Red String, 72 Names of God) and the Pardes Rimonim entry.
- Add `link: "/tikkun"` and `linkText: "Explore the 12 Tikkunim"` on the `Tikkun` glossary entry. Extend `GlossaryEntry` type with optional `link`/`linkText`.
- Remove `STREAMS` (no longer used).

### `src/routes/kabbalistic-astrology.tsx` — rewrite

Keep route id `/kabbalistic-astrology`, keep `SkyShell` wrapper, keep our typography tokens (`HEAD`, `BODY`), colors (`C_INK`, `C_GOLD`, `C_DAWN`, etc.), shadcn `Tabs`, `Accordion`, `Input`. Single `<h1>`, semantic `<h2>`/`<h3>`.

Sections, in order:
1. **Hero** — `<h1>A History of Kabbalistic Astrology</h1>` + lead paragraph. Four nav chips using our button styling:
   - `Timeline` → `#timeline`
   - `Letters & Mappings` → `#letters`
   - `Tikkun` → `#g-tikkun` (resets glossary filter + search on click, then scrolls)
   - `Glossary` → `#glossary`
2. **Intro** — "What is Kabbalistic Astrology?" + two paragraphs, verbatim.
3. **Timeline** — `id="timeline"`. Era filter chips (now includes `Modern Paths`). Each entry renders as a card with title/era/date and a click/keyboard-toggleable "Tap to expand" body (source, full text, optional `quote`+`cite`, `teaching`, `note`). The five Modern Paths entries expand in place, same as every other entry.
4. **Letters & Mappings** — `id="letters"`. Shadcn `Tabs` with two tabs: `Seven Doubles · Planets` and `Twelve Elementals · Zodiac`. Render the existing tables. Keep the caption about Gra-Ari recension.
5. **How Each Era Reads Cosmic Influence** — the existing matrix table.
6. **Glossary** — `id="glossary"`. Search `Input` + category chip filters. Cards rendered into `id="g-{slug}"`. Tikkun card gets a gold-ring highlight and a CTA `Link to="/tikkun"` reading "Explore the 12 Tikkunim →".
7. **FAQ** — shadcn `Accordion` for the six Q&A entries.

Remove: standalone `TikkunSection`, standalone `Streams` section, `Closing` section with "Back to home" link, and the existing `STREAMS` import. No page-level footer.

### `src/routes/index.tsx` — no change

Footer "Kabbalah Astrology" already links to `/kabbalistic-astrology` (line 660).

## SEO

Keep the existing `head()`: title, description, OG/Twitter tags, canonical, Article + FAQPage JSON-LD. Already matches the file's intent.

## Interactivity contract

- Era filter: clicking a chip filters timeline list and keeps the rest of the page state intact.
- Timeline card: click or Enter/Space toggles expansion.
- Tabs: clicking a tab swaps which table is visible.
- Glossary: typing in the search input filters entries live by term/definition; clicking a category chip filters by category. Clicking the Tikkun hero chip resets both filters before scrolling.
- FAQ: click toggles each entry, only one open at a time (Radix default for `Accordion type="single"`).

## Out of scope

No analytics changes, no migration, no new components beyond what's already in `src/components/ui`.