// Admin-only server functions for managing Tikkun content versions.
// Gated by Supabase auth + email allowlist (enforced via RLS + has_role-style check here).
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAILS = new Set(["marc@shiftxp.com"]);
const BUCKET = "tikkun-content";

function assertAdmin(claims: Record<string, unknown> | undefined) {
  const email = String(claims?.email ?? "").toLowerCase();
  if (!ADMIN_EMAILS.has(email)) {
    throw new Error("Forbidden: admin access required");
  }
  return email;
}

const REQUIRED_FIELDS = [
  "signId",
  "spinSnippet",
  "quote",
  "shadowGilgul",
  "shadowArchetype",
  "spiritualWorkTikkun",
  "tikkunLetterFull",
  "dailyMantra",
] as const;

const EXPECTED_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

interface ValidationResult {
  ok: boolean;
  errors: string[];
  signs?: Array<Record<string, string>>;
}

function validateContent(parsed: unknown): ValidationResult {
  const errors: string[] = [];
  if (!Array.isArray(parsed)) {
    return { ok: false, errors: ["Top-level JSON must be an array of 12 sign objects."] };
  }
  if (parsed.length !== 12) {
    errors.push(`Expected exactly 12 signs, got ${parsed.length}.`);
  }
  const seen = new Set<string>();
  const normalized: Array<Record<string, string>> = [];
  parsed.forEach((row, i) => {
    if (!row || typeof row !== "object") {
      errors.push(`Entry #${i + 1}: not an object.`);
      return;
    }
    const obj = row as Record<string, unknown>;
    const item: Record<string, string> = {};
    for (const f of REQUIRED_FIELDS) {
      const v = obj[f];
      if (typeof v !== "string" || v.trim().length === 0) {
        errors.push(`Entry #${i + 1} (${String(obj.signId ?? "?")}) is missing or empty required field: ${f}`);
      } else {
        item[f] = v;
      }
    }
    if (typeof obj.signId === "string") {
      const sid = obj.signId.trim();
      if (seen.has(sid.toLowerCase())) errors.push(`Duplicate signId: ${sid}`);
      seen.add(sid.toLowerCase());
    }
    normalized.push(item);
  });
  for (const s of EXPECTED_SIGNS) {
    if (!seen.has(s.toLowerCase())) errors.push(`Missing sign: ${s}`);
  }
  return { ok: errors.length === 0, errors, signs: normalized };
}

export const adminListVersions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    assertAdmin(context.claims as Record<string, unknown>);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("tikkun_content_versions")
      .select("id, filename, storage_path, notes, is_active, uploaded_at")
      .order("uploaded_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      id: r.id as string,
      filename: r.filename as string,
      storagePath: r.storage_path as string,
      notes: (r.notes ?? null) as string | null,
      isActive: Boolean(r.is_active),
      uploadedAt: r.uploaded_at as string,
    }));
  });

const uploadSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(500).optional().nullable(),
  contentText: z.string().min(2).max(2_000_000), // ~2 MB
  activate: z.boolean().default(false),
});

export const adminUploadVersion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => uploadSchema.parse(input))
  .handler(async ({ data, context }) => {
    assertAdmin(context.claims as Record<string, unknown>);
    let parsed: unknown;
    try {
      parsed = JSON.parse(data.contentText);
    } catch (e) {
      return { ok: false as const, errors: [`Invalid JSON: ${(e as Error).message}`] };
    }
    const v = validateContent(parsed);
    if (!v.ok) return { ok: false as const, errors: v.errors };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${ts}__${safeName}`;
    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(storagePath, new Blob([data.contentText], { type: "application/json" }), {
        contentType: "application/json",
        upsert: false,
      });
    if (upErr) return { ok: false as const, errors: [`Storage upload failed: ${upErr.message}`] };

    const { data: row, error: insErr } = await supabaseAdmin
      .from("tikkun_content_versions")
      .insert({
        filename: data.filename,
        storage_path: storagePath,
        content: parsed as object,
        notes: data.notes ?? null,
        uploaded_by: context.userId,
        is_active: false,
      })
      .select("id")
      .single();
    if (insErr || !row) {
      await supabaseAdmin.storage.from(BUCKET).remove([storagePath]);
      return { ok: false as const, errors: [`DB insert failed: ${insErr?.message ?? "unknown"}`] };
    }

    if (data.activate) {
      await supabaseAdmin
        .from("tikkun_content_versions")
        .update({ is_active: false })
        .eq("is_active", true);
      const { error: actErr } = await supabaseAdmin
        .from("tikkun_content_versions")
        .update({ is_active: true })
        .eq("id", row.id);
      if (actErr) return { ok: false as const, errors: [`Activation failed: ${actErr.message}`] };
    }
    return { ok: true as const, id: row.id as string };
  });

export const adminActivateVersion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    assertAdmin(context.claims as Record<string, unknown>);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("tikkun_content_versions")
      .update({ is_active: false })
      .eq("is_active", true);
    const { error } = await supabaseAdmin
      .from("tikkun_content_versions")
      .update({ is_active: true })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminDeleteVersion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    assertAdmin(context.claims as Record<string, unknown>);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("tikkun_content_versions")
      .select("storage_path, is_active")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) return { ok: false as const, error: "Not found" };
    if (row.is_active) return { ok: false as const, error: "Cannot delete the active version. Activate another version first." };
    await supabaseAdmin.storage.from(BUCKET).remove([row.storage_path as string]);
    const { error } = await supabaseAdmin
      .from("tikkun_content_versions")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminWhoAmI = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const claims = context.claims as Record<string, unknown>;
    const email = String(claims?.email ?? "").toLowerCase();
    return {
      email,
      isAdmin: ADMIN_EMAILS.has(email),
      userId: context.userId,
    };
  });
