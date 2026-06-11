## Goal

On `/reading`, remove the existing "Go Deeper" closing section (gold label + "Find fulfilment…" headline + Go deeper CTA) and replace it with the Zohar pull quote and "The Kabbalah Circle" newsletter signup, copied verbatim (content + formatting) from `/history`.

## Changes — `src/routes/reading.tsx`

1. **Add imports**:
   - `useServerFn` from `@tanstack/react-start`
   - `useState` already imported
   - `subscribeNewsletter` from `@/lib/lead.functions`
   - `C_RULE_SOFT` from `@/lib/landing-style`

2. **Add newsletter state inside `ReadingPage`**:
   ```ts
   const subscribe = useServerFn(subscribeNewsletter);
   const [email, setEmail] = useState("");
   const [state, setState] = useState<"idle"|"busy"|"done"|"error">("idle");
   const [err, setErr] = useState<string|null>(null);
   const onSubmit = async (e) => { ... } // identical to /history
   ```

3. **Remove**: the final `<Reveal>` Closing section (the one rendering `headers[7]` "Go Deeper", `sc.deeperSub`, and the `PrimaryCTA` to `/history`) along with its preceding `<Hairline />`.

4. **Insert in its place** the two `<Reveal>` blocks copied verbatim from `/history`:
   - Pull quote section (Zohar quote)
   - Newsletter section (THE KABBALAH CIRCLE / Go deeper. / paragraph / email form / JOIN WAITLIST button)

   Both blocks keep their exact styling (`borderTop: 1px solid C_RULE_SOFT`, paddings, fonts, colors, success state).

5. **Leave untouched**: everything above the Share section's buttons, including the Share section itself.

No changes to `/history`, `reading-copy.ts`, or any other file. No new dependencies.
