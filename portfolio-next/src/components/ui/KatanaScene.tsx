"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import KatanaModel from "./KatanaModel";
import { Skill } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface KatanaSceneProps {
  skills: Skill[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

// ── 3D Finite Coverflow Controller ──
function CoverflowController({
  skills,
  targetOffset,
  hoveredIndex,
  onHoverStart,
  onHoverEnd,
  onKatanaClick,
}: {
  skills: Skill[];
  targetOffset: number;
  hoveredIndex: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  onKatanaClick: (index: number) => void;
}) {
  const currentOffsetRef = useRef(targetOffset);
  const [currentOffset, setCurrentOffset] = useState(targetOffset);

  useFrame((_state, delta) => {
    // Smooth frame-rate independent inertia interpolation
    const lerpFactor = 1 - Math.pow(0.0001, delta);
    const prev = currentOffsetRef.current;
    const next = THREE.MathUtils.lerp(prev, targetOffset, lerpFactor);

    currentOffsetRef.current = next;
    // Re-render slot positions when moving
    if (Math.abs(next - prev) > 0.0005) {
      setCurrentOffset(next);
    }
  });

  return (
    <>
      {skills.map((skill, index) => {
        // Finite non-wrapping delta (strictly clamped 0 to skills.length - 1)
        const delta = index - currentOffset;
        const absDelta = Math.abs(delta);

        // Render katanas within the 5-item visible window (|delta| <= 2.5)
        const isVisible = absDelta <= 2.5;
        if (!isVisible) return null;

        // ── 3D Compact Coverflow Math (Strictly fits inside card container) ──
        // Center: delta = 0 -> X = 0, Z = 0, Scale = 2.4 (clean, elegant & proportional)
        // Immediate Sides: delta = ±1 -> X = ±1.45, Z = -1.40, Scale = 1.92 (80%)
        // Far Sides: delta = ±2 -> X = ±2.85, Z = -2.80, Scale = 1.44 (60%)
        const x = Math.sign(delta) * Math.pow(absDelta, 0.95) * 1.45;
        const z = -absDelta * 1.40;
        // Positioned in the lower portion of the card so the header above has ample breathing room
        const y = -0.62 - 0.08 * absDelta;
        // Scaled down model size to fit comfortably within the card height
        const scale = 2.4 * Math.max(0.55, 1.0 - 0.20 * absDelta);

        const isCenter = absDelta < 0.45;

        return (
          <KatanaModel
            key={skill.id}
            skill={skill}
            position={[x, y, z]}
            scale={scale}
            slotDelta={delta}
            isHovered={hoveredIndex === index}
            isCenter={isCenter}
            onHoverStart={() => onHoverStart(index)}
            onHoverEnd={onHoverEnd}
            onClick={() => onKatanaClick(index)}
            tiltAngle={37}
          />
        );
      })}
    </>
  );
}

export default function KatanaScene({
  skills,
  activeIndex,
  onActiveChange,
}: KatanaSceneProps) {
  const [targetOffset, setTargetOffset] = useState(activeIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isBoxVisibleRef = useRef(false);

  // Synchronize targetOffset when parent activeIndex changes
  useEffect(() => {
    setTargetOffset(activeIndex);
  }, [activeIndex]);

  // Track card container visibility with IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Box is active when at least 60% is visible in viewport
        isBoxVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.60;
      },
      { threshold: [0, 0.25, 0.5, 0.60, 0.75, 0.9, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Wheel & drag interaction states
  const lastWheelTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const N = skills.length;

  // ── Visibility-Based Wheel Event Handler (Locks scroll ONLY when box is in view, releases at ends) ──
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;

      // 1. DO NOT intercept scroll if card is not substantially visible in viewport!
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / rect.height;
        if (ratio < 0.60) {
          return; // Let user scroll freely into or past the section
        }
      }

      const dir = Math.sign(delta); // > 0 scrolling down, < 0 scrolling up
      const now = performance.now();

      if (dir > 0) {
        // User scrolling DOWN
        if (targetOffset < N - 1) {
          // Box in view & not at final katana: LOCK scroll and advance katana!
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 200) {
            lastWheelTimeRef.current = now;
            const next = Math.min(N - 1, Math.round(targetOffset + 1));
            setTargetOffset(next);
            onActiveChange(next);
          }
        } else {
          // At final katana (Git & GitHub): RELEASE scroll! Allow natural page scroll down
        }
      } else if (dir < 0) {
        // User scrolling UP
        if (targetOffset > 0) {
          // Box in view & not at first katana: LOCK scroll and retreat katana!
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 200) {
            lastWheelTimeRef.current = now;
            const prev = Math.max(0, Math.round(targetOffset - 1));
            setTargetOffset(prev);
            onActiveChange(prev);
          }
        } else {
          // At first katana (TypeScript): RELEASE scroll! Allow natural page scroll up
        }
      }
    },
    [N, targetOffset, onActiveChange]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Non-passive wheel listener allows conditional e.preventDefault()
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // ── Drag / Swipe Interaction Handlers ──
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = targetOffset;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = dragStartXRef.current - e.clientX;
    const offsetDelta = diff / 160; // Drag sensitivity
    const clamped = Math.max(0, Math.min(N - 1, dragStartOffsetRef.current + offsetDelta));
    setTargetOffset(clamped);
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const snapped = Math.max(0, Math.min(N - 1, Math.round(targetOffset)));
      setTargetOffset(snapped);
      onActiveChange(snapped);
    }
  };

  // Direct click on katana or pagination pill
  const handleKatanaClick = (clickedIndex: number) => {
    const clamped = Math.max(0, Math.min(N - 1, clickedIndex));
    setTargetOffset(clamped);
    onActiveChange(clamped);
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* ── High-Res Anti-Aliased 3D Canvas (Cleanly framed inside card) ── */}
      <Canvas
        camera={{ position: [0, 0.05, 7.6], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2)]}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Suspense fallback={null}>
          {/* ── Cinematic 3-Point Studio Lighting ── */}
          <ambientLight intensity={0.48} color="#d0c8f0" />

          {/* Key light catching the polished steel cutting edges */}
          <directionalLight
            position={[6, 12, 8]}
            intensity={3.4}
            color="#fffcf5"
            castShadow
          />

          {/* Cool rim light for metal silhouette edge separation */}
          <directionalLight
            position={[-7, 8, -4]}
            intensity={2.2}
            color="#82a5e8"
          />

          {/* Under-bounce point light */}
          <pointLight position={[0, -3, 4]} intensity={0.5} color="#2a1840" />

          {/* HDR environment reflections for urushi lacquer and steel luster */}
          <Environment preset="night" />

          {/* ── 3D Finite Coverflow Controller ── */}
          <CoverflowController
            skills={skills}
            targetOffset={targetOffset}
            hoveredIndex={hoveredIndex}
            onHoverStart={(idx) => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            onKatanaClick={handleKatanaClick}
          />
        </Suspense>
      </Canvas>

      {/* ── Carousel Navigation Controls (Sleek Dark Glass) ── */}
      <div className="absolute inset-x-4 md:inset-x-8 top-[58%] -translate-y-1/2 flex justify-between pointer-events-none z-30">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.blur();
            if (activeIndex > 0) {
              handleKatanaClick(activeIndex - 1);
            }
          }}
          className={`pointer-events-auto w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200 ${
            activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Previous Mastery"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          disabled={activeIndex === N - 1}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.blur();
            if (activeIndex < N - 1) {
              handleKatanaClick(activeIndex + 1);
            }
          }}
          className={`pointer-events-auto w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200 ${
            activeIndex === N - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Next Mastery"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Carousel Pagination Indicators (Optimized for 10 Skills) ── */}
      <div className="absolute bottom-7 inset-x-0 flex justify-center items-center gap-1.5 md:gap-2 pointer-events-auto z-30">
        {skills.map((skill, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.blur();
                handleKatanaClick(index);
              }}
              className="group py-2 px-0.5 md:px-1 focus:outline-none cursor-pointer"
              aria-label={`Select ${skill.name}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 md:w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "w-2 md:w-2.5 bg-white/20 group-hover:bg-white/40"
                }`}
                style={isActive ? { backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}` } : undefined}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
