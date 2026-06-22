Add every currently-open URL to the sitemap so Google can discover them.

Current sitemap already includes: `/`, `/history`, `/kabbalistic-astrology`, `/kabbalistic-astrology-reading`, `/jewish-astrology`, `/hebrew-astrology`, `/about`, `/tikkun`, `/what-is-tikkun`, `/snippet`, `/tikkun/$sign` (12 signs), `/privacy`, `/terms`.

Add these missing open routes to `src/routes/sitemap[.]xml.ts`:
- `/content`
- `/form`
- `/spinning`

Exclude:
- `/admin` — noindex meta tag (intentionally hidden)
- `/reading`, `/reading/$sign` — blocked by robots.txt
- `/unsubscribe`, `/email/unsubscribe` — utility/funnel routes, not for indexing
- `/sitemap.xml` — the sitemap itself

After republish, resubmit the sitemap in Search Console.