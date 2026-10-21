"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicDialog from "@/components/ui/CinematicDialog";
import KineticHeading from "@/components/ui/KineticHeading";
import { useResumeModal } from "@/context/ResumeModalContext";
import { ExternalLink, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const { activeProject, openProjectModal, closeProjectModal } = useResumeModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const slider = sliderTrackRef.current;
    const section = sectionRef.current;
    if (!section || !slider) return;

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
      const scrollDistanceForAnimation = horizontalDistance * 1.8;
      const holdDistance = window.innerHeight * 0.45;
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
      }).to(
        {},
        {
          duration: holdPhase,
        }
      );
    }, sectionRef);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="h-screen w-full relative bg-black overflow-hidden flex flex-col justify-center z-10 border-t border-white/10"
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 relative z-10 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-2.5">
              02 · FEATURED ARCHITECTURES
            </span>
            <KineticHeading
              text="Selected Works"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white"
            />
          </div>
          <span className="text-xs font-mono text-white/50 hidden md:block">
            SCROLL TO INSPECT SYSTEMS · CLICK FOR TRD (OR PRESS ⌘K)
          </span>
        </div>

        <div className="relative z-10 w-full overflow-visible">
          <div
            ref={sliderTrackRef}
            className="flex gap-8 px-6 sm:px-10 lg:px-16 w-max items-stretch will-change-transform"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                data-cursor="VIEW SPEC"
                aria-label={`Inspect ${project.title} architecture`}
                onClick={() => openProjectModal(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProjectModal(project);
                  }
                }}
                className="project-card group relative w-[85vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] h-[54vh] min-h-[450px] max-h-[560px] rounded-2xl overflow-hidden cursor-pointer bg-[#0a0a0a] border border-white/10 hover:border-white/35 transition-colors duration-200 flex flex-col justify-between p-7 md:p-8 flex-shrink-0 focus:outline-none"
              >
                <div className="relative z-10">
                  {/* Editorial Unboxed Kicker (Zero Ghost Watermark) */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-white/50 mb-4">
                    <span>{project.category}</span>
                    <span className="tabular-nums text-white/40">
                      0{i + 1} / 0{projects.length}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3 text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/60 text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-4 py-3.5 border-y border-white/10 font-mono">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] text-white/45 uppercase tracking-wider">
                            {metric.label}
                          </span>
                          <span className="text-sm text-white font-semibold tabular-nums mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-4 flex flex-col gap-4">
                  {/* Unboxed Tech Stack Metadata with Typographic Separators */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-white/60">
                    {project.techStack.map((tech, idx) => (
                      <span key={tech} className="inline-flex items-center gap-2.5">
                        <span>{tech}</span>
                        {idx < project.techStack.length - 1 && (
                          <span className="text-white/25" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-5">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer relative z-20 py-1 whitespace-nowrap"
                          title="View Source Code"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer relative z-20 py-1 whitespace-nowrap"
                          title="View Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Deployment</span>
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-mono text-white/70 group-hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
                      <span>Inspect TRD</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-[12vw] md:w-[18vw] flex-shrink-0" />
          </div>
        </div>
      </section>

      <CinematicDialog
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={closeProjectModal}
      />
    </>
  );
}
