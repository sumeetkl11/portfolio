---
name: modern-css-mastery
description: Apply modern CSS architecture, Flexbox, CSS Grid, container queries, custom properties (CSS variables), keyframe animations, subgrid, and box model mastery. Use for writing robust, maintainable, responsive, and performance-optimized CSS without unnecessary framework bloat.
---

# Modern CSS Mastery

Comprehensive reference and execution rules based on `micromata/awesome-css-learning` and modern CSS standards.

## Box Model & Layout Fundamentals
- Always use `box-sizing: border-box` globally via `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
- Understand the cascade, specificity hierarchy (Inline > ID > Class/Attribute/Pseudo-class > Element > Universal), and CSS inheritance.

## CSS Grid vs Flexbox
- **Flexbox (`display: flex`)**: 1-dimensional content flow (rows or columns). Perfect for navbars, pill lists, centered hero items, button groups.
- **CSS Grid (`display: grid`)**: 2-dimensional layouts (rows and columns simultaneously). Perfect for bento grids, editorial magazines, card matrices, and responsive full-page layouts using `repeat(auto-fit, minmax(300px, 1fr))`.
- **Subgrid**: Inherit grid tracks from parent container (`grid-template-columns: subgrid;`) for aligned cards with varied text lengths.

## CSS Variables (Custom Properties)
- Define tokens at root or component level:
  ```css
  :root {
    --bg-primary: #000000;
    --bg-surface: #0a0a0a;
    --border-subtle: rgba(255, 255, 255, 0.1);
    --text-primary: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --font-display: 'Inter', system-ui, sans-serif;
  }
  ```
- Scope variables locally for component themes, glassmorphism blur layers, and dynamic hover offsets.

## Modern Viewport & Responsive Design
- Prefer `dvh`, `svh`, `lvh` over legacy `vh` to eliminate mobile browser bar jumps.
- Use CSS `@container` queries for components whose styling depends on their card width rather than the entire viewport.
- Use `clamp()` for fluid typography: `font-size: clamp(2rem, 5vw + 1rem, 5rem);`.

## High-Performance Animations
- Animate ONLY `transform` and `opacity` to keep rendering on the GPU compositor thread (60–120 FPS).
- Avoid animating `width`, `height`, `margin`, `padding`, or `top`/`left` which trigger layout recalculations and repaints.
- Use `will-change: transform` judiciously only on active animated elements.
