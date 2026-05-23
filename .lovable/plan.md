Reduce the H1 "Reveal your Tikkun" font size by 7% on both the landing page and the /spinning page.

Current value on both pages:
- `fontSize: "clamp(41px, 7.65vw, 95px)"`

New value (each term × 0.93):
- `fontSize: "clamp(38px, 7.1vw, 88px)"`

Files to edit:
- `src/routes/index.tsx` — line 308
- `src/routes/spinning.tsx` — line 87

No other changes needed.