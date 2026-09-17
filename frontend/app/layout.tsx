import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_URL, TITLE, DESCRIPTION } from '@/lib/constants'

/* ── Google Fonts — Stitch "Dark Bento Developer Portfolio" spec ─
   display/headlines → Inter  (tightly-tracked, -0.04em at hero)
   body/labels       → JetBrains Mono (technical, code-first feel)  */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/* ── SEO & OpenGraph metadata ─────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | Sumeet Kanhiya`,
  },
  description: DESCRIPTION,
  keywords: [
    'Full Stack Developer',
    'PERN Stack',
    'PostgreSQL',
    'Express',
    'React',
    'Node.js',
    'Next.js',
    'AI',
    'Gemini API',
    'Groq',
    'Kotlin',
    'Jetpack Compose',
    'WebSockets',
    'Karachi',
    'Pakistan',
    'DUET',
    'Dawood University',
    'Systems Architect',
  ],
  authors: [{ name: 'Sumeet Kanhiya', url: SITE_URL }],
  creator: 'Sumeet Kanhiya',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Sumeet Kanhiya Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${TITLE} — Sumeet Kanhiya Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@sumeetkanhiya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0e0e10',
  colorScheme: 'dark',
}

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}

        {/* ── SVG fractal noise grain overlay ─────────────────────────
            Zero performance cost. Eliminates flat sterile dark bg.
            pointer-events-none → never blocks clicks.
            mix-blend-overlay + low opacity = physical surface depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200]"
          style={{
            mixBlendMode: 'overlay',
            opacity: 0.045,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </body>
    </html>
  )
}
