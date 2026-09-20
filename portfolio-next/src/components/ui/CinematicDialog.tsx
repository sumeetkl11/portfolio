"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Code2 } from "lucide-react";
import { type Project } from "@/lib/data";

interface CinematicDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CinematicDialog({ project, isOpen, onClose }: CinematicDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [internalProject, setInternalProject] = useState<Project | null>(project);

  useEffect(() => {
    if (project) {
      setInternalProject(project);
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      // Open animation
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          backdropFilter: "blur(20px)",
          duration: 0.8,
          ease: "power3.out",
          pointerEvents: "auto"
        });
      }

      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { scale: 0.9, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.1 }
        );
      }
      
      // Animate content children
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
        );
      }
      
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Close animation
      if (dialogRef.current) {
        gsap.to(dialogRef.current, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.in"
        });
      }
      
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.6,
          ease: "power2.in",
          pointerEvents: "none",
          delay: 0.1
        });
      }
      
      // Unlock body scroll
      document.body.style.overflow = "";
      
      // We can optionally clear the internal project after animation completes,
      // but it's hidden anyway, so it's fine to keep it.
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!internalProject) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 opacity-0 pointer-events-none bg-black/40"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative max-h-full flex flex-col opacity-0"
        onClick={(e) => e.stopPropagation()}
        // Disable custom cursor inside modal to allow normal interaction
        data-cursor="none"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 hide-scrollbar">
          <div ref={contentRef} className="max-w-3xl">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
              {internalProject.category}
            </span>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">
              {internalProject.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-12">
              {internalProject.tagline}
            </p>
            
            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mb-12" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">The Challenge</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  A comprehensive redesign and re-architecture focused on performance, accessibility, and creating a memorable user experience through cinematic motion. 
                  (Placeholder text for detailed case study)
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {internalProject.techStack.map((tech: string) => (
                    <span key={tech} className="text-xs uppercase font-mono tracking-wider px-3 py-1.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-8">
              {internalProject.liveUrl && (
                <a
                  href={internalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
                >
                  Visit Live Site
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {internalProject.repoUrl && (
                <a
                  href={internalProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  <Code2 className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
