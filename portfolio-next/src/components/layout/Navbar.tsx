"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import clsx from "clsx";
import { useLenis } from "@/components/layout/SmoothScroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#top")}
            className="text-lg font-display tracking-widest font-bold uppercase"
          >
            {profile.name.split(" ")[0]}
            <span className="text-white/50">{profile.name.split(" ")[1]}</span>
          </a>

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

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors"
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  );
}
