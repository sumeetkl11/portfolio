'use client'

import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { ArrowUpRight } from 'lucide-react'
import { GITHUB_URL } from '@/lib/constants'

/* ── Project data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:          'tastebuds',
    title:       'Tastebuds AI',
    tagline:     'Deterministic AI meal planning with Zod validation',
    description:
      'Architected a meal-planning platform powered by Google Gemini. Implemented a strict JSON schema validation layer with Zod to handle model hallucinations, reducing output schema violations to <1%. Structured plans are persisted in PostgreSQL using optimized JSONB columns with P95 generation latency under 1.8s.',
    stack:       ['Node.js', 'Express.js', 'PostgreSQL', 'Gemini API', 'Zod'],
    github:      `${GITHUB_URL}/tastebuds`,
    live:        'https://tastebuds.sumeetkanhiya.dev',
    accent:      'blue' as const,
  },
  {
    id:          'socialconnect',
    title:       'SocialConnect',
    tagline:     'Real-time WebSocket system with Redis Pub/Sub scaling',
    description:
      'Engineered a real-time messaging architecture using native WebSockets (no polling) and Redis Pub/Sub to scale horizontally across multi-node servers, benchmarked to support 10k+ concurrent connections at sub-15ms latency. Employs a normalized PostgreSQL schema with indexes on foreign and compound keys for sub-25ms history queries.',
    stack:       ['WebSockets', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis'],
    github:      `${GITHUB_URL}/socialconnect`,
    live:        'https://socialconnect.sumeetkanhiya.dev',
    accent:      'violet' as const,
  },
  {
    id:          'linkforge',
    title:       'Linkforge',
    tagline:     'Sub-25ms URL shortener on Next.js Edge runtime',
    description:
      'Achieved sub-25ms redirect latency using Next.js Edge Runtime and Neon\'s serverless Postgres driver with connection pooling. Built geolocation-aware click analytics and dynamic QR code generation. Implemented a Stale-While-Revalidate (SWR) caching strategy to mitigate Edge cold starts and reduce database read pressure by 40%.',
    stack:       ['Next.js', 'PostgreSQL', 'Edge Runtime', 'React'],
    github:      `${GITHUB_URL}/linkforge`,
    live:        'https://linkforge.sumeetkanhiya.dev',
    accent:      'cyan' as const,
  },
]

const accentClasses = {
  blue: {
    badge:   'border-primary/20 bg-primary/10 text-primary',
    glow:    'hover:shadow-[0_0_40px_oklch(0.73_0.155_232_/_25%)]',
    border:  'hover:border-primary/40',
    pill:    'border-primary/20 bg-primary/10 text-primary',
    button:  'text-primary hover:text-foreground',
  },
  violet: {
    badge:   'border-accent/20 bg-accent/10 text-accent',
    glow:    'hover:shadow-[0_0_40px_oklch(0.60_0.20_292_/_25%)]',
    border:  'hover:border-accent/40',
    pill:    'border-accent/20 bg-accent/10 text-accent',
    button:  'text-accent hover:text-foreground',
  },
  cyan: {
    badge:   'border-cyan-400/20 bg-cyan-400/10 text-cyan-400',
    glow:    'hover:shadow-[0_0_40px_oklch(0.80_0.14_210_/_25%)]',
    border:  'hover:border-cyan-400/40',
    pill:    'border-cyan-400/20 bg-cyan-400/10 text-cyan-400',
    button:  'text-cyan-400 hover:text-foreground',
  },
}

/* ── Section ──────────────────────────────────────────────────── */
export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Things I&apos;ve Built
          </h2>
          <div className="mx-auto mt-4 h-px w-25 bg-gradient-to-r from-primary to-accent" />
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            A selection of my recent <span className="text-foreground font-medium">full-stack projects</span>, showcasing scalable architectures, precise database schemas, and modern web technologies.
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const ac = accentClasses[project.accent]

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  transitionSpeed={1600}
                  scale={1.02}
                  className="h-full"
                >
                  <article
                    className={`glass group flex flex-col h-full rounded-2xl p-6 transition-all duration-500 ${ac.border} ${ac.glow}`}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`mb-2 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${ac.badge}`}>
                          {project.accent === 'blue' ? 'AI · API' : project.accent === 'violet' ? 'Real-time' : 'Utility'}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground">{project.tagline}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full border px-3 py-0.5 font-mono text-xs ${ac.pill}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions container */}
                    <div className="mt-auto pt-6 flex items-center gap-5">
                      {/* GitHub Link */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 font-mono text-xs font-medium transition-colors ${ac.button}`}
                      >
                        <span>Repository</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>

                      {/* Live Link */}
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </Tilt>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
