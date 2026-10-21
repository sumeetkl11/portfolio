"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/data";
import { useResumeModal } from "@/context/ResumeModalContext";
import KineticHeading from "@/components/ui/KineticHeading";
import Magnetic from "@/components/ui/Magnetic";
import { FileText, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CORE_DOMAINS = [
  "Distributed Systems",
  "Real-Time WebSockets",
  "Gemini API Pipelines",
  "High-Throughput Brokers",
  "Fault-Tolerant Architecture",
  "PERN & Next.js",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (stat1Ref.current) stat1Ref.current.textContent = "25";
      if (stat2Ref.current) stat2Ref.current.textContent = "25";
      if (stat3Ref.current) stat3Ref.current.textContent = "500";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      tl.fromTo(
        textContentRef.current?.children || [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        imageRef.current,
        { scale: 0.97, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onStart: () => {
            if (stat1Ref.current) {
              gsap.to(stat1Ref.current, {
                textContent: "25",
                duration: 1.2,
                ease: "power2.out",
                snap: { textContent: 1 },
              });
            }
            if (stat2Ref.current) {
              gsap.to(stat2Ref.current, {
                textContent: "25",
                duration: 1.2,
                ease: "power2.out",
                snap: { textContent: 1 },
              });
            }
            if (stat3Ref.current) {
              gsap.to(stat3Ref.current, {
                textContent: "500",
                duration: 1.2,
                ease: "power2.out",
                snap: { textContent: 1 },
              });
            }
          },
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-28 md:py-36 bg-black text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8"
        >
          <div>
            <span className="text-xs font-mono text-white/50 tracking-widest block mb-3">
              01 · ARCHITECTURAL DOSSIER
            </span>
            <KineticHeading
              text="Engineering Philosophy"
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white"
            />
          </div>
          <div className="text-xs font-mono text-white/60 flex items-center gap-2">
            <span>{profile.location}</span>
            <span aria-hidden="true">·</span>
            <span>Available for Production Architecture</span>
          </div>
        </div>

        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Narrative, Unboxed Metadata & Direct Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div ref={textContentRef} className="flex flex-col gap-6">
              <p className="text-lg md:text-xl leading-relaxed text-white/90 font-normal max-w-[65ch]">
                I engineer{" "}
                <strong className="font-semibold text-white">
                  high-throughput distributed systems
                </strong>{" "}
                designed for deterministic behavior under load. My work spans multi-tenant webhook brokers achieving sub-25ms ingress latency (<span className="text-white">FaultFlow</span>), multimodal AI synthesis engines responding in under 2 seconds (<span className="text-white">ChefCraft</span>), and real-time collaboration suites scaling past 500+ concurrent WebSocket connections (<span className="text-white">Linkforge</span>, <span className="text-white">Sock.io</span>).
              </p>

              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-[65ch]">
                Every system prioritizes zero-boilerplate infrastructure, idempotent state transitions, and sub-frame interface responsiveness—combining the PERN stack, Next.js, Redis pub/sub, BullMQ worker clusters, and structured Gemini API pipelines.
              </p>

              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-[65ch]">
                Currently pursuing a{" "}
                <strong className="text-white font-medium">
                  B.S. in Computer Science at Dawood University of Engineering &amp; Technology (DUET)
                </strong>{" "}
                while architecting production full-stack systems for independent clients.
              </p>

              {/* Zero-Pill Unboxed Domain Metadata */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block mb-2.5">
                  Core Engineering Domains
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-white/75">
                  {CORE_DOMAINS.map((domain, idx) => (
                    <span key={domain} className="inline-flex items-center gap-3">
                      <span>{domain}</span>
                      {idx < CORE_DOMAINS.length - 1 && (
                        <span className="text-white/25" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Controls Consolidated from ProfileHero */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button
                    type="button"
                    onClick={openResumeModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold tracking-wide hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Inspect Curriculum Vitae</span>
                  </button>
                </Magnetic>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/15 text-xs font-mono text-white/80 hover:text-white hover:border-white/40 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/15 text-xs font-mono text-white/80 hover:text-white hover:border-white/40 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Monochrome Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div
              ref={imageRef}
              data-cursor="ARCHITECT"
              className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/12 group"
            >
              <Image
                src="/sumeet-profile-3d.png"
                alt="Sumeet Kanhiya — Systems Architect"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 38vw"
                className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-xs font-mono text-white/80 pointer-events-none">
                <span>SUMEET KANHIYA</span>
                <span className="text-white/50">KARACHI · PK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Quantitative Proof Strip Below Split */}
        <div
          ref={statsRef}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono"
        >
          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
            <span className="text-xs text-white/50 uppercase tracking-widest">
              Production API Surface
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span ref={stat1Ref} className="text-3xl md:text-4xl font-display font-extrabold text-white tabular-nums">
                25
              </span>
              <span className="text-2xl font-display font-bold text-white/70">+</span>
              <span className="ml-2 text-xs text-white/50">REST &amp; SSE Endpoints</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
            <span className="text-xs text-white/50 uppercase tracking-widest">
              Webhook Broker Ingress
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-white/70">&lt;</span>
              <span ref={stat2Ref} className="text-3xl md:text-4xl font-display font-extrabold text-white tabular-nums">
                25
              </span>
              <span className="text-xl font-display font-bold text-white/70">ms</span>
              <span className="ml-2 text-xs text-white/50">P99 Latency (FaultFlow)</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
            <span className="text-xs text-white/50 uppercase tracking-widest">
              Real-Time Concurrency
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span ref={stat3Ref} className="text-3xl md:text-4xl font-display font-extrabold text-white tabular-nums">
                500
              </span>
              <span className="text-2xl font-display font-bold text-white/70">+</span>
              <span className="ml-2 text-xs text-white/50">Active Socket Nodes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
