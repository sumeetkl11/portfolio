"use client";

import { techMarqueeItems } from "@/lib/data";
import MorphingParticles from "@/components/ui/MorphingParticles";

export default function Skills() {
  // We duplicate the items to create a seamless infinite marquee loop
  const marqueeItems = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <section id="skills" className="py-24 bg-black border-y border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[40vh]">
      <MorphingParticles />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      
      <div className="w-full relative z-10 flex overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {marqueeItems.map((item, idx) => (
            <span
              key={idx}
              className="mx-8 text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-transparent hover:text-white transition-colors duration-500 cursor-default"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {item}
            </span>
          ))}
        </div>
        {/* We need a second marquee div for the seamless loop on larger screens */}
        <div className="animate-marquee flex whitespace-nowrap absolute top-0" style={{ animationDelay: '-15s' }}>
          {marqueeItems.map((item, idx) => (
            <span
              key={idx + 'second'}
              className="mx-8 text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-transparent hover:text-white transition-colors duration-500 cursor-default"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
