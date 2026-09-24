"use client";

import { useEffect, useRef } from "react";
import { experiences, education } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download, ExternalLink } from "lucide-react";
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
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} id="experience" className="py-32 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 relative z-10" ref={contentRef}>
        <div className="stagger-item mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-50 font-semibold block mb-2">CAREER & MILESTONES</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-wider">
              Experience & Education
            </h2>
          </div>
          <span className="text-sm font-mono text-zinc-500">2022 — PRESENT</span>
        </div>

        <div className="space-y-16">
          {/* Experience List */}
          <div className="stagger-item">
            <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest mb-8">Professional</h3>
            <div className="space-y-12 border-l border-white/10 pl-8 ml-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
                  <span className="text-sm font-mono text-zinc-400 mb-2 block">{exp.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1">{exp.role}</h4>
                  <p className="text-lg text-zinc-300 mb-4">{exp.company}</p>
                  <p className="text-zinc-500 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education List */}
          <div className="stagger-item pt-8">
            <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest mb-8">Education</h3>
            <div className="space-y-12 border-l border-white/10 pl-8 ml-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
                  <span className="text-sm font-mono text-zinc-400 mb-2 block">{edu.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1">{edu.degree}</h4>
                  <p className="text-lg text-zinc-300 mb-4">{edu.institution}</p>
                  <p className="text-zinc-500 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CV & Credentials Milestone Banner */}
          <div className="stagger-item pt-8">
            <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <FileText className="w-6 h-6 text-emerald-400" />
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
                  className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <FileText className="w-4 h-4" />
                  <span>Review CV</span>
                </button>
                <a
                  href="/resume.pdf"
                  download="Sumeet_Kanhiya_CV.pdf"
                  className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
                <Link
                  href="/resume"
                  className="hidden lg:flex px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors items-center justify-center"
                  title="Open dedicated /resume page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
