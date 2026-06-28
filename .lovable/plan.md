## Sitemap audit — results

I fetched every URL in `src/routes/sitemap[.]xml.ts` and confirmed final status + canonical:

| URL | Status | Canonical |
|---|---|---|
| `/`, `/history`, `/kabbalistic-astrology`, `/kabbalistic-astrology-reading`, `/jewish-astrology`, `/hebrew-astrology`, `/about`, `/tikkun`, `/what-is-tikkun`, `/snippet`, `/reading`, `/content`, `/form`, `/spinning`, `/privacy`, `/terms` | 200 | self-referencing ✓ |
| `/tikkun/aries` … `/tikkun/pisces` (all 12) | 200 | self-referencing ✓ |

**No redirects, no non-200s, no non-canonicals in the sitemap.** (As a side check, `/reading/{sign}` 307-redirects to `/reading?sign={sign}`, but those URLs are NOT in the sitemap, so no action needed.)

## The 12 tikkun pages — what to do

Nothing to fix. They are the correct canonical form:

- All 12 return 200.
- Each `/tikkun/{sign}` sets its own `<link rel="canonical" href="https://tikkun.kabbalahcircle.com/tikkun/{sign}">` and matching `og:url`.
- Each has a unique title and description (e.g. "Tikkun for Aries — Soul Correction in Kabbalistic Astrology").
- The hub page `/tikkun` carries a `CollectionPage` + `ItemList` JSON-LD that links to all 12, which is the right internal-linking pattern.
- `robots` is `index, follow` on each.

**Recommendation: keep the 12 `/tikkun/{sign}` URLs in the sitemap as-is.** They are already final, canonical, 200 URLs.

## Proposed change

None. The sitemap is clean. I'll only act if you want me to:

1. Also add a redirect-free entry for per-sign reading pages (would require turning `/reading/{sign}` from a 307 into a real route, or removing it — but it's not in the sitemap today, so this is optional).
2. Add `<lastmod>` from a real "last content update" timestamp instead of `today` (today resets every request, which can make crawlers think every page changed daily).

Tell me if you want either of those follow-ups; otherwise no edits are needed.
