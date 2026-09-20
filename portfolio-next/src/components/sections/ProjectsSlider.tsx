"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicDialog from "@/components/ui/CinematicDialog";

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
    if (sectionRef.current && slider) {
      // Calculate how far to scroll the slider track
      const getScrollAmount = () => {
        const sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
      
      // Cleanup
      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className="h-screen w-full relative bg-black overflow-hidden flex flex-col justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="w-full px-6 md:px-12 relative z-10 mb-12">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-wider">
            Selected Works
          </h2>
        </div>

        <div className="relative z-10 w-full overflow-visible">
          <div 
            ref={sliderTrackRef} 
            className="flex gap-8 px-6 md:px-12 w-max"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden cursor-none glass-panel border border-white/5 transition-colors duration-500 hover:border-white/20 bg-zinc-900/50 flex flex-col justify-between p-8"
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
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="relative z-10 mt-auto pt-8">
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
                </div>
              </div>
            ))}
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
