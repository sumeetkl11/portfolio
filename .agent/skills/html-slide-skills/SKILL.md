---
name: html-slide-skills
description: Generate standalone, zero-dependency, single-file HTML/CSS presentation slide decks with themes, interactive transitions, layouts, and presenter mode. Use when creating interactive presentations, pitch decks, technical walk-through slides, or keynote-level HTML slide components.
---

# HTML Slide Generation Skill

Build zero-dependency, single-file HTML presentations inspired by curated HTML slide skills (from awesome-html-slide-skills, huashu-design, frontend-slides, and html-ppt-skill).

## Core Principles
1. **Zero External Runtime**: Keep HTML decks self-contained or use standard CDNs for fonts. Slides run natively in any modern browser.
2. **Aspect Ratio & Container**: Default to standard 16:9 widescreen (`aspect-ratio: 16 / 9` or fixed `1920x1080` scaled with CSS transform `scale(min(vw/1920, vh/1080))`).
3. **Keyboard & Touch Navigation**:
   - `ArrowRight`, `Space`, `Enter`, `PageDown`: Next slide
   - `ArrowLeft`, `Backspace`, `PageUp`: Previous slide
   - `F`: Toggle Fullscreen
   - `S`: Toggle Presenter Notes / Mode
   - Touch: Swipe left/right for mobile view.

## 36 Curated Visual Themes
- **Dark Editorial**: `midnight-editorial`, `electric-studio`, `catppuccin-mocha`, `tokyo-night`, `dark-botanical`.
- **Minimal & Modern**: `minimal-white`, `swiss-grid`, `bauhaus`, `corporate-clean`.
- **Creative & High-Tech**: `cyberpunk-neon`, `terminal-mono`, `y2k-chrome`, `blueprint`, `glassmorphism`.

## Slide Component Layouts
1. **Title / Cover Slide**: Giant typography, strong subtitle, author attribution, date/status tag.
2. **Split Comparison**: 2-column or 3-column bento grid for side-by-side architecture or feature breakdown.
3. **Stat / Metric Callout**: Huge numbers (e.g. `99.9%`, `60fps`, `0.2s`) with brief explanatory label underneath.
4. **Code / Architecture Walkthrough**: Syntax-highlighted code block on left, annotated explanation steps on right.
5. **Quote / Impact Statement**: Large centered editorial serif quote with subtle background styling.

## Presenter Script & Notes
Embed hidden notes inside `<aside class="speaker-notes">` in each slide, visible when presenter mode (`S` key) is active or in a dedicated split presenter window.
