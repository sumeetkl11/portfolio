"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicDialog from "@/components/ui/CinematicDialog";
import { ExternalLink, Layers, ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );
    }

    const slider = sliderTrackRef.current;
    const section = sectionRef.current;
    if (section && slider) {
      const getScrollAmount = () => {
        if (!slider) return 0;
        const cards = slider.querySelectorAll<HTMLElement>(".project-card");
        const lastCard = cards[cards.length - 1];
        if (!lastCard) return -(slider.scrollWidth - window.innerWidth);

        const cardCenterInTrack = lastCard.offsetLeft + lastCard.offsetWidth / 2;
        const targetX = window.innerWidth / 2 - cardCenterInTrack;
        return Math.min(0, targetX);
      };

      const ctx = gsap.context(() => {
        const horizontalDistance = Math.abs(getScrollAmount());
        const scrollDistanceForAnimation = horizontalDistance * 2;
        const holdDistance = window.innerHeight * 0.6;
        const totalScrollDistance = scrollDistanceForAnimation + holdDistance;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const animationPhase = scrollDistanceForAnimation / totalScrollDistance;
        const holdPhase = holdDistance / totalScrollDistance;

        tl.to(slider, {
          x: () => getScrollAmount(),
          ease: "none",
          duration: animationPhase,
        }).to({}, {
          duration: holdPhase,
        });
      }, sectionRef);

      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ctx.revert();
      };
    }
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="h-screen w-full relative bg-[#0a0a0b] overflow-hidden flex flex-col justify-center z-10 border-t border-white/5"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#adc6ff] font-semibold">
                FEATURED ARCHITECTURES
              </span>
            </div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-wider text-white"
            >
              Projects
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden md:block">

          </span>
        </div>

        <div className="relative z-10 w-full overflow-visible">
          <div
            ref={sliderTrackRef}
            className="flex gap-8 px-6 md:px-12 w-max items-stretch"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${project.title} architecture`}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="project-card group relative w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[55vh] min-h-[460px] max-h-[580px] rounded-3xl overflow-hidden cursor-pointer dark-glass-card border border-white/10 hover:border-[#adc6ff]/50 transition-all duration-500 bg-zinc-950/70 flex flex-col justify-between p-6 md:p-8 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#adc6ff] hover:shadow-[0_0_40px_rgba(173,198,255,0.15)]"
              >
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#adc6ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Project Sequence Number */}
                <div className="text-6xl md:text-8xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500 absolute top-4 right-8 pointer-events-none">
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <span className="text-[11px] font-mono text-[#adc6ff] uppercase tracking-widest block mb-3 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white group-hover:text-[#adc6ff] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-xs md:text-sm line-clamp-3 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-zinc-300">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{metric.label}:</span>
                          <span className="text-xs text-zinc-200 font-semibold group-hover:text-white transition-colors">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-[#adc6ff]/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/5">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-1">
                    <div className="flex items-center gap-4">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer relative z-20 py-1"
                          title="View Source Code"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer relative z-20 py-1"
                          title="View Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-[#adc6ff] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>TRD Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Trailing Buffer Spacer */}
            <div className="w-[12vw] md:w-[18vw] flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Cinematic Modal */}
      <CinematicDialog
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
