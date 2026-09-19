# 07. Surface Depth, Noise Textures & Shaders

## 1. What is it & Why it exists
**What:** Textures, grain overlays, and gradient masks that eliminate flat, lifeless digital backgrounds.
**Why:** Flat dark-mode colors (`#111`) look sterile. Adding subtle SVG grain and radial highlights adds physical surface depth.

## 2. Setup Guide & Configuration
**Lightweight SVG Noise Overlay (Zero Performance Impact):**
Add this to your root layout (`app/layout.tsx` or `index.html`):
```html
<div 
  className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
  }}
/>
```

**Frosted Glass Card Border:**
```html
<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
  <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
  {/* Card Content */}
</div>
```

## 3. Expert Advice & Pro Tips
- **Prevent Color Banding:** Linear gradients often produce visible bands on low-gamut screens. SVG grain naturally blends and eliminates banding.
- **GPU Acceleration:** Add `transform-gpu` to animated blurred backdrops to force GPU rendering and avoid frame drops.
