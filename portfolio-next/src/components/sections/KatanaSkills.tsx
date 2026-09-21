"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { katanaSkills } from "@/lib/data";
import KatanaScene from "@/components/ui/KatanaScene";

gsap.registerPlugin(ScrollTrigger);

export default function KatanaSkills() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !headingRef.current || !tagRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: false,
      }
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
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative w-full min-h-screen bg-black text-white flex flex-col items-center py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,20,0.5)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-16 px-4">
        <div 
          ref={tagRef}
          className="px-3 py-1 mb-6 text-xs tracking-[0.3em] font-mono border border-white/20 rounded-full text-white/60 uppercase"
        >
          Weapons of Choice
        </div>
        <h2 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest text-center"
        >
          My Skills
        </h2>
      </div>

      {/* 3D Scene Container */}
      <div className="w-full max-w-[1400px] h-[600px] md:h-[700px] relative z-10 px-4">
        {/* We load the Scene via a wrapper to avoid SSR issues if we had complex Three.js imports, 
            but React Three Fiber's Canvas is safe to use in client components directly. */}
        <KatanaScene skills={katanaSkills} />
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono text-white/40 tracking-widest uppercase pointer-events-none z-20">
        Hover to draw blade
      </div>
    </section>
  );
}
