# Plan: Snippet form spacing & date-input polish

All changes in `src/routes/snippet.tsx`.

1. **More space between fields** — change form `gap-3` → `gap-5` so name/email/dob fields breathe.

2. **More space above red CTA** — bump button `mt-2` → `mt-6` (plus the form gap) so the submit pill sits clearly apart from the newsletter checkbox.

3. **Date input greys** — the native `<input type="date">` shows `mm/dd/yyyy` and the calendar icon in default black. Match the placeholder grey used by name/email by:
   - Adding a CSS rule (scoped via a small `<style>` block in the route, or inline targeting `#dob`) so:
     - `#dob::-webkit-datetime-edit-text`, `::-webkit-datetime-edit-month-field`, `::-webkit-datetime-edit-day-field`, `::-webkit-datetime-edit-year-field` → use the muted ink colour `rgba(236,227,207,0.45)` when empty (matches placeholder).
     - `#dob::-webkit-calendar-picker-indicator` → `filter: invert(0.7) opacity(0.5)` so the icon reads as soft grey on the dark field.
   - Once a date is chosen, the text shifts to the normal `C_INK` colour for legibility.

No other files touched.