Spacing and rhythm fixes for the landing page, mobile-first. All edits in `src/routes/index.tsx`. Do NOT redesign the "What you receive" cards (visuals stay as-is).

## 1. Grid breakpoint for the cards section

Change the cards grid from `md:grid-cols-3` (768px) → `lg:grid-cols-3` (1024px). On the user's 747px viewport the cards stop being squeezed into three narrow columns and stack 1-col. No visual redesign of the cards themselves.

`gap-[clamp(1rem,2vw,1.5rem)]` → `gap-[clamp(1.25rem,2vw,1.5rem)]` so stacked cards get a touch more vertical breathing room.

## 2. Section vertical rhythm (page-wide)

Every content section currently uses `py-[clamp(6rem,12vh,9rem)]` — way too much air on mobile (12vh of a 600px viewport = 72px top + 72px bottom on already-short sections). Tighten:

`py-[clamp(6rem,12vh,9rem)]` → `py-[clamp(3.5rem,8vh,7rem)]`

Apply to the four content sections: What you receive, Ancient roots, Free will, and any sibling using the same clamp. Hero section unchanged.

## 3. Heading polish

- `What you receive.` → `What you receive` (drop trailing period — matches "Ancient roots" and "Influence, not prediction" which have no terminal punctuation).
- Add a quiet caption under the cards grid, centered, body font, `C_MUTED`, `mt-[clamp(1.5rem,3vh,2.5rem)]`, `text-sm`: *"Drawn from your birth chart."* — gives the section a foot before the seam.

## 4. Section seam fade

The bottom of "What you receive" cuts hard into the dark `C_BAND_DEEP` of "Ancient roots". Add a bottom inner-shadow fade on the "What you receive" section element:

```
boxShadow: "inset 0 -100px 100px -60px rgba(10,16,32,0.55)"
```

Soft dissolve, no visible band edge.

## 5. Heading → grid mobile spacing

`mt-[clamp(2rem,4vh,3rem)]` on the cards `<ul>` is fine on desktop but flat on mobile where the heading shrinks. Change to `mt-[clamp(2.5rem,5vh,3rem)]`.

## Files

- `src/routes/index.tsx` only.

## Out of scope

- Card visual redesign (per user)
- H2 secondary size tier (deferred)
