'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm }              from 'react-hook-form'
import { zodResolver }          from '@hookform/resolvers/zod'
import { motion }               from 'framer-motion'
import { Terminal, Send, RotateCcw, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { contactSchema, type ContactFormData, sanitizeText } from '@/lib/validators'
import { GITHUB_URL, LINKEDIN_URL, EMAIL }                   from '@/lib/constants'

/* ── Terminal mode commands ───────────────────────────────────── */
const HELP_TEXT = `
Available commands:
  help               Show this help message
  contact            Guide through contact form fields
  ls                 List portfolio sections
  whoami             About Sumeet
  clear              Clear terminal
  github             Open GitHub profile
`.trim()

const LS_TEXT = `
/hero        — Introduction & CTA
/projects    — View featured full-stack projects
/experience  — Work history & education
/contact     — Contact form (you are here)
`.trim()

/* ── Status type ──────────────────────────────────────────────── */
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function TerminalContact() {
  const [mode,    setMode]    = useState<'form' | 'terminal'>('form')
  const [status,  setStatus]  = useState<FormStatus>('idle')
  const [errMsg,  setErrMsg]  = useState('')
  const [copied,  setCopied]  = useState(false)

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (label === 'Email') {
      e.preventDefault()
      navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      window.location.href = href
    }
  }

  /* ── Terminal state ─────────────────────────────────────────── */
  const [history, setHistory] = useState<string[]>([
    'The Digital Nexus Terminal [v2.0.0]',
    'Type "help" for available commands.',
    '',
  ])
  const [cmd, setCmd] = useState('')
  const termBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    termBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  /* ── React Hook Form + Zod ──────────────────────────────────── */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  /* ── Form submit ────────────────────────────────────────────── */
  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    setErrMsg('')

    /* Sanitize all fields before sending */
    const payload = {
      name:    sanitizeText(data.name),
      email:   data.email.toLowerCase().trim(),
      message: sanitizeText(data.message),
    }

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        const json = await res.json().catch(() => ({}))
        throw new Error(json?.error ?? 'Server error — please try email directly.')
      }
    } catch (err: unknown) {
      /* If backend isn't wired yet, show a helpful message */
      const isNetworkError =
        err instanceof TypeError && err.message.includes('fetch')
      setErrMsg(
        isNetworkError
          ? 'Backend not connected yet. Email me directly at ' + EMAIL
          : err instanceof Error
            ? err.message
            : 'Something went wrong.',
      )
      setStatus('error')
    }
  }

  /* ── Terminal command handler ───────────────────────────────── */
  const handleCmd = (e: React.FormEvent) => {
    e.preventDefault()
    const command = cmd.trim().toLowerCase()
    if (!command) return

    const push = (...lines: string[]) =>
      setHistory((p) => [...p, `sumeet@nexus:~$ ${command}`, ...lines, ''])

    switch (command) {
      case 'help':
        push(HELP_TEXT)
        break
      case 'ls':
        push(LS_TEXT)
        break
      case 'whoami':
        push('Sumeet Kanhiya — Full Stack Developer (PERN Stack)', 'DUET, Karachi · Open to opportunities globally.')
        break
      case 'contact':
        push('Switching to GUI form mode...', '→ Use the Form tab for a guided contact experience.')
        setTimeout(() => setMode('form'), 600)
        break
      case 'github':
        push(`Opening ${GITHUB_URL} …`)
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
        break
      case 'clear':
        setHistory(['Terminal cleared.', ''])
        break
      default:
        push(`Command not found: "${command}". Type "help" for available commands.`)
    }

    setCmd('')
  }

  /* ── Input field shared styles ────────────────────────────────────── */
  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 ${
      hasError
        ? 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30'
        : 'border-border focus:border-primary/60 focus:ring-1 focus:ring-primary/20'
    }`

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          {/* <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
            {'// 03. Contact'}
          </p> */}
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Scalable.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Currently open to full-time roles and freelance opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass overflow-hidden rounded-3xl"
        >
          {/* Tab bar */}
          <div className="flex border-b border-border">
            {(['form', 'terminal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`flex flex-1 items-center justify-center gap-2 px-6 py-4 font-mono text-sm transition-colors ${
                  mode === tab
                    ? 'border-b-2 border-primary text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'terminal' && <Terminal className="h-4 w-4" />}
                {tab === 'form' ? 'Form Mode' : 'Terminal Mode'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* ── GUI Form ── */}
            {mode === 'form' && (
              <>
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <CheckCircle2 className="h-14 w-14 text-green-400" />
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground">
                      I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); reset() }}
                      className="mt-2 flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <RotateCcw className="h-4 w-4" /> Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        {...register('name')}
                        className={fieldClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1.5 font-mono text-xs text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className={fieldClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 font-mono text-xs text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell me about your project or opportunity…"
                        {...register('message')}
                        className={`${fieldClass(!!errors.message)} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 font-mono text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Server-level error */}
                    {status === 'error' && errMsg && (
                      <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        <p className="font-mono text-xs text-destructive">{errMsg}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting || status === 'loading'}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 font-semibold text-background transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                    >
                      {isSubmitting || status === 'loading' ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                      ) : (
                        <><Send className="h-4 w-4" /> Send Message</>
                      )}
                    </button>

                    {/* <p className="text-center font-mono text-[11px] text-muted-foreground/60">
                      Fields validated with Zod · Inputs sanitized before transmission
                    </p> */}
                  </form>
                )}
              </>
            )}

            {/* ── Terminal Mode ── */}
            {mode === 'terminal' && (
              <div>
                {/* Output */}
                <div className="mb-4 h-64 overflow-y-auto rounded-xl border border-border bg-[#0d0d14] p-4 font-mono text-[12px] leading-6">
                  {history.map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        line.startsWith('sumeet@nexus')
                          ? 'text-primary'
                          : line.startsWith('Command not found')
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                  <div ref={termBottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleCmd} className="flex items-center gap-2 rounded-xl border border-border bg-[#0d0d14] px-4 py-3">
                  <span className="font-mono text-xs text-primary select-none">
                    sumeet@nexus:~$
                  </span>
                  <input
                    value={cmd}
                    onChange={(e) => setCmd(e.target.value)}
                    placeholder="type a command…"
                    autoFocus
                    spellCheck={false}
                    className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary/20 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/30"
                    aria-label="Execute command"
                  >
                    ↵
                  </button>
                </form>

                <p className="mt-3 font-mono text-[11px] text-muted-foreground/50">
                  Try: <span className="text-primary">help</span> · <span className="text-primary">whoami</span> · <span className="text-primary">ls</span> · <span className="text-primary">github</span>
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick social links below the contact card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {[
            { label: 'GitHub',   href: GITHUB_URL  },
            { label: 'LinkedIn', href: LINKEDIN_URL },
            { label: 'Email',    href: `mailto:${EMAIL}` },
          ].map(({ label, href }) => (
            <div key={label} className="relative">
              <a
                href={href}
                onClick={(e) => handleEmailClick(e, label, href)}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="rounded-xl border border-border px-5 py-3 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground block"
              >
                {label}
              </a>
              {label === 'Email' && copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-background shadow-md transition-all duration-300">
                  Copied!
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
