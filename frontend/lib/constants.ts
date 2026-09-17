/* ─────────────────────────────────────────────────────────────
   Single source of truth for all external links & site identity.
   Update GITHUB_USERNAME once — every component inherits it.
───────────────────────────────────────────────────────────── */

export const GITHUB_USERNAME = 'sumeetkl11'
export const GITHUB_URL      = `https://github.com/${GITHUB_USERNAME}`
export const LINKEDIN_URL    = 'https://www.linkedin.com/in/sumeet-kanhiya/'
export const EMAIL           = 'sumeetkanhiya11@gmail.com'
export const SITE_URL        = 'https://sumeetkanhiya.dev'

export const FULL_NAME   = 'Sumeet Kanhiya'
export const TITLE       = `${FULL_NAME} — Luxury Portfolio & Systems Architect`
export const DESCRIPTION =
  'Full-Stack Developer & CS student at Dawood University of Engineering & Technology (DUET), Karachi. Specializing in PERN stack, Next.js, AI integrations (Gemini API, Groq), and Kotlin/Jetpack Compose. Building resilient systems and precise interfaces.'

export const NAV_LINKS = [
  { label: 'About',      href: '#hero'       },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const
