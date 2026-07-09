'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

/* ── TorusKnot — dual-mesh: solid glass + wire overlay ────────── */
function TorusKnot() {
  const solidRef = useRef<THREE.Mesh>(null)
  const wireRef  = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const { pointer } = state

    if (solidRef.current) {
      // Continuous rotation
      solidRef.current.rotation.x += delta * 0.08
      solidRef.current.rotation.y += delta * 0.12

      // Smooth mouse parallax — lerp toward pointer position
      solidRef.current.position.x = THREE.MathUtils.lerp(
        solidRef.current.position.x,
        pointer.x * 0.6,
        0.04,
      )
      solidRef.current.position.y = THREE.MathUtils.lerp(
        solidRef.current.position.y,
        pointer.y * 0.4,
        0.04,
      )
    }

    // Keep wire overlay perfectly aligned with the solid mesh
    if (wireRef.current && solidRef.current) {
      wireRef.current.rotation.copy(solidRef.current.rotation)
      wireRef.current.position.copy(solidRef.current.position)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Solid mesh — glass-like physical material with transmission */}
      <mesh ref={solidRef}>
        <torusKnotGeometry args={[1.4, 0.42, 128, 20]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          roughness={0.15}
          metalness={0.4}
          transmission={0.6}   /* glass refraction — only meshPhysicalMaterial */
          thickness={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wire overlay — scale 1.002 so it sits just outside the solid */}
      <mesh ref={wireRef} scale={1.002}>
        <torusKnotGeometry args={[1.4, 0.42, 96, 16]} />
        <meshBasicMaterial
          color="#7c6cf5"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </Float>
  )
}

/* ── Particle field ────────────────────────────────────────────── */
function Particles({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  /**
   * useRef<Float32Array> — positions are created ONCE and stored in a ref.
   * This avoids recreating the Float32Array on every render,
   * preventing unnecessary garbage collection pressure.
   */
  const positions = useRef<Float32Array | null>(null)
  if (!positions.current) {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    positions.current = arr
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015
      // Gentle x-axis tilt toward mouse
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        state.pointer.y * 0.05,
        0.02,
      )
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#5aa9e6"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}   /* prevents Z-fighting with background */
      />
    </points>
  )
}

/* ── CSS fallback — shown if WebGL is unavailable ──────────────── */
const CssFallback = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.20_0.04_280)_0%,oklch(0.13_0.025_275)_70%)]"
  />
)

/* ── Main exported Scene ────────────────────────────────────────── */
export function Scene() {
  /**
   * PerformanceMonitor: adaptive DPR.
   * onDecline → drop to [1,1] if GPU can't sustain 60fps.
   * onIncline → restore to [1,1.5] when load eases.
   * This is absent from all other builds — it's the key perf differentiator.
   */
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        fallback={<CssFallback />}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([1, 1])}
          onIncline={() => setDpr([1, 1.5])}
        >
          {/* Scene background color */}
          <color attach="background" args={['#14141f']} />

          {/* Depth fog — fades objects at distance for atmosphere */}
          <fog attach="fog" args={['#14141f', 6, 16]} />

          {/* Lighting rig */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 4]}  intensity={1.2} color="#8ec5ff" />
          <pointLight      position={[-4, -2, 2]} intensity={6}   color="#7c6cf5" />

          {/* Defer rendering until geometry is ready */}
          <Suspense fallback={null}>
            <TorusKnot />
            <Particles />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
