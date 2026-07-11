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
export const TITLE       = `${FULL_NAME} — Full Stack & Backend Engineer`
export const DESCRIPTION =
  'I build fast, real-time, and memorable web applications—from WebSocket platforms to Edge-deployed APIs and WebGL graphics. Available for full-stack and backend roles.'

export const NAV_LINKS = [
  { label: 'About',      href: '#hero'       },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const
