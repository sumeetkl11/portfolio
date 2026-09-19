---
name: semantic-html-css-foundations
description: Core HTML5 semantic tags, accessibility standards, clean CSS selectors, document outlines, and solid structural fundamentals from Cassidy Williams HTML-CSS-Tutorial. Use for crafting clean semantic markup, avoiding div-soup, and structuring robust web documents.
---

# Semantic HTML & CSS Foundations

Foundational standards and best practices derived from `cassidoo/HTML-CSS-Tutorial`.

## Semantic HTML5 Hierarchy
Always structure web pages using semantic landmark tags rather than generic `<div>` soup:
- `<header>`: Site branding, logo, main navigation.
- `<nav>`: Primary navigation links with `<ul role="list">` and `<a>` elements.
- `<main>`: Central unique content of the page (only one per document).
- `<section>`: Thematic grouping of content, always with a heading (`<h2>`-`<h6>`).
- `<article>`: Self-contained composition (portfolio project card, blog post).
- `<aside>`: Tangentially related content (sidebar, drawer, callout note).
- `<footer>`: Site footer, copyright, secondary links, social profiles.

## Text Elements & Accessibility
- Use single `<h1>` per page for SEO and screen reader hierarchy.
- Use `<p>` for paragraphs, `<blockquote>` for quotes, `<strong>` for importance, `<em>` for stress.
- Every `<img>` MUST have a descriptive `alt` attribute (or `alt=""` with `aria-hidden="true"` if purely decorative).
- Use interactive elements properly: `<button>` for in-page actions, `<a>` for navigation to a URL.

## CSS Positioning & Flow
- **`static`**: Normal document flow.
- **`relative`**: Positioned relative to normal flow; serves as boundary for absolute children.
- **`absolute`**: Removed from document flow, positioned relative to nearest positioned ancestor.
- **`fixed`**: Positioned relative to viewport (navbars, modals, floating action buttons).
- **`sticky`**: Normal flow until a scroll threshold, then sticks (ideal for scrollytelling stages!).
