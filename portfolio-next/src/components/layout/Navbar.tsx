"use client";

import { useEffect, useState, useRef } from "react";
import { profile } from "@/lib/data";
import clsx from "clsx";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useResumeModal } from "@/context/ResumeModalContext";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const lenis = useLenis();
  const { openResumeModal } = useResumeModal();
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "#profile" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll effects & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);

      // Active section detection
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.3) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16">
        <nav
          ref={navRef}
          className={clsx(
            "flex items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "dark-glass-card border-white/10 py-3 px-4 md:px-6"
              : "bg-transparent px-4 md:px-6"
          )}
        >
          {/* Brand Logo */}
          <a
            href="#profile"
            onClick={(e) => handleScrollTo(e, "#profile")}
            className="text-base font-display tracking-wider font-bold uppercase text-white hover:text-[#adc6ff] transition-colors whitespace-nowrap"
          >
            {profile.name.split(" ")[0]}
            <span className="text-white/50">{profile.name.split(" ")[1]}</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={clsx(
                    "relative px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300",
                    isActive
                      ? "text-[#adc6ff]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-x-2 bottom-2 h-[1px] bg-[#adc6ff]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* LinkedIn */}
            {/* <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-medium rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/8 hover:border-[#adc6ff]/30 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(173,198,255,0.3)]"
              title="Connect on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a> */}

            {/* Resume */}
            {/* <button
              onClick={openResumeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-medium rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-[#adc6ff]/30 transition-all hover:scale-105"
              title="Review CV"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-300" />
              <span>Resume</span>
            </button> */}

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#adc6ff] text-black rounded-full hover:bg-[#8eb3ff] hover:shadow-lg hover:shadow-[#adc6ff]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
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
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 hover:bg-white/15 hover:border-[#adc6ff]/30 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl dark-glass-card p-6 border border-white/15 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={clsx(
                      "text-base font-medium py-3 border-b border-white/5 uppercase tracking-wider font-display",
                      isActive ? "text-[#adc6ff]" : "text-zinc-300 hover:text-white"
                    )}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 hover:bg-white/20 hover:border-[#adc6ff]/30 transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Review Full Resume (PDF)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30 flex items-center justify-center gap-1.5 hover:bg-[#0077B5]/30 hover:border-[#0077B5]/50 transition-all"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/5 text-zinc-300 border border-white/10 flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-[#adc6ff]/30 transition-all"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="w-full py-3 rounded-xl bg-[#adc6ff] text-black font-semibold text-center text-xs uppercase tracking-wider hover:bg-[#8eb3ff] hover:shadow-lg hover:shadow-[#adc6ff]/30 hover:-translate-y-0.5 transition-all mt-1"
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
