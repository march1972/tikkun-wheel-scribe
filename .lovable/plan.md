Apply the same verification flow used for `/form` to every public, indexable route on `tikkun.kabbalahcircle.com`.

## Pages to verify

Static routes (from `src/routeTree.gen.ts`, excluding `/admin`, `/unsubscribe`, `/email/*`, `/lovable/*`, `/sitemap.xml`, and parameterized `$sign` shells):

- `/`
- `/about`
- `/content`
- `/form`
- `/hebrew-astrology`
- `/history`
- `/jewish-astrology`
- `/kabbalistic-astrology`
- `/kabbalistic-astrology-reading`
- `/privacy`
- `/reading`
- `/snippet`
- `/spinning`
- `/terms`
- `/tikkun`
- `/what-is-tikkun`

Dynamic sign pages (`/tikkun/$sign`, `/reading/$sign`) — verify whichever URLs appear in the live sitemap.

## What I will do for each URL

1. Fetch with `User-Agent: Googlebot` against the live custom domain and confirm HTTP 200.
2. Call the Search Console URL Inspection API (`urlInspection.index.inspect`) and capture:
   - `verdict` (PASS / NEUTRAL / FAIL)
   - `robotsTxtState` (should be `ALLOWED`)
   - `pageFetchState`
   - `indexingState`
   - `googleCanonical` vs `userCanonical`
3. Resubmit the sitemap once (covers all URLs at once) and capture sitemap status.
4. Report a single table with one row per URL.

## Note on "Request Indexing"

Google's URL Inspection API does **not** expose a public "Request indexing" button. Resubmitting the sitemap is the API-level equivalent and tells Google to recrawl. If a specific URL still won't index, the "Request indexing" button has to be clicked manually in Search Console for that URL — I'll list which ones (if any) still need that after the API check.