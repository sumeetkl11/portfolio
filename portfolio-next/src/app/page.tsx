import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import TelemetryStrip from "@/components/sections/TelemetryStrip";
import About from "@/components/sections/About";
import ProjectsSlider from "@/components/sections/ProjectsSlider";
import KatanaSkills from "@/components/sections/KatanaSkills";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-black relative z-0">
      <HeroScrollytelling />
      <TelemetryStrip />
      <About />
      <ProjectsSlider />
      <KatanaSkills />
      <Certifications />
      <Experience />
      <Contact />
    </main>
  );
}
