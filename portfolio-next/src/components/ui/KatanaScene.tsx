"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { KatanaSkill } from "@/types";
import KatanaModel from "./KatanaModel";

interface KatanaSceneProps {
  skills: KatanaSkill[];
}

export default function KatanaScene({ skills }: KatanaSceneProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Max 4 katanas displayed prominently on screen as requested
  const displayedSkills = skills.slice(0, 4);

  // Spacing for 4 heroically proportioned katanas
  const SPACING = 2.35;
  // Slight left offset (-0.55) so rightward diagonal unsheath remains optically centered
  const startX = -((displayedSkills.length - 1) * SPACING) / 2 - 0.55;

  return (
    <div className="relative w-full h-full">
      {/* ── 3D Canvas ── */}
      <Canvas
        camera={{ position: [0, 0.2, 9.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* ── Cinematic 3-Point Lighting Setup ── */}
          {/* Ambient fill */}
          <ambientLight intensity={0.42} color="#c0b8e8" />

          {/* Key light catching the diagonal steel blade edge */}
          <directionalLight
            position={[7, 12, 7]}
            intensity={3.2}
            color="#fff8f0"
            castShadow
          />

          {/* Cool rim light for metal silhouette edge separation */}
          <directionalLight
            position={[-7, 8, -4]}
            intensity={1.9}
            color="#80a0e0"
          />

          {/* Under-bounce point light */}
          <pointLight position={[0, -3, 4]} intensity={0.5} color="#2a1840" />

          {/* HDR environment reflections for urushi lacquer and mirror steel */}
          <Environment preset="night" />

          {/* ── 4 Tilted Katana Models ── */}
          {displayedSkills.map((skill, index) => (
            <KatanaModel
              key={skill.id}
              skill={skill}
              position={[startX + index * SPACING, -0.65, 0]}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() =>
                setHoveredIndex((prev) => (prev === index ? null : prev))
              }
              getLabelEl={() => labelRefs.current[index]}
              tiltAngle={48}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* ── Interactive 4-Column Hover & Touch Zones ── */}
      <div 
        className="absolute inset-0 grid grid-cols-4 z-10"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {displayedSkills.map((skill, index) => (
          <div
            key={skill.id}
            className="h-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() =>
              setHoveredIndex((prev) => (prev === index ? null : index))
            }
          />
        ))}
      </div>

      {/* ── HTML DOM Text Overlay (Positioned via Vector3.project) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
        {displayedSkills.map((skill, index) => (
          <div
            key={skill.id}
            ref={(el) => {
              labelRefs.current[index] = el;
            }}
            className="absolute top-0 left-0 opacity-0 will-change-transform flex flex-col items-center pointer-events-none select-none transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            {/* Tag / Category Badge */}
            <span
              className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] px-3 py-0.5 rounded-full border mb-1.5 backdrop-blur-md"
              style={{
                borderColor: `${skill.color}60`,
                backgroundColor: `${skill.color}15`,
                color: skill.color,
                boxShadow: `0 0 14px ${skill.color}30`,
              }}
            >
              Weapon {index + 1}
            </span>

            {/* Skill Name */}
            <span
              className="text-lg md:text-2xl font-bold tracking-[0.22em] uppercase font-serif"
              style={{
                color: "#ffffff",
                textShadow: `0 0 12px ${skill.color}, 0 0 28px ${skill.color}90, 0 0 50px ${skill.color}45`,
              }}
            >
              {skill.name}
            </span>

            {/* Glowing Accent Line */}
            <div
              className="w-20 h-[2px] mt-1.5 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${skill.color} 50%, transparent 100%)`,
                boxShadow: `0 0 10px ${skill.color}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
