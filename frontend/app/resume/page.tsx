import type { Metadata } from 'next'
import { FULL_NAME } from '@/lib/constants'
import { ResumeClient } from '@/components/ResumeClient'

/* ── SEO metadata (Server Component) ──────────────────────────── */
export const metadata: Metadata = {
  title: 'Resume',
  description: `${FULL_NAME} — Full Stack & Backend Engineer resume. High-performance APIs, real-time WebSocket systems, WebGL rendering, and Edge computing.`,
}

export default function ResumePage() {
  return <ResumeClient />
}
