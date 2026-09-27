"use client";

import { useEffect, useRef } from "react";
import { experiences, education } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";
import Link from "next/link";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".stagger-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-30 md:py-40 bg-[#0a0a0b] relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10" ref={contentRef}>
        <div className="stagger-item mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#adc6ff] font-semibold">
                CAREER & MILESTONES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-wider text-white">
              Experience & Education
            </h2>
          </div>
          <span className="text-sm font-mono text-zinc-400">2022 — PRESENT</span>
        </div>

        <div className="space-y-16">
          {/* Experience List */}
          <div className="stagger-item">
            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="w-4 h-4 text-[#adc6ff]" />
              <h3 className="text-sm font-mono text-[#adc6ff] uppercase tracking-widest font-semibold">
                Professional Experience
              </h3>
            </div>
            <div className="space-y-10 border-l border-white/15 pl-8 ml-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group dark-glass-card p-6 rounded-2xl hover:border-[#adc6ff]/40 transition-all duration-300">
                  <div className="absolute -left-[41px] top-7 w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-[#adc6ff] group-hover:shadow-[0_0_12px_rgba(173,198,255,0.8)] transition-all duration-300" />
                  <span className="text-xs font-mono text-[#adc6ff] mb-2 block tracking-wider">{exp.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1 text-white group-hover:text-[#adc6ff] transition-colors">
                    {exp.role}
                  </h4>
                  <p className="text-base text-zinc-300 mb-4 font-medium">{exp.company}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education List */}
          <div className="stagger-item pt-4">
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="w-4 h-4 text-[#d0bcff]" />
              <h3 className="text-sm font-mono text-[#d0bcff] uppercase tracking-widest font-semibold">
                Formal Education
              </h3>
            </div>
            <div className="space-y-10 border-l border-white/15 pl-8 ml-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative group dark-glass-card p-6 rounded-2xl hover:border-[#d0bcff]/40 transition-all duration-300">
                  <div className="absolute -left-[41px] top-7 w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-[#d0bcff] group-hover:shadow-[0_0_12px_rgba(208,188,255,0.8)] transition-all duration-300" />
                  <span className="text-xs font-mono text-[#d0bcff] mb-2 block tracking-wider">{edu.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1 text-white group-hover:text-[#d0bcff] transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-base text-zinc-300 mb-4 font-medium">{edu.institution}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CV & Credentials Milestone Banner */}
          <div className="stagger-item pt-8">
            <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl shadow-black/60">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#adc6ff]/15 border border-[#adc6ff]/30 flex items-center justify-center flex-shrink-0 text-[#adc6ff]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold font-display uppercase tracking-wider text-white">
                    Need Sumeet's Full Verified CV?
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Access the complete document with detailed project metrics, technical stacks, coursework, and contact credentials.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={openResumeModal}
                  className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10 active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Review CV</span>
                </button>
                <a
                  href={process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf"}
                  download="Sumeet_Kanhiya_CV.pdf"
                  className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
