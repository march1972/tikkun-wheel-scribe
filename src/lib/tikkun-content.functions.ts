// Public, unauthenticated server fn that returns the currently-active Tikkun content
// (the latest JSON activated via /admin), or null if none has been activated.
import { createServerFn } from "@tanstack/react-start";

export const getActiveTikkunContent = createServerFn({ method: "GET" }).handler(
  async () => {
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
    return {
      id: data.id as string,
      filename: data.filename as string,
      uploadedAt: data.uploaded_at as string,
      content: data.content as unknown,
    };
  },
);
