---
name: The Digital Nexus
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  surface-card: rgba(255, 255, 255, 0.03)
  border-glass: rgba(255, 255, 255, 0.1)
  glow-blue: rgba(59, 130, 246, 0.5)
  glow-violet: rgba(139, 92, 246, 0.5)
  text-muted: '#94a3b8'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

This design system is engineered for a high-performance developer portfolio, emphasizing a "Digital Nexus" theme that bridges raw technical power with refined aesthetics. The brand personality is precise, innovative, and authoritative, targeting recruiters and technical leads who value engineering excellence and sophisticated visual polish.

The visual direction combines **Minimalism** with **Glassmorphism**. It utilizes a "Deep Space" canvas to provide a high-contrast foundation for vibrant, glowing accents. The aesthetic is inspired by modern development environments—clean, functional, and efficient—while incorporating subtle 3D depth and atmospheric blurs to evoke a forward-looking, cinematic feel. 

Key emotional responses:
- **Trust:** Through systematic precision and high-legibility typography.
- **Innovation:** Through the use of translucent layers and neon energy.
- **Focus:** Through generous whitespace and a strict dark mode palette that reduces cognitive load.

## Colors

The palette is anchored in a strict dark mode. The background utilizes **Deep Space Charcoal** (#0a0a0b) to create absolute depth, allowing the primary **Electric Blue** and secondary **Neon Violet** accents to "pop" with emissive energy.

- **Primary (Electric Blue):** Used for interactive states, primary calls to action, and core branding.
- **Secondary (Neon Violet):** Used for gradients, hover states, and secondary visual interest to create a "cyber" tech feel.
- **Neutral:** A deep black-gray that serves as the foundation.
- **Surface Layers:** Glassmorphism is achieved using low-opacity white overlays (`surface-card`) and subtle borders to define boundaries without adding visual bulk.

Gradients should primarily flow from Electric Blue to Neon Violet at a 135-degree angle to simulate dynamic lighting.

## Typography

The typography system prioritizes high legibility and a systematic "developer aesthetic." **Inter** is the workhorse font for its neutral, modern characteristics and excellent rendering at all sizes. For technical metadata and code-adjacent labels, **JetBrains Mono** provides the necessary "terminal" feel.

Scale principles:
- **Display Typography:** High weight (800) and tight letter-spacing to create impact.
- **Body Text:** Standard weight (400) with a generous line height (1.6) to ensure long-form technical content (like TRDs) remains readable.
- **Monospace Accents:** Used for tags, tech-stack pills, and code snippets to differentiate data from prose.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a 12-column structure for desktop. The spacing logic is based on a 4px baseline unit to maintain mathematical consistency across the UI.

- **Desktop:** 12 columns, 24px gutters, and 64px side margins. Content is centered with a max-width of 1200px.
- **Tablet:** 8 columns, 20px gutters, and 40px side margins.
- **Mobile:** 4 columns, 16px gutters, and 20px side margins.

Spacing between sections should be aggressive (e.g., 120px to 160px) to give the 3D canvas room to breathe and to prevent the UI from feeling cluttered. Alignment should be strict—elements should snap to the grid to reinforce the engineering theme.

## Elevation & Depth

Depth is not communicated through traditional shadows, but through **Glassmorphism** and **Light Emission**. 

1.  **Glassmorphism:** Components use `backdrop-filter: blur(12px)` and semi-transparent backgrounds to appear as if floating in front of the 3D scene.
2.  **Tonal Tiers:** Surfaces deeper in the hierarchy are darker; surfaces "closer" to the user are lighter and more translucent.
3.  **Glow States:** Instead of drop shadows, active elements utilize an "outer glow" (a colored `box-shadow` with high blur and low spread) using the primary Electric Blue. This simulates a neon light source illuminating the background.
4.  **Borders:** Fine, 1px borders with low opacity (`border-glass`) define the edges of floating cards, ensuring they remain distinct even against complex 3D backgrounds.

## Shapes

The shape language is "Soft-Technical." We avoid fully sharp corners to prevent a dated "Brutalist" look, opting instead for a subtle **0.25rem (4px)** radius for most UI elements. This maintains a structured, professional feel while feeling modern and approachable.

- **Standard Elements:** 4px (Soft) roundedness.
- **Large Cards/Monoliths:** 8px (rounded-lg) for a more substantial container feel.
- **Pills/Tags:** Full-round (pill-shaped) for technical labels and status indicators to differentiate them from functional buttons.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. On hover, apply a 15px Electric Blue glow.
- **Ghost:** Transparent background with a 1px Electric Blue border. Hover state fills the background with a 10% opacity blue tint.
- **Icon Buttons:** No background; icon transitions from `text-muted` to `primary` on hover with a subtle scale effect.

### Glass Cards
- Used for project showcases. Features a subtle `border-glass`, `backdrop-blur(12px)`, and a gradient hover state where the border illuminates from blue to violet.

### Chips / Tech Pills
- Small, pill-shaped containers with a dark neutral background and JetBrains Mono text. Used to list tech stacks (e.g., "React", "Node.js").

### Input Fields
- Dark backgrounds (#050505) with 1px borders. On focus, the border glows Electric Blue and the label (if floating) transitions to the primary color.

### Navigation (The Nexus Bar)
- A fixed-position, highly translucent glass bar at the top. Active links are underlined with a 2px Electric Blue stroke that "pulses" slightly.

### Terminal Output
- A specialized component for code snippets or architecture logs. Uses a darker black background, monospace font, and syntax highlighting following a "One Dark" or "Night Owl" color scheme.