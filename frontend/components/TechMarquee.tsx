'use client'

/**
 * TechMarquee — Anti-Parallel infinite scrolling marquees.
 *
 * Design spec (Stitch Dark Bento):
 *  - Row 1: scrolls LEFT at 35s
 *  - Row 2: scrolls RIGHT at 28s (opposite direction)
 *  - Typography: Inter 700, clamp(2rem, 4vw, 3.25rem)
 *  - Style: outlined text (-webkit-text-stroke) for editorial brutalism
 *  - Items duplicated for seamless loop (CSS-only, no JS scroll)
 *  - Masked edges for smooth fade in/out
 *
 * Accessibility: aria-hidden on decorative marquees
 * Performance: will-change: transform, CSS animations only
 */

const STACK_ROW_1 = [
  'PERN Stack',
  'Next.js 15',
  'React 19',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Express.js',
  'REST APIs',
  'Full-Stack',
]

const STACK_ROW_2 = [
  'Gemini API',
  'Groq',
  'Kotlin',
  'Jetpack Compose',
  'WebSockets',
  'Redis',
  'Tailwind CSS',
  'Framer Motion',
  'DUET · Karachi',
]

function MarqueeItem({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-8 px-8"
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        /* Outlined text — editorial brutalist style */
        WebkitTextStroke: '1px rgba(255,255,255,0.35)',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
      {/* Separator dot */}
      <span
        style={{
          WebkitTextStroke: '0',
          WebkitTextFillColor: 'oklch(0.73 0.155 232 / 60%)',
          color: 'oklch(0.73 0.155 232 / 60%)',
          fontSize: '0.5em',
          lineHeight: 1,
        }}
      >
        ◆
      </span>
    </span>
  )
}

export function TechMarquee() {
  /* Duplicate items to fill the track and enable seamless CSS loop */
  const row1Items = [...STACK_ROW_1, ...STACK_ROW_1]
  const row2Items = [...STACK_ROW_2, ...STACK_ROW_2]

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden py-12 border-y border-white/[0.06]"
      style={{
        background:
          'linear-gradient(to right, transparent, oklch(0.14 0.018 270 / 30%) 20%, oklch(0.14 0.018 270 / 30%) 80%, transparent)',
      }}
    >
      {/* Subtle top/bottom edge gradient */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'linear-gradient(to bottom, oklch(0.11 0.012 280) 0%, transparent 15%, transparent 85%, oklch(0.11 0.012 280) 100%)'
      }} />

      {/* Row 1: Left scroll */}
      <div className="marquee-viewport mb-2">
        <div className="marquee-track marquee-track--left">
          {row1Items.map((text, i) => (
            <MarqueeItem key={`r1-${i}`} text={text} />
          ))}
        </div>
      </div>

      {/* Row 2: Right scroll (opposite direction) */}
      <div className="marquee-viewport">
        <div className="marquee-track marquee-track--right">
          {row2Items.map((text, i) => (
            <MarqueeItem key={`r2-${i}`} text={text} />
          ))}
        </div>
      </div>
    </section>
  )
}
