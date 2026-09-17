'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard'
import { TactileLink } from './ui/TactileButton'
import { MagneticButton, magneticButtonPrimary, magneticButtonSecondary } from './ui/MagneticButton'
import { CursorOrb } from './CursorOrb'
import { staggerContainer, fadeUpItem } from '@/lib/motion'

/* ── Profile image ──────────────────────────────────────────── */
function ProfileImage() {
  const [imgError, setImgError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={fadeUpItem}
      className="relative flex h-full w-full items-center justify-center md:pt-10"
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-[280px] md:h-[400px] w-full max-w-[280px] md:max-w-[340px]"
      >
        {/* Frosted glass container with edge lighting */}
        <div className="absolute inset-0 z-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Removed static radial glow blobs for Pure Void aesthetic */}
        </div>

        {/* Profile Image (overflowing top rim) */}
        {imgError ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl">
            <span
              className="gradient-text select-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
              }}
            >
              SK
            </span>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 w-full h-[120%] z-10">
            <Image
              src="/sumeet-profile.png"
              alt="Sumeet Kanhiya"
              fill
              sizes="(max-width: 768px) 288px, 340px"
              className="object-contain object-bottom drop-shadow-2xl"
              priority
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Hero section ─────────────────────────────────────────────── */
export function Hero() {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === 'Email') {
      e.preventDefault()
      copyToClipboard(EMAIL)
    }
  }

  const socials = [
    { icon: Github,   href: GITHUB_URL,         label: 'GitHub'   },
    { icon: Linkedin, href: LINKEDIN_URL,        label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${EMAIL}`,   label: 'Email'    },
    { icon: FileText, href: '/resume',           label: 'Resume'   },
  ]

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Gamified cursor orb — renders globally, behind everything */}
      <CursorOrb />

      {/* Asymmetric split grid (58% / 42%) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[58fr_42fr]"
      >
        {/* ── Left: Text Content ─────────────────────────────────── */}
        <div className="flex flex-col text-left">

          {/* Section label — label-caps style */}
          <motion.p
            variants={fadeUpItem}
            className="text-label-caps mb-5 text-muted-foreground"
          >
            {'// 01_SYSTEMS_ARCHITECT'}
          </motion.p>

          {/* ── HERO HEADLINE — Stitch display-hero: 4.5rem / 700 / -0.04em ── */}
          <motion.h1
            variants={fadeUpItem}
            className="text-hero text-foreground"
          >
            Sumeet
            <br />
            <span className="gradient-text">Kanhiya.</span>
          </motion.h1>

          {/* ── Role & Identity line ──────────────────────────────── */}
          <motion.div
            variants={fadeUpItem}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span
              className="font-mono text-base text-muted-foreground"
              style={{ letterSpacing: '-0.01em' }}
            >
              Full-Stack Developer
            </span>
            <span className="text-white/20 font-mono">·</span>
            <span
              className="font-mono text-base text-muted-foreground"
              style={{ letterSpacing: '-0.01em' }}
            >
              CS Student @ DUET
            </span>
          </motion.div>

          {/* ── Location badge ────────────────────────────────────── */}
          <motion.div
            variants={fadeUpItem}
            className="mt-3 flex items-center gap-1.5"
          >
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            <span className="text-label-code text-primary/60 uppercase tracking-widest">
              Karachi, Pakistan
            </span>
          </motion.div>

          {/* ── Bio ───────────────────────────────────────────────── */}
          <motion.p
            variants={fadeUpItem}
            className="mt-8 max-w-[500px] font-mono text-base leading-relaxed text-muted-foreground"
            style={{ letterSpacing: '-0.01em' }}
          >
            I build distributed systems and high-throughput web applications
            using the PERN stack, Next.js, and AI integrations (Gemini API,
            Groq). No boilerplate — just resilient infrastructure and
            precise interfaces.
          </motion.p>

          {/* ── Magnetic CTA Buttons ──────────────────────────────── */}
          <motion.div
            variants={fadeUpItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#projects" className={magneticButtonPrimary}>
              Inspect Architecture
            </MagneticButton>
            <MagneticButton href="#contact" className={magneticButtonSecondary}>
              Get in Touch
            </MagneticButton>
          </motion.div>

          {/* ── Social icons row ──────────────────────────────────── */}
          <motion.div
            variants={fadeUpItem}
            className="mt-12 flex items-center gap-6"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <div key={label} className="relative">
                <TactileLink
                  href={href}
                  onClick={(e) => handleSocialClick(e, label)}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center h-11 w-11 -m-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </TactileLink>
                {label === 'Email' && copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 font-mono text-[11px] font-medium text-background"
                  >
                    Copied!
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Portrait Container ──────────────────────────── */}
        <ProfileImage />
      </motion.div>
    </section>
  )
}
