import 'dotenv/config'
import { enqueueAppEmail } from '@/lib/email/send-internal.server'
import { getReadingByDOB } from '@/data/tikkun-lookup'

const SITE_URL = 'https://tikkun.kabbalahcircle.com'
const dob = '1980-06-15'
const email = 'marc@shiftxp.com'
const name = 'Marc Test'
const optedIn = true

const r = getReadingByDOB(dob)
if (r.outOfRange) throw new Error('oor')
const sign = r.sign!

// Insert lead via admin
import('@/integrations/supabase/client.server').then(async ({ supabaseAdmin }) => {
  const { data: inserted, error } = await supabaseAdmin
    .from('leads')
    .insert({ name, dob, email, sign_id: sign.id, newsletter_opt_in: optedIn, source: 'test_script' })
    .select('id').single()
  if (error) throw error
  console.log('lead', inserted.id)

  const res = await enqueueAppEmail({
    templateName: 'tikkun-reading',
    recipientEmail: email,
    idempotencyKey: `tikkun-reading-${inserted.id}`,
    templateData: {
      name, signName: sign.signId, hebrewName: sign.hebrewName,
      tikkunLetterHebrew: sign.tikkunLetterHebrew, northNode: sign.northNode,
      southNode: sign.southNode, spiritualWorkTikkun: sign.spiritualWorkTikkun,
      dailyMantra: sign.dailyMantra,
      readingUrl: `${SITE_URL}/reading/${sign.signId}?utm_source=email&utm_medium=tikkun_reading`,
      siteUrl: SITE_URL, optedIn, waitlistUrl: `${SITE_URL}/history?subscribe=1`,
    },
  })
  console.log('email', res)

  const w = await enqueueAppEmail({
    templateName: 'waitlist-welcome',
    recipientEmail: email,
    idempotencyKey: `waitlist-welcome-${email.toLowerCase()}-test-${Date.now()}`,
    templateData: { siteUrl: SITE_URL, ctaUrl: `${SITE_URL}/reading/${sign.signId}?utm_source=email&utm_medium=tikkun_reading`, ctaLabel: 'Open your Tikkun reading' },
  })
  console.log('waitlist', w)
})
