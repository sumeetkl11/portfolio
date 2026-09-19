# 04. Shadcn UI Customization (Anti-Default)

## 1. What is it & Why it exists
**What:** Accessible headless components wrapped in customizable Tailwind styling.
**Why:** Unmodified shadcn components make websites look like cookie-cutter AI templates.

## 2. Setup Guide & Configuration
**Initialization:**
`npx shadcn@latest init`

## 3. Expert Advice & Pro Tips
- **Custom Button Styling:** Replace default flat buttons with layered gradients:
  ```html
  className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white/15 to-white/0 px-4 py-2 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-white/20 active:scale-95"
  ```
- **Radius Configuration:** Avoid standard 0.5rem. Use 0.75rem or 1rem (`rounded-2xl`) for a softer modern aesthetic.
