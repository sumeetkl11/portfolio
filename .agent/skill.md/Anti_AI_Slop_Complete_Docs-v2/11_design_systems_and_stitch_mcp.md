# Topic 6: Design Systems & Stitch MCP (Defeating "AI Slop")

> **Part of**: [Antigravity MCP Documentation Series](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/README.md)  
> **Inspired by**: The post's `#webdesign` and `#nocode` / `#vibecoding` focus

---

## 1. What is Stitch MCP / Design System MCP?

**Stitch MCP** and Figma-connected MCP servers connect design tools and design system definitions directly to Antigravity's code-generation loop.

### The Problem: The "AI Slop" Trap
When unguided AI agents write web applications, they default to generic, uninspired patterns:
- Random, uncoordinated hex colors.
- Overused basic blue buttons and generic card layouts.
- Inconsistent spacing (mixing 7px, 13px, 22px ad-hoc margins).
- Default browser fonts with poor hierarchy.

With a **Design System MCP**:
- Antigravity receives exact design tokens: predefined color palettes (semantic HSL/OKLCH tokens), font families, elevation shadows, and border radii.
- The agent writes custom, clean Vanilla CSS or framework code that feels crafted by a senior product designer.

---

## 2. Capabilities of Stitch MCP

In Antigravity's lazy tool registry, Stitch MCP exposes:
- `list_design_systems`: Inspects available design libraries.
- `create_design_system_from_design_md`: Imports Markdown design specifications into tokens.
- `apply_design_system`: Enforces design system rules onto UI components.
- `generate_variants`: Creates component state variations (hover, active, disabled, dark mode) that adhere to the tokens.

---

## 3. How to Implement a Modern Design Token System in CSS

When using Antigravity, pair design tools with a foundational `index.css` design system:

```css
:root {
  /* Color Palette (Curated, non-generic) */
  --bg-primary: #0a0e17;
  --bg-surface: #121826;
  --bg-surface-elevated: #1c2438;
  --border-subtle: #242f48;
  
  --accent-primary: #6366f1;
  --accent-glow: rgba(99, 102, 241, 0.25);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;

  /* Typography Scale */
  --font-display: 'Outfit', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 4px Base Spacing Grid */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Elevations & Glassmorphism */
  --radius-md: 10px;
  --radius-lg: 16px;
  --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  --backdrop-blur: blur(12px);
}
```

---

## 4. Expert Advice & Suggestions for UI/Design MCPs

> [!IMPORTANT]
> **1. Enforce Token Usage in Agent Instructions**  
> Add a clear instruction to your project's `GEMINI.md` or prompt:  
> *"All CSS styles must use CSS Custom Properties defined in `:root`. Never introduce ad-hoc hex codes or arbitrary margin pixel values."*

> [!TIP]
> **2. Micro-Interactions Elevate the Design**  
> Great UI feels responsive and alive. Prompt the agent:  
> *"Add subtle CSS micro-interactions: smooth transitions on hover, slight translateY(-2px) lifts on interactive cards, and accessible focus-visible rings."*

> [!TIP]
> **3. Dark-Mode First Architecture**  
> Modern developer and SaaS tools look vastly more premium in carefully tuned dark modes. Use deep slate or midnight blues (`#0a0e17`, `#121826`) rather than pure black (`#000000`) for visual depth and reduced eye strain.

---

## Next Steps
- Continue to **[Topic 7: Workflow Optimization, Mindsets & Security Advice](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/07_productivity_and_security_advice.md)**
