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
export const TITLE       = `${FULL_NAME} — Full Stack Developer (PERN / MERN) | Software Engineer`
export const DESCRIPTION =
  'Results-driven Full Stack Software Engineer specializing in the PERN and MERN stacks. Experienced in designing scalable RESTful APIs, low-latency real-time distributed systems, and integrating AI workflows.'

export const NAV_LINKS = [
  { label: 'About',      href: '#hero'       },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const
