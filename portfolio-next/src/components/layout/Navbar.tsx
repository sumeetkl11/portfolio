"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import clsx from "clsx";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useResumeModal } from "@/context/ResumeModalContext";
import Magnetic from "@/components/ui/Magnetic";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const lenis = useLenis();
  const { openResumeModal, openCommandPalette } = useResumeModal();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);

      if (currentScroll < window.innerHeight * 0.5) {
        setActiveSection("");
        return;
      }

      const sectionIds = ["about", "projects", "skills", "certifications", "experience", "contact"];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35 && rect.bottom > window.innerHeight * 0.25) {
            setActiveSection(id === "certifications" ? "experience" : id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === "#top") {
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

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
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-black/65 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single Text Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleScrollTo(e, "#top")}
          className="text-lg font-display font-extrabold tracking-tight text-white hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0"
        >
          SUMIT.
        </a>

        {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={clsx(
                  "relative py-1 text-xs font-medium tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={clsx(
                    "absolute inset-x-0 -bottom-0.5 h-[1px] bg-white transition-transform duration-200 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Command Palette Shortcut + Magnetic Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-white/15 hover:border-white/40 text-[11px] font-mono text-white/75 hover:text-white transition-colors cursor-pointer"
            aria-label="Open Command Palette (Cmd+K)"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3 h-3 text-white/60" />
            <span>K</span>
          </button>

          <Magnetic className="hidden md:inline-block">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#0a0a0a] border border-white/25 rounded-lg hover:bg-white hover:text-black hover:border-white transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Let&apos;s Talk
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden w-11 h-11 rounded-lg bg-[#0a0a0a] border border-white/15 items-center justify-center text-white hover:border-white/40 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/15 px-6 py-6 flex flex-col gap-5">
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={clsx(
                    "py-3.5 text-sm font-display font-bold tracking-tight transition-colors",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCommandPalette();
              }}
              className="w-full py-3 px-4 rounded-lg bg-white/5 text-white text-xs font-mono border border-white/15 hover:border-white/40 transition-colors text-center whitespace-nowrap flex items-center justify-center gap-2"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Command Palette &amp; TRD Inspector</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openResumeModal();
              }}
              className="w-full py-3 px-4 rounded-lg bg-white/5 text-white text-xs font-mono border border-white/15 hover:border-white/40 transition-colors text-center whitespace-nowrap"
            >
              Review Curriculum Vitae
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-lg bg-white/5 text-white/80 border border-white/10 flex items-center justify-center gap-1.5 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-lg bg-white/5 text-white/80 border border-white/10 flex items-center justify-center gap-1.5 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="w-full py-3 px-4 rounded-lg bg-white text-black font-semibold text-center text-xs tracking-wide hover:bg-zinc-200 transition-colors whitespace-nowrap"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
