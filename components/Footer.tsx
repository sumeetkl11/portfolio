'use client'

import { Terminal } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL, FULL_NAME } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            The Digital Nexus
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-muted-foreground text-center">
          &copy; {year} {FULL_NAME}. Designed &amp; engineered with Next.js, Three.js &amp; Tailwind.
        </p>

        {/* Quick links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub',   href: GITHUB_URL  },
            { label: 'LinkedIn', href: LINKEDIN_URL },
            { label: 'Email',    href: `mailto:${EMAIL}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
