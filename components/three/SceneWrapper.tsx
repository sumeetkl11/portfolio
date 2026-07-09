'use client'

import { Suspense, useEffect, useState } from 'react'
import { WebGLErrorBoundary } from './WebGLErrorBoundary'
import { Scene }              from './Scene'
import { useSceneVisibility } from '@/lib/sceneStore'

/* Fallback shown during SSR, reduced-motion, WebGL failure, or disabled 3D */
const Fallback = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10"
    style={{
      background:
        'radial-gradient(ellipse at center, oklch(0.20 0.04 280) 0%, oklch(0.13 0.025 275) 70%)',
    }}
  />
)

export function SceneWrapper() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [is3DVisible] = useSceneVisibility()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Respect the OS accessibility preference or user toggle — unmount WebGL entirely */
  if (reducedMotion || !is3DVisible) return <Fallback />

  return (
    <WebGLErrorBoundary fallback={<Fallback />}>
      <Suspense fallback={<Fallback />}>
        <Scene />
      </Suspense>
    </WebGLErrorBoundary>
  )
}
