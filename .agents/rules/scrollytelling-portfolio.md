# Scrollytelling Portfolio & Anti-AI Slop Rules

When designing and engineering this portfolio project (`sumit_scrollytelling_experience.md`):

## 1. Core Visual Directives
- **Pitch Black Void (#000000)**: The canvas background and page background must match `#000000` with 0% visible seams. The character (Sumit in tactical katana gear) emerges seamlessly from the void.
- **Negative Space**: Keep the right side open and clean as negative space for typography and narrative copy.
- **No AI Slop**: Reject generic purple-cyan gradients, centered generic feature cards, floating robot emojis, and cliche copy. Follow `.agents/skills/anti-ai-slop-system` and `.agents/skills/no-ai-design-slop`.

## 2. Scroll-Scrubbed Canvas Image Sequence
- Active skill: `.agents/skills/scroll-scrubbed-visual-sequence`.
- Source frames: Located in `frames/` (`ezgif-frame-001.jpg` to `ezgif-frame-040.jpg`).
- Pinned Sticky Stage: Pin the HTML5 `<canvas>` sticky during the scroll sequence (e.g. `scrollVh: 300` - `400vh`).
- Progress Normalization: Progress is calculated from `0.0` to `1.0` strictly from native scroll. Redraw canvas only on progress change with `requestAnimationFrame`.
- Preload Strategy: Preload frame 1 immediately for initial paint, then sequentially buffer all 40 frames into memory for instant 60fps scrub performance.

## 3. Motion & Animation Rules
- Active skills: `.agents/skills/cinematic-scroll-storytelling`, `.agents/skills/cinematic-gsap-lenis-motion-system`.
- Smooth scrolling powered by Lenis or GSAP ScrollTrigger.
- GPU Compositing: Only animate `transform` and `opacity`. Never animate layout dimensions (`width`, `height`, `top`).
- Text Fade Beats:
  - 0% - 25%: Hero Intro ("Hi, I'm Sumit. Creative Developer.")
  - 25% - 50%: The Reveal ("Precision in every pixel. Building digital experiences with the discipline of a warrior.")
  - 50% - 75%: The Action ("Sharpening the edge of the web. Mastering interactive storytelling.")
  - 75% - 100%: The Stance & CTA ("Let's build something extraordinary." -> "View My Work" / "Let's Talk")

## 4. Modern CSS & Semantic Markup
- Active skills: `.agents/skills/modern-css-mastery`, `.agents/skills/semantic-html-css-foundations`.
- Strict semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- CSS variables for palette and spacing tokens. Fluid typography with `clamp()`.
