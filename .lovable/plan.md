Remove the two blocks preventing Google from indexing `/snippet`:

1. **public/robots.txt** — delete `Disallow: /snippet` (line 6).
2. **src/routes/snippet.tsx** — remove the `{ name: "robots", content: "noindex, nofollow" }` meta entry from the `head()` block.

Both changes are small deletions only; no new code or dependencies needed.