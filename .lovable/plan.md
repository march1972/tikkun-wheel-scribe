
# Phase 1 — Technical SEO foundation (no new copy)

Approved scope: fix metadata, structured data, sitemap/robots, OG image, llms.txt. No new pages, no copy rewrites. KabbalahCircle.com + Instagram aren't live yet — leave `sameAs` out for now, easy to add later.

## What I'll change

### 1. `src/routes/__root.tsx` — fix sitewide defaults
- Title: `Kabbalah Circle — Free Tikkun Astrology Reading`
- Description: real one-liner about free Tikkun chart from date of birth
- Add `og:site_name: Kabbalah Circle`, `twitter:card: summary_large_image`, remove `twitter:site: @Lovable`
- Default `og:image` → new branded image (1200×630) — placed here so every route inherits a non-blank social preview until per-page images exist
- Add sitewide JSON-LD `Organization` + `WebSite` block (currently lives only on `/`, which means subpages render no org schema)

### 2. Per-route `head()` — add missing or fix relative URLs
- `src/routes/about.tsx` — promote relative `/about` to absolute `https://tikkun.kabbalahcircle.com/about`; add Person/AboutPage JSON-LD (minimal, no new copy)
- `src/routes/privacy.tsx` — add canonical, og:url, og:title/desc
- `src/routes/terms.tsx` — same
- `src/routes/reading.$sign.tsx` — add per-sign title/desc using sign param + Article JSON-LD + BreadcrumbList + canonical
- `src/routes/reading.tsx` (the indexless landing) — `noindex` (funnel, no shareable content)
- `src/routes/form.tsx`, `src/routes/spinning.tsx`, `src/routes/snippet.tsx`, `src/routes/content.tsx`, `src/routes/unsubscribe.tsx` — `noindex, nofollow` (funnel/utility, dilutes index if left open)
- `src/routes/history.tsx` — already solid; just ensure Article schema author becomes a `Person` once you have a name, leave as-is for now

### 3. `src/routes/sitemap[.]xml.ts` — expand and add lastmod
- Add `/reading/[sign]` for all 12 signs (read from `src/data/tikkun-lookup.ts`)
- Keep `/`, `/about`, `/history`, `/privacy`, `/terms`
- Add `lastmod` (today's date)
- Sign pages get `priority: 0.8` — these will be the long-tail engine

### 4. `public/robots.txt`
- Already has `Sitemap:` line — good. Add explicit `Disallow:` for `/form`, `/snippet`, `/spinning`, `/content`, `/unsubscribe`, `/reading$` (defense in depth alongside meta noindex)

### 5. `public/llms.txt`
- Expand to include each `/reading/[sign]` page and `/history`, written in the "answer voice" (one sentence per link starting with the concept being defined). LLMs that respect llms.txt (Perplexity, some Claude flows) ingest this directly.

### 6. Branded OG image
- Generate `src/assets/og-default.jpg` at 1200×630: night-sky background (matches the SkyShell palette), Tikkun gold-wheel motif, type "Kabbalah Astrology · Reveal Your Tikkun · Free Reading". Wire into `__root.tsx` defaults.

## Semrush keyword pass (already run — informs Phase 3, not Phase 1)

| Keyword | Volume | KDI | Verdict |
|---|---|---|---|
| tikkun olam meaning | 1,900/mo | 47 | Big prize — winnable with a focused page |
| kabbalah centre | 1,900/mo | 60 | Branded confusion traffic — write a "Kabbalah Centre vs Kabbalah Circle" page later |
| kabbalistic astrology | 210/mo | 16 | Easy win — should be the H1 of `/` or a pillar page |
| kavanah meaning | 210/mo | 9 | Very easy — glossary page |
| what is tikkun | 170/mo | 24 | Easy — pillar page |
| gilgul meaning | 90/mo | 16 | Easy — glossary page |
| kabbalah for beginners | 70/mo | 10 | Easy — pillar page |
| kabbalah birth chart | 40/mo | 9 | Very easy — already aligned with the product |
| free kabbalah reading | 20/mo | 0 | Trivially winnable |
| kabbalah and relationships | 20/mo | 0 | Trivially winnable — strong ICP fit |
| tikkun chart, lunar nodes kabbalah | — | — | No measured volume; treat as supporting terms |

Takeaway: Phase 3 content should be **6 pillar pages + 12 sign pages** targeting the easy/very-easy cluster. Total addressable volume ~3,000/mo at low difficulty — realistic for a new site to capture ~10–20% within 6 months.

## Out of scope (Phase 1)

- No new routes/pages (Phase 3)
- No FAQ page (Phase 2)
- No copy rewrites on `/`, `/about`, `/history`
- No font subsetting (Phase 4 perf)
- No GSC / Bing / IndexNow submission (do after Phase 1 ships and you're ready)

Approve and I'll apply Phase 1 + generate the OG image in one batch.
