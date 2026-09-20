"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";

export default function ProfileHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-stagger",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-black relative border-t border-white/5" id="profile">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-start">
          <div className="profile-stagger inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Systems Architecture & Full Stack Engineering
            </span>
          </div>

          <h1 className="profile-stagger text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            Sumeet <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Kanhiya</span>
          </h1>

          <p className="profile-stagger text-lg md:text-xl text-zinc-400 font-light max-w-xl mb-12 leading-relaxed">
            Full-stack systems engineered with PERN, WebSockets, and Three.js. 
            Built for high concurrency, rock-solid schema safety, and sub-100ms response latencies.
          </p>

          <div className="profile-stagger flex flex-wrap gap-4 mb-12">
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-white font-mono font-bold">&lt;24ms</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">P99 Socket Latency</span>
            </div>
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-white font-mono font-bold">99.4%</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">LLM Prompt Fidelity</span>
            </div>
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-green-400 font-mono font-bold">Sub-100ms</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">API Turnaround</span>
            </div>
          </div>

          <div className="profile-stagger flex items-center gap-6">
            <a href="#projects" className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-wider text-sm">
              View Bento Monoliths <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#experience" className="flex items-center gap-2 px-8 py-3.5 glass-panel text-white font-medium rounded-full hover:bg-white/10 transition-colors uppercase tracking-wider text-sm">
              System Logs <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="profile-stagger relative lg:h-[700px] w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
          <Image
            src="/sumeet-profile.jpg"
            alt="Sumeet Kanhiya"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
            priority
          />
          
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Operator
            </div>
            <div>Sumeet // DUET CS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
