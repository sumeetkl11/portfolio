"use client";

import { useEffect, useRef, useState } from "react";
import { techMarqueeItems } from "@/lib/data";
import MorphingParticles from "@/components/ui/MorphingParticles";

export default function Skills() {
  // Seamless loop with single track duplicated 2x
  const marqueeItems = [...techMarqueeItems, ...techMarqueeItems];
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Intersection Observer to pause marquee when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Pause when less than 80% visible
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.8);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.8, 0.9, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="py-30 md:py-40 bg-[#0a0a0b] border-y border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[40vh] select-none"
    >
      <MorphingParticles />

      {/* Subtle center hairline divider */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      {/* Marquee Track with Edge Masking - Continuous Non-Stop Motion */}
      <div className="w-full relative z-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <div
          ref={marqueeRef}
          className={`${isVisible ? "animate-marquee" : "animate-paused"} flex whitespace-nowrap pointer-events-auto`}
          style={{ animationPlayState: isVisible ? "running" : "paused" }}
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center group">
              <span
                className="mx-6 sm:mx-8 md:mx-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-widest text-transparent hover:text-white transition-all duration-500 select-none cursor-default hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.9)] hover:brightness-125"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
              >
                {item}
              </span>
              <span className="text-white/20 font-mono text-xs sm:text-sm select-none group-hover:text-white transition-colors">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section Header */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            Tech Stack
          </span>
          <span className="w-1 h-1 rounded-full bg-[#adc6ff] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
