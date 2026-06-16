// Server-only helper that merges the bundled SIGNS with the currently active
// uploaded content (if any) for use in the email path and other server contexts.
import { SIGNS, type TikkunSign } from "@/data/tikkun-lookup";
import type { TikkunContentSign } from "./tikkun-content.functions";

export async function getMergedSigns(): Promise<TikkunSign[]> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("tikkun_content_versions")
      .select("content")
      .eq("is_active", true)
      .maybeSingle();
    if (error || !data) return SIGNS;
    const raw = data.content as unknown;
    const update = Array.isArray(raw) ? (raw as TikkunContentSign[]) : [];
    if (update.length === 0) return SIGNS;
    const byId = new Map<string, TikkunContentSign>(
      update.map((s) => [s.signId.toLowerCase(), s]),
    );
    return SIGNS.map((s) => {
      const u = byId.get(s.signId.toLowerCase());
      return u ? { ...s, ...u } : s;
    });
  } catch (e) {
    console.error("getMergedSigns failed; falling back to bundled SIGNS", e);
    return SIGNS;
  }
}

export async function getMergedSignById(id: string): Promise<TikkunSign | null> {
  const all = await getMergedSigns();
  return all.find((s) => s.id === id) ?? null;
}
