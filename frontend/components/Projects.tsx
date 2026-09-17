'use client'

import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GITHUB_URL } from '@/lib/constants'
import { TactileLink, tactileButtonSecondary } from './ui/TactileButton'
import { staggerContainer, fadeUpItem, springFast } from '@/lib/motion'

/* ── Mouse-tracking glow card wrapper ─────────────────────────── */
/**
 * BentoCard — wraps any bento grid card with a radial gradient
 * that follows the mouse position precisely inside the card.
 *
 * Technique:
 *  - onMouseMove: compute cursor % position within card bounds
 *  - Set CSS custom properties --mouse-x, --mouse-y
 *  - The .bento-glow-layer div in globals.css reads these vars
 *  - Opacity transition on hover (CSS, no JS) for performance
 *  - onMouseLeave: reset to center (50%, 50%) gracefully
 */
function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--mouse-x', '50%')
    cardRef.current.style.setProperty('--mouse-y', '50%')
  }, [])

  return (
    <motion.article
      ref={cardRef}
      variants={fadeUpItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -3, transition: springFast }}
      whileTap={{ scale: 0.98, transition: { ...springFast, damping: 25 } }}
      className={`bento-card-wrapper frosted-card relative overflow-hidden rounded-2xl transform-gpu will-change-transform ${className}`}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Dynamic mouse-tracking glow layer */}
      <div className="bento-glow-layer" aria-hidden="true" />
      {children}
    </motion.article>
  )
}

/* ── Section ──────────────────────────────────────────────────── */
export function Projects() {
  return (
    <section id="projects" className="relative px-6 section-padding">
      <div className="mx-auto max-w-6xl">
        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-left"
        >
          <h2 className="text-section-xl text-foreground">
            Things I built.
          </h2>
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-primary to-accent" />
          <p className="mt-4 text-label-caps text-primary/60">
            02_Selected_Works
          </p>
          <p className="mt-3 max-w-2xl font-mono text-base leading-relaxed text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
            Three projects. Real users. Measurable results.
          </p>
        </motion.div>

        {/* ── Asymmetric Bento Grid ─────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {/*
            CARD 1: Linkforge — 2 columns wide (flagship project)
          */}
          <BentoCard className="flex min-h-[380px] md:min-h-[460px] flex-col justify-between p-8 lg:col-span-2">
            {/* Removed static accent blob for Pure Void aesthetic */}

            <div className="relative z-10">
              <span className="mb-4 inline-block rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-label-code uppercase text-primary">
                AI · API Pipeline
              </span>
              <h3
                className="text-foreground"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Linkforge
              </h3>
              <p className="mt-2 font-mono text-base text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
                High-throughput autonomous web scraper & vector intelligence pipeline.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <p
                    className="text-primary"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    10k+
                  </p>
                  <p className="text-label-code text-muted-foreground mt-1">URLs processed/day</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <p
                    className="text-accent"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    &lt;200ms
                  </p>
                  <p className="text-label-code text-muted-foreground mt-1">P99 API latency</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redis'].map(tech => (
                  <span key={tech} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-label-code text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 flex flex-wrap items-center gap-4">
              <TactileLink href="https://linkforge-mauve.vercel.app" className={tactileButtonSecondary}>
                Live Architecture <ArrowUpRight className="ml-2 h-4 w-4" />
              </TactileLink>
              <TactileLink href={`${GITHUB_URL}/linkforge`} className="flex items-center gap-2 text-label-code font-medium text-muted-foreground transition-colors hover:text-foreground">
                Repository // GitHub <ArrowUpRight className="h-3 w-3" />
              </TactileLink>
            </div>
          </BentoCard>

          {/*
            CARD 2: Sock.io — 1 column
          */}
          <BentoCard className="flex min-h-[280px] md:min-h-[460px] flex-col justify-between p-8 lg:col-span-1">
            {/* Removed static accent blob for Pure Void aesthetic */}

            <div className="relative z-10">
              <span className="mb-4 inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-label-code uppercase text-accent">
                Systems · WebRTC
              </span>
              <h3
                className="text-foreground"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Sock.io
              </h3>
              <p className="mt-2 font-mono text-base text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
                Peer-to-peer binary streaming engine with zero-allocation buffers.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Node.js', 'MongoDB', 'WebRTC', 'React'].map(tech => (
                  <span key={tech} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-label-code text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <TactileLink href={`${GITHUB_URL}/sock.io`} className="flex items-center gap-2 text-label-code font-medium text-accent transition-colors hover:text-white">
                Inspect Protocol <ArrowUpRight className="h-3 w-3" />
              </TactileLink>
            </div>
          </BentoCard>

          {/*
            CARD 3: ChefCraft — Full width (3 columns)
          */}
          <BentoCard className="flex min-h-[280px] flex-col justify-between p-8 border-l-2 border-l-cyan-400/30 md:border-l-0 lg:col-span-3 lg:flex-row lg:items-center">
            {/* Removed static accent blob for Pure Void aesthetic */}

            <div className="relative z-10 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-label-code uppercase text-cyan-400">
                Gemini API · Multimodal
              </span>
              <h3
                className="text-foreground"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                ChefCraft
              </h3>
              <p className="mt-2 font-mono text-base text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
                Multimodal sensory recipe synthesis engine generating real-time culinary paths.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Gemini 1.5 Pro', 'Next.js', 'PostgreSQL', 'Tailwind'].map(tech => (
                  <span key={tech} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-label-code text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <TactileLink href="https://chef-craft.vercel.app" className={tactileButtonSecondary}>
                Launch App <ArrowUpRight className="ml-2 h-4 w-4" />
              </TactileLink>
              <TactileLink href={`${GITHUB_URL}/chefcraft`} className="flex items-center justify-center gap-2 text-label-code font-medium text-muted-foreground transition-colors hover:text-foreground px-4">
                Case Study <ArrowUpRight className="h-3 w-3" />
              </TactileLink>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
