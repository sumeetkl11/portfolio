"use client";

import { techMarqueeItems } from "@/lib/data";
import MorphingParticles from "@/components/ui/MorphingParticles";

export default function Skills() {
  // Seamless loop with single track duplicated 2x
  const marqueeItems = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <section 
      id="tech-stack" 
      className="py-20 md:py-28 bg-black border-y border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[40vh] select-none"
    >
      <MorphingParticles />
      
      {/* Subtle center hairline divider */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      
      {/* Marquee Track with Edge Masking - Continuous Non-Stop Motion */}
      <div className="w-full relative z-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <div className="animate-marquee flex whitespace-nowrap pointer-events-auto">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span
                className="mx-6 sm:mx-8 md:mx-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-widest text-transparent hover:text-white transition-all duration-300 select-none cursor-default hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] hover:brightness-125"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
              >
                {item}
              </span>
              <span className="text-white/20 font-mono text-xs sm:text-sm select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
