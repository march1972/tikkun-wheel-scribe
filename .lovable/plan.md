# Boost signup conversion on the final-spin screen

Recommendations grounded in proven landing-page / opt-in conversion principles (Cialdini persuasion, CXL form research, Unbounce benchmarks). Below is what to change, why, and where.

## 1. Lead with the outcome, not the offer

Current H1: "Get your real Tikkun." Reads like a task. Users opt in for *transformation*, not deliverables.

Change to outcome-led, curiosity-loaded:
- "Discover the pattern your soul came here to heal."
- Sub: "Your free personal Tikkun reading + 10-page workbook — in your inbox in 60 seconds."

The sub does the work the deliverable list used to: names the gift, sets expectation of speed, removes friction.

## 2. Cut form fields to the absolute minimum

Every extra field drops conversion ~10% (HubSpot, Unbounce). Right now: DOB + Email (+ optional name).

Options, strongest first:
- **Email only on this screen.** Capture DOB on the *next* screen ("Last step — your birth date unlocks the chart"). Two-step forms convert 30–60% higher because the first micro-commitment makes the second feel inevitable.
- If DOB must stay here: drop the name field entirely (already optional → delete), and place Email *above* DOB. Email is the lowest-friction field; leading with it builds momentum.

## 3. Rewrite the CTA button

"Reveal my Tikkun" is good — keep the verb. Strengthen with first-person + benefit:
- "Show me my Tikkun →"
- or "Send my free reading →"

First-person ("my") lifts CTR 25%+ in repeated tests (Michael Aagaard / Unbounce).

## 4. Move trust signals *above* the button, not below

Current: bullets "Free workbook / 60-second reading / No spam" sit under the button. Users decide *before* clicking. Move directly under the email field. Keep them mono + muted so they don't compete with CTA.

Add one piece of social proof above the form:
- "Joined by 3,200+ seekers this month" (only if true)
- or a single short testimonial: "I cried reading mine. — Sarah, NYC"

Real numbers beat adjectives.

## 5. Tighten visual hierarchy

Order from top to bottom should be:
1. Headline (outcome)
2. One-line sub (what they get + speed)
3. Social proof (one line)
4. Email field
5. (DOB field, if kept)
6. Trust bullets (✓ free ✓ instant ✓ no spam)
7. Big red CTA
8. Tiny privacy reassurance ("We'll never share your email.")

The CTA should be the visually heaviest element on screen. Currently the form fields and CTA have similar weight — increase CTA padding and add a subtle pulse/glow animation on idle.

## 6. Remove the "Kabbalah Astrology" eyebrow on this screen

Already done. Keep it gone — the final step should feel singular, not branded chrome.

## 7. Add scarcity / urgency only if honest

Avoid fake countdowns. Honest framing that works:
- "Your spin result expires when you leave this page."
- Auto-fill the form from any data captured in earlier spins so the user doesn't re-type.

## 8. Mobile-first polish

Viewport is 713×631 — fold is tight. After changes, the headline + sub + email + CTA must all sit above the fold without scrolling. Move DOB (if kept) below the fold or to step 2.

## 9. Loading state = momentum, not friction

Current button text "Revealing…" is good. Add a 1-second shimmer/progress to make the wait feel earned ("Reading your chart…" → "Preparing your workbook…").

---

## Suggested implementation order (smallest wins first)

1. Rewrite H1 + sub (5 min, biggest copy lift).
2. Remove name field, reorder Email above DOB, move trust bullets above CTA (10 min).
3. Rewrite CTA to "Show me my Tikkun →" (1 min).
4. Add one social-proof line above form (5 min).
5. **Bigger lift:** split into 2-step form (email first, DOB on next micro-screen). Highest expected conversion gain.

## Technical scope

All changes are in `src/routes/snippet.tsx` (final-spin branch, lines ~101–192). No backend changes for items 1–4. The 2-step form (item 5) needs a second local state ("step 1" / "step 2") inside the same component — no new routes.
