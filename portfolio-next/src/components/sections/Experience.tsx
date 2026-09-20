"use client";

import { useEffect, useRef } from "react";
import { experiences, education } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".stagger-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} id="experience" className="py-32 bg-black relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={contentRef}>
        <div className="stagger-item mb-16 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider">
            Experience & Education
          </h2>
        </div>

        <div className="space-y-16">
          {/* Experience List */}
          <div className="stagger-item">
            <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest mb-8">Professional</h3>
            <div className="space-y-12 border-l border-white/10 pl-8 ml-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
                  <span className="text-sm font-mono text-zinc-400 mb-2 block">{exp.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1">{exp.role}</h4>
                  <p className="text-lg text-zinc-300 mb-4">{exp.company}</p>
                  <p className="text-zinc-500 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education List */}
          <div className="stagger-item pt-8">
            <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest mb-8">Education</h3>
            <div className="space-y-12 border-l border-white/10 pl-8 ml-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
                  <span className="text-sm font-mono text-zinc-400 mb-2 block">{edu.period}</span>
                  <h4 className="text-2xl font-bold tracking-tight mb-1">{edu.degree}</h4>
                  <p className="text-lg text-zinc-300 mb-4">{edu.institution}</p>
                  <p className="text-zinc-500 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
