There are two consecutive `<Hairline />` separators between the "Your Tikkun Letter" section and "Your Daily Mantra" section in `src/routes/reading.tsx` (lines ~395-397), which renders the duplicated stacked lines shown in the screenshot.

**Change:** Remove one of the two `<Hairline />` calls so only a single centered hairline appears between those sections. The remaining `<Hairline />` already centers itself (`margin: 0 auto`), so no alignment change is needed.

No other files or sections affected.