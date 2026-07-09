'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1 range
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Smooth mouse parallax + slow ambient rotation (small continuous motion)
    if (groupRef.current) {
      const ambientY = time * 0.015
      const ambientX = time * 0.008

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        ambientY + mouseRef.current.x * 0.25,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        ambientX + mouseRef.current.y * 0.25,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Particle System using Stars component */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={10}
        fade={true}
        speed={2}
      />
    </group>
  )
}

export function CanvasBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#0g0912]">  
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
