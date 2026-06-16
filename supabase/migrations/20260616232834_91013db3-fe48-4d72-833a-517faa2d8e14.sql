
-- Admin allowlist check (email-based)
CREATE OR REPLACE FUNCTION public.is_tikkun_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce((auth.jwt() ->> 'email'), '')) = ANY (ARRAY['marc@shiftxp.com']);
$$;

GRANT EXECUTE ON FUNCTION public.is_tikkun_admin() TO authenticated, anon, service_role;

-- Versions table
CREATE TABLE public.tikkun_content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  storage_path text NOT NULL,
  content jsonb NOT NULL,
  notes text,
  is_active boolean NOT NULL DEFAULT false,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX tikkun_content_versions_one_active
  ON public.tikkun_content_versions (is_active)
  WHERE is_active = true;

CREATE INDEX tikkun_content_versions_uploaded_at_idx
  ON public.tikkun_content_versions (uploaded_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.tikkun_content_versions TO authenticated;
GRANT ALL ON public.tikkun_content_versions TO service_role;

ALTER TABLE public.tikkun_content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view versions"
  ON public.tikkun_content_versions FOR SELECT
  TO authenticated
  USING (public.is_tikkun_admin());

CREATE POLICY "Admins can insert versions"
  ON public.tikkun_content_versions FOR INSERT
  TO authenticated
  WITH CHECK (public.is_tikkun_admin());

CREATE POLICY "Admins can update versions"
  ON public.tikkun_content_versions FOR UPDATE
  TO authenticated
  USING (public.is_tikkun_admin())
  WITH CHECK (public.is_tikkun_admin());

CREATE POLICY "Admins can delete versions"
  ON public.tikkun_content_versions FOR DELETE
  TO authenticated
  USING (public.is_tikkun_admin());
