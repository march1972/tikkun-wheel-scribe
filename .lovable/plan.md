## Status

`notify.kabbalahcircle.com` is now **DNS verified** ✅ — emails are ready to flow as soon as the queue processor (pg_cron job) is wired up.

## Plan

1. **Re-run email infrastructure setup** — this is the safe/idempotent step that:
   - Creates the pgmq queues (`auth_emails`, `transactional_emails`) if missing
   - Creates the `email_send_log`, `email_send_state`, `suppressed_emails`, `email_unsubscribe_tokens` tables if missing
   - Registers the `process-email-queue` pg_cron job pointing at `/lovable/email/queue/process` (the route already exists in the codebase)
   - Refreshes the Vault secret used by the cron job to authenticate

2. **Verify** the cron job is registered and the queue processor route is reachable.

3. **Report back** with what's now live and what (if anything) still needs your action.

## What this does NOT change

- No edits to the existing `notify.kabbalahcircle.com` DNS
- No edits to your site code, routes, or pages
- No new subdomain — the visible "From" address can still be `something@kabbalahcircle.com` later when we scaffold a specific email (auth or transactional)

## After this

Once the cron is wired, you'll be able to:
- Scaffold branded **auth emails** (signup, password reset, magic link) — optional
- Scaffold **transactional emails** (order confirmations, notifications, etc.) — when you have a specific email to send

Want me to proceed?