'use client'

/**
 * MagneticButton — CTAs that pull slightly toward the cursor.
 *
 * Technique:
 *  - Track mouse position relative to button center
 *  - useSpring for elastic return (stiffness 150, damping 15)
 *  - Pull factor 0.35 — subtle, premium feel, not jarring
 *  - Reuses TactileButton audio (useSound + useAudioStore)
 *  - Mobile guard: no magnetic effect on touch devices
 *
 * Usage:
 *   <MagneticButton href="#projects" className={tactileButtonPrimary}>
 *     View Projects
 *   </MagneticButton>
 */
import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useSound from 'use-sound'
import { useAudioStore } from '@/lib/hooks/useAudioStore'

/* ── Touch device detection ───────────────────────────────────── */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/* ── Shared button class presets ──────────────────────────────── */
export const magneticButtonPrimary =
  'relative inline-flex items-center justify-center rounded-xl ' +
  'bg-gradient-to-b from-primary to-primary/80 ' +
  'px-6 py-3 text-sm font-semibold text-primary-foreground ' +
  'border border-primary/50 ' +
  'shadow-[0_0_20px_oklch(0.73_0.155_232_/_25%),inset_0_1px_0_rgba(255,255,255,0.15)] ' +
  'transition-shadow duration-200 active:scale-[0.98] ' +
  'hover:shadow-[0_0_35px_oklch(0.73_0.155_232_/_45%)]'

export const magneticButtonSecondary =
  'relative inline-flex items-center justify-center rounded-xl ' +
  'border border-white/[0.08] bg-white/[0.03] ' +
  'px-6 py-3 text-sm font-medium text-foreground ' +
  'backdrop-blur-sm transition-shadow duration-200 ' +
  'hover:bg-white/[0.06] active:scale-95'

/* ── Props ─────────────────────────────────────────────────────── */
interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  className?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

/* ── Component ─────────────────────────────────────────────────── */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  const { muted } = useAudioStore()
  const [playClick] = useSound('/sounds/soft-click.mp3', {
    volume: 0.12,
    soundEnabled: !muted,
  })

  /* Spring-powered x/y offset for magnetic pull */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.5 })

  /* Pull factor — 0.35 = 35% of the distance from center */
  const PULL = 0.35

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      rawX.set((e.clientX - centerX) * PULL)
      rawY.set((e.clientY - centerY) * PULL)
    },
    [isTouch, rawX, rawY],
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!muted && !isTouchDevice()) {
        playClick()
      }
      onClick?.(e)
    },
    [muted, playClick, onClick],
  )

  const motionStyle = { x, y }

  /* Render as <a> when href is provided, otherwise <button> */
  const innerElement = href ? (
    <a
      href={href}
      onClick={handleClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      onClick={handleClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  )

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {innerElement}
    </motion.div>
  )
}
