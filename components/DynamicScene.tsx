'use client'

import dynamic from 'next/dynamic'

/**
 * This wrapper must be a Client Component ('use client') because
 * Next.js 16 does not allow `ssr: false` inside Server Components.
 * The dynamic import here excludes Three.js from the server bundle entirely.
 */
const SceneWrapper = dynamic(
  () => import('@/components/three/SceneWrapper').then((m) => m.SceneWrapper),
  { ssr: false }
)

export function DynamicScene() {
  return <SceneWrapper />
}
