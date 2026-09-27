// Unified Motion System for Portfolio
// Apple/Linear style: subtle, professional, spring physics

export const ease = {
  spring: [0.16, 1, 0.3, 1], // Subtle bounce, natural feel
  out: [0.33, 1, 0.68, 1], // Smooth deceleration
  inOut: [0.45, 0, 0.55, 1], // Symmetric acceleration/deceleration
};

export const duration = {
  micro: 0.15, // 150ms - micro-interactions (hover, active)
  short: 0.25, // 250ms - small transitions
  base: 0.4, // 400ms - modal entry, section reveals
  long: 0.6, // 600ms - page transitions, complex animations
};

export const stagger = {
  small: 0.05, // 50ms - subtle stagger
  medium: 0.1, // 100ms - moderate stagger
  large: 0.15, // 150ms - pronounced stagger
};

export const gsap = {
  spring: {
    duration: duration.short,
    ease: ease.spring,
  },
  out: {
    duration: duration.base,
    ease: ease.out,
  },
  inOut: {
    duration: duration.base,
    ease: ease.inOut,
  },
};

export const createStagger = (count: number, baseDelay: number = stagger.medium) =>
  Array.from({ length: count }, (_, i) => i * baseDelay);
