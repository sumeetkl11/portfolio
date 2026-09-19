# 08. Responsive Visual QA & Breakpoint Testing

## 1. What is it & Why it exists
**What:** Automated visual checks on critical screen viewports (375px, 768px, 1440px).
**Why:** Custom bento grids and bespoke absolute animations frequently cause horizontal overflows (`overflow-x`) on mobile devices.

## 2. Setup Guide & Configuration
**Playwright / Headless Check Integration:**
```bash
npm install -D @playwright/test
```

**Antigravity QA Instruction:**
> "Antigravity, inspect the created component at viewports: 375x667 (iPhone SE), 768x1024 (iPad), and 1440x900 (MacBook). Verify there are no horizontal scroll bars (`document.body.scrollWidth === window.innerWidth`) and no overlapping headings."

## 3. Expert Advice & Pro Tips
- **The Overflow-X Rule:** Add `overflow-x-clip` on main section containers instead of `overflow-hidden` to avoid clipping sticky navigation bars.
- **Fluid Typography:** Use Tailwind's `clamp` or `text-3xl sm:text-5xl md:text-7xl` to ensure headlines adapt without hyphenated word breaks.
