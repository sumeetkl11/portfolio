'use client'

import { useState } from 'react'
import { Link2, Zap, BarChart2, Copy, Check } from 'lucide-react'

interface ShortLink {
  code:     string
  longUrl:  string
  clicks:   number
  latency:  string
  created:  string
}

const INITIAL_LINKS: ShortLink[] = [
  { code: 'gh-pk1', longUrl: 'https://github.com/sumeetkanhiya',          clicks: 84, latency: '18ms', created: '2 min ago' },
  { code: 'port01', longUrl: 'https://sumeetkanhiya.dev',                  clicks: 212, latency: '12ms', created: '5 min ago' },
  { code: 'tb-ai',  longUrl: 'https://github.com/sumeetkanhiya/tastebuds', clicks: 47, latency: '21ms', created: '1 hr ago' },
]

function randomCode(alias?: string): string {
  return alias?.trim() || Math.random().toString(36).slice(2, 7)
}

export function LinkforgeDemo() {
  const [links,       setLinks]       = useState<ShortLink[]>(INITIAL_LINKS)
  const [longUrl,     setLongUrl]     = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [copied,      setCopied]      = useState<string | null>(null)
  const [error,       setError]       = useState('')

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!longUrl.trim()) { setError('Please enter a URL.'); return }
    try { new URL(longUrl) } catch {
      setError('Please enter a valid URL starting with https://')
      return
    }

    const code = randomCode(customAlias)
    if (links.some((l) => l.code === code)) {
      setError('That alias is taken. Try another.')
      return
    }

    setLinks([
      {
        code,
        longUrl: longUrl.trim(),
        clicks:  0,
        latency: `${Math.floor(Math.random() * 14 + 10)}ms`,
        created: 'just now',
      },
      ...links,
    ])
    setLongUrl('')
    setCustomAlias('')
  }

  const copy = (code: string) => {
    navigator.clipboard?.writeText(`https://lnk.fge/${code}`).catch(() => null)
    setCopied(code)
    setTimeout(() => setCopied(null), 1800)
  }

  const incrementClick = (code: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.code === code ? { ...l, clicks: l.clicks + 1 } : l)),
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
          <Link2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground">Linkforge</h4>
          <p className="font-mono text-xs text-muted-foreground">url-shortener / analytics / next.js / postgresql</p>
        </div>
      </div>

      {/* Shortener form */}
      <form onSubmit={handleShorten} className="mb-5 space-y-3">
        <div className="flex gap-2">
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://your-long-url.com/path"
            className="flex-1 rounded-lg border border-border bg-input px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors"
          />
          <input
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="alias (opt.)"
            className="w-32 rounded-lg border border-border bg-input px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent/60 transition-colors"
            maxLength={20}
          />
        </div>
        {error && (
          <p className="font-mono text-xs text-destructive">{error}</p>
        )}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <Zap className="h-4 w-4" />
          Forge Link
        </button>
      </form>

      {/* Link table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
          <div className="bg-background/80 px-3 py-2">Short URL</div>
          <div className="bg-background/80 px-3 py-2 text-center flex items-center gap-1"><BarChart2 className="h-3 w-3" /> Clicks</div>
          <div className="bg-background/80 px-3 py-2">Latency</div>
          <div className="bg-background/80 px-3 py-2">Copy</div>
        </div>

        <div className="divide-y divide-border">
          {links.map((link) => (
            <div
              key={link.code}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-px bg-card/30"
            >
              <div className="px-3 py-2.5">
                <a
                  href={link.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => incrementClick(link.code)}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  lnk.fge/<span className="font-bold">{link.code}</span>
                </a>
                <p className="truncate font-mono text-[10px] text-muted-foreground/60 max-w-[160px]">
                  {link.longUrl}
                </p>
              </div>
              <div className="px-3 py-2.5 text-center font-mono text-xs text-foreground">
                {link.clicks}
              </div>
              <div className="px-3 py-2.5 font-mono text-xs text-accent">
                {link.latency}
              </div>
              <div className="px-3 py-2.5">
                <button
                  onClick={() => copy(link.code)}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Copy short URL"
                >
                  {copied === link.code
                    ? <Check className="h-3.5 w-3.5 text-green-400" />
                    : <Copy className="h-3.5 w-3.5" />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] text-muted-foreground/50">
        Click a short URL to simulate a redirect & increment the click counter.
      </p>
    </div>
  )
}
