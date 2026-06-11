# App Emails Plan — Kabbalah Circle

Two app emails, both linking back to the user's personal Tikkun reading.

## Sender identity (both emails)

- **From:** `Marc <marc@kabbalahcircle.com>` (visible address; root-domain display, sent through verified `notify.kabbalahcircle.com`)
- **Reply-To:** `hello@kabbalahcircle.com`
- Note: `hello@kabbalahcircle.com` must be a real mailbox or forward you can read; Lovable only sends mail, it doesn't receive replies.

## Email 1 — Tikkun Reading

**Trigger:** After successful `/snippet` form submit (`submitLead`).
**Recipient:** Email the user entered.

**Contents:**
- Warm greeting (uses `name` if provided).
- Their Tikkun sign: name + Hebrew name + Tikkun letter, with "North Node in <sign>, South Node in <sign>".
- Full **Your Spiritual Work (Tikkun)** copy from `spiritualWorkTikkun`.
- **Your Daily Mantra (Kavanah)** from `dailyMantra`.
- Primary CTA → personal reading deep link.
- **Conditional block:**
  - `newsletterOptIn === true` → "Thank you for joining the waitlist" + brief verbiage about Kabbalah Circle.
  - `newsletterOptIn === false` → simple link to `/history?subscribe=1` to join the waitlist.
- Footer: site link + unsubscribe (auto-appended).

**Idempotency key:** `tikkun-reading-${leadId}`.

## Email 2 — Waitlist Thank-You

**Trigger:** `subscribeNewsletter` from `/history` (standalone subscribers who didn't opt in at the reading step).

**Contents:**
- Thank-you for joining the waitlist.
- Brief verbiage on what they'll receive + cadence.
- CTA: if a prior `leads` row exists for this email → deep-link to their personal reading; otherwise link to `/form`.

**Idempotency key:** `waitlist-welcome-${email}`.

## Deep-link URL shape

```
https://tikkun.kabbalahcircle.com/reading/Aries?utm_source=email&utm_medium=tikkun_reading
```

Add `/reading/$sign` route that:
- Reads/normalizes the param, validates against `SIGNS`.
- Valid → renders full reading for that sign directly (bypasses DOB form).
- Invalid → redirects to `/form`.
- Per-sign `<head>` metadata (title, description, og:title, og:description) for shareable links.

Existing `/reading` (DOB-driven) stays unchanged.

## Implementation steps

1. **Scaffold app email infrastructure routes** — creates `/lovable/email/transactional/send`, preview, unsubscribe, suppression routes + `src/lib/email-templates/registry.ts`.
2. **Templates** in `src/lib/email-templates/`:
   - `tikkun-reading.tsx` — props: `name?`, `sign` (full TikkunSign), `siteUrl`, `readingUrl`, `optedIn: boolean`, `waitlistUrl`.
   - `waitlist-welcome.tsx` — props: `siteUrl`, `ctaUrl`, `ctaLabel`.
   - Brand: deep ink + gold accents, serif headings, white `Body` background, inline styles only.
   - Register both in `registry.ts`.
3. **Server-internal sender helper** at `src/lib/email/send-internal.server.ts` — renders a registered template, sets `from = "Marc <marc@kabbalahcircle.com>"` and `reply_to = "hello@kabbalahcircle.com"`, checks `suppressed_emails`, inserts `pending` row in `email_send_log`, then `supabaseAdmin.rpc('enqueue_email', { queue_name: 'transactional_emails', payload })`. Dedupes by `idempotencyKey` against `email_send_log.metadata`.
4. **Wire triggers** in `src/lib/lead.functions.ts`:
   - `submitLead` → after insert, enqueue Email 1 with full sign data + waitlist branch.
   - `subscribeNewsletter` → after upsert, query `leads` for most recent row by email; enqueue Email 2 with the right CTA URL.
   - Wrapped in try/catch so a send failure never breaks the form response.
5. **New route** `src/routes/reading.$sign.tsx` (validation + render + per-sign head metadata).
6. **Sign-name helper** in `src/data/tikkun-lookup.ts`: `toUrlSignSegment` (Title Case) / `fromUrlSignSegment` (lowercase id).

## Out of scope

- Auth emails (already scaffolded).
- Admin "new lead" notifications.
- Bulk newsletter blasts (Lovable is transactional only).
- Inbound email handling — `hello@kabbalahcircle.com` must be a real mailbox/forward you maintain at your DNS/registrar.
- Branded `/email/unsubscribe` page polish (later pass).

## Resolved

- Visible From: `Marc <marc@kabbalahcircle.com>`.
- Reply-To: `hello@kabbalahcircle.com`.
- Waitlist CTA in Email 1 (un-opted-in) = simple link to `/history?subscribe=1`.
