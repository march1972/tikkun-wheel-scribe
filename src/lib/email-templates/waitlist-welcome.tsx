import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface WaitlistWelcomeProps {
  siteUrl: string
  ctaUrl: string
  ctaLabel: string
}

export const WaitlistWelcomeEmail = ({
  siteUrl = 'https://tikkun.kabbalahcircle.com',
  ctaUrl = 'https://tikkun.kabbalahcircle.com/form',
  ctaLabel = 'Get your free Tikkun reading',
}: WaitlistWelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to the Kabbalah Circle waitlist</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: 'center' }}>
          <Text style={eyebrow}>THE KABBALAH CIRCLE</Text>
          <Heading style={h1}>
            Welcome to the <em style={{ color: '#8a6a1f' }}>Circle</em>.
          </Heading>
        </Section>

        <Hr style={hr} />

        <Text style={body}>
          Thank you for joining the Kabbalah Circle waitlist. You'll receive
          occasional notes from Marc — short teachings on Kabbalah, reflections
          on the spiritual work of becoming, and an early invitation when our
          group programs and coaching open up.
        </Text>
        <Text style={body}>
          Expect roughly one or two emails a month. No noise, no selling. You
          can leave any time with a single click at the bottom of any email.
        </Text>

        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
          <Button style={button} href={ctaUrl}>
            {ctaLabel}
          </Button>
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          With light,
          <br />
          Marc — Kabbalah Circle
          <br />
          <Link href={siteUrl} style={footerLink}>
            tikkun.kabbalahcircle.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WaitlistWelcomeEmail

export const template = {
  component: WaitlistWelcomeEmail,
  subject: 'Welcome to the Kabbalah Circle',
  displayName: 'Waitlist welcome',
  previewData: {
    siteUrl: 'https://tikkun.kabbalahcircle.com',
    ctaUrl: 'https://tikkun.kabbalahcircle.com/form',
    ctaLabel: 'Get your free Tikkun reading',
  },
} satisfies TemplateEntry

const C_INK = '#1a1a1a'
const C_SOFT = '#3a3a3a'
const C_GOLD = '#8a6a1f'
const C_RULE = '#e5dfd1'
const C_DEEP = '#0f1729'

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: C_INK,
}
const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 28px',
}
const eyebrow: React.CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: C_GOLD,
  fontSize: '11px',
  letterSpacing: '0.32em',
  margin: '0 0 12px',
  fontWeight: 600,
}
const h1: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '40px',
  color: C_INK,
  margin: '0',
  fontWeight: 400,
  letterSpacing: '-0.01em',
}
const hr: React.CSSProperties = {
  border: 'none',
  borderTop: `1px solid ${C_RULE}`,
  margin: '28px 0',
}
const body: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.75,
  color: C_SOFT,
  margin: '0 0 14px',
}
const button: React.CSSProperties = {
  backgroundColor: C_DEEP,
  color: '#fdf6e6',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  padding: '14px 28px',
  textDecoration: 'none',
  fontWeight: 600,
}
const footer: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.7,
  color: C_SOFT,
  textAlign: 'center',
  margin: '0',
}
const footerLink: React.CSSProperties = {
  color: C_GOLD,
  textDecoration: 'none',
}
