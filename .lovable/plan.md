# A History of Kabbalistic Astrology — new article route

## 1. New route: `/kabbalistic-astrology`

Create `src/routes/kabbalistic-astrology.tsx` using `createFileRoute("/kabbalistic-astrology")`. The page is wrapped in our existing `SkyShell` and styled with the same tokens (`HEAD`, `BODY`, `C_INK`, `C_GOLD`, `C_RULE`, etc.) used by `/history` and `/reading`, so it reads as a native site page (parchment/ink palette, serif headings, gold rules) rather than the indigo/dark theme in the source HTML. Tailwind + our existing classes only; the source file's CSS is discarded.

Content is ported verbatim from `kabbalistic-astrology.html` — intro, the three "Modern Paths of Kabbalah" cards, the Practical vs Mystical comparison table, all timeline entries (with their bodies, sources, quotes, notes), the seven-doubles and twelve-elementals letter tables, the full glossary, and the FAQ. No text is rewritten or shortened. The page's data (timeline entries, letters, glossary terms, FAQ Q&As) is extracted into a sibling module `src/data/kabbalistic-astrology.ts` to keep the route file readable.

## 2. Interactivity (preserved)

All client-side behaviors rebuilt in React with our shadcn primitives where they exist, plain state otherwise — no new libraries:

- **Timeline**: era filter chips (All / Foundations / Talmudic / Medieval / Classical Kabbalah / Modern); each entry is a button row that expands to reveal body + source + quote + note. `useState` for active filter and an open-set.
- **Letter tables**: shadcn `Tabs` toggling "Seven Doubles · Planets" and "Twelve Elementals · Zodiac".
- **Glossary**: text `Input` (live filter) + category chips (All, Core, Cosmology, Texts, Practice), filtering a list rendered from the data module.
- **FAQ**: shadcn `Accordion` (single-collapse), already wired with the right ARIA.

All interactive controls are real buttons / inputs with visible focus rings; headings follow a single `<h1>` then `<h2>`/`<h3>` per section.

## 3. SEO

Following the existing `head()` pattern (same shape as `src/routes/history.tsx`):

- `title`: `Kabbalistic Astrology: History, Glossary & Timeline (Chokhmat HaMazalot)`
- `description`: the long-form description from the brief.
- `og:title`, `og:description`, `og:url` = `https://tikkun.kabbalahcircle.com/kabbalistic-astrology`, `og:type=article`, plus `twitter:card=summary_large_image` and matching `twitter:title`/`twitter:description`. `og:image` reuses the site default already configured at root (no per-page image yet).
- `links`: `rel=canonical` to the same URL (leaf-only, per our convention).
- `scripts`: two JSON-LD blocks — `Article` (headline, description, url, author/publisher = Kabbalah Circle) and `FAQPage` (mainEntity built from the FAQ data array, so it stays in sync).
- Add the URL to `src/routes/sitemap[.]xml.ts` and to `public/llms.txt`.

## 4. Footer link (index page)

In `src/routes/index.tsx` line 659, swap the inert `<span>Kabbalah Astrology</span>` for a `<Link to="/kabbalistic-astrology">` using the same `C_INK_SOFT` + `textDecoration: underline` styling as the sibling Terms / Privacy / About links. Wording and position unchanged.

## 5. Out of scope

- No changes to other pages' footers (history page footer not part of the brief).
- No new image generation; if you'd like a hero illustration for `og:image` later, that's a separate ask.
- No changes to nav/header.

## Files

- **New** `src/routes/kabbalistic-astrology.tsx`
- **New** `src/data/kabbalistic-astrology.ts` (timeline, letters, glossary, FAQ data)
- **Edit** `src/routes/index.tsx` (link the footer text)
- **Edit** `src/routes/sitemap[.]xml.ts` (add URL)
- **Edit** `public/llms.txt` (add URL + one-line description)
- Auto-regenerated `src/routeTree.gen.ts`
