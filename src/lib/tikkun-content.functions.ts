// Public, unauthenticated server fn that returns the currently-active Tikkun content
// (the latest JSON activated via /admin), or null if none has been activated.
import { createServerFn } from "@tanstack/react-start";

export interface TikkunContentSign {
  signId: string;
  spinSnippet?: string;
  quote?: string;
  shadowGilgul?: string;
  shadowArchetype?: string;
  spiritualWorkTikkun?: string;
  tikkunLetterFull?: string;
  dailyMantra?: string;
}

export interface ActiveTikkunContent {
  id: string;
  filename: string;
  uploadedAt: string;
  signs: TikkunContentSign[];
}

export const getActiveTikkunContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<ActiveTikkunContent | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("tikkun_content_versions")
      .select("id, filename, content, uploaded_at")
      .eq("is_active", true)
      .maybeSingle();
    if (error) {
      console.error("getActiveTikkunContent error", error);
      return null;
    }
    if (!data) return null;
    const raw = data.content as unknown;
    const signs = Array.isArray(raw) ? (raw as TikkunContentSign[]) : [];
    return {
      id: data.id as string,
      filename: data.filename as string,
      uploadedAt: data.uploaded_at as string,
      signs,
    };
  },
);
