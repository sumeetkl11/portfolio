"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered entrance for all content
      gsap.fromTo(
        ".about-stagger",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-30 md:py-40 bg-[#0a0a0b] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10" ref={contentRef}>
        {/* Section Header */}
        <div className="about-stagger mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#adc6ff] font-semibold">
              ENGINEERING PHILOSOPHY & JOURNEY
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight"
          >
            About <span className="text-[#adc6ff]">Sumeet</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Bio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300">
            <p className="about-stagger text-lg md:text-xl font-light leading-relaxed text-zinc-200">
              I engineer <strong className="font-semibold text-white">high-throughput distributed systems</strong> designed for resilience under load. My work spans webhook orchestration platforms achieving sub-25ms API latency (FaultFlow), multimodal AI applications synthesizing responses in under 2 seconds (ChefCraft), and real-time collaboration tools scaling to 500+ concurrent WebSocket connections (Linkforge, Sock.io).
            </p>

            <p className="about-stagger text-sm md:text-base text-zinc-400 leading-relaxed">
              Every system I build prioritizes <strong className="text-white">deterministic behavior</strong>, zero-fluff architecture, and fault-tolerant design patterns—using the PERN stack, Redis pub/sub, BullMQ workers, and strategic AI integrations.
            </p>

            <p className="about-stagger text-sm md:text-base text-zinc-400 leading-relaxed">
              Currently pursuing my <strong className="text-white font-medium">B.S. in Computer Science at DUET</strong> while taking on full-stack contract work for production-grade applications.
            </p>

            {/* Skills Tags */}
            <div className="about-stagger pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  "Distributed Systems",
                  "Real-Time WebSockets",
                  "AI Integration",
                  "High-Throughput APIs",
                  "Fault-Tolerant Architecture",
                  "PERN Stack",
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#adc6ff] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div className="about-stagger grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:border-[#adc6ff]/30 group">
                <span className="text-2xl font-bold text-[#adc6ff] block">25+</span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">REST Endpoints</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:border-[#d0bcff]/30 group">
                <span className="text-2xl font-bold text-[#d0bcff] block">&lt;25ms</span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Ingress Latency</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:border-white/30 group">
                <span className="text-2xl font-bold text-white block">500+</span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Socket Scale</span>
              </div>
            </div>
          </div>

          {/* Right Column: Placeholder Image */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-start">
            <div className="about-stagger relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square rounded-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center overflow-hidden border border-white/10 group">
              {/* Circular Placeholder Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-white/3" />
              </div>

              {/* Placeholder Content */}
              <div className="relative z-10 text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#adc6ff]/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl font-display font-bold text-white/30 group-hover:text-white/50 transition-colors">
                    S
                  </span>
                </div>
                <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Profile Image</p>
                <p className="text-xs text-zinc-600">Replace with actual photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
