"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicDialog from "@/components/ui/CinematicDialog";
import { ExternalLink } from "lucide-react";

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
      // Calculate how far to scroll the slider track so all cards + end buffer are viewed
      const getScrollAmount = () => {
        const sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      const ctx = gsap.context(() => {
        // Exact horizontal distance needed to bring the last card on-screen
        const scrollDist = Math.abs(getScrollAmount());

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // scrollDist = full horizontal travel; extra 80vh = hold time at end
            end: () => `+=${scrollDist + window.innerHeight * 0.8}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Only raise z-index while actually pinned so sections below aren't buried
            onPin: () => { section.style.zIndex = "50"; },
            onUnpin: () => { section.style.zIndex = ""; },
          }
        });

        // Phase 1: slide all cards into view (takes up scrollDist worth of scroll)
        tl.to(slider, {
          x: () => getScrollAmount(),
          ease: "none",
          // proportion of total timeline = scrollDist / (scrollDist + hold)
          duration: scrollDist / (scrollDist + window.innerHeight * 0.8),
        })
        // Phase 2: hold — user scrolls for 80vh while final card stays visible
        .to({}, {
          duration: (window.innerHeight * 0.8) / (scrollDist + window.innerHeight * 0.8),
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
      <section ref={sectionRef} id="projects" className="h-screen w-full relative bg-black overflow-hidden flex flex-col justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="w-full px-6 md:px-12 relative z-10 mb-6 md:mb-8">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-wider">
            Projects
          </h2>
        </div>

        <div className="relative z-10 w-full overflow-visible">
          <div 
            ref={sliderTrackRef} 
            className="flex gap-8 px-6 md:px-12 w-max items-stretch"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[55vh] min-h-[460px] max-h-[580px] rounded-3xl overflow-hidden cursor-none glass-panel border border-white/5 transition-colors duration-500 hover:border-white/20 bg-zinc-900/50 flex flex-col justify-between p-6 md:p-8"
                data-cursor="project"
                data-cursor-text="View Project"
              >
                {/* Background image could go here, for now it's a gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Project Number */}
                <div className="text-6xl md:text-8xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500 absolute top-4 right-8 pointer-events-none">
                  {(i + 1).toString().padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-xs md:text-sm line-clamp-3 mb-4 transition-colors duration-500 group-hover:text-zinc-300">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{metric.label}:</span>
                          <span className="text-xs text-zinc-300 font-semibold group-hover:text-white transition-colors duration-500">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 pt-3 border-t border-white/10 mt-1">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer relative z-20"
                        data-cursor="pointer"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer relative z-20"
                        data-cursor="pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Site
                      </a>
                    )}
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
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
