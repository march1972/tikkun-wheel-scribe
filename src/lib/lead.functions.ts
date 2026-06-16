import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getReadingByDOB, OUT_OF_RANGE_MESSAGE, SIGNS } from "@/data/tikkun-lookup";
import { enqueueAppEmail } from "@/lib/email/send-internal.server";

const SITE_URL = "https://tikkun.kabbalahcircle.com";

function readingUrlForSign(signId: string): string {
  const sign = SIGNS.find((s) => s.id === signId);
  const seg = sign ? sign.signId : signId;
  return `${SITE_URL}/reading/${seg}?utm_source=email&utm_medium=tikkun_reading`;
}

const leadSchema = z.object({
  name: z.string().trim().max(120).optional().nullable(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().trim().email().max(255),
  newsletterOptIn: z.boolean().default(false),
  sessionId: z.string().min(8).max(64).regex(/^[a-zA-Z0-9_-]+$/).optional().nullable(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.dob > today) {
      return { ok: false as const, error: "Date of birth cannot be in the future.", signId: null };
    }
    const result = getReadingByDOB(data.dob);
    if (result.outOfRange) {
      return { ok: false as const, error: OUT_OF_RANGE_MESSAGE, signId: null };
    }
    const sign = result.sign;
    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name || null,
        dob: data.dob,
        email: data.email,
        sign_id: sign.id,
        newsletter_opt_in: data.newsletterOptIn,
        source: "reading_form",
        session_id: data.sessionId ?? null,
      })
      .select("id")
      .single();
    if (error || !inserted) {
      console.error("lead insert failed", error);
      return { ok: false as const, error: "Could not save your reading. Please try again.", signId: null };
    }

    // Fire-and-forget Tikkun reading email. Never block / break the form.
    try {
      const { getMergedSignById } = await import("@/lib/tikkun-content.server");
      const liveSign = (await getMergedSignById(sign.id)) ?? sign;
      await enqueueAppEmail({
        templateName: "tikkun-reading",
        recipientEmail: data.email,
        idempotencyKey: `tikkun-reading-${inserted.id}`,
        templateData: {
          name: data.name || null,
          signName: liveSign.signId,
          hebrewName: liveSign.hebrewName,
          tikkunLetterHebrew: liveSign.tikkunLetterHebrew,
          northNode: liveSign.northNode,
          southNode: liveSign.southNode,
          spiritualWorkTikkun: liveSign.spiritualWorkTikkun,
          dailyMantra: liveSign.dailyMantra,
          readingUrl: readingUrlForSign(liveSign.id),
          siteUrl: SITE_URL,
          optedIn: data.newsletterOptIn,
          waitlistUrl: `${SITE_URL}/history?subscribe=1`,
        },
      });
    } catch (e) {
      console.error("tikkun email enqueue failed", e);
    }

    // Record server-side analytics event for funnel attribution.
    if (data.sessionId) {
      try {
        await supabaseAdmin.from("analytics_events").insert({
          session_id: data.sessionId,
          event_name: "lead_submitted",
          page: "/snippet",
          cta_id: "reveal_my_free_reading",
          metadata: { lead_id: inserted.id, sign_id: sign.id, newsletter_opt_in: data.newsletterOptIn },
        });
      } catch (e) {
        console.error("analytics lead_submitted insert failed", e);
      }
    }

    return { ok: true as const, error: null, signId: sign.id };
  });

const subSchema = z.object({ email: z.string().trim().email().max(255) });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) => subSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert({ email: data.email, source: "history_page" }, { onConflict: "email" });
    if (error) {
      console.error("newsletter sub failed", error);
      return { ok: false as const, error: "Could not subscribe — please try again." };
    }

    // Look up most recent lead for this email to deep-link the CTA to their reading.
    let ctaUrl = `${SITE_URL}/form`;
    let ctaLabel = "Get your free Tikkun reading";
    try {
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("sign_id")
        .eq("email", data.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lead?.sign_id) {
        ctaUrl = readingUrlForSign(lead.sign_id);
        ctaLabel = "Open your Tikkun reading";
      }
    } catch (e) {
      console.error("lead lookup for welcome email failed", e);
    }

    try {
      await enqueueAppEmail({
        templateName: "waitlist-welcome",
        recipientEmail: data.email,
        idempotencyKey: `waitlist-welcome-${data.email.toLowerCase()}`,
        templateData: { siteUrl: SITE_URL, ctaUrl, ctaLabel },
      });
    } catch (e) {
      console.error("waitlist email enqueue failed", e);
    }

    return { ok: true as const, error: null };
  });
