## What
On the `/reading` page, in the "Spread the Light" share block:

1. **Remove the gold top/bottom hairline borders** — delete the `borderTop` and `borderBottom` styles.
2. **Replace the background** with the same gradient used by the "What you receive" section on the home page (`/`). That gradient is:
```
radial-gradient(70% 55% at 50% 25%, rgba(180,200,235,0.16) 0%, rgba(10,14,28,0) 70%),
radial-gradient(45% 35% at 90% 100%, rgba(245,207,122,0.08) 0%, rgba(245,207,122,0) 70%),
linear-gradient(180deg, #14203c 0%, #1c2848 40%, #22304f 70%, #1c2848 100%)
```
3. **Remove or tone down the gold box-shadow** so it does not clash with the new cooler background.

## File
- `src/routes/reading.tsx` — lines ~393–408 (the outer container of the share block).