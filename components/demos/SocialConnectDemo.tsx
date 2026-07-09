'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageSquare } from 'lucide-react'

interface Message {
  id:     number
  sender: 'user' | 'bot'
  text:   string
  time:   string
}

interface DbLog {
  id:   number
  text: string
  type: 'ws' | 'db' | 'sys'
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, sender: 'bot', text: 'SocialConnect WebSocket server online. This is a live architecture simulation.', time: 'System' },
  { id: 2, sender: 'bot', text: 'Ask me about the tech stack, real-time events, or PostgreSQL schema.', time: 'System' },
]

const INITIAL_LOGS: DbLog[] = [
  { id: 1, text: '[SYS]  PostgreSQL pool initialized — max 20 connections', type: 'sys' },
  { id: 2, text: '[WS]   WebSocket server listening on port 8080',           type: 'ws'  },
  { id: 3, text: '[DB]   CREATE TABLE IF NOT EXISTS messages (...)',         type: 'db'  },
]

function getBotReply(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
    return 'Hey! This chat simulates a real WebSocket event loop. Each message you send triggers an INSERT in the simulated DB log on the right.'
  if (t.includes('stack') || t.includes('tech') || t.includes('built'))
    return 'SocialConnect runs Node.js + Express on the backend, native WebSocket frames (no polling), and a normalized PostgreSQL schema. Redis pub/sub handles multi-instance broadcasting.'
  if (t.includes('postgres') || t.includes('sql') || t.includes('database'))
    return 'Messages are stored with a composite index on (conversation_id, created_at DESC) for O(log n) cursor-based pagination. No OFFSET — it scales.'
  if (t.includes('websocket') || t.includes('socket') || t.includes('real-time'))
    return 'We use native ws:// frames — not Socket.io. The server maintains a Map<userId, WebSocket> for O(1) lookup when broadcasting presence updates.'
  if (t.includes('redis'))
    return 'Redis pub/sub enables horizontal scaling: multiple Node instances subscribe to the same channel and forward events to their connected WebSocket clients.'
  return "Great question! In production, this response is delivered via a server-sent WebSocket frame in < 50ms average latency. What else would you like to know?"
}

export function SocialConnectDemo() {
  const [messages,  setMessages]  = useState<Message[]>(INITIAL_MESSAGES)
  const [dbLogs,    setDbLogs]    = useState<DbLog[]>(INITIAL_LOGS)
  const [input,     setInput]     = useState('')
  const [nextId,    setNextId]    = useState(10)
  const chatBottom = useRef<HTMLDivElement>(null)
  const logBottom  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  useEffect(() => {
    logBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dbLogs])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { id: nextId, sender: 'user', text: input, time: ts }

    setMessages((p) => [...p, userMsg])
    setDbLogs((p) => [
      ...p,
      { id: nextId + 1, text: `[WS]  FRAME_RECV  "${input.slice(0, 24)}…"`, type: 'ws' },
      { id: nextId + 2, text: `[DB]  INSERT INTO messages (id, sender, body, ts) VALUES (uuid(), 'user', '…', NOW())`, type: 'db' },
      { id: nextId + 3, text: `[DB]  Query OK — 1 row — 12ms`,              type: 'db' },
    ])
    setNextId((n) => n + 10)
    setInput('')

    /* Simulate async bot reply */
    setTimeout(() => {
      const reply: Message = {
        id:     nextId + 5,
        sender: 'bot',
        text:   getBotReply(input),
        time:   new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((p) => [...p, reply])
      setDbLogs((p) => [
        ...p,
        { id: nextId + 6, text: `[WS]  FRAME_SEND event="message" to user:client`, type: 'ws' },
        { id: nextId + 7, text: `[DB]  INSERT INTO messages (id, sender, body, ts) VALUES (uuid(), 'bot', '…', NOW())`, type: 'db' },
      ])
      setNextId((n) => n + 10)
    }, 1400)
  }

  const logColor = (type: DbLog['type']) => {
    if (type === 'ws')  return 'text-primary'
    if (type === 'db')  return 'text-accent'
    return 'text-muted-foreground'
  }

  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
          <MessageSquare className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground">SocialConnect</h4>
          <p className="font-mono text-xs text-muted-foreground">websocket / node.js / postgresql</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span className="font-mono text-[10px] text-green-400">WS CONNECTED</span>
        </div>
      </div>

      {/* Two-panel layout: chat + DB logs */}
      <div className="grid gap-3 md:grid-cols-2">
        {/* Chat panel */}
        <div className="flex flex-col">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Chat Interface
          </div>
          <div className="h-52 overflow-y-auto rounded-xl border border-border bg-card/50 p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-background'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-0.5 font-mono text-[10px] text-muted-foreground/50">
                  {msg.time}
                </span>
              </div>
            ))}
            <div ref={chatBottom} />
          </div>
          <form onSubmit={send} className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors"
              maxLength={200}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center justify-center rounded-lg bg-accent px-3 py-2 text-background transition-all hover:opacity-90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* DB log panel */}
        <div className="flex flex-col">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Server Logs
          </div>
          <div className="h-52 overflow-y-auto rounded-xl border border-border bg-[#0d0d14] p-3 font-mono text-[11px] space-y-0.5">
            {dbLogs.map((log) => (
              <div key={log.id} className={`leading-5 ${logColor(log.type)}`}>
                {log.text}
              </div>
            ))}
            <div ref={logBottom} />
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/50">
            Send a message to trigger real WS + DB events →
          </p>
        </div>
      </div>
    </div>
  )
}
