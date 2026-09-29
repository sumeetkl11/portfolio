"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animations, just set final states
      gsap.set([tagRef.current, headingRef.current, textContentRef.current?.children, imageRef.current, statsRef.current, tagsRef.current?.children], {
        opacity: 1,
        y: 0,
        scale: 1
      });
    } else {
      const ctx = gsap.context(() => {
        // Create main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        });

        // Phase 1: Tag badge entrance
        tl.fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // Phase 2: Heading with scale and overlap
        tl.fromTo(
          headingRef.current,
          { y: 30, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        );

        // Animate heading letter-spacing
        tl.to(
          headingRef.current,
          { letterSpacing: "0.02em", duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

        // Phase 3: Text content blocks staggered
        tl.fromTo(
          textContentRef.current?.children || [],
          { y: 35, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)"
          },
          "-=0.4"
        );

        // Phase 4: Stats container entrance
        tl.fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
            onComplete: () => {
              // Animate stat counters immediately after stats appear
              if (stat1Ref.current) {
                gsap.to(stat1Ref.current, {
                  textContent: "25",
                  duration: 1.5,
                  ease: "power2.out",
                  snap: { textContent: 1 }
                });
              }
              if (stat2Ref.current) {
                gsap.to(stat2Ref.current, {
                  textContent: "25",
                  duration: 1.5,
                  ease: "power2.out",
                  snap: { textContent: 1 }
                });
              }
              if (stat3Ref.current) {
                gsap.to(stat3Ref.current, {
                  textContent: "500",
                  duration: 1.5,
                  ease: "power2.out",
                  snap: { textContent: 1 }
                });
              }
            }
          },
          "-=0.2"
        );

        // Phase 4: Skill tags wave reveal with glow pulse
        gsap.fromTo(
          tagsRef.current?.children || [],
          {
            opacity: 0,
            scale: 0.8,
            boxShadow: "0 0 0px rgba(173,198,255,0)"
          },
          {
            opacity: 1,
            scale: 1,
            boxShadow: "0 0 15px rgba(173,198,255,0.4)",
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 85%",
            },
            onComplete: () => {
              gsap.to(tagsRef.current?.children || [], {
                boxShadow: "0 0 0px rgba(173,198,255,0)",
                duration: 0.4,
                ease: "power2.in"
              });
            }
          }
        );

        // Phase 4: Profile image entrance
        tl.fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );

      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-30 md:py-40 bg-[#0a0a0b] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Vignette Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,25,30,0.5)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">

        {/* Section Header */}
        <div className="mb-16">
            <div ref={tagRef} className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#adc6ff] font-semibold">
                ENGINEERING PHILOSOPHY & JOURNEY
              </span>
            </div>
            <h2
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold uppercase tracking-tight"
            >
              About{" "}
              <span className="bg-gradient-to-b from-[#adc6ff] via-[#8eb3ff] to-[#7099ff] bg-clip-text text-transparent">
                Sumeet
              </span>
            </h2>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative & Bio (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300">
              <div ref={textContentRef} className="flex flex-col gap-6">
                <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-200">
                  I engineer{" "}
                  <strong className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    high-throughput distributed systems
                  </strong>{" "}
                  designed for resilience under load. My work spans webhook orchestration platforms achieving sub-25ms API latency (FaultFlow), multimodal AI applications synthesizing responses in under 2 seconds (ChefCraft), and real-time collaboration tools scaling to 500+ concurrent WebSocket connections (Linkforge, Sock.io).
                </p>

                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Every system I build prioritizes{" "}
                  <strong className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    deterministic behavior
                  </strong>
                  , zero-fluff architecture, and fault-tolerant design patterns—using the PERN stack, Redis pub/sub, BullMQ workers, and strategic AI integrations.
                </p>

                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Currently pursuing my{" "}
                  <strong className="text-white font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    B.S. in Computer Science at DUET
                  </strong>{" "}
                  while taking on full-stack contract work for production-grade applications.
                </p>

                {/* Skills Tags */}
                <div className="pt-4">
                  <div ref={tagsRef} className="flex flex-wrap gap-2">
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
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#adc6ff] uppercase tracking-wider hover:shadow-[0_0_12px_currentColor] hover:scale-105 hover:border-[#adc6ff]/50 transition-all duration-300 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Stat Highlights */}
                <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:scale-105 hover:-translate-y-1 hover:border-[#adc6ff]/50 hover:shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all duration-300 group cursor-pointer">
                    <span ref={stat1Ref} className="text-3xl font-bold text-[#adc6ff] block group-hover:scale-110 transition-transform">
                      0
                    </span>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider group-hover:text-zinc-200 transition-colors">
                      REST Endpoints
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:scale-105 hover:-translate-y-1 hover:border-[#d0bcff]/50 hover:shadow-[0_0_20px_rgba(208,188,255,0.3)] transition-all duration-300 group cursor-pointer">
                    <span className="text-3xl font-bold text-[#d0bcff] block group-hover:scale-110 transition-transform">
                      &lt;<span ref={stat2Ref}>0</span>ms
                    </span>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider group-hover:text-zinc-200 transition-colors">
                      Ingress Latency
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:scale-105 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group cursor-pointer">
                    <span ref={stat3Ref} className="text-3xl font-bold text-white block group-hover:scale-110 transition-transform">
                      0
                    </span>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider group-hover:text-zinc-200 transition-colors">
                      Socket Scale
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Image */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-start">
              <div
                ref={imageRef}
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square group"
                style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
              >
                {/* Animated gradient border ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#adc6ff] via-[#d0bcff] to-[#adc6ff] rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 animate-spin-slow" />

                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 group-hover:border-[#adc6ff]/50 transition-all duration-700">
                  <Image
                    src="/sumeet-profile-3d.png"
                    alt="Sumeet Kanhiya - 3D Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Enhanced overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Hover glow ring */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(173,198,255,0)] group-hover:shadow-[inset_0_0_40px_rgba(173,198,255,0.3)] transition-shadow duration-700" />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
