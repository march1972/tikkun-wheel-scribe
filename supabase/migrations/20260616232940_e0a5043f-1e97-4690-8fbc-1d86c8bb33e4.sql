CREATE POLICY "Admins read tikkun-content"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'tikkun-content' AND public.is_tikkun_admin());

CREATE POLICY "Admins write tikkun-content"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'tikkun-content' AND public.is_tikkun_admin());

CREATE POLICY "Admins update tikkun-content"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'tikkun-content' AND public.is_tikkun_admin())
  WITH CHECK (bucket_id = 'tikkun-content' AND public.is_tikkun_admin());

CREATE POLICY "Admins delete tikkun-content"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'tikkun-content' AND public.is_tikkun_admin());