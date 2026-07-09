import { DynamicScene }    from '@/components/DynamicScene'
import { Navbar }           from '@/components/Navbar'
import { Hero }             from '@/components/Hero'
import { Projects }         from '@/components/Projects'
import { Timeline }         from '@/components/Timeline'
import { TerminalContact }  from '@/components/TerminalContact'
import { Footer }           from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Fixed 3D WebGL canvas — lives behind all content (Client Component, ssr:false) */}
      <DynamicScene />

      {/* All UI content — z-index above the canvas */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Timeline />
          <TerminalContact />
        </main>
        <Footer />
      </div>
    </>
  )
}
