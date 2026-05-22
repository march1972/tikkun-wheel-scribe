## Goal

Make the "KABBALAH ASTROLOGY" wordmark at the top of `/` sit dead-center on both mobile and desktop, matching the centered headline, wheel, paragraph, and CTA below it.

## Change

One file, one edit.

**`src/routes/index.tsx`** — the header wrapper div (around line 261):

Current:
```tsx
<div className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] text-[#fdf7e7]">
```

Change to:
```tsx
<div className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] text-center text-[#fdf7e7]">
```

That's it — adding `text-center` re-centers the inline `<span>` wordmark. Nothing else on the page changes (wheel size, animation, colors, copy, layout all untouched).

## Verify

After the edit, take desktop (1440-wide) and mobile (390-wide) screenshots and confirm the wordmark is centered above the headline on both.
