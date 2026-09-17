# 01. Anti-AI Slop Fundamentals

## 1. What is it & Why it exists
**What:** Core aesthetic guidelines that stop AI from generating generic, centered 3-card templates.
**Why:** AI defaults to uniform padding, symmetric rows, and washed-out borders. Real bespoke sites use intentional asymmetry, dynamic bento grids, and breathing space.

## 2. Setup Guide & Configuration
**Typography Setup:**
- Install Geist fonts: `npm i @fontsource/geist-sans @fontsource/geist-mono`
- Tailwind Config (`tailwind.config.js`):
  ```javascript
  fontFamily: {
    sans: ['"Geist Sans"', 'sans-serif'],
    mono: ['"Geist Mono"', 'monospace'],
  }
  ```

**Color Palettes (Avoid Default Black/White):**
- Dark Mode base: `#09090b` (Zinc 950) or `#030712` (Gray 950). Pure `#000000` is only for contrast accents.
- Light Mode base: `#fcfcfc` or `#fafafa`.

## 3. Expert Advice & Pro Tips
- **The 2x Whitespace Rule:** When styling containers, double typical padding (use `py-20 md:py-32` instead of `py-10`).
- **Dynamic Bento Grids:** Combine `col-span-1`, `col-span-2`, and varied heights (`min-h-[300px]`, `min-h-[450px]`).
- **Border Gradients:** Use `border border-white/[0.08]` combined with inner glows instead of flat harsh outlines.
