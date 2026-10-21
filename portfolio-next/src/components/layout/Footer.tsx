"use client";

import { profile } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useResumeModal } from "@/context/ResumeModalContext";

export default function Footer() {
  const lenis = useLenis();
  const { openResumeModal } = useResumeModal();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 py-14 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-display font-extrabold tracking-tight text-white">
            SUMIT.
          </span>
          <p className="text-xs text-white/50 mt-1.5 font-mono">
            © {new Date().getFullYear()} {profile.name} · Systems Architect · {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={openResumeModal}
            className="text-white/60 hover:text-white transition-colors text-xs font-mono tracking-wide cursor-pointer whitespace-nowrap"
          >
            Curriculum Vitae
          </button>
          <span className="text-white/20" aria-hidden="true">·</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono tracking-wide whitespace-nowrap"
          >
            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <span className="text-white/20" aria-hidden="true">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono tracking-wide whitespace-nowrap"
          >
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <a
          href="#top"
          onClick={scrollToTop}
          className="text-xs font-mono text-white/60 hover:text-white tracking-wide underline decoration-white/25 underline-offset-4 transition-colors whitespace-nowrap"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
