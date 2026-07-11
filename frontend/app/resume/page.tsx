import type { Metadata } from 'next'
import { FULL_NAME } from '@/lib/constants'
import { ResumeClient } from '@/components/ResumeClient'

/* ── SEO metadata (Server Component) ──────────────────────────── */
export const metadata: Metadata = {
  title: 'Resume',
  description: `${FULL_NAME} — Full Stack Developer resume. PERN stack, Android development, scalable backend architectures, and AI-integrated systems.`,
}

export default function ResumePage() {
  return <ResumeClient />
}
