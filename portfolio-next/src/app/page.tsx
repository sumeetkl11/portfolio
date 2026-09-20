import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import ProfileHero from "@/components/sections/ProfileHero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <HeroScrollytelling />
      <ProfileHero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
