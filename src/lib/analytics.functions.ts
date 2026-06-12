import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getRequestHeader } from "@tanstack/react-start/server";

const eventSchema = z.object({
  sessionId: z.string().min(8).max(64).regex(/^[a-zA-Z0-9_-]+$/),
  eventName: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_.-]+$/),
  page: z.string().max(128).optional().nullable(),
  ctaId: z.string().max(64).optional().nullable(),
  metadata: z.record(z.string().max(64), z.any()).optional().nullable(),
});

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((input) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const ua = getRequestHeader("user-agent")?.slice(0, 500) ?? null;
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      session_id: data.sessionId,
      event_name: data.eventName,
      page: data.page ?? null,
      cta_id: data.ctaId ?? null,
      metadata: data.metadata ?? {},
      user_agent: ua,
    });
    if (error) {
      console.error("analytics insert failed", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
