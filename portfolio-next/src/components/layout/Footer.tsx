"use client";

import { profile } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-display font-bold uppercase tracking-widest">
            {profile.name.split(" ")[0]}
          </span>
          <p className="text-sm text-zinc-400 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider"
          >
            GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider"
          >
            LinkedIn <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <a
          href="#top"
          onClick={scrollToTop}
          className="text-sm text-zinc-400 hover:text-white uppercase tracking-widest underline decoration-white/20 underline-offset-4"
        >
          Back to Top
        </a>
      </div>
    </footer>
  );
}
