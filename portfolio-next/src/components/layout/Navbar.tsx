"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import clsx from "clsx";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useResumeModal } from "@/context/ResumeModalContext";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <nav
          className={clsx(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            scrolled ? "glass-panel" : "bg-transparent"
          )}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#top")}
            className="text-lg font-display tracking-widest font-bold uppercase text-white"
          >
            {profile.name.split(" ")[0]}
            <span className="text-white/50">{profile.name.split(" ")[1]}</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* LinkedIn Action Button */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-full bg-[#0077B5]/15 hover:bg-[#0077B5]/25 text-[#0077B5] hover:text-white border border-[#0077B5]/30 transition-all hover:scale-105"
              title="Connect with Sumeet on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Resume / CV Modal Trigger */}
            <button
              onClick={openResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all hover:scale-105"
              title="Review Sumeet's CV"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-300" />
              <span>Resume</span>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center px-5 py-2 text-xs font-medium uppercase tracking-wider bg-white text-black rounded-full hover:bg-zinc-200 transition-colors"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openResumeModal}
              className="px-3 py-1.5 text-[11px] font-mono rounded-full bg-white/10 text-white border border-white/10 flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>CV</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl glass-panel p-6 border border-white/15 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-base font-medium text-zinc-300 hover:text-white transition-colors py-2 border-b border-white/5 uppercase tracking-wider font-display"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 hover:bg-white/20 transition-colors"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Review Full Resume (PDF)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30 flex items-center justify-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/5 text-zinc-300 border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-center text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-1"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
