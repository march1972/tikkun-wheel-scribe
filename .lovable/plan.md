
# Per-Sign SEO Pages: /tikkun/[sign]

## Goals
- 12 indexable, AEO-friendly pages — one per zodiac sign — that rank for "tikkun for [sign]", "[sign] soul correction", "[sign] kabbalistic astrology".
- Reuse content from `src/data/tikkun-data.json` (shortened) — no new copywriting required.
- Keep the personalized reading funnel intact: these pages teach the archetype, they don't replace the personalized reading.
- Hide from primary UI: pages exist in sitemap and cross-link to each other, but the only in-app surface is a footer link + index page revealed only **after the user has entered their email** (post-reveal state).

## Routes to create

```
src/routes/tikkun.tsx              -> /tikkun (index of all 12)
src/routes/tikkun.$sign.tsx        -> /tikkun/aries, /tikkun/taurus, ...
```

Both are static, no loaders. `tikkun.$sign.tsx` validates `params.sign` against `SIGNS` from `src/data/tikkun-lookup.ts`; unknown sign → `notFound()`.

## Per-sign page layout (`/tikkun/[sign]`)

Structure, top to bottom:

1. **Breadcrumb**: Home › Tikkun › [Sign]
2. **H1**: "Tikkun for [Sign]: Soul Correction in Kabbalistic Astrology"
3. **Lede (40–60 words, AEO answer block)**: One-paragraph definitional answer — what Tikkun means for this sign, in plain language. Derived from `shadowArchetype` + `spiritualWorkTikkun` opening line, shortened.
4. **Quick facts list**: Hebrew name, Tikkun letter, North Node, South Node, date ranges (first range only, shortened).
5. **"The Shadow Pattern"** section — first 1–2 paragraphs of `shadowGilgul`, then truncated with a fade and a CTA: *"Your personal Tikkun reading reveals the specific shadow patterns active in your chart."*
6. **"The Spiritual Work"** section — first 1–2 paragraphs of `spiritualWorkTikkun`, similarly truncated.
7. **Daily mantra**: full `dailyMantra` (it's one line, fine to show).
8. **CTA block**: "Get your personal Tikkun reading →" → `/` (form entry).
9. **Related signs**: 2–3 cross-links to sibling `/tikkun/[sign]` pages (e.g. previous + next in zodiac order).
10. **Footer disclaimer**: "Last updated: [date]"

What we deliberately omit (kept inside the gated reading): the full multi-paragraph `shadowGilgul`, full `spiritualWorkTikkun`, full `tikkunLetterFull`, and the personalized chart logic. Roughly 30–40% of the source text is shown; the rest stays behind the email.

## /tikkun index page

- H1: "The 12 Tikkunim: Kabbalistic Soul Corrections by Zodiac Sign"
- 60-word lede answering "what is a tikkun".
- Grid of 12 cards, each linking to `/tikkun/[sign]` with the sign name, Hebrew name, Tikkun letter, and a one-line teaser (`spinSnippet`).
- CTA at bottom → `/` to get personalized reading.

## SEO/AEO wiring (per-sign page)

In `head()`:
- `title`: "Tikkun for [Sign] — Soul Correction in Kabbalistic Astrology"
- `description`: 150-char summary derived from `shadowArchetype`.
- `og:title`, `og:description`, `og:url` (absolute), `og:type: "article"`, `og:image`: existing `og-default.jpg`.
- Canonical: `https://tikkun.kabbalahcircle.com/tikkun/[sign]`.
- JSON-LD: `Article` (headline, description, datePublished, author=Organization) + `BreadcrumbList`.

Index page: same pattern, `og:type: "website"`, `CollectionPage` JSON-LD listing all 12.

## Visibility / "hidden until email reveal"

- **Not** added to header nav.
- **Footer**: add a conditional footer link "Explore the 12 Tikkunim" → `/tikkun`, rendered only when the user has reached the post-email state. Implementation: read the same flag/localStorage key that `/snippet` and `/reading` already use to gate the reveal (will verify by reading `snippet.tsx` / `reading.tsx` during implementation; reuse, don't invent a new flag).
- **Sitemap** (`src/routes/sitemap[.]xml.ts`): add `/tikkun` (priority 0.7) and all 12 `/tikkun/[sign]` (priority 0.8) with today's `lastmod`. This is what gives Google + LLMs discoverability.
- **Internal link graph**: each sign page links to 2–3 sibling signs + the index, giving Google enough crawl paths without exposing the section in main nav.
- **robots.txt**: no change needed — these are indexable.

## Files touched

- `src/routes/tikkun.tsx` (new) — index
- `src/routes/tikkun.$sign.tsx` (new) — per-sign page
- `src/routes/sitemap[.]xml.ts` — add 13 entries
- `src/routes/__root.tsx` or wherever the footer lives — add the gated footer link (will locate during implementation)
- `public/llms.txt` — add the 12 sign URLs in "answer voice"

No changes to `/reading`, `/reading/$sign`, the form, the wheel, or any existing copy. No new data, no new dependencies.

## Out of scope (defer)

- FAQ page
- Pillar/glossary pages (`tikkun olam meaning`, `kavanah meaning`, etc.) — Phase 3
- Rewriting the per-sign copy from scratch — using existing JSON, shortened
- GSC/Bing submission — do after deploy
