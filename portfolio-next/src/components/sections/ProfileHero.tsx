"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal, MapPin } from "lucide-react";
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
          <h1 className="profile-stagger text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
            Sumeet <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">Kanhiya.</span>
          </h1>

          <div className="profile-stagger flex flex-col gap-3 mb-8">
            <h2 className="text-lg md:text-xl font-mono text-zinc-300">
              Full-Stack Developer <span className="text-zinc-600">·</span> CS Student @ DUET
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>

          <p className="profile-stagger text-base md:text-lg text-zinc-400 font-light max-w-xl mb-12 leading-relaxed">
            I build distributed systems and high-throughput web applications using the PERN stack, Next.js, and AI integrations (Gemini API, Groq). No boilerplate - just resilient infrastructure and precise interfaces.
          </p>

          <div className="profile-stagger flex items-center gap-6">
            <a href="#projects" className="flex items-center justify-center min-w-[200px] px-8 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-colors">
              View Projects
            </a>
            <a href="#contact" className="flex items-center justify-center min-w-[200px] px-8 py-3.5 bg-transparent text-white font-medium rounded-2xl border border-white/20 hover:bg-white/10 transition-colors">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div 
          className="profile-stagger relative h-[500px] lg:h-[700px] w-full flex items-end justify-center group"
          style={{ 
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)'
          }}
        >
          <Image
            src="/sumeet-profile.jpg"
            alt="Sumeet Kanhiya"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
            priority
          />
        </div>
      </div>
    </section>
  );
}
