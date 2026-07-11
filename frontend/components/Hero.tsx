'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard'

/* ── Profile image with error fallback ────────────────────────── */
function ProfileImage() {
  const [imgError, setImgError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="order-1 flex justify-center md:order-2"
    >
      {/* 1. Parent Container: Needs top margin to give the head room to pop out */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 md:w-90 md:h-100 mt-15 mx-auto"
      >
        {/* 2. The Glowing Background Box (Z-index 0) */}
        <div className="absolute inset-0 z-0 rounded-2xl border-2 border-violet-500/50 bg-gradient-to-b from-slate-900/80 to-slate-900/20 shadow-[0_0_30px_rgba(138,43,226,0.3)] backdrop-blur-sm"></div>

        {/* 3. The Image Wrapper (Z-index 10) / Fallback */}
        {imgError ? (
          /* Fallback: stylised initials avatar — shown if image file is missing */
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/20 to-accent/20"
            role="img"
            aria-label="Sumeet Kanhiya — avatar placeholder"
          >
            <span className="font-display text-7xl font-bold gradient-text select-none">
              SK
            </span>
          </div>
        ) : (
          <div className="absolute bottom-[-15px] left-1 w-full h-[125%] z-10">
            <Image
              src="/sumeet-profile.png" // MUST be the transparent background PNG
              alt="Sumeet Kanhiya"
              fill
              sizes="(max-width: 768px) 288px, 320px"
              className="object-contain object-bottom drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]"
              priority
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Animation variants ───────────────────────────────────────── */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}
const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const socials = [
  { icon: Github,   href: GITHUB_URL,   label: 'GitHub'   },
  { icon: Linkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
  { icon: Mail,     href: `mailto:${EMAIL}`, label: 'Email' },
  { icon: FileText, href: '/resume', label: 'Resume' },
]

/* ── Hero section ─────────────────────────────────────────────── */
export function Hero() {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (label === 'Email') {
      e.preventDefault()
      copyToClipboard(EMAIL)
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* Left: text content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-2 text-center md:order-1 md:text-left"
        >
          <motion.p variants={item} className="mb-2 text-lg text-muted-foreground">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Sumeet
            <br />
            <span className="gradient-text">Kanhiya.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Full Stack Developer specializing in the{' '}
            <span className="font-semibold text-foreground">PERN stack</span> and
            scalable web architectures.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <a
              href="#projects"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-center font-semibold text-background transition-all duration-300 hover:shadow-[0_0_32px_oklch(0.73_0.155_232_/_40%)] sm:w-auto"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-primary transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="w-full rounded-xl border border-border bg-input px-6 py-3 text-center font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 sm:w-auto"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center justify-center gap-5 md:justify-start"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <div key={label} className="relative">
                <a
                  href={href}
                  onClick={(e) => handleSocialClick(e, label, href)}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary block"
                >
                  <Icon className="h-5 w-5" />
                </a>
                {label === 'Email' && copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-background shadow-md transition-all duration-300">
                    Copied!
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: profile image */}
        <ProfileImage />
      </div>

    </section>
  )
}
