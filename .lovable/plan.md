# Match `/spinning` to the new `/` type scale

Apply the same editorial / magazine-bold scale (intensity 4/5) used on `/` to the `/spinning` route so it reads as the same page. Frontend only — no new content, no new elements, no copy or layout structure changes.

## Scale changes (src/routes/spinning.tsx)

| Element | Current | New |
|---|---|---|
| H1 ("Reveal your Tikkun") | clamp(30px, 5vw, 56px), letter-spacing −0.025em | clamp(48px, 9vw, 112px), letter-spacing −0.035em, line-height 1.0 |
| "Searching Tikkun patterns…" eyebrow | clamp(10px, 1.4vw, 13px), letter-spacing 0.32em | unchanged — matches eyebrow micro-type that stayed untouched on `/` |

The wheel size, halo glow, spacing rhythm (mt clamps), and `SkyShell` header all stay as-is.

## Verification

- Visual check at 778px (current viewport) and at desktop ≥1280px to confirm the H1 doesn't break the layout above the wheel or push the wheel off-screen.
- Confirm no horizontal scroll on mobile widths.
- Confirm the H1 visually matches the hero H1 on `/`.
