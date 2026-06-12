DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(event_name) <= 120
    AND (session_id IS NULL OR char_length(session_id) <= 120)
    AND (cta_id IS NULL OR char_length(cta_id) <= 120)
    AND (page IS NULL OR char_length(page) <= 500)
    AND (user_agent IS NULL OR char_length(user_agent) <= 500)
    AND pg_column_size(metadata) <= 4096
  );