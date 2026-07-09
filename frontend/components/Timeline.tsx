'use client'

import { motion } from 'framer-motion'

interface TimelineEntry {
  period:       string
  title:        string
  organization: string
  description:  string
  type:         'work' | 'education'
}

const ENTRIES: TimelineEntry[] = [
  {
    period:       'Dec 2024 — Present',
    title:        'Freelance Full Stack Developer',
    organization: 'Independent Clients',
    description:
      'Building end-to-end web applications using the PERN stack. Delivering scalable RESTful APIs, responsive Next.js frontends, and AI-integrated features for clients across multiple industries.',
    type: 'work',
  },
  {
    period:       'Mar 2025 — Jun 2025',
    title:        'Backend Developer — Tastebuds AI',
    organization: 'Tastebuds AI Initiative',
    description:
      'Architected the core Express.js + PostgreSQL backend for the Tastebuds AI platform. Integrated Google Gemini API with structured JSON schema output for deterministic meal-plan generation.',
    type: 'work',
  },
  {
    period:       '2024 — Expected Dec 2028',
    title:        'B.E. in Computer Engineering',
    organization: 'Dawood University of Engineering & Technology (DUET), Karachi',
    description:
      'Core curriculum: Database Management Systems, Software Engineering, Computer Networks, and Algorithms. Focus on scalable system design and modern full-stack web development.',
    type: 'education',
  },
]

export function Timeline() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          {/* <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
            {'// 02. Journey'}
          </p> */}
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Experience & Education
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-accent/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {ENTRIES.map((entry, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          </div>
        </div>
      </div>
    </section>
  )
}
