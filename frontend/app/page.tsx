import { Navbar }           from '@/components/Navbar'
import { Hero }             from '@/components/Hero'
import { TechMarquee }      from '@/components/TechMarquee'
import { Projects }         from '@/components/Projects'
import { Timeline }         from '@/components/Timeline'
import { TerminalContact }  from '@/components/TerminalContact'
import { Footer }           from '@/components/Footer'

export default function Home() {
  return (
    <>

      {/* All UI content — z-index above the canvas */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <Projects />
          <Timeline />
          <TerminalContact />
        </main>
        <Footer />
      </div>
    </>
  )
}
