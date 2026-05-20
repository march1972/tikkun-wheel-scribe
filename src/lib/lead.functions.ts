import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { lookupSignByDob } from "./tikkun-data";

const leadSchema = z.object({
  name: z.string().trim().max(120).optional().nullable(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().trim().email().max(255),
  newsletterOptIn: z.boolean().default(false),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.dob > today) {
      return { ok: false as const, error: "Date of birth cannot be in the future.", signId: null };
    }
    const sign = lookupSignByDob(data.dob);
    if (!sign) {
      return {
        ok: false as const,
        error: "That date is outside the lunar-node ranges (1901-2051).",
        signId: null,
      };
    }
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name || null,
      dob: data.dob,
      email: data.email,
      sign_id: sign.id,
      newsletter_opt_in: data.newsletterOptIn,
      source: "reading_form",
    });
    if (error) {
      console.error("lead insert failed", error);
      return { ok: false as const, error: "Could not save your reading. Please try again.", signId: null };
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
    return { ok: true as const, error: null };
  });
