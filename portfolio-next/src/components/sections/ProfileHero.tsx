"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowDownRight, Terminal } from "lucide-react";
import Image from "next/image";

export default function ProfileHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-stagger",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeSkills = [
    "FULL-STACK DEVELOPER",
    "DISTRIBUTED SYSTEMS",
    "NEXT.JS & REACT",
    "PERN STACK",
    "GEMINI API & AI INTEGRATIONS",
    "POSTGRESQL & REDIS",
    "HIGH-THROUGHPUT ARCHITECTURE",

  ];

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between border-t border-white/5"
    >
      {/* Main Hero Content Container - Full Width Edge to Edge */}
      <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-28 pb-12 lg:py-24 relative z-20">

        {/* Left Column: Typography & CTAs */}
        <div className="w-full lg:max-w-2xl xl:max-w-3xl flex flex-col items-start z-30">
          {/* Tagline / Subheading */}
          <div className="profile-stagger flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-zinc-400 font-semibold uppercase">
              YOUR RELIABLE SYSTEMS ENGINEER
            </span>
          </div>

          {/* Large Bold Heading */}
          <h1 className="profile-stagger text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-[0.88] mb-6 uppercase">
            SUMEET <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
              KANHIYA.
            </span>
          </h1>

          {/* Quick Badges / Role */}
          <div className="profile-stagger flex flex-wrap items-center gap-3 md:gap-4 mb-6 text-sm font-mono text-zinc-300">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
              Full-Stack Developer
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">CS Student @ DUET</span>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>

          {/* Description */}
          <p className="profile-stagger text-base md:text-lg text-zinc-400 font-light max-w-xl mb-10 leading-relaxed">
            I build distributed systems and high-throughput web applications using the PERN stack, Next.js, and generative AI. Designed with zero fluff, resilient architecture, and razor-sharp user experiences.
          </p>

          {/* Action Buttons */}
          <div className="profile-stagger flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-xs md:text-sm rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-white/10 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-zinc-900/80 hover:bg-white/10 text-white font-medium uppercase tracking-wider text-xs md:text-sm rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Right Column: Large Character Image Seamlessly Blended */}
        <div className="w-full lg:w-1/2 lg:h-[82vh] relative mt-12 lg:mt-0 flex items-end justify-center lg:justify-end pointer-events-none z-10">
          <div className="relative w-full max-w-[580px] h-[450px] sm:h-[550px] md:h-[650px] lg:h-full flex items-end justify-center lg:justify-end">

            {/* Sumeet's High-Res Portrait */}
            <Image
              src="/sumeet-hero.jpg"
              alt="Sumeet Kanhiya"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom lg:object-right-bottom drop-shadow-2xl"
              priority
            />

            {/* Seamless Black Edge Fades (No Box, No Seam) */}
            {/* Bottom Fade - melts torso directly into the dark floor */}
            <div className="absolute bottom-0 inset-x-0 h-36 md:h-52 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-20" />

            {/* Left Edge Fade - dissolves shadow side of portrait into the void */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none z-20" />

            {/* Top Fade - softens hair boundary */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-20" />

            {/* Right Fade - ensures seamless right screen boundary */}
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-20" />
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Ribbon - Scroll Driven (Full Width) */}
      <div className="w-full relative z-30 bg-zinc-900 text-white py-2.5 overflow-hidden border-y border-white/10 shadow-lg shadow-black/40">
        <div ref={marqueeRef} className="flex whitespace-nowrap min-w-max animate-marquee">
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs md:text-sm font-mono font-bold tracking-widest uppercase mx-6"
            >
              <span>{skill}</span>
              <span className="ml-6 text-zinc-600">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
