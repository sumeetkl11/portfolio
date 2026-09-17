'use client'

/**
 * CursorOrb — Gamified cursor: a Framer Motion spring-powered
 * glowing gradient orb that smoothly tracks the user's mouse
 * behind the massive hero typography.
 *
 * Technique:
 *  - useMotionValue for raw x/y position
 *  - useSpring for smooth elastic lag (damping 40, stiffness 120)
 *  - mix-blend-mode: screen — lets the glow shine THROUGH text
 *  - pointer-events: none — never blocks clicks
 *  - Only rendered on non-touch devices (mobile guard)
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorOrb() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  /* Raw mouse position */
  const rawX = useMotionValue(-300)
  const rawY = useMotionValue(-300)

  /* Spring-smoothed position — creates the beautiful elastic lag */
  const x = useSpring(rawX, { damping: 40, stiffness: 120, mass: 0.8 })
  const y = useSpring(rawY, { damping: 40, stiffness: 120, mass: 0.8 })

  useEffect(() => {
    setMounted(true)
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 180)
      rawY.set(e.clientY - 180)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouch, rawX, rawY])

  /* Don't render on touch devices or SSR */
  if (!mounted || isTouch) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ x, y }}
        className="absolute h-[360px] w-[360px] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Outer atmospheric bloom */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, oklch(0.73 0.155 232 / 18%) 0%, oklch(0.60 0.20 292 / 10%) 45%, transparent 75%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Inner intense core */}
        <div
          className="absolute inset-[25%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, oklch(0.73 0.155 232 / 30%) 0%, transparent 70%)',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </div>
  )
}
