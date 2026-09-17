'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUpItem } from '@/lib/motion'

interface TimelineEntry {
  period:       string
  title:        string
  organization: string
  description:  string
  type:         'work' | 'education'
}

const ENTRIES: TimelineEntry[] = [
  {
    period:       'Mar 2025 — Jun 2025',
    title:        'Backend Developer — ChefCraft',
    organization: 'Production Project',
    description:
      'Engineered 25+ RESTful API endpoints using Node.js & Express.js. Integrated Google Gemini API with structured prompt design and multi-tier model fallbacks, achieving deterministic JSON output schemas with sub-2s generation latency.',
    type: 'work',
  },
  {
    period:       'Dec 2024 — Present',
    title:        'Freelance Web Developer',
    organization: 'Independent Clients',
    description:
      'Delivered 2+ end-to-end full-stack web applications for clients across SaaS, e-commerce, and content platforms using Agile/Scrum sprint cycles. Architected performance-optimized, responsive frontends with React and Tailwind CSS.',
    type: 'work',
  },
  {
    period:       'Nov 2024 — Dec 2028 (Expected)',
    title:        'B.S. in Computer Science',
    organization: 'Dawood University of Engineering & Technology (DUET), Karachi',
    description:
      'Relevant Projects: Linkforge, Sock.io, ChefCraft. Core Coursework: Database Management Systems, Software Engineering, Computer Networks, Data Structures & Algorithms.',
    type: 'education',
  },
]

export function Timeline() {
  return (
    <section id="experience" className="relative px-6 section-padding">
      <div className="mx-auto max-w-4xl">
        {/* Anti-Slop: Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-left"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Experience & Education.
          </h2>
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-primary to-accent" />
          <p className="mt-4 font-mono text-xs tracking-widest text-primary/60 uppercase">
            03_JOURNEY
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Where I've been and what I've learned.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-accent/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-12"
          >
            {ENTRIES.map((entry, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    isLeft ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-2 z-10 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_oklch(0.73_0.155_232_/_50%)] left-4 -translate-x-1/2 md:top-3 ${
                      isLeft ? 'md:left-full' : 'md:left-0'
                    }`}
                  />

                  <div className="glass rounded-2xl p-6">
                    {/* Period badge */}
                    <span
                      className={`mb-3 inline-block rounded-full border px-3 py-1 font-mono text-xs ${
                        entry.type === 'work'
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : 'border-accent/30 bg-accent/10 text-accent'
                      }`}
                    >
                      {entry.period}
                    </span>

                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {entry.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-primary">{entry.organization}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
