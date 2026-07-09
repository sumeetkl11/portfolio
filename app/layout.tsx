import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_URL, TITLE, DESCRIPTION } from '@/lib/constants'

/* ── Google Fonts — font-display: swap prevents FOIT ─────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
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
    'WebSockets',
    'Pakistan',
    'DUET',
  ],
  authors: [{ name: 'Sumeet Kanhiya', url: SITE_URL }],
  creator: 'Sumeet Kanhiya',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'The Digital Nexus',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${TITLE} — The Digital Nexus`,
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
  themeColor: '#14141f',
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
        className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
