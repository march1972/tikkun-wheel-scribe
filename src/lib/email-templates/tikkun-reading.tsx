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

interface TikkunReadingProps {
  name?: string | null
  signName: string
  hebrewName: string
  tikkunLetterHebrew: string
  northNode: string
  southNode: string
  spiritualWorkTikkun: string
  dailyMantra: string
  readingUrl: string
  siteUrl: string
  optedIn: boolean
  waitlistUrl: string
}

const splitParas = (text: string) =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

export const TikkunReadingEmail = ({
  name,
  signName = 'Aries',
  hebrewName = 'Taleh',
  tikkunLetterHebrew = 'ה',
  northNode = 'Aries',
  southNode = 'Libra',
  spiritualWorkTikkun = 'Your Tikkun is to step into independent action — to lead, to begin, to risk being first.',
  dailyMantra = 'I act with courage, without waiting for permission.',
  readingUrl = 'https://tikkun.kabbalahcircle.com/reading',
  siteUrl = 'https://tikkun.kabbalahcircle.com',
  optedIn = false,
  waitlistUrl = 'https://tikkun.kabbalahcircle.com/history?subscribe=1',
}: TikkunReadingProps) => {
  const greetingName = (name ?? '').trim()
  const paragraphs = splitParas(spiritualWorkTikkun)
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your Tikkun reading — {signName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ textAlign: 'center' }}>
            <Text style={letter}>{tikkunLetterHebrew}</Text>
            <Text style={eyebrow}>YOUR TIKKUN</Text>
            <Heading style={h1}>{signName}</Heading>
            <Text style={hebrew}>{hebrewName}</Text>
            <Text style={nodes}>
              NORTH LUNAR NODE IN {northNode}
              <br />
              SOUTH LUNAR NODE IN {southNode}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={greeting}>
            {greetingName ? `Dear ${greetingName},` : 'Dear friend,'}
          </Text>
          <Text style={body}>
            Below is the heart of your reading — your Spiritual Work (Tikkun) and
            your Daily Mantra (Kavanah). Your full reading, including your
            Shadow Pattern and Tikkun Letter, lives on the site.
          </Text>

          <Heading as="h2" style={h2}>
            Your Spiritual Work (Tikkun)
          </Heading>
          {paragraphs.map((p, i) => (
            <Text key={i} style={body}>
              {p}
            </Text>
          ))}

          <Heading as="h2" style={h2}>
            Your Daily Mantra (Kavanah)
          </Heading>
          <Text style={mantra}>{dailyMantra}</Text>

          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button style={button} href={readingUrl}>
              Read your full Tikkun
            </Button>
          </Section>

          <Hr style={hr} />

          {optedIn ? (
            <>
              <Heading as="h2" style={h2}>
                Welcome to the Kabbalah Circle waitlist
              </Heading>
              <Text style={body}>
                Thank you for joining. You'll receive occasional notes from
                Kabbalah Circle — teachings, reflections, and an early
                invitation when our group programs and coaching open up. No
                noise, easy to leave any time.
              </Text>
            </>
          ) : (
            <>
              <Heading as="h2" style={h2}>
                Go deeper with the Kabbalah Circle
              </Heading>
              <Text style={body}>
                Want to receive occasional teachings and an early invitation
                when our group programs open? Join the waitlist — it's free and
                you can leave any time.
              </Text>
              <Section style={{ textAlign: 'center', margin: '20px 0 8px' }}>
                <Link href={waitlistUrl} style={waitlistLink}>
                  Join the waitlist →
                </Link>
              </Section>
            </>
          )}

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
}

export default TikkunReadingEmail

export const template = {
  component: TikkunReadingEmail,
  subject: (data: Record<string, any>) =>
    `Your Tikkun reading — ${data.signName ?? 'Kabbalah Circle'}`,
  displayName: 'Tikkun reading',
  previewData: {
    name: 'Sarah',
    signName: 'Aries',
    hebrewName: 'Taleh',
    tikkunLetterHebrew: 'ה',
    northNode: 'Aries',
    southNode: 'Libra',
    spiritualWorkTikkun:
      'Your Tikkun is to step into independent action — to lead, to begin, to risk being first.\n\nWhere you have hidden behind others, your soul-work is to come forward in your own name.',
    dailyMantra: 'I act with courage, without waiting for permission.',
    readingUrl: 'https://tikkun.kabbalahcircle.com/reading/Aries',
    siteUrl: 'https://tikkun.kabbalahcircle.com',
    optedIn: false,
    waitlistUrl: 'https://tikkun.kabbalahcircle.com/history?subscribe=1',
  },
} satisfies TemplateEntry

const C_INK = '#1a1a1a'
const C_SOFT = '#3a3a3a'
const C_GOLD = '#8a6a1f'
const C_DAWN = '#9b2933'
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
const letter: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '88px',
  color: C_DAWN,
  margin: '0',
  lineHeight: 1,
}
const eyebrow: React.CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: C_GOLD,
  fontSize: '11px',
  letterSpacing: '0.32em',
  margin: '20px 0 8px',
}
const h1: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontStyle: 'italic',
  fontSize: '40px',
  color: C_INK,
  margin: '0',
  fontWeight: 400,
}
const hebrew: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontStyle: 'italic',
  color: C_SOFT,
  margin: '6px 0 16px',
  fontSize: '14px',
}
const nodes: React.CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: C_SOFT,
  fontSize: '10px',
  letterSpacing: '0.22em',
  lineHeight: 1.8,
  margin: '12px 0 0',
}
const hr: React.CSSProperties = {
  border: 'none',
  borderTop: `1px solid ${C_RULE}`,
  margin: '28px 0',
}
const greeting: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.7,
  color: C_INK,
  margin: '0 0 12px',
}
const body: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.75,
  color: C_SOFT,
  margin: '0 0 14px',
}
const h2: React.CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: C_GOLD,
  margin: '28px 0 12px',
  fontWeight: 600,
}
const mantra: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontStyle: 'italic',
  fontSize: '20px',
  lineHeight: 1.5,
  color: C_INK,
  margin: '0 0 8px',
  textAlign: 'center',
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
const waitlistLink: React.CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.14em',
  color: C_DAWN,
  textDecoration: 'underline',
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
