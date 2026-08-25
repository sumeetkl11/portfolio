'use client'

import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { ArrowUpRight } from 'lucide-react'
import { GITHUB_URL } from '@/lib/constants'

/* ── Project data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:          'linkforge',
    title:       'Linkforge',
    tagline:     'Real-Time Team Collaboration Workspace',
    description:
      'Built a 4-module team collaboration platform (chat, Kanban, wiki, directory) supporting 500+ concurrent users via Socket.io & Redis pub/sub. Implemented PostgreSQL (Neon) data schemas with Redis caching, OAuth 2.0, and integrated Gemini API for AI-assisted sprint planning.',
    stack:       ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redis'],
    github:      `${GITHUB_URL}/linkforge`,
    live:        'https://linkforge-mauve.vercel.app',
    accent:      'blue' as const,
  },
  {
    id:          'sockio',
    title:       'Sock.io',
    tagline:     'Real-Time Messaging & Voice Call Platform',
    description:
      'Engineered a low-latency real-time communication platform utilizing Socket.io for instant messaging and WebRTC for peer-to-peer audio calls. Architected encrypted-at-rest persistence with MongoDB Atlas and developed offline-first PWA capabilities with IndexedDB.',
    stack:       ['Node.js', 'MongoDB', 'Socket.io', 'WebRTC', 'Redis', 'React'],
    github:      `${GITHUB_URL}/sock.io`,
    live:        'https://sock-io.onrender.com',
    accent:      'violet' as const,
  },
  {
    id:          'chefcraft',
    title:       'ChefCraft',
    tagline:     'Intelligent AI Recipe & Meal Planning',
    description:
      'Developed a full-stack meal-planning platform generating personalized recipes in under 2 seconds via Gemini API integration. Engineered 25+ RESTful API endpoints, reducing data retrieval latency by 25% through optimized PostgreSQL indexing.',
    stack:       ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Gemini API'],
    github:      `${GITHUB_URL}/chefcraft`,
    live:        'https://chef-craft.vercel.app',
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
