# Technical Requirements Document (TRD)

## 1. Tech Stack
- **Framework:** Next.js (App Router) / React.
- **Styling:** Tailwind CSS + Custom CSS Variables (for layout and typography).
- **Typography:** Geist Sans & Geist Mono.
- **Animations:** Framer Motion (for spring physics), Aceternity UI / Magic UI (for hero visual anchors).
- **Components:** Shadcn UI (Customized base components, NO default flat styles).

## 2. Architecture & Performance
- **Dynamic Imports:** Heavy animated components (like 3D cards or Aceternity backgrounds) must be dynamically imported to keep the initial load fast.
- **Asset Optimization:** All project showcase images must be served in WebP/AVIF format via Next/Image.

## 3. Deployment & CI/CD
- **Hosting:** Vercel (Current infrastructure).
- **Visual QA:** Implement Playwright to run automated viewport checks (375px, 768px, 1440px) before deployment to ensure custom bento grids don't break.

## 4. UI/UX Specifications (From Anti-Slop Guide)
- **Spacing:** Enforce the 2x Whitespace rule (`py-24` to `py-32` between sections).
- **Background:** Implement `mix-blend-overlay` SVG noise texture to prevent dark mode banding (Zinc 950 base).
- **Borders:** `border-white/10` with subtle inner shadows instead of solid gray borders.
