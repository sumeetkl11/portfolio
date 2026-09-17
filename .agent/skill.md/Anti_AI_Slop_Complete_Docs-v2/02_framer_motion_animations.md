# 02. Framer Motion & Micro-Interactions

## 1. What is it & Why it exists
**What:** Spring-physics animation framework for React.
**Why:** Linear CSS transitions feel robotic. Spring physics replicate real-world mass and friction.

## 2. Setup Guide & Configuration
**Installation:**
`npm install framer-motion clsx tailwind-merge`

**Standard Spring Preset:**
```jsx
export const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};
```

**Interactive Card Component:**
```jsx
import { motion } from "framer-motion";

export const InteractiveCard = ({ children, className }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className={className}
  >
    {children}
  </motion.div>
);
```

## 3. Expert Advice & Pro Tips
- **Stagger Children:** Always stagger lists or cards using `staggerChildren: 0.08` so elements reveal sequentially.
- **Scroll triggers:** Always configure `viewport={{ once: true, margin: "-80px" }}` so animations trigger smoothly before entering viewport.
