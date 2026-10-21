"use client";

import Link from "next/link";
import { ArrowLeft, Printer, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { profile, experiences, education, projects, katanaSkills } from "@/lib/data";
import { certifications } from "@/lib/certifications";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors group whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0a0a0a] hover:border-white/40 text-white/80 hover:text-white border border-white/15 text-xs font-mono transition-colors whitespace-nowrap"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Document Header */}
        <div className="border-b border-white/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-2">
              OFFICIAL CURRICULUM VITAE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="text-base font-mono text-white/70 mt-2">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white/40" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white underline decoration-white/25"
            >
              <Mail className="w-3.5 h-3.5 text-white/40" />
              {profile.email}
            </a>
          </div>
        </div>

        {/* Executive Summary */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3">
            01 · Executive Summary
          </h2>
          <p className="text-base leading-relaxed text-white/80 max-w-3xl">
            {profile.bio}
          </p>
        </section>

        {/* Technical Proficiencies */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3">
            02 · Technical Arsenal
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-white/85">
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
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
            03 · Professional Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h3 className="text-lg font-display font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-white/50 tabular-nums">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-white/70 mb-3">
                  {exp.company}
                </p>
                <p className="text-sm text-white/65 leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-white/50">
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
        </section>

        {/* Engineered Systems */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
            04 · Selected Production Architectures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-display font-bold text-white">
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
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-white/55">
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
        </section>

        {/* Education & Credentials */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/45 mb-4">
              05 · Formal Education
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10"
              >
                <span className="text-xs font-mono text-white/50 block mb-1 tabular-nums">
                  {edu.period}
                </span>
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs font-mono text-white/70 mb-3">
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
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-white/50 mt-1">
                      {cert.issuer} · {cert.issueDate}
                    </p>
                  </div>
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-white/75 hover:text-white underline decoration-white/30 whitespace-nowrap"
                    >
                      Verify PDF ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
