/* ─────────────────────────────────────────────────────────────
   Single source of truth for all external links & site identity.
   Update GITHUB_USERNAME once — every component inherits it.
───────────────────────────────────────────────────────────── */

export const GITHUB_USERNAME = 'sumeetkanhiya'
export const GITHUB_URL      = `https://github.com/${GITHUB_USERNAME}`
export const LINKEDIN_URL    = 'https://linkedin.com/in/sumeetkanhiya'
export const EMAIL           = 'sumeetkanhiya@gmail.com'
export const SITE_URL        = 'https://sumeetkanhiya.dev'

export const FULL_NAME   = 'Sumeet Kanhiya'
export const TITLE       = `${FULL_NAME} — Full Stack Developer`
export const DESCRIPTION =
  'Full Stack Developer specializing in the PERN stack, scalable web architectures, and AI-integrated systems. Currently open to opportunities.'

export const NAV_LINKS = [
  { label: 'About',      href: '#hero'       },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const
