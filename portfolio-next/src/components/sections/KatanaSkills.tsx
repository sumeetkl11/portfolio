"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { katanaSkills, techMarqueeItems } from "@/lib/data";
import KineticHeading from "@/components/ui/KineticHeading";
import dynamic from "next/dynamic";

const KatanaScene = dynamic(() => import("@/components/ui/KatanaScene"), {
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-[#0a0a0a]">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto mb-3 border border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
          Initializing 3D Viewport...
        </p>
      </div>
    </div>
  ),
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KatanaSkills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const currentSkill = katanaSkills[activeIndex] || katanaSkills[0];

  useGSAP(
    () => {
      if (!containerRef.current || !cardWrapperRef.current) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardWrapperRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative z-20 w-full py-28 md:py-36 bg-black text-white flex flex-col items-center justify-center border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-white/50 tracking-widest block mb-3">
            03 · TECHNICAL ARSENAL
          </span>
          <KineticHeading
            text="Core Stack & Tooling"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white"
          />
        </div>
        <p className="text-xs font-mono text-white/50">
          INTERACTIVE 3D EXHIBITION · SCROLL OR DRAG BLADE
        </p>
      </div>

      {/* Unified 3D Viewport Container (Zero backdrop-filter over WebGL) */}
      <div
        ref={cardWrapperRef}
        className="relative z-20 w-full max-w-[1440px] h-[620px] md:h-[680px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div
          data-cursor="DRAG BLADE"
          className="relative w-full h-full rounded-2xl border border-white/12 bg-[#0a0a0a] overflow-hidden flex flex-col justify-between"
        >
          {/* Top Non-Occluding Active Skill Readout */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 px-6 md:px-10 pointer-events-none select-none border-b border-white/8 pb-5">
            <div className="flex items-center gap-3 font-mono text-xs text-white/50 tabular-nums">
              <span>MASTERY</span>
              <span className="text-white font-semibold">
                {String(activeIndex + 1).padStart(2, "0")} / {String(katanaSkills.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                key={currentSkill.id}
                className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase"
              >
                {currentSkill.name}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-white/45">
              <span>BLADE FORGE</span>
              <span aria-hidden="true">·</span>
              <span>ACTIVE NODE</span>
            </div>
          </div>

          {/* 3D Katana Scene */}
          <div className="absolute inset-0 w-full h-full z-10 cursor-none">
            <KatanaScene
              skills={katanaSkills}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
            />
          </div>

          {/* Bottom Helper Caption */}
          <div className="relative z-20 pb-1.5 text-center text-[10px] font-mono text-white/35 tracking-widest uppercase pointer-events-none select-none">
            Click Node or Drag Horizontally to Inspect
          </div>
        </div>
      </div>

      {/* Consolidated Monochrome Architectural Stack Ribbon */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mt-12">
        <div className="w-full overflow-hidden border-y border-white/10 py-4 bg-[#0a0a0a]">
          <div className="flex w-max animate-[marquee_32s_linear_infinite]">
            {[...techMarqueeItems, ...techMarqueeItems].map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className="flex items-center gap-6 px-3 text-xs font-mono text-white/65 tracking-wider uppercase whitespace-nowrap"
              >
                <span>{item}</span>
                <span className="text-white/25" aria-hidden="true">
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
