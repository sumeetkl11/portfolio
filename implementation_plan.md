# Anti-AI Slop Rulebook — Full Portfolio Upgrade

Apply the complete `Anti_AI_Slop_Complete_Docs-v2` rulebook to `sumeetkl11/portfolio`
in the ordered sequence defined by the master prompt.

---

## Background

The portfolio (`d:/coedes/protfolio/portfolio/frontend`) is a Next.js 16 + Tailwind v4 app
with the following existing components:

| Component | Status |
|---|---|
| `layout.tsx` | Has fonts (Space Grotesk, Syne, JetBrains Mono), SEO, dark base |
| `Hero.tsx` | Framer Motion stagger, gradient text, profile image box, social links |
| `Projects.tsx` | 3-col grid, Tilt cards, accent classes, spring animations |
| `Timeline.tsx` | Alternating left/right layout, glass cards, gradient line |
| `TerminalContact.tsx` | Terminal UI for contact form |
| `Navbar.tsx` | Scroll-triggered glassmorphism, mobile overlay |
| `Footer.tsx` | Brand + links |
| `globals.css` | oklch design tokens, `.glass`, `.gradient-text`, `.glow-*` |

**Already installed:** `framer-motion`, `react-parallax-tilt`, `three`, `@react-three/fiber`  
**Missing (to add):** `use-sound`, `@fontsource/geist-sans` (optional), `shadcn/ui` base init, `clsx`, `tailwind-merge`

---

## Open Questions

> [!IMPORTANT]
> **Audio assets**: `use-sound` needs a lightweight `soft-click.mp3` file (~5KB) served from `/public/sounds/`.  
> Do you have one, or should I generate/source a royalty-free one during build?

> [!IMPORTANT]
> **Shadcn init**: The project uses Tailwind v4 which is partially incompatible with the default shadcn CLI (`npx shadcn@latest init` targets v3). We will **manually port** the two shadcn patterns from the rulebook (layered gradient buttons + `rounded-2xl` radius) rather than running the CLI. Is that acceptable?

> [!IMPORTANT]
> **Projects layout**: The rulebook requires **asymmetric bento grids** (doc 01). The current 3-equal-column grid is "AI slop symmetric". The plan is to convert it to a dynamic bento (1 large `col-span-2` hero card + 2 smaller cards). Confirm if you're okay with this layout change.

---

## Proposed Changes

### Phase 1 — Structure & Copy (`01_fundamentals` + `09_copywriting`)

