-- Tighten INSERT policies with validation (replace WITH CHECK true)
DROP POLICY IF EXISTS "anyone can insert lead" ON public.leads;
CREATE POLICY "anyone can insert valid lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND char_length(email) <= 255
  AND (name IS NULL OR char_length(name) <= 120)
  AND char_length(sign_id) <= 64
  AND dob >= DATE '1901-01-01'
  AND dob <= CURRENT_DATE
);

DROP POLICY IF EXISTS "anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "anyone can subscribe valid email"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND char_length(email) <= 255
  AND char_length(source) <= 64
);

-- Explicitly restrict reads: no anon/authenticated SELECT policies exist; only service_role can read.
-- Revoke any default SELECT grants from anon/authenticated to be safe.
REVOKE SELECT ON public.leads FROM anon, authenticated;
REVOKE SELECT ON public.newsletter_subscribers FROM anon, authenticated;
GRANT SELECT ON public.leads TO service_role;
GRANT SELECT ON public.newsletter_subscribers TO service_role;