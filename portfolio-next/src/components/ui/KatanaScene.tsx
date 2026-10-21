"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import KatanaModel from "./KatanaModel";
import { Skill } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface KatanaSceneProps {
  skills: Skill[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

// 3D Finite Coverflow Controller
function CoverflowController({
  skills,
  targetOffset,
  activeIndex,
  hoveredIndex,
  onHoverStart,
  onHoverEnd,
  onKatanaClick,
}: {
  skills: Skill[];
  targetOffset: number;
  activeIndex: number;
  hoveredIndex: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  onKatanaClick: (index: number) => void;
}) {
  const currentOffsetRef = useRef(targetOffset);
  const [currentOffset, setCurrentOffset] = useState(targetOffset);

  useFrame((_state, delta) => {
    const lerpFactor = 1 - Math.exp(-9 * delta);
    const prev = currentOffsetRef.current;
    const next = THREE.MathUtils.lerp(prev, targetOffset, lerpFactor);

    currentOffsetRef.current = next;
    if (Math.abs(next - prev) > 0.0001) {
      setCurrentOffset(next);
    }
  });

  return (
    <>
      {skills.map((skill, index) => {
        const delta = index - currentOffset;
        const absDelta = Math.abs(delta);

        const isVisible = absDelta <= 2.5;
        if (!isVisible) return null;

        const x = Math.sign(delta) * Math.pow(absDelta, 0.95) * 1.45;
        const z = -absDelta * 1.4;
        const y = -0.62 - 0.08 * absDelta;
        const scale = 2.4 * Math.max(0.55, 1.0 - 0.2 * absDelta);
        const isCenter = index === activeIndex;

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
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetOffset = dragOffset ?? activeIndex;

  const lastWheelTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const N = skills.length;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;

      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / rect.height;
        if (ratio < 0.6) {
          return;
        }
      }

      const dir = Math.sign(delta);
      const now = performance.now();

      if (dir > 0) {
        if (targetOffset < N - 1) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 200) {
            lastWheelTimeRef.current = now;
            const next = Math.min(N - 1, Math.round(targetOffset + 1));
            setDragOffset(null);
            onActiveChange(next);
          }
        }
      } else if (dir < 0) {
        if (targetOffset > 0) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 200) {
            lastWheelTimeRef.current = now;
            const prev = Math.max(0, Math.round(targetOffset - 1));
            setDragOffset(null);
            onActiveChange(prev);
          }
        }
      }
    },
    [N, targetOffset, onActiveChange]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = targetOffset;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = dragStartXRef.current - e.clientX;
    const offsetDelta = diff / 160;
    const clamped = Math.max(0, Math.min(N - 1, dragStartOffsetRef.current + offsetDelta));
    setDragOffset(clamped);
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const snapped = Math.max(0, Math.min(N - 1, Math.round(targetOffset)));
      setDragOffset(null);
      onActiveChange(snapped);
    }
  };

  const handleKatanaClick = (clickedIndex: number) => {
    const clamped = Math.max(0, Math.min(N - 1, clickedIndex));
    setDragOffset(null);
    onActiveChange(clamped);
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      className="relative w-full h-full select-none cursor-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0.05, 7.6], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2)]}
        onCreated={({ gl, scene }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          const pmremGenerator = new THREE.PMREMGenerator(gl);
          pmremGenerator.compileEquirectangularShader();
          const envRoom = new RoomEnvironment();
          const envTarget = pmremGenerator.fromScene(envRoom, 0.04);
          scene.environment = envTarget.texture;
          pmremGenerator.dispose();
          envRoom.dispose();
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} color="#e4e4e7" />
          <directionalLight position={[6, 12, 8]} intensity={3.2} color="#ffffff" castShadow />
          <directionalLight position={[-7, 8, -4]} intensity={2.0} color="#a1a1aa" />
          <pointLight position={[0, -3, 4]} intensity={0.4} color="#52525b" />

          <CoverflowController
            skills={skills}
            targetOffset={targetOffset}
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            onHoverStart={(idx) => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            onKatanaClick={handleKatanaClick}
          />
        </Suspense>
      </Canvas>

      {/* Carousel Navigation Controls (Zero backdrop-filter over WebGL) */}
      <div className="absolute inset-x-4 md:inset-x-8 top-[56%] -translate-y-1/2 flex justify-between pointer-events-none z-30">
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
          className={`pointer-events-auto w-11 h-11 rounded-lg border border-white/15 bg-[#0a0a0a]/90 flex items-center justify-center text-white/75 hover:text-white hover:border-white/40 transition-colors duration-200 ${
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
          className={`pointer-events-auto w-11 h-11 rounded-lg border border-white/15 bg-[#0a0a0a]/90 flex items-center justify-center text-white/75 hover:text-white hover:border-white/40 transition-colors duration-200 ${
            activeIndex === N - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Next Mastery"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Interactive Dock Indicators */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center items-center gap-1.5 md:gap-2 pointer-events-auto z-30">
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
              className="group py-2 px-1 focus:outline-none cursor-pointer"
              aria-label={`Select ${skill.name}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? "w-7 bg-white"
                    : "w-2 bg-white/25 group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
