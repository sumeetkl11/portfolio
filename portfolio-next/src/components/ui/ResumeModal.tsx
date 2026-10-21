"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Printer, ExternalLink, FileText, MapPin, Mail } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { useLenis } from "@/components/layout/SmoothScroll";
import { profile, experiences, education, projects, katanaSkills } from "@/lib/data";
import { certifications } from "@/lib/certifications";
import Link from "next/link";

export default function ResumeModal() {
  const { isOpen, closeResumeModal } = useResumeModal();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeResumeModal]);

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

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      }
      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { scale: 0.96, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
      }
    } else {
      if (dialogRef.current) {
        gsap.to(dialogRef.current, {
          scale: 0.97,
          opacity: 0,
          y: 12,
          duration: 0.2,
          ease: "power2.in",
        });
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
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

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md opacity-0 pointer-events-none"
      onClick={closeResumeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[90vh] max-h-[880px] bg-[#0a0a0a] border border-white/15 rounded-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#0a0a0a] relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3
                  id="resume-modal-title"
                  className="text-base font-display font-bold tracking-tight text-white"
                >
                  {profile.name}
                </h3>
                <span className="text-white/25" aria-hidden="true">
                  ·
                </span>
                <span className="text-[11px] font-mono text-white/60">
                  CURRICULUM VITAE
                </span>
              </div>
              <p className="text-xs text-white/50 font-mono hidden sm:block">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <Link
              href="/resume"
              onClick={closeResumeModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-mono border border-white/15 transition-colors whitespace-nowrap"
              title="Open standalone CV page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Page</span>
            </Link>
            <button
              type="button"
              onClick={closeResumeModal}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Structured ATS & Human-Readable CV */}
        <div
          className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 bg-black text-white/85"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Header Profile Info */}
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-sm font-mono text-white/60 mt-1">
                  {profile.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/55 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    {profile.location}
                  </span>
                  <span className="text-white/25" aria-hidden="true">
                    ·
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors underline decoration-white/25 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/40" />
                    <span>{profile.email}</span>
                    {copiedEmail && (
                      <span className="text-[10px] text-white ml-1 font-semibold">
                        (Copied)
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3">
                01 · Executive Summary
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-white/75">
                {profile.bio}
              </p>
            </div>

            {/* Technical Proficiencies */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3">
                02 · Core Technical Stack
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-white/80">
                {katanaSkills.map((skill, idx) => (
                  <span key={skill.id} className="inline-flex items-center gap-3">
                    <span>{skill.name}</span>
                    {idx < katanaSkills.length - 1 && (
                      <span className="text-white/25" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
                03 · Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className="text-base font-display font-bold text-white">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-white/50 tabular-nums">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-white/70 mb-2.5">
                      {exp.company}
                    </p>
                    <p className="text-xs md:text-sm text-white/65 leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-white/50">
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

            {/* Key Engineered Systems */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
                04 · Engineered Production Systems
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-display font-bold text-white">
                          {proj.title}
                        </h3>
                        <span className="text-[10px] font-mono text-white/45 uppercase">
                          {proj.category.split("·")[0]}
                        </span>
                      </div>
                      <p className="text-xs text-white/65 mb-4 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono text-white/50">
                      {proj.techStack.map((tech, idx) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          <span>{tech}</span>
                          {idx < proj.techStack.length - 1 && (
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

            {/* Education & Verified Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
                  05 · Education
                </h2>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10"
                  >
                    <span className="text-xs font-mono text-white/50 block mb-1 tabular-nums">
                      {edu.period}
                    </span>
                    <h3 className="text-base font-display font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-mono text-white/70 mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
                  06 · Verified Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h3 className="text-xs font-display font-bold text-white">
                          {cert.title}
                        </h3>
                        <p className="text-[11px] font-mono text-white/50 mt-0.5">
                          {cert.issuer} · {cert.issueDate}
                        </p>
                      </div>
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-white/75 hover:text-white underline decoration-white/30 whitespace-nowrap"
                        >
                          PDF ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
