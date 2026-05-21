# Site-wide font consistency + /reading duplicate header

## Root cause (why earlier "font" edits had no visible effect)

`src/styles.css` contains a global override that forces every text element on every page to monospace + ultra-thin, regardless of inline `fontFamily` styles:

```css
html, body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, ...;
  font-weight: 100;
}

h1, h2, h3, h4, h5, h6, p, span, a, button, li, em, strong {
  font-family: inherit !important;
  font-weight: 100 !important;
}
```

The `!important` rules beat every `style={{ fontFamily: HEAD }}` / `BODY` inline style in the codebase (index, snippet, history, reading, spinning, form, terms, privacy — all of them). That's why nothing previously "took" — including the Terms page, which is actually rendering in monospace today, not Fraunces. Confirmed via screenshot: the homepage hero "Reveal your Tikkun", the wheel's "ENTER" label, body copy, and CTA all render in monospace.

## What I'll change (CSS only, no content edits)

Edit `src/styles.css`:

1. Change `html, body` default `font-family` from `ui-monospace, …` to `var(--font-sans)` (General Sans), and remove the forced `font-weight: 100`.
2. Delete the `h1, h2, … strong { font-family: inherit !important; font-weight: 100 !important; }` block entirely so inline `fontFamily: HEAD` (Fraunces) and `fontFamily: BODY` (General Sans) actually apply.
3. Keep the top header chip "KABBALAH ASTROLOGY" in General Sans uppercase as it is today — it already uses `fontFamily: BODY` inline, so it stays consistent.

That single file change makes every page match the Terms/Privacy spec automatically (since every route already uses the same `HEAD` / `BODY` tokens from `src/lib/landing-style.ts`).

## Per-page audit after the CSS fix

After the override is removed I will visually QA each route at desktop (1366) and mobile (390):

- `/` — hero "Reveal your Tikkun" in Fraunces; body in General Sans; CTA pill unchanged.
- `/spinning` — heading in Fraunces; "Searching Tikkun patterns…" in General Sans uppercase.
- `/snippet` — Hebrew letter (Fraunces), snippet body (General Sans), inline form labels (General Sans uppercase tracking), "See your actual Tikkun chart" heading in Fraunces.
- `/reading` — eyebrow, mantra quote, archetype lines, daily mantra in Fraunces italic; section headers + body in General Sans.
- `/history` — H1 + "Go deeper" in Fraunces; body + newsletter form in General Sans.
- `/terms`, `/privacy` — already the visual target; verify nothing regresses.
- `/form` — redirect-only, no UI, nothing to do.

No copy, layout, spacing, color, or component changes — only the global font override is removed.

## /reading duplicate "Kabbalah Astrology"

Searching the codebase, the only on-screen "Kabbalah Astrology" text on `/reading` comes from the shared `SkyShell` header (`src/components/landing/SkyShell.tsx`, the small chip at the very top-left). There is no second literal occurrence in `reading.tsx`.

Possibilities for what you're seeing as a duplicate:
- The browser tab title "Your Tikkun Reading — Kabbalah Astrology" alongside the on-page chip.
- The share blurb sentence ("…in Kabbalah Astrology") inside the Share section.
- A different page (e.g. `/history` body copy starts with "Kabbalah Astrology dates back to Abraham…").

Rather than guess and delete the wrong thing, I'll ask you to point at it once the font fix is live — a screenshot or "the one in the [section name] section" is enough.

## Files touched

- `src/styles.css` — only file edited.

## Out of scope

- No content / copy / editorial changes.
- No layout, spacing, color, or component changes.
- No route or navigation changes.
