"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Download, ExternalLink, FileText, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { useLenis } from "@/components/layout/SmoothScroll";
import { profile, experiences, education, projects, katanaSkills } from "@/lib/data";

export default function ResumeModal() {
  const { isOpen, closeResumeModal } = useResumeModal();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"pdf" | "text">("pdf");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf";

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeResumeModal]);

  // Lock scroll and pause Lenis smooth-scroll when open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  // GSAP animation
  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          backdropFilter: "blur(24px)",
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      }
      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.05 }
        );
      }
    } else {
      if (dialogRef.current) {
        gsap.to(dialogRef.current, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 0.35,
          ease: "power2.in",
        });
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.5,
          ease: "power2.in",
          pointerEvents: "none",
        });
      }
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 opacity-0 pointer-events-none"
      onClick={closeResumeModal}
    >
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[92vh] max-h-[900px] bg-[#09090b] border border-white/15 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-bold font-display uppercase tracking-wider text-white">
                  Sumeet Kanhiya
                </h3>
                <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CV 2025
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono hidden sm:block">
                Systems Architect & Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Center Tabs: PDF vs ATS Text */}
          <div className="flex items-center rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab("pdf")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "pdf"
                  ? "bg-white text-black font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              PDF Document
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "text"
                  ? "bg-white text-black font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Quick Overview (ATS)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              download="Sumeet_Kanhiya_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
              title="Download CV PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Tab</span>
            </a>
            <button
              onClick={closeResumeModal}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden relative bg-black/60">
          {activeTab === "pdf" ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <object
                data={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full border-none"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
                  <FileText className="w-12 h-12 text-zinc-600 mb-4" />
                  <p className="text-zinc-300 font-medium mb-2">
                    PDF preview is not supported directly by your browser.
                  </p>
                  <p className="text-zinc-500 text-xs mb-6">
                    You can switch to the "Quick Overview (ATS)" tab or download the official PDF directly.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={resumeUrl}
                      download="Sumeet_Kanhiya_CV.pdf"
                      className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                    <button
                      onClick={() => setActiveTab("text")}
                      className="px-5 py-2.5 bg-white/10 text-white text-xs font-medium rounded-xl hover:bg-white/15 border border-white/10 transition-colors"
                    >
                      View Text Version
                    </button>
                  </div>
                </div>
              </object>
            </div>
          ) : (
            <div
              className="w-full h-full overflow-y-auto p-6 md:p-10 font-sans text-zinc-300 selection:bg-white/20"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Header Profile Info */}
                <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                      {profile.name}
                    </h1>
                    <p className="text-sm font-mono text-zinc-400 mt-1">
                      {profile.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {profile.location}
                      </span>
                      <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors underline decoration-white/20"
                      >
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        {profile.email}
                        {copiedEmail && (
                          <span className="text-[10px] text-emerald-400 ml-1 font-bold">Copied!</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#0077B5]/20 hover:bg-[#0077B5]/30 text-[#0077B5] border border-[#0077B5]/30 text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold mb-3">
                    Summary & Objective
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-400">
                    {profile.bio}
                  </p>
                </div>

                {/* Core Skills */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold mb-3">
                    Technical Proficiencies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {katanaSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional Experience */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold mb-4">
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-white/15 pl-4 ml-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                          <h3 className="text-base font-bold text-white">{exp.role}</h3>
                          <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                        </div>
                        <p className="text-sm text-zinc-300 mb-2">{exp.company}</p>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-3">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Engineered Systems */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold mb-4">
                    Key Engineered Systems
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-bold text-white">{proj.title}</h3>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">
                            {proj.category.split("·")[0]}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                          {proj.tagline}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold mb-4">
                    Education & Credentials
                  </h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-white/15 pl-4 ml-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                        <span className="text-xs font-mono text-zinc-400">{edu.period}</span>
                      </div>
                      <p className="text-sm text-zinc-300 mb-2">{edu.institution}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
