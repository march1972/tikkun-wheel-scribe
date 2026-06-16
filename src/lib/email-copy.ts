// ============================================================================
// EMAIL COPY — single source of truth for all user-facing email text.
// Edit any string here to update what recipients see. Do not add HTML/JSX —
// just plain text. {placeholders} are filled in by the templates.
// ============================================================================

export const EMAIL_COPY = {
  // ──────────────────────────────────────────────────────────────────────────
  // TIKKUN READING EMAIL — sent after someone submits the form
  // ──────────────────────────────────────────────────────────────────────────
  tikkunReading: {
    // Subject line shown in the inbox. {signName} = e.g. "Aries"
    subject: 'Your Tikkun reading — {signName}',

    // Hidden preview text (shown next to subject in most inboxes)
    preview: 'Your Tikkun reading — {signName}',

    // Small label above the sign name
    eyebrow: 'YOUR TIKKUN',

    // Greeting. {name} = recipient's first name (falls back to greetingFallback)
    greeting: 'Dear {name},',
    greetingFallback: 'Dear friend,',

    // Intro paragraph under the greeting (removed — body now starts directly with Tikkun text)
    intro: '',

    // Section headings
    tikkunHeading: '',
    mantraHeading: 'Your Daily Mantra (Kavanah)',

    // Button under the mantra
    ctaButton: 'Read your full Tikkun',

    // ── Waitlist block (shown when recipient opted in) ──
    waitlistOptedInHeading: 'Welcome to the Kabbalah Circle waitlist',
    waitlistOptedInBody:
      "Thank you for joining the Circle. You'll receive occasional notes with learnings, reflections, and an early invitation to the launch later this year, including any events or coaching programs.",

    // ── Waitlist block (shown when recipient did NOT opt in) ──
    waitlistInviteHeading: 'Go deeper with the Kabbalah Circle',
    waitlistInviteBody:
      "Want to receive occasional teachings and an early invitation to join the Kabbalah Circle? Join the waitlist — it's free and you can leave any time.",
    waitlistInviteLink: 'Join the waitlist →',

    // Footer signature
    footerSignoff: 'With love,',
    footerName: 'Marc — Kabbalah Circle',
    footerDomain: 'tikkun.kabbalahcircle.com',
  },


  // ──────────────────────────────────────────────────────────────────────────
  // WAITLIST WELCOME EMAIL — standalone waitlist confirmation
  // ──────────────────────────────────────────────────────────────────────────
  waitlistWelcome: {
    subject: 'Welcome to the Kabbalah Circle',
    preview: 'Welcome to the Kabbalah Circle waitlist',

    eyebrow: 'THE KABBALAH CIRCLE',

    // Heading. The word in {emphasis} is shown in gold italics.
    headingBefore: 'Welcome to the ',
    headingEmphasis: 'Circle',
    headingAfter: '.',

    body1:
      "Thank you for joining the Circle. You'll receive occasional notes with learnings, reflections, and an early invitation to the launch later this year, including any events or coaching programs.",
    body2:
      "Expect roughly one or two emails a month. No noise, no selling. You can leave any time with a single click at the bottom of any email.",

    ctaButton: 'Get your free Tikkun reading',

    footerSignoff: 'With love,',
    footerName: 'Marc — Kabbalah Circle',
    footerDomain: 'tikkun.kabbalahcircle.com',
  },
} as const

// Tiny helper to replace {placeholders} in a string.
export function fill(
  template: string,
  vars: Record<string, string | undefined | null>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key]
    return v == null ? '' : String(v)
  })
}
