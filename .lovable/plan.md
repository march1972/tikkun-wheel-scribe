## Goal
Make the small "KABBALAH ASTROLOGY" / "Kabbalah Astrology" label at the top of the home page (`/`) and the spinning page (`/spinning`) appear 15% lighter.

## Current state
Both labels are rendered with the same inline style color:
- `src/routes/index.tsx` line 273: `color: "rgba(80, 105, 150, 0.35)"`
- `src/routes/spinning.tsx` line 52: `color: "rgba(80, 105, 150, 0.35)"`

## Change
Lighten the RGB by mixing 15% toward white (keep alpha at 0.35):
- 80 → 106, 105 → 128, 150 → 166
- New color: `rgba(106, 128, 166, 0.35)`

Update both occurrences only — no other styles, fonts, sizes, or copy change. The hidden placeholder label in `SkyShell.tsx` (opacity-0, used only for layout spacing on other pages) is out of scope.

## Files
- `src/routes/index.tsx` — update the header span color.
- `src/routes/spinning.tsx` — update the header span color.
