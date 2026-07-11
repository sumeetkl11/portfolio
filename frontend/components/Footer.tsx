'use client'

import { Terminal } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL, FULL_NAME } from '@/lib/constants'
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard'

export function Footer() {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (label === 'Email') {
      e.preventDefault()
      copyToClipboard(EMAIL)
    }
  }

  return (
    <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            Sumeet Kanhiya
          </span>
        </div>

        {/* Copyright */}
        <p suppressHydrationWarning className="font-mono text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {FULL_NAME}. { /* Designed &amp; engineered with Next.js, Three.js &amp; Tailwind.*/}
        </p>

        {/* Quick links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub',   href: GITHUB_URL  },
            { label: 'LinkedIn', href: LINKEDIN_URL },
            { label: 'Email',    href: `mailto:${EMAIL}` },
            { label: 'Resume',   href: '/resume' },
          ].map(({ label, href }) => (
            <div key={label} className="relative">
              <a
                href={href}
                onClick={(e) => handleEmailClick(e, label, href)}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </a>
              {label === 'Email' && copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-background shadow-md transition-all duration-300">
                  Copied!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
