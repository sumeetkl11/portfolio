"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowDownRight, Terminal, FileText, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { useResumeModal } from "@/context/ResumeModalContext";

export default function ProfileHero() {
  const { openResumeModal } = useResumeModal();
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
          <div className="profile-stagger flex flex-wrap items-center gap-3 md:gap-4 mb-7">
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-xs md:text-sm rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-white/10 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-6 sm:px-8 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 text-white font-medium uppercase tracking-wider text-xs md:text-sm rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Credentials & Social Channels */}
          <div className="profile-stagger flex flex-wrap items-center gap-3">
            {/* Interactive CV Trigger - Compact, Aesthetic & Informative */}
            <button
              onClick={openResumeModal}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-200 hover:text-white border border-white/10 hover:border-emerald-500/40 text-xs font-mono font-medium flex items-center gap-2 transition-all duration-200 group cursor-pointer"
              title="Review Sumeet's Verified Resume / CV"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Review CV</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                PDF
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>

            {/* LinkedIn Button */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#0077B5]/15 hover:bg-[#0077B5]/25 text-[#0077B5] hover:text-white border border-[#0077B5]/30 text-xs font-mono font-medium flex items-center gap-2 transition-all duration-200 group"
              title="Visit Sumeet's LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub Button */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono font-medium flex items-center gap-2 transition-all duration-200 group"
              title="Visit Sumeet's GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
              key={`${skill}-${index}`}
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
