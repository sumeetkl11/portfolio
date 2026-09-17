/**
 * Shared Framer Motion presets — Anti-AI Slop Doc 02
 * All components import from here. Single source of truth.
 */
import type { Variants } from 'framer-motion'

/* ── Spring presets ───────────────────────────────────────────── */
export const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
}

export const springFast = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 15,
}

/* ── Stagger container ────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/* ── Fade-up item ─────────────────────────────────────────────── */
export const fadeUpItem: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springTransition },
  },
}

/* ── Card hover ───────────────────────────────────────────────── */
export const cardHover = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap:   { scale: 0.98 },
  transition:  springFast,
}
