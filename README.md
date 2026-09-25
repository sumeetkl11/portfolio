# Sumit — Full-Stack Systems & Creative Engineering Portfolio

> **Cinematic, Apple-grade, high-performance personal portfolio featuring synchronized scrollytelling, interactive 3D WebGL, and editorial typography.**

---

## ⚡ Architecture & Tech Stack

This project is built as a unified Next.js 16 application with hardware-accelerated animations and WebGL rendering:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with React 19 & TypeScript 5
- **Scrollytelling Hero**: 192-frame synchronized canvas animation scrubbing with high-performance scroll interpolation
- **3D Graphics**: Three.js & `@react-three/fiber` for real-time 3D model interaction
- **Smooth Inertia Motion**: Lenis + GSAP ScrollTrigger for buttery 60fps pacing
- **Design System**: "The Digital Nexus" — Dark mode glassmorphism (`#000000` pitch black void) styled with Tailwind CSS 4

---

## 📁 Repository Structure

```
├── docs/                               # Core project documentation & specifications
│   ├── DESIGN.md                       # Design system tokens, typography, and palette
│   ├── PROJECT_SPEC.md                 # Scrollytelling narrative beats & character direction
│   ├── SKILLS_AND_RULES_CATALOG.md     # Engineering skills & workflow reference
│   ├── HERO_VIDEO_CONVERSION_GUIDE.md  # Video encoding & optimization guide
│   └── internal/                       # Local review & audit notes (git-ignored)
│
├── portfolio-next/                     # Next.js 16 Production Application
│   ├── public/
│   │   ├── frames/                     # 192 synchronized scrollytelling image frames
│   │   ├── models/                     # Interactive 3D assets (katana.glb)
│   │   └── images/                     # Optimized visual media
│   └── src/
│       ├── app/                        # Next.js App Router (pages & API endpoints)
│       └── components/                 # UI, layout, and section components
│
├── AGENTS.md                           # AI & workspace development guidelines
└── .gitignore                          # Strict privacy & asset protection rules
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation & Development
```bash
# Navigate to the Next.js application directory
cd portfolio-next

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
cd portfolio-next
npm run build
npm run start
```

---

## 📖 Documentation Links

- [Design System & Palette Tokens](docs/DESIGN.md)
- [Scrollytelling Experience Specification](docs/PROJECT_SPEC.md)
- [Active Skills & Workflow Catalog](docs/SKILLS_AND_RULES_CATALOG.md)

---

## 🔒 Privacy & Asset Protection
Personal resume/CV files and environment configurations (`.env*`) are intentionally isolated from public version control. Master copies are maintained in private local storage.
