'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Download,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Wrench,
  ExternalLink,
  Loader2,
  Sun,
  Moon,
} from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'

/* ── Reusable section heading ─────────────────────────────────── */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="mb-4 print:mb-2">
      <h2 className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wider text-slate-800 print:text-[0.8rem]">
        {Icon && <Icon className="h-5 w-5 text-indigo-600 print:h-4 print:w-4" />}
        {children}
      </h2>
      <div className="mt-2 h-px w-full bg-slate-200 print:mt-1" />
    </div>
  )
}

/* ── Skill row ────────────────────────────────────────────────── */
function SkillRow({ label, skills }: { label: string; skills: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 py-2 border-b border-slate-100 last:border-0 print:py-1">
      <span className="text-sm font-semibold text-slate-700 print:text-[0.7rem]">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-slate-600 print:text-[0.7rem]">{skills}</span>
    </div>
  )
}

/* ── Experience / Project entry ───────────────────────────────── */
function EntryBlock({
  title,
  subtitle,
  period,
  tech,
  link,
  bullets,
}: {
  title: string
  subtitle?: string
  period?: string
  tech: string
  link?: string
  bullets: string[]
}) {
  return (
    <div className="mb-6 last:mb-0 print:mb-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 print:text-[0.8rem]">
            {title}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 align-middle text-[11px] font-medium text-indigo-600 transition-colors hover:text-indigo-800 print:text-[0.6rem]"
              >
                <ExternalLink className="h-3 w-3 print:h-2 print:w-2" />
                <span className="hidden sm:inline print:inline">View</span>
              </a>
            )}
          </h3>
          {subtitle && (
            <p className="text-sm font-medium text-indigo-700 print:text-[0.7rem]">{subtitle}</p>
          )}
        </div>
        {period && (
          <span className="shrink-0 text-sm font-medium text-slate-500 print:text-[0.7rem]">
            {period}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs font-medium text-slate-500 print:text-[0.65rem]">
        {tech}
      </p>

      <ul className="mt-2 space-y-1.5 print:space-y-1">
        {bullets.map((b) => (
          <li
            key={b.slice(0, 40)}
            className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 print:text-[0.7rem] print:leading-snug"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 print:mt-[5px]" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Main client component ────────────────────────────────────── */
export function ResumeClient() {
  const resumeRef = useRef<HTMLElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || isGenerating) return
    setIsGenerating(true)
    
    // Wait for DOM repaint
    await new Promise((resolve) => setTimeout(resolve, 150))

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add extra pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save('Sumeet_Kanhiya_Resume.pdf')
    } catch (err) {
      console.error('PDF generation failed:', err)
      // Fallback to browser print dialog
      window.print()
    } finally {
      setIsGenerating(false)
    }
  }

  const isLight = theme === 'light'

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 md:py-12 print:min-h-0 print:bg-white print:p-0 transition-colors duration-300 ${
        isLight ? 'bg-slate-50' : 'bg-[#0d0d14]'
      }`}
    >
      {/* ── Action bar (hidden in print) ──────────────────────── */}
      <div className="print-hidden mx-auto mb-8 flex max-w-4xl items-center justify-between">
        <Link
          href="/"
          className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            isLight 
              ? 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm' 
              : 'border-slate-800 bg-[#161622] text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer ${
              isLight
                ? 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                : 'border-slate-800 bg-[#161622] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-wait ${
              isLight
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
            ) : (
              <><Download className="h-4 w-4" /> Download PDF</>
            )}
          </button>
        </div>
      </div>

      {/* ── Resume card ───────────────────────────────────────── */}
      <article
        ref={resumeRef}
        className="resume-print-tight mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 print:max-w-none print:rounded-none print:shadow-none print:ring-0"
      >
        <div className="p-8 sm:p-10 md:p-12 lg:p-16 print:p-0">

          {/* ── HEADER ─────────────────────────────────────────── */}
          <header className="mb-8 text-center print:mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl print:text-3xl">
              Sumeet Kanhaiya
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-600 print:mt-2 print:text-[0.7rem]">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-indigo-600 print:h-3 print:w-3" />
                Karachi, Pakistan
              </span>
              <span className="hidden sm:inline text-slate-300 print:inline">|</span>
              <span className="flex items-center gap-1.5">
                +92 323 3173188
              </span>
              <span className="hidden sm:inline text-slate-300 print:inline">|</span>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
                <Mail className="h-4 w-4 text-indigo-600 print:h-3 print:w-3" />
                {EMAIL}
              </a>
              <span className="hidden sm:inline text-slate-300 print:inline">|</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
                <Linkedin className="h-4 w-4 text-indigo-600 print:h-3 print:w-3" />
                linkedin.com/in/sumeet-kanhiya
              </a>
              <span className="hidden sm:inline text-slate-300 print:inline">|</span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
                <Github className="h-4 w-4 text-indigo-600 print:h-3 print:w-3" />
                github.com/sumeetkl11
              </a>
            </div>
          </header>

          {/* ── PROFESSIONAL SUMMARY ───────────────────────────── */}
          <section className="mb-8 print:mb-4">
            <SectionHeading>Professional Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-600 print:text-[0.75rem] print:leading-snug">
              Results-driven Full Stack Software Engineer specializing in the PERN and MERN stacks (PostgreSQL, MongoDB, MySQL, Express.js, React.js, Node.js). Experienced in designing scalable RESTful APIs, low-latency real-time distributed systems (Socket.io, Redis), and integrating Google Gemini AI workflows within Agile / Scrum methodologies. Proven track record delivering production-grade SaaS, e-commerce, and collaboration applications with optimized performance and clean architecture.
            </p>
          </section>

          {/* ── TECHNICAL SKILLS ───────────────────────────────── */}
          <section className="mb-8 print:mb-4">
            <SectionHeading icon={Wrench}>Technical Skills</SectionHeading>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 print:border-none print:bg-transparent print:p-0">
              <SkillRow label="Languages" skills="JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3" />
              <SkillRow label="Backend & Real-Time" skills="Node.js, Express.js, RESTful APIs, Socket.io, WebSockets, WebRTC, JWT, OAuth 2.0, Nodemailer" />
              <SkillRow label="Frontend & State" skills="React.js, Next.js, Redux Toolkit, Context API, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons" />
              <SkillRow label="Databases & Caching" skills="PostgreSQL (Neon), MongoDB Atlas, MySQL, Redis (Pub/Sub & Adapters), Prisma ORM" />
              <SkillRow label="Tools, DevOps & AI" skills="Docker, Git, GitHub, CI/CD, Postman, Thunder Client, Vercel, Render, Gemini API (Prompt Engineering), Agile/Scrum" />
            </div>
          </section>

          {/* ── PROFESSIONAL EXPERIENCE ────────────────────────── */}
          <section className="mb-8 print:mb-4">
            <SectionHeading icon={Briefcase}>Professional Experience</SectionHeading>

            <EntryBlock
              title="ChefCraft — Backend Developer"
              subtitle="Production Project"
              period="Mar 2025 — Jun 2025"
              tech="Node.js, Express.js, PostgreSQL, MongoDB, Gemini API, Git, Agile"
              bullets={[
                'Engineered 25+ RESTful API endpoints using Node.js & Express.js for an AI meal-planning platform, cutting manual meal-plan configuration time by 80%.',
                'Integrated Google Gemini API with structured prompt design and multi-tier model fallbacks, achieving deterministic JSON output schemas with sub-2s generation latency.',
                'Optimized PostgreSQL & MongoDB database queries and generation algorithms, decreasing API response times by over 200ms.',
              ]}
            />

            <EntryBlock
              title="Freelance Web Developer"
              subtitle="Independent Clients"
              period="Dec 2024 — Present"
              tech="PERN / MERN Stack, React.js, Redux, Next.js, Tailwind CSS"
              bullets={[
                'Delivered 2+ end-to-end full-stack web applications for clients across SaaS, e-commerce, and content platforms using Agile/Scrum sprint cycles.',
                'Architected performance-optimized, responsive frontends with React and Tailwind CSS, improving page load speeds by 30% and boosting Core Web Vitals.',
              ]}
            />
          </section>

          {/* ── PROJECTS ───────────────────────────────────────── */}
          <section className="mb-8 print:mb-4">
            <SectionHeading icon={FolderGit2}>Projects</SectionHeading>

            <EntryBlock
              title="Linkforge — Real-Time Team Collaboration Workspace"
              link={`${GITHUB_URL}/linkforge`}
              tech="React 19, TypeScript, Vite, Node.js, Express.js, PostgreSQL, Socket.io, Redis"
              bullets={[
                'Built a 4-module team collaboration platform (chat, Kanban, wiki, directory) supporting 500+ concurrent users via Socket.io & Redis pub/sub.',
                'Implemented PostgreSQL (Neon) data schemas with Redis caching, Google/GitHub OAuth 2.0, JWT session verification, and Nodemailer SMTP.',
                'Integrated Gemini API for AI-assisted sprint planning, intelligent task drafting, and automated acceptance criteria generation.',
              ]}
            />

            <EntryBlock
              title="Sock.io — Real-Time Messaging & Voice Call Platform"
              link={`${GITHUB_URL}/sock.io`}
              tech="Socket.io, Node.js, Express.js, MongoDB Atlas, Redis, WebRTC, React"
              bullets={[
                'Engineered a low-latency real-time communication platform utilizing Socket.io for instant messaging and WebRTC for peer-to-peer audio calls with STUN NAT traversal.',
                'Architected encrypted-at-rest persistence with MongoDB Atlas and integrated Redis for socket connection mapping and scale-out pub/sub.',
                'Developed offline-first PWA capabilities with an IndexedDB queue for seamless message synchronization upon reconnect.',
              ]}
            />

            <EntryBlock
              title="ChefCraft — Intelligent AI Recipe & Meal Planning Platform"
              link={`${GITHUB_URL}/chefcraft`}
              tech="React.js, Node.js, Express.js, PostgreSQL, MongoDB, Gemini API, Tailwind CSS"
              bullets={[
                'Developed a full-stack meal-planning platform generating personalized recipes in under 2 seconds via Gemini API integration.',
                'Automated weekly grocery list compilation from generated meal plans, streamlining pantry inventory tracking and ingredient management.',
              ]}
            />
          </section>

          {/* ── CERTIFICATIONS & CORE COMPETENCIES ─────────────── */}
          <section className="mb-8 print:mb-4">
            <SectionHeading icon={Award}>Core Competencies</SectionHeading>
            <ul className="space-y-2 print:space-y-1.5">
              {[
                ['Real-Time & Distributed Systems', 'Event-driven architecture with Socket.io, WebRTC peer-to-peer media, and Redis multi-node pub/sub scaling.'],
                ['Database Design & Optimization', 'Normalized PostgreSQL / MySQL relational schemas with indexing; high-performance MongoDB aggregation pipelines.'],
                ['AI Integration & Prompt Engineering', 'Structured prompt design for Google Gemini API with deterministic JSON schemas and fallback queues.'],
                ['Full-Stack Security & DevOps', 'OAuth 2.0 / JWT session validation, role-based access control, Docker containerization, and Agile sprint workflows.'],
              ].map(([label, desc]) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 print:text-[0.75rem] print:leading-snug"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 print:mt-[5px]" />
                  <span>
                    <span className="font-bold text-slate-900">{label}:</span>{' '}
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── EDUCATION ──────────────────────────────────────── */}
          <section>
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 print:text-[0.8rem]">
                  B.S. in Computer Science
                </h3>
                <p className="text-sm font-medium text-indigo-700 print:text-[0.7rem]">
                  Dawood University of Engineering &amp; Technology (DUET), Karachi
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-slate-500 print:text-[0.7rem]">
                Nov 2024 — Dec 2028 (Expected)
              </span>
            </div>
            <ul className="mt-3 space-y-2 print:mt-1.5 print:space-y-1">
              <li className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 print:text-[0.75rem] print:leading-snug">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 print:mt-[5px]" />
                <span>
                  <span className="font-bold text-slate-900">Relevant Projects:</span>{' '}
                  Linkforge (Team Workspace), Sock.io (Real-Time Messaging/Voice), ChefCraft (AI Meal Planning).
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 print:text-[0.75rem] print:leading-snug">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 print:mt-[5px]" />
                <span>
                  <span className="font-bold text-slate-900">Core Curriculum:</span>{' '}
                  Database Management Systems, Software Engineering, Computer Networks, Data Structures &amp; Algorithms.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  )
}
