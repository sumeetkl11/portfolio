"use client";

import { useEffect, useRef } from "react";
import { experiences, education } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";
import KineticHeading from "@/components/ui/KineticHeading";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".stagger-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 72%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-28 md:py-36 bg-black relative border-t border-white/10 overflow-hidden"
    >
      <div
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10"
        ref={contentRef}
      >
        <div className="stagger-item mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2.5">
              05 · CAREER &amp; MILESTONES
            </span>
            <KineticHeading
              text="Experience & Education"
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white"
            />
          </div>
          <span className="text-xs font-mono text-white/50 tabular-nums">
            2024 — PRESENT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Professional Experience Column (7 cols) */}
          <div className="stagger-item lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <Briefcase className="w-4 h-4 text-white/70" />
              <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest font-semibold">
                Professional Experience
              </h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-7 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-2xl font-display font-bold tracking-tight text-white">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-white/50 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-white/75 mb-4">
                    {exp.company}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-white/60">
                    {exp.tags.map((tag, idx) => (
                      <span key={tag} className="inline-flex items-center gap-2.5">
                        <span>{tag}</span>
                        {idx < exp.tags.length - 1 && (
                          <span className="text-white/25" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formal Education Column (5 cols) */}
          <div className="stagger-item lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap className="w-4 h-4 text-white/70" />
              <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest font-semibold">
                Academic Foundation
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-7 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors duration-200"
                >
                  <span className="text-xs font-mono text-white/50 block mb-2 tabular-nums">
                    {edu.period}
                  </span>
                  <h4 className="text-2xl font-display font-bold tracking-tight mb-1.5 text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-mono text-white/75 mb-4">
                    {edu.institution}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}

              {/* CV & Credentials Milestone Card */}
              <div className="p-7 rounded-2xl bg-[#0a0a0a] border border-white/15 flex flex-col justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 block mb-2">
                    COMPLETE ARCHITECTURAL RECORD
                  </span>
                  <h4 className="text-xl font-display font-bold tracking-tight text-white">
                    Curriculum Vitae &amp; Technical Dossier
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                    Inspect the full ATS-ready specification including distributed systems benchmarks, coursework, and verified credentials.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Magnetic>
                    <button
                      type="button"
                      onClick={openResumeModal}
                      className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Review Interactive CV</span>
                    </button>
                  </Magnetic>
                  <Link
                    href="/resume"
                    className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-white font-mono text-xs border border-white/15 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Full CV Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
