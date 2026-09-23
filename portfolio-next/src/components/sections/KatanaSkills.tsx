"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { katanaSkills } from "@/lib/data";
import KatanaScene from "@/components/ui/KatanaScene";

gsap.registerPlugin(ScrollTrigger);

export default function KatanaSkills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const currentSkill = katanaSkills[activeIndex] || katanaSkills[0];

  useGSAP(() => {
    if (!containerRef.current || !cardWrapperRef.current) return;

    // Smooth scrubbed slide-up & float reveal as user scrolls from Projects into KatanaSkills
    gsap.fromTo(
      cardWrapperRef.current,
      { y: 140, opacity: 0.2, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "top 25%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      }
    );

    if (headingRef.current && tagRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "top 25%",
          scrub: false,
        },
      });

      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      ).fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative z-20 w-full py-16 md:py-24 bg-black text-white flex flex-col items-center justify-center border-t border-white/5 overflow-hidden select-none"
    >
      {/* Cinematic subtle vignette backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,25,30,0.5)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-0" />

      {/* ── Single Unified Card / Box Container (All content encapsulated inside) ── */}
      <div ref={cardWrapperRef} className="relative z-20 w-full max-w-6xl h-[680px] md:h-[750px] mx-auto px-4 md:px-6">
        <div className="relative w-full h-full rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between">
          {/* Subtle inner card border highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/5 z-20" />
          
          {/* ── Fixed Header & Active Skill Text (Directly INSIDE Card at the top) ── */}
          <div className="relative z-20 flex flex-col items-center pt-7 md:pt-9 px-4 pointer-events-none select-none">
            {/* Technical Mastery Tag */}
            <div 
              ref={tagRef}
              className="px-3.5 py-0.5 mb-2 text-[10px] md:text-xs tracking-[0.25em] font-mono border border-white/20 rounded-full text-white/60 uppercase backdrop-blur-md"
            >
              Technical Mastery
            </div>

            {/* Main Heading */}
            <h2 
              ref={headingRef}
              className="text-2xl md:text-4xl lg:text-5xl font-display uppercase tracking-widest text-center"
            >
              My Skills
            </h2>

            {/* ── Fixed DOM Active Skill Display ── */}
            <div className="flex flex-col items-center mt-2 md:mt-3 transition-all duration-300 ease-out">
              {/* Mastery Number Badge */}
              <span
                className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.22em] px-3 py-0.5 rounded-full border mb-1 backdrop-blur-md transition-all duration-500"
                style={{
                  borderColor: `${currentSkill.color}60`,
                  backgroundColor: `${currentSkill.color}15`,
                  color: currentSkill.color,
                  boxShadow: `0 0 14px ${currentSkill.color}30`,
                }}
              >
                Mastery {String(activeIndex + 1).padStart(2, "0")} / {katanaSkills.length}
              </span>

              {/* Skill Title in Cinzel Display Typography */}
              <div className="h-7 md:h-9 flex items-center justify-center">
                <span
                  key={currentSkill.id}
                  className="text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.20em] uppercase font-display transition-all duration-500 animate-in fade-in zoom-in-95"
                  style={{
                    color: "#ffffff",
                    textShadow: `0 0 14px ${currentSkill.color}, 0 0 28px ${currentSkill.color}80, 0 0 50px ${currentSkill.color}40`,
                  }}
                >
                  {currentSkill.name}
                </span>
              </div>

              {/* Glowing Brand Gradient Accent Line */}
              <div
                className="w-16 md:w-24 h-[1.5px] mt-1 rounded-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${currentSkill.color} 50%, transparent 100%)`,
                  boxShadow: `0 0 8px ${currentSkill.color}`,
                }}
              />
            </div>
          </div>

          {/* ── 3D Scene (Positioned cleanly across card) ── */}
          <div className="absolute inset-0 w-full h-full z-10">
            <KatanaScene 
              skills={katanaSkills} 
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
            />
          </div>

          {/* ── Subtitle / Control Cue inside bottom of card ── */}
          <div className="relative z-20 pb-2 text-center text-[9px] md:text-[11px] font-mono text-white/30 tracking-widest uppercase pointer-events-none select-none">
            Scroll or Drag to Explore · Finite Exhibition
          </div>
        </div>
      </div>
    </section>
  );
}
