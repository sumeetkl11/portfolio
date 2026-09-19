# 03. Aceternity UI & Magic UI

## 1. What is it & Why it exists
**What:** Curated, highly-crafted animated component blocks.
**Why:** Delivers high-end visual showcases (e.g., Spotlight effects, Glowing Backgrounds, Animated Bento Grids) instantly.

## 2. Setup Guide & Configuration
**Dependencies:**
`npm i framer-motion clsx tailwind-merge lucide-react`

**Helper Utility (`lib/utils.ts`):**
```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 3. Expert Advice & Pro Tips
- **Hero-Only Rule:** Limit heavy animated visual anchors (like Aurora backgrounds or 3D cards) to the hero or main feature.
- **Dynamic Imports:** For below-the-fold sections, use Next.js dynamic imports (`dynamic(() => import(...), { ssr: false })`) to optimize Lighthouse performance.
