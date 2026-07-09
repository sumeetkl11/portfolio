'use client'

import dynamic from 'next/dynamic'

/**
 * This wrapper must be a Client Component ('use client') because
 * Next.js 16 does not allow `ssr: false` inside Server Components.
 * The dynamic import here excludes Three.js from the server bundle entirely.
 */
const CanvasBackground = dynamic(
  () => import('@/components/CanvasBackground').then((m) => m.CanvasBackground),
  { ssr: false }
)

export function DynamicScene() {
  return <CanvasBackground />
}
