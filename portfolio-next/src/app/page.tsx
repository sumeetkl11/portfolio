import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import ProfileHero from "@/components/sections/ProfileHero";
import Experience from "@/components/sections/Experience";
import ProjectsSlider from "@/components/sections/ProjectsSlider";
import KatanaSkills from "@/components/sections/KatanaSkills";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen relative z-0">
      <HeroScrollytelling />
      <ProfileHero />
      <ProjectsSlider />
      <KatanaSkills />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
