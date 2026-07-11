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
    <div className="mb-3 print:mb-1.5">
      <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-[0.2em] text-primary sm:text-lg print:text-[0.8rem]">
        {Icon && <Icon className="h-4 w-4 print:h-3 print:w-3" />}
        {children}
      </h2>
      <div className="mt-1.5 h-px w-full bg-gradient-to-r from-primary/60 via-accent/30 to-transparent print:from-blue-600/50 print:via-purple-500/20 print:to-transparent" />
    </div>
  )
}

/* ── Skill row ────────────────────────────────────────────────── */
function SkillRow({ label, skills }: { label: string; skills: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-0">
      <span className="w-36 shrink-0 font-mono text-xs font-semibold uppercase tracking-widest text-foreground print:w-28 print:text-[0.65rem]">
        {label}:
      </span>
      <span className="text-sm text-muted-foreground print:text-[0.7rem]">{skills}</span>
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
    <div className="mb-4 last:mb-0 print:mb-2">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold text-foreground sm:text-base print:text-[0.75rem]">
            {title}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 align-middle font-mono text-[11px] font-normal text-primary transition-colors hover:text-accent print:text-[0.6rem] print:text-blue-600"
              >
                <ExternalLink className="h-3 w-3 print:h-2 print:w-2" />
                <span className="hidden sm:inline print:inline">View</span>
              </a>
            )}
          </h3>
          {subtitle && (
            <p className="font-mono text-xs text-primary print:text-[0.65rem]">{subtitle}</p>
          )}
        </div>
        {period && (
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground print:text-[0.6rem]">
            {period}
          </span>
        )}
      </div>

      <p className="mt-0.5 font-mono text-[11px] italic text-muted-foreground/70 print:text-[0.6rem]">
        {tech}
      </p>

      <ul className="mt-1 space-y-0.5 print:space-y-0">
        {bullets.map((b) => (
          <li
            key={b.slice(0, 40)}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground print:text-[0.68rem] print:leading-snug"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent print:mt-[5px] print:bg-purple-600" />
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
    
    const originalTheme = theme
    // Temporarily force light theme for clean PDF background rendering
    setTheme('light')
    
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
      setTheme(originalTheme)
      setIsGenerating(false)
    }
  }

  const isLight = theme === 'light'

  return (
    <div
      style={isLight ? {
        /* Override dark-mode CSS variables so every child class
           (text-foreground, text-muted-foreground, border-border, bg-input)
           renders in light mode without touching each element individually */
        '--foreground':         'oklch(0.145 0 0)',
        '--muted-foreground':   'oklch(0.28 0.005 250)', // Darker charcoal text for optimal readability
        '--border':             'oklch(0.88 0.006 250)',
        '--input':              'oklch(0.97 0.002 250)',
        '--card':               'oklch(1 0 0)',
      } as React.CSSProperties : undefined}
      className={`min-h-screen px-4 py-8 sm:px-6 md:py-12 print:min-h-0 print:bg-white print:p-0 transition-colors duration-300 ${
        isLight ? 'bg-slate-50' : 'bg-background'
      }`}
    >
      {/* ── Action bar (hidden in print) ──────────────────────── */}
      <div className="print-hidden mx-auto mb-8 flex max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-xl border border-border bg-input px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Nexus
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-input text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_24px_oklch(0.73_0.155_232_/_35%)] cursor-pointer disabled:opacity-60 disabled:cursor-wait"
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
        className={`resume-print-tight mx-auto max-w-3xl overflow-hidden rounded-3xl transition-all duration-300 print:max-w-none print:rounded-none print:shadow-none print:ring-0 ${
          isLight
            ? 'bg-white shadow-xl ring-1 ring-slate-200'
            : 'bg-card/60 shadow-[0_0_60px_oklch(0.60_0.20_292_/_8%),0_0_120px_oklch(0.73_0.155_232_/_5%)] backdrop-blur-xl'
        }`}
      >
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 print:p-0">

          {/* ── HEADER ─────────────────────────────────────────── */}
          <header className="mb-6 text-center print:mb-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl print:text-2xl">
              SUMEET{' '}
              <span className="text-primary">KANHAIYA</span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground print:mt-1 print:text-[0.65rem]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-accent print:text-purple-600" />
                Karachi, Pakistan
              </span>
              <span className="text-border">|</span>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-1 transition-colors hover:text-primary">
                <Mail className="h-3 w-3 text-accent print:text-purple-600" />
                {EMAIL}
              </a>
              <span className="text-border">|</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-primary">
                <Linkedin className="h-3 w-3 text-accent print:text-purple-600" />
                linkedin.com/in/sumeet-kanhiya
              </a>
              <span className="text-border">|</span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-primary">
                <Github className="h-3 w-3 text-accent print:text-purple-600" />
                github.com/sumeetkl11
              </a>
            </div>

            <div className="mx-auto mt-4 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent print:mt-2 print:via-blue-500" />
          </header>

          {/* ── PROFESSIONAL SUMMARY ───────────────────────────── */}
          <section className="mb-6 print:mb-3">
            <SectionHeading>Professional Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-muted-foreground print:text-[0.7rem] print:leading-snug">
              Full Stack & Backend Engineer specializing in scalable web architectures, real-time WebSocket systems, and high-performance API services. Experienced in building deterministic AI-driven applications with structured validations, and Edge-deployed utilities. Focused on engineering secure, fast, and memorable digital experiences using Next.js, Node.js, Express, and PostgreSQL.
            </p>
          </section>

          {/* ── TECHNICAL SKILLS ───────────────────────────────── */}
          <section className="mb-6 print:mb-3">
            <SectionHeading icon={Wrench}>Technical Skills</SectionHeading>
            <div className="space-y-1.5 print:space-y-0.5">
              <SkillRow label="Languages" skills="JavaScript, TypeScript, SQL, HTML5, CSS3" />
              <SkillRow label="Backend" skills="Node.js, Express.js, RESTful APIs, WebSockets, Redis" />
              <SkillRow label="Frontend" skills="React.js, Next.js, Tailwind CSS, WebGL / Three.js" />
              <SkillRow label="Database" skills="PostgreSQL, Neon Serverless, MongoDB, Prisma ORM" />
              <SkillRow label="Tools & DevOps" skills="Git, GitHub, Edge Runtime, VS Code, Zod Validation, Prompt Engineering (Gemini API)" />
            </div>
          </section>

          {/* ── PROFESSIONAL EXPERIENCE ────────────────────────── */}
          <section className="mb-6 print:mb-3">
            <SectionHeading icon={Briefcase}>Professional Experience</SectionHeading>

            <EntryBlock
              title="Tastebuds AI — Backend Developer"
              subtitle="Personal Project"
              period="Mar 2025 — Jun 2025"
              tech="Node.js, Express.js, PostgreSQL, Gemini API, Git"
              bullets={[
                'Architected the Express.js and PostgreSQL backend, utilizing connection pooling for optimized query latency.',
                'Integrated Google Gemini API with strict structured JSON schema output and Zod validation, cutting validation errors to <1%.',
                'Leveraged JSONB fields in PostgreSQL to dynamically persist complex, user-customized recipe responses.',
              ]}
            />

            <EntryBlock
              title="Freelance Full Stack Developer"
              subtitle="Independent Clients"
              period="Dec 2024 — Present"
              tech="Next.js, Node.js, Express.js, PostgreSQL"
              bullets={[
                'Delivered 3 full-stack client web applications (under NDA) using Next.js, Express, and PostgreSQL, focusing on secure authentication and responsive dashboard interfaces.',
                'Designed and implemented secure user authentication flows and database schemas, resulting in 100% data consistency and zero database downtime during launches.',
              ]}
            />
          </section>

          {/* ── PROJECTS ───────────────────────────────────────── */}
          <section className="mb-6 print:mb-3">
            <SectionHeading icon={FolderGit2}>Projects</SectionHeading>

            <EntryBlock
              title="Tastebuds AI — Intelligent Meal Planning"
              link={`${GITHUB_URL}/tastebuds`}
              tech="Node.js, Express.js, PostgreSQL, Gemini API, Zod"
              bullets={[
                'Engineered a RESTful Express.js backend handling deterministic meal-plan generation with dynamic caloric filtering and Zod validations.',
                'Optimized Gemini API integration with structured prompt schemas and structured JSON outputs, reducing LLM hallucinations to <1%.',
              ]}
            />

            <EntryBlock
              title="SocialConnect — Real-Time Messaging Platform"
              link={`${GITHUB_URL}/socialconnect`}
              tech="WebSockets, Node.js, Express.js, PostgreSQL, Redis"
              bullets={[
                'Engineered a real-time messaging architecture using native WebSockets and Redis Pub/Sub, benchmarked for 10k+ concurrent connections.',
                'Implemented a normalized PostgreSQL schema with composite indexes to achieve sub-25ms message history queries.',
              ]}
            />

            <EntryBlock
              title="Linkforge — URL Shortener with Analytics"
              link={`${GITHUB_URL}/linkforge`}
              tech="Next.js, PostgreSQL, Edge Runtime, React"
              bullets={[
                'Achieved sub-25ms redirect latency using Next.js Edge Runtime and Neon\'s serverless Postgres driver with connection pooling.',
                'Implemented Stale-While-Revalidate (SWR) caching strategy to mitigate Edge cold starts and database read pressure by 40%.',
              ]}
            />
          </section>

          {/* ── CERTIFICATIONS & CORE COMPETENCIES ─────────────── */}
          <section className="mb-6 print:mb-3">
            <SectionHeading icon={Award}>Certifications &amp; Core Competencies</SectionHeading>
            <ul className="space-y-1 print:space-y-0">
              {[
                ['Advanced Coursework', 'Completed modules in Advanced Database Management, Software Engineering, and Computer Networking with a focus on graph theory and cycle detection.'],
                ['Backend Logic & Data Management', 'Specialized in complex PostgreSQL schemas and high-performance MongoDB aggregation pipelines.'],
                ['Web Optimization', 'Proficient in improving website speed, Core Web Vitals, and user-friendliness for professional platforms.'],
                ['Performance Caching', 'Implemented SWR caching and connection pooling strategies to optimize Edge API cold starts and database read overhead.'],
                ['AI & Prompt Engineering', 'Practical experience engineering structured prompts for the Google Gemini API with deterministic output schemas.'],
              ].map(([label, desc]) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground print:text-[0.68rem] print:leading-snug"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent print:mt-[5px] print:bg-purple-600" />
                  <span>
                    <span className="font-semibold text-foreground">{label}:</span>{' '}
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── EDUCATION ──────────────────────────────────────── */}
          <section>
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>

            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground sm:text-base print:text-[0.75rem]">
                  B.S. in Computer Science
                </h3>
                <p className="font-mono text-xs text-primary print:text-[0.65rem]">
                  Dawood University of Engineering &amp; Technology (DUET), Karachi
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground print:text-[0.6rem]">
                Nov 2024 — Dec 2028 (Expected)
              </span>
            </div>
            <ul className="mt-1.5 space-y-0.5 print:space-y-0">
              <li className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground print:text-[0.68rem] print:leading-snug">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent print:mt-[5px] print:bg-purple-600" />
                <span>
                  <span className="font-semibold text-foreground">Relevant Projects:</span>{' '}
                  Developed &ldquo;AI Recipe&rdquo; backend logic and &ldquo;SocialConnect&rdquo; real-time messaging architecture as core academic and personal initiatives.
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground print:text-[0.68rem] print:leading-snug">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent print:mt-[5px] print:bg-purple-600" />
                <span>
                  <span className="font-semibold text-foreground">Core Curriculum:</span>{' '}
                  Database Management Systems, Software Engineering, Computer Networks, Data Structures &amp; Algorithms.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* ── Footer watermark (hidden in print) ──────────────── */}
        {/* <div className="print-hidden border-t border-border px-6 py-4 sm:px-8 md:px-12">
          <p className="text-center font-mono text-[11px] text-muted-foreground/50">
            Built with Next.js · Rendered as web-native HTML · {new Date().getFullYear()}
          </p>
        </div> */}
      </article>
    </div>
  )
}
