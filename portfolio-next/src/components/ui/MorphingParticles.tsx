"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 5000;

function Particles() {
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
    uColor1: { value: new THREE.Color("#ffffff") },
    uColor2: { value: new THREE.Color("#555555") }
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={PARTICLE_COUNT}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          attribute float aRandom;
          varying float vRandom;
          
          void main() {
            vRandom = aRandom;
            
            vec3 pos = position;
            
            // Add some organic noise/morphing movement
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

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (1.5 + aRandom * 2.0) * (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vRandom;
          
          void main() {
            // Create circular particle
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            if(distanceToCenter > 0.5) discard;
            
            // Soft edge
            float alpha = 1.0 - (distanceToCenter * 2.0);
            
            // Color mix based on random value
            vec3 color = mix(uColor1, uColor2, vRandom);
            
            gl_FragColor = vec4(color, alpha * 0.5); // 0.5 opacity for atmospheric look
          }
        `}
      />
    </points>
  );
}

export default function MorphingParticles() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
