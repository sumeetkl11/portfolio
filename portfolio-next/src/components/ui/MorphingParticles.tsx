"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 5000;

interface MouseState {
  x: number;
  y: number;
  active: number;
}

function Particles({ mouseRef }: { mouseRef: React.RefObject<MouseState> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const randoms = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create a sphere distribution
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      randoms[i] = Math.random();
    }
    
    return { positions, randoms };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseActive: { value: 0 },
    uColor1: { value: new THREE.Color("#ffffff") },
    uColor2: { value: new THREE.Color("#666666") }
  }), []);

  const smoothMouse = useRef({ x: 0, y: 0, active: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    // Smooth frame-rate independent inertia damping
    const lerpFactor = 1 - Math.pow(0.001, dt);

    const targetX = mouseRef.current.x;
    const targetY = mouseRef.current.y;
    const targetActive = mouseRef.current.active;

    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, targetX, lerpFactor);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, targetY, lerpFactor);
    smoothMouse.current.active = THREE.MathUtils.lerp(smoothMouse.current.active, targetActive, lerpFactor);

    if (pointsRef.current) {
      // 3D rotation parallax tracking cursor
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04 + smoothMouse.current.x * 0.45;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02 - smoothMouse.current.y * 0.35;

      // Group position translation
      pointsRef.current.position.x = smoothMouse.current.x * 1.1;
      pointsRef.current.position.y = smoothMouse.current.y * 0.7;
    }

    // World-space coordinates for shader interaction
    const aspect = state.viewport.aspect || 2;
    const worldMouseX = smoothMouse.current.x * (3.3 * aspect);
    const worldMouseY = smoothMouse.current.y * 3.3;

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.set(worldMouseX, worldMouseY);
    uniforms.uMouseActive.value = smoothMouse.current.active;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uMouseActive;
          attribute float aRandom;
          varying float vRandom;
          varying float vDist;
          
          void main() {
            vRandom = aRandom;
            
            vec3 pos = position;
            
            // Organic noise/morphing movement
            float noiseFreq = 0.5;
            float noiseAmp = 0.5;
            vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.1, pos.y * noiseFreq + uTime * 0.1, pos.z * noiseFreq);
            
            // Simple sin/cos noise replacement for morphing
            pos.x += sin(noisePos.y * 3.0 + uTime) * noiseAmp * aRandom;
            pos.y += cos(noisePos.z * 3.0 + uTime) * noiseAmp * aRandom;
            pos.z += sin(noisePos.x * 3.0 + uTime) * noiseAmp * aRandom;
            
            // Expand/contract based on time
            float scale = 1.0 + sin(uTime * 0.5 + aRandom * 10.0) * 0.2;
            pos *= scale;

            // ── Dynamic Cursor Follow & Swirl ──
            vec2 diff = pos.xy - uMouse;
            float dist = length(diff);
            vDist = dist;

            float radius = 3.8;
            if (dist < radius && uMouseActive > 0.01) {
              float normDist = 1.0 - (dist / radius);
              float force = pow(normDist, 1.5) * uMouseActive;
              
              // Perpendicular vortex tangent
              vec2 dir = normalize(diff + vec2(0.001));
              vec2 swirl = vec2(-dir.y, dir.x);
              
              pos.xy += swirl * force * 1.1 * sin(uTime * 2.0 + aRandom * 6.28);
              pos.xy -= dir * force * 0.4;
              pos.z += force * 0.7;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            float cursorBoost = 1.0 + smoothstep(3.8, 0.0, dist) * uMouseActive * 1.5;
            gl_PointSize = (1.5 + aRandom * 2.0) * cursorBoost * (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uMouseActive;
          varying float vRandom;
          varying float vDist;
          
          void main() {
            // Create circular particle
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            if(distanceToCenter > 0.5) discard;
            
            // Soft edge
            float alpha = 1.0 - (distanceToCenter * 2.0);
            
            // Color mix based on random value
            vec3 color = mix(uColor1, uColor2, vRandom);
            
            // Luminous white highlight near cursor
            float glow = smoothstep(3.8, 0.3, vDist) * uMouseActive;
            color = mix(color, vec3(1.0, 1.0, 1.0), glow * 0.85);
            
            float finalAlpha = mix(alpha * 0.5, alpha * 0.9, glow);
            gl_FragColor = vec4(color, finalAlpha);
          }
        `}
      />
    </points>
  );
}

export default function MorphingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, active: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView = e.clientY >= rect.top - 120 && e.clientY <= rect.bottom + 120;

      if (inView) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.x = THREE.MathUtils.clamp(x, -1.5, 1.5);
        mouseRef.current.y = THREE.MathUtils.clamp(y, -1.5, 1.5);
        mouseRef.current.active = 1;
      } else {
        mouseRef.current.active = 0;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Particles mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
