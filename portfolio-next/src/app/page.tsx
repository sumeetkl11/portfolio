import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import ProfileHero from "@/components/sections/ProfileHero";
import About from "@/components/sections/About";
import ProjectsSlider from "@/components/sections/ProjectsSlider";
import KatanaSkills from "@/components/sections/KatanaSkills";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen relative z-0">
      <HeroScrollytelling />
      <ProfileHero />
      <About />
      <ProjectsSlider />
      <KatanaSkills />
      <Certifications />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