#### [MODIFY] [globals.css](file:///d:/coedes/protfolio/portfolio/frontend/app/globals.css)
- Add Geist font imports (or keep existing fonts — see Q above).
- Add `--background` to `oklch(0.13 0.025 275)` ✅ already done; verify it is not pure `#000`.
- Upgrade the `.glass` utility: add `border border-white/[0.08]` instead of flat `var(--border)` (08% white matches the rulebook's "inner glow" instruction).
- Add `overflow-x-clip` to `main` section containers.
- Double padding tokens: ensure sections use `py-20 md:py-32` or greater.

#### [MODIFY] [Hero.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Hero.tsx)
- **Copy fix (09):** Remove implicit "Hi, I'm" prefix — replace with a punchier two-word stem format.  
  - *Before:* `"Hi, I'm"` + large name  
  - *After:* Inline role label in `font-mono` (`// full-stack dev`) + stacked heading  
- **Layout fix (01):** Convert symmetric `md:grid-cols-2` into asymmetric split (`md:grid-cols-[58fr_42fr]`).
- **Whitespace (01):** Increase hero padding from `pt-24` → `pt-32 md:pt-40`.
- **Gradient border on profile image (01):** Replace `border-violet-500/50` with `border border-white/[0.08]` + gradient overlay radial blob.
- **Stagger config (02):** Change `staggerChildren: 0.1` → `0.08` (doc says 0.08).
- **Spring preset (02):** Ensure CTA button uses `whileTap={{ scale: 0.98 }}` + spring transition.
- **CTA button (04):** Replace plain gradient button with shadcn-style layered gradient:  
  `from-white/15 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-95`

#### [MODIFY] [Projects.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Projects.tsx)
- **Copy (09):** Project taglines checked — already concrete and free of buzzwords ✅.
- **Bento layout (01):** Replace `grid-cols-3` equal grid with asymmetric dynamic bento:
  ```
  [  Linkforge — col-span-2, min-h-[420px]  ] [  Sock.io  ]
  [       ChefCraft — full width or col-span-2 + 1 col empty  ]
  ```
- **Card border (01):** Apply `border border-white/[0.08]` + inner radial color blob per card.
- **Stagger (02):** Add `staggerChildren: 0.08` on the grid container via `motion.div` variants.
- **Spring on cards (02):** Upgrade card hover: `whileHover={{ y: -4, scale: 1.01 }}` + `whileTap={{ scale: 0.98 }}`.

#### [MODIFY] [Timeline.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Timeline.tsx)
- **Copy (09):** Section title `"Experience & Education"` → `"Where I've worked."` (more human, less corporate).
- **Whitespace (01):** Increase `py-24 md:py-32` → `py-20 md:py-32` (already at target ✅).
- **Spring stagger (02):** Add `staggerChildren: 0.08` + `viewport={{ once: true, margin: '-80px' }}` ✅ already done.

#### [MODIFY] [Navbar.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Navbar.tsx)
- Add **mute toggle icon** (🔈/🔇) as a small button in the desktop nav for the audio system (doc 06 requires a global mute switch).
- Wire icon to a Zustand `audioStore` (already using Zustand ✅).

---

### Phase 2 — Base Components (`04_shadcn` + `03_premium_libraries`)

#### [NEW] [lib/hooks/useAudio.ts](file:///d:/coedes/protfolio/portfolio/frontend/lib/hooks/useAudio.ts)
- Zustand store slice: `{ muted: boolean, toggleMute: () => void }`.

#### [NEW] [components/ui/TactileButton.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/ui/TactileButton.tsx)
- Wraps `<button>` with `use-sound` hook (volume 0.12).
- Reads `muted` from `useAudio` store.
- Disables sound on `ontouchstart` devices (mobile guard per doc 06).
- Uses shadcn layered gradient class from doc 04.

#### [MODIFY] [components/Hero.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Hero.tsx)
- Replace anchor CTA buttons with `<TactileButton>` component (or wrap in `<TactileButton>` HOC).

#### [MODIFY] [components/Projects.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Projects.tsx)
- Wrap "Repository" and "Live Site" link buttons with `<TactileButton>` HOC.

---

### Phase 3 — Physical Depth (`07_noise_shaders`)

#### [MODIFY] [app/layout.tsx](file:///d:/coedes/protfolio/portfolio/frontend/app/layout.tsx)
- Add the **SVG noise overlay** `<div>` into the `<body>` as per doc 07:
  ```jsx
  <div
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,...")` }}
  />
  ```
  This is zero-performance-cost and eliminates the flat sterile dark background.

#### [MODIFY] [components/Projects.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Projects.tsx)
- Add **frosted glass card** structure per doc 07 to each project card:
  - `relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl`
  - Inner radial color blob: `absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl` in each card's accent color.
- Add `transform-gpu` to animated blurred backdrops.

#### [MODIFY] [components/Hero.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Hero.tsx)
- Add radial highlight blob behind the profile image box.
- Frosted glass border on the profile image container: `border border-white/10 bg-white/[0.03]`.

---

### Phase 4 — Audio & Haptics (`06_audio`)

#### Install dependency
```bash
cd d:/coedes/protfolio/portfolio/frontend && npm install use-sound
```

#### [NEW] [public/sounds/soft-click.mp3](file:///d:/coedes/protfolio/portfolio/frontend/public/sounds/soft-click.mp3)
- Source/use a royalty-free ~5KB soft-click audio file.

#### [NEW] [components/ui/TactileButton.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/ui/TactileButton.tsx)
*(Detailed above in Phase 2 — created here.)*

#### [MODIFY] [lib/useSceneStore.ts](file:///d:/coedes/protfolio/portfolio/frontend/lib/useSceneStore.ts)
- Extend or create a separate `useAudioStore.ts` with `{ muted, toggleMute }`.

---

### Phase 5 — Interaction Animations (`02_animations`)

#### [MODIFY] [components/Hero.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Hero.tsx)
- Enforce **standard spring preset**: `{ type: "spring", stiffness: 260, damping: 20 }`.
- Stagger children: `staggerChildren: 0.08`.
- Scroll triggers: `viewport={{ once: true, margin: "-80px" }}` ✅ already exists.

#### [MODIFY] [components/Projects.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Projects.tsx)
- Wrap the bento grid in a `motion.div` with `staggerChildren: 0.08` variants.
- Each card: `whileHover={{ y: -4, scale: 1.01 }}` + `whileTap={{ scale: 0.98 }}`.
- Replace default `tiltMaxAngleX={6}` Tilt with spring-physics Framer Motion hover (or keep Tilt for 3D effect AND add Framer spring on top).

#### [MODIFY] [components/Timeline.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Timeline.tsx)
- Add `staggerChildren: 0.08` to parent motion container.
- Ensure `viewport={{ once: true, margin: "-80px" }}` on all entries ✅ already has `-40px`; update to `-80px`.

#### [MODIFY] [components/Navbar.tsx](file:///d:/coedes/protfolio/portfolio/frontend/components/Navbar.tsx)
- Navbar entrance: already has `initial={{ y: -80 }}` ✅.
- Mobile links: `staggerChildren: 0.07` already ✅; upgrade to `0.08`.

---

### Phase 6 — Visual QA (`08_responsive_qa`)

#### [NEW] [tests/responsive.spec.ts](file:///d:/coedes/protfolio/portfolio/tests/responsive.spec.ts) *(optional — Playwright)*
- Viewport tests at 375×667, 768×1024, 1440×900.
- Assert `document.body.scrollWidth === window.innerWidth` (no horizontal overflow).
- Assert no overlapping headings.
- Using Chrome DevTools MCP `take_screenshot` at each breakpoint for visual diff.

#### Manual QA Steps (via Chrome DevTools MCP)
1. Launch dev server: `npm run dev`
2. Capture screenshots at 375px, 768px, 1440px.
3. Verify `overflow-x-clip` on all section wrappers.
4. Confirm fluid typography (`text-3xl sm:text-5xl md:text-7xl` pattern).
5. Verify mute toggle visible in nav at all widths.

---

## Files Summary

| File | Action | Phase |
|---|---|---|
| `app/globals.css` | MODIFY | 1 |
| `app/layout.tsx` | MODIFY | 3 |
| `components/Hero.tsx` | MODIFY | 1, 2, 3, 5 |
| `components/Projects.tsx` | MODIFY | 1, 2, 3, 5 |
| `components/Timeline.tsx` | MODIFY | 1, 5 |
| `components/Navbar.tsx` | MODIFY | 2 |
| `components/ui/TactileButton.tsx` | NEW | 2, 4 |
| `lib/hooks/useAudio.ts` | NEW | 4 |
| `public/sounds/soft-click.mp3` | NEW | 4 |
| `tests/responsive.spec.ts` | NEW (optional) | 6 |

**New npm dependency:** `use-sound`

---

## Verification Plan

### Automated Tests
```bash
# Type-check before and after
cd d:/coedes/protfolio/portfolio/frontend && npm run typecheck

# Run dev server for QA
npm run dev
```

### Manual Verification (Chrome DevTools MCP)
- Screenshot at 375px → confirm no horizontal overflow, readable hero text, bento grid stacks correctly.
- Screenshot at 768px → confirm tablet layout is not broken mid-grid.
- Screenshot at 1440px → confirm asymmetric bento, noise layer visible, mute toggle in nav.
- Click any CTA / link button → confirm audio plays (if not muted) at low volume.
- Confirm mute toggle persists muted state across interactions (Zustand store).

---

## Risk & Edge Cases

| Risk | Mitigation |
|---|---|
| `use-sound` SSR crash | Always wrap in `typeof window !== 'undefined'` guard + `'use client'` directive |
| SVG noise inline URI breaks CSP | Add `img-src data:` to Next.js `headers()` if CSP is configured |
| Tailwind v4 + shadcn CLI incompatibility | Manual copy of gradient button classes only — no CLI run |
| Bento grid reflow on tablet (768px) | Test specifically at 768px; use `md:col-span-1` fallback |
| Audio autoplay policy | `use-sound` only triggers on user gesture (click) — compliant ✅ |
