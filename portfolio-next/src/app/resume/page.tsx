import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sumeet Kanhiya | Curriculum Vitae & Resume",
  description: "Official Resume and Curriculum Vitae of Sumeet Kanhiya, Systems Architect & Full-Stack Developer.",
  openGraph: {
    title: "Sumeet Kanhiya | Curriculum Vitae & Resume",
    description: "Official Resume and Curriculum Vitae of Sumeet Kanhiya, Systems Architect & Full-Stack Developer.",
    url: "https://sumeetkanhiya.dev/resume",
    siteName: "Sumeet Kanhiya",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Sumeet Kanhiya CV" }],
  },
};

export default function ResumePage() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white/20">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077B5]/15 hover:bg-[#0077B5]/25 text-[#0077B5] border border-[#0077B5]/30 text-xs font-mono transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={resumeUrl}
              download="Sumeet_Kanhiya_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs md:text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Document Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
                Official Curriculum Vitae
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-sm font-mono text-zinc-400 mt-1">
              {profile.tagline} · {profile.location}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Native Viewer</span>
            </a>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full min-h-[78vh] rounded-2xl border border-white/15 bg-zinc-950/60 overflow-hidden shadow-2xl relative">
          <object
            data={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full min-h-[78vh]"
          >
            <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[500px]">
              <p className="text-zinc-300 mb-4 text-sm">
                Your browser doesn't support embedded PDFs.
              </p>
              <a
                href={resumeUrl}
                download="Sumeet_Kanhiya_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Sumeet's CV Directly
              </a>
            </div>
          </object>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Sumeet Kanhiya. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
              {profile.email}
            </a>
            <span>•</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
