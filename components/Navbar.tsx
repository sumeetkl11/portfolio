'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Box } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { useSceneVisibility } from '@/lib/sceneStore'

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [is3DVisible, setIs3DVisible] = useSceneVisibility()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-sm font-bold tracking-tight"
            aria-label="The Digital Nexus — home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-background transition-transform duration-300 group-hover:scale-110">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="font-display text-foreground">
              Sumeet<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            {/* 3D Shape Toggle Button */}
            {/* <button
              onClick={() => setIs3DVisible(!is3DVisible)}
              className="group flex items-center gap-2 rounded-lg border border-border bg-input/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground cursor-pointer"
              title={is3DVisible ? 'Disable 3D Background' : 'Enable 3D Background'}
            >
              <Box className={`h-4 w-4 transition-all duration-300 ${is3DVisible ? 'animate-spin-slow text-primary drop-shadow-[0_0_8px_oklch(0.73_0.155_232_/_60%)]' : 'opacity-40'}`} />
              <span className="tracking-wider">{is3DVisible ? '3D' : '2D'}</span>
            </button> */}

            <a
              href="#contact"
              className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_20px_oklch(0.73_0.155_232_/_30%)]"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-muted-foreground transition-colors hover:text-foreground md:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg font-bold text-foreground">
                Sumeet<span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-10 pt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                  className="font-display text-3xl font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile 3D Toggle */}
              <motion.button
                onClick={() => setIs3DVisible(!is3DVisible)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.07 }}
                className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-input/50 px-6 py-3 font-mono text-base text-foreground cursor-pointer"
              >
                <Box className={`h-5 w-5 ${is3DVisible ? 'animate-spin-slow text-primary' : 'opacity-40'}`} />
                <span>3D Graphics: {is3DVisible ? 'ON' : 'OFF'}</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
