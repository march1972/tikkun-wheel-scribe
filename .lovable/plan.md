Remove all blocks on `/form`, `/spinning`, and `/content` so search engines can crawl and index them.

**Changes:**

1. **`public/robots.txt`** — delete these three lines:
   - `Disallow: /form`
   - `Disallow: /spinning`
   - `Disallow: /content`

2. **`src/routes/form.tsx`** — remove the meta entry `{ name: "robots", content: "noindex, nofollow" }` from the `head()` block.

3. **`src/routes/spinning.tsx`** — remove the same `noindex, nofollow` meta entry from the `head()` block.

4. **`src/routes/content.tsx`** — remove the same `noindex, nofollow` meta entry from the `head()` block.

After these edits, the three pages will be fully discoverable and indexable by search engines. The remaining blocked paths (`/unsubscribe` and `/reading`) will stay as-is.