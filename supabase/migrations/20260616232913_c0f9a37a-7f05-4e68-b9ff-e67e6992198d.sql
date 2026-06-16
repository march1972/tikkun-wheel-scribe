CREATE OR REPLACE FUNCTION public.is_tikkun_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT lower(coalesce((auth.jwt() ->> 'email'), '')) = ANY (ARRAY['marc@shiftxp.com']);
$$;
GRANT EXECUTE ON FUNCTION public.is_tikkun_admin() TO authenticated, service_role;