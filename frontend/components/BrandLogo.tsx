'use client'

import Link from 'next/link'

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 select-none"
      aria-label="Sumeet Kanhiya"
    >
      {/* SVG Icon Container with hover animation classes */}
      <div className="relative h-10 w-10 flex-shrink-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(139,92,246,0.65)]">
        <svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            {/* The primary gradient: Tailwind blue-400 (#60A5FA) to violet-500 (#8B5CF6) */}
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Path for 'S' — Modern High-Contrast Serif */}
            <path
              id="path-s"
              d="M 42,14 
                 L 42,24 
                 C 38,18 32,17 26,17 
                 C 20,17 18,20 18,24 
                 C 18,30 24,32 30,34 
                 C 38,37 44,41 44,50 
                 C 44,61 36,73 24,73 
                 C 14,73 8,67 8,67 
                 L 8,57 
                 C 14,63 20,64 24,64 
                 C 28,64 32,62 32,57 
                 C 32,51 26,49 20,47 
                 C 12,44 8,40 8,31 
                 C 8,20 16,14 26,14 
                 C 34,14 42,14 42,14 
                 Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />

            {/* Path for 'K' — Modern Slab/High-Contrast Serif */}
            <path
              id="path-k"
              d="M 54,14 L 78,14 L 78,20 L 72,20 L 72,66 L 78,66 L 78,72 L 54,72 L 54,66 L 60,66 L 60,20 L 54,20 Z 
                 M 72,40 L 92,20 L 86,20 L 86,14 L 106,14 L 106,20 L 100,20 L 80,44 Z 
                 M 76,40 L 96,72 L 108,72 L 108,66 L 102,66 L 82,38 Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />

            {/* 
              Mask definition: White makes things visible, black makes them transparent.
              This allows the background behind the logo to show through the cuts.
            */}
            <mask id="sk-overlap-mask">
              {/* Entire canvas is visible by default */}
              <rect width="120" height="100" fill="#FFFFFF" />

              {/* 
                Cutout 1: Cut S out of K with a stroke to create the transparent negative space gap. 
                Using a thick black stroke creates the uniform border gap.
              */}
              <use
                href="#path-s"
                fill="#000000"
                stroke="#000000"
                strokeWidth="5"
                strokeLinejoin="round"
              />

              {/* 
                Cutout 2: Diagonal cut near K's top arm connection for a clean geometric separation 
              */}
              <line
                x1="66"
                y1="46"
                x2="80"
                y2="30"
                stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* 
                Cutout 3: Curve cutout at K's bottom joint for aesthetic styling
              */}
              <circle
                cx="66"
                cy="44"
                r="7"
                fill="#000000"
              />
            </mask>
          </defs>

          {/* Render 'K' behind S, applying the transparency mask */}
          <use
            href="#path-k"
            fill="url(#logo-gradient)"
            mask="url(#sk-overlap-mask)"
          />

          {/* Render 'S' on top */}
          <use
            href="#path-s"
            fill="url(#logo-gradient)"
          />
        </svg>
      </div>

      {/* Brand Text styling next to logo */}
      <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-slate-100">
        Sumeet Kanhiya
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] transition-all duration-300 group-hover:scale-110">
          .
        </span>
      </span>
    </Link>
  )
}
