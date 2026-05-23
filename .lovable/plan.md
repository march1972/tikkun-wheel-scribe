In `src/routes/snippet.tsx` form submit button (lines 357–387):

1. Remove `border: "1px solid rgba(240,200,104,0.35)"` → `border: "none"`.
2. Change background from `#5c1a24` → `#7a1f2b` (match `PrimaryCTA` dawn); update hover bg from `#6b1f2b` → `#8a2533`; update hover shadow tint from `rgba(92,26,36,0.55)` → `rgba(155,40,55,0.55)` to match dawn.
3. Set `borderRadius: 0` (match `/` landing red pill).
4. Bump `letterSpacing` to `0.28em` and `fontWeight` to 700 so the type matches the landing pill.
5. Change label text `"Reveal my Tikkun"` → `"Reveal my free Tikkun Reading"` (busy state stays `"Revealing…"`).

No other files touched.