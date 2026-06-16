REVOKE EXECUTE ON FUNCTION public.is_tikkun_admin() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_tikkun_admin() TO service_role;