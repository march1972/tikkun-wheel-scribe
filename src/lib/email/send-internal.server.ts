// Server-only helper used by public form triggers (no Supabase JWT available).
// Renders a registered template and enqueues it on the transactional_emails queue.
// Sets From = "Kabbala Circle <kabbala-circle@kabbalahcircle.com>" and Reply-To = "kabbala-circle@kabbalahcircle.com".
import * as React from 'react'
import { render as renderAsync } from '@react-email/render'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Kabbalah Circle'
const SENDER_DOMAIN = 'notify.kabbalahcircle.com'
const FROM = 'Marc <marc@kabbalahcircle.com>'
const REPLY_TO = 'marc@kabbalahcircle.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  return `${local[0]}***@${domain}`
}

export interface EnqueueAppEmailArgs {
  templateName: string
  recipientEmail: string
  idempotencyKey: string
  templateData?: Record<string, any>
}

export interface EnqueueAppEmailResult {
  ok: boolean
  reason?: 'suppressed' | 'duplicate' | 'template_not_found' | 'enqueue_failed' | 'render_failed'
}

/**
 * Render and enqueue a transactional app email. Never throws — designed to be
 * called from public form handlers where send failure must not break the
 * user-facing response. All failures are logged and returned in `reason`.
 */
export async function enqueueAppEmail(
  args: EnqueueAppEmailArgs,
): Promise<EnqueueAppEmailResult> {
  const { templateName, recipientEmail, idempotencyKey, templateData = {} } = args
  const normalized = recipientEmail.trim().toLowerCase()
  const messageId = idempotencyKey // human-readable, also acts as dedupe key

  const template = TEMPLATES[templateName]
  if (!template) {
    console.error('[enqueueAppEmail] template not found', { templateName })
    return { ok: false, reason: 'template_not_found' }
  }

  try {
    // 1) Dedupe by idempotency key (message_id)
    const { data: existing } = await supabaseAdmin
      .from('email_send_log')
      .select('id')
      .eq('message_id', messageId)
      .limit(1)
      .maybeSingle()
    if (existing) {
      return { ok: false, reason: 'duplicate' }
    }

    // 2) Suppression check
    const { data: suppressed } = await supabaseAdmin
      .from('suppressed_emails')
      .select('id')
      .eq('email', normalized)
      .maybeSingle()
    if (suppressed) {
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: templateName,
        recipient_email: normalized,
        status: 'suppressed',
      })
      return { ok: false, reason: 'suppressed' }
    }

    // 3) Get or create unsubscribe token (one per email)
    let unsubscribeToken: string
    const { data: tokenRow } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', normalized)
      .maybeSingle()
    if (tokenRow?.token && !tokenRow.used_at) {
      unsubscribeToken = tokenRow.token
    } else {
      unsubscribeToken = generateToken()
      await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .upsert(
          { email: normalized, token: unsubscribeToken },
          { onConflict: 'email', ignoreDuplicates: true },
        )
      const { data: reread } = await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .select('token')
        .eq('email', normalized)
        .maybeSingle()
      if (reread?.token) unsubscribeToken = reread.token
    }

    // 4) Render
    let html: string
    let text: string
    try {
      const element = React.createElement(template.component, templateData)
      html = await renderAsync(element)
      text = await renderAsync(element, { plainText: true })
    } catch (err) {
      console.error('[enqueueAppEmail] render failed', { templateName, err })
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: templateName,
        recipient_email: normalized,
        status: 'failed',
        error_message: 'Render failed',
      })
      return { ok: false, reason: 'render_failed' }
    }

    const subject =
      typeof template.subject === 'function'
        ? template.subject(templateData)
        : template.subject

    // 5) Log pending, then enqueue
    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: normalized,
      status: 'pending',
    })

    const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: recipientEmail,
        from: FROM,
        reply_to: REPLY_TO,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: templateName,
        idempotency_key: idempotencyKey,
        unsubscribe_token: unsubscribeToken,
        site_name: SITE_NAME,
        queued_at: new Date().toISOString(),
      },
    })

    if (enqueueError) {
      console.error('[enqueueAppEmail] enqueue failed', {
        templateName,
        error: enqueueError,
        recipient_redacted: redactEmail(normalized),
      })
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: templateName,
        recipient_email: normalized,
        status: 'failed',
        error_message: 'Failed to enqueue email',
      })
      return { ok: false, reason: 'enqueue_failed' }
    }

    return { ok: true }
  } catch (err) {
    console.error('[enqueueAppEmail] unexpected error', {
      templateName,
      err,
      recipient_redacted: redactEmail(normalized),
    })
    return { ok: false, reason: 'enqueue_failed' }
  }
}
