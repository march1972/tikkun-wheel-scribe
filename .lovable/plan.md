## Plan

On the `/reading` page, reorder two adjacent sections so that **Spread the Light** (share buttons: WhatsApp, Instagram, Copy link) appears **before** the **Tikkun Reflection** prompt.

### Current order
1. Reflection — "What’s one uncomfortable thing I can do this week..."
2. Hairline
3. Spread the Light — "Share your Tikkun with someone who needs to hear it." + buttons

### New order
1. Spread the Light — "Share your Tikkun with someone who needs to hear it." + buttons
2. Hairline
3. Reflection — "What’s one uncomfortable thing I can do this week..."

### Files changed
- `src/routes/reading.tsx` — move the Reflection `<Reveal>` block (including its preceding `<Hairline>`) to appear after the Share `<Reveal>` block. Only structural reordering; no content, styling, or import changes.