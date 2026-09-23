import gsap from "gsap";

// Animation timing constants
export const durations = {
  instant: 0.15,
  fast: 0.3,
  medium: 0.6,
  slow: 0.8,
  dramatic: 1.2,
} as const;

// Easing functions
export const easings = {
  smooth: "power3.out",
  elastic: "elastic.out(1, 0.5)",
  bounce: "back.out(1.7)",
  sharp: "power2.inOut",
  exponential: "expo.out",
} as const;

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Get animation duration (respects reduced motion preference)
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

// Field entry animation
export const animateFieldEntry = (
  element: HTMLElement,
  stagger: number = 0
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0, rotateX: 0 });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: 40, rotateX: 10 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: durations.slow,
      delay: stagger,
      ease: easings.exponential,
    }
  );
};

// Focus glow animation
export const animateFocusGlow = (element: HTMLElement, isFocused: boolean) => {
  if (prefersReducedMotion()) return;

  gsap.to(element, {
    boxShadow: isFocused
      ? "0 0 24px rgba(255, 255, 255, 0.12)"
      : "0 0 0 rgba(255, 255, 255, 0)",
    borderColor: isFocused ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
    backgroundColor: isFocused ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.05)",
    duration: durations.fast,
    ease: easings.smooth,
  });
};

// Label float animation
export const animateLabelFloat = (
  element: HTMLElement,
  shouldFloat: boolean
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, {
      y: shouldFloat ? -24 : 0,
      scale: shouldFloat ? 0.85 : 1,
    });
    return;
  }

  gsap.to(element, {
    y: shouldFloat ? -24 : 0,
    scale: shouldFloat ? 0.85 : 1,
    duration: durations.fast,
    ease: easings.smooth,
  });
};

// Error shake animation
export const animateErrorShake = (element: HTMLElement) => {
  if (prefersReducedMotion()) return;

  const timeline = gsap.timeline();
  timeline
    .to(element, { x: -10, duration: 0.1, ease: easings.sharp })
    .to(element, { x: 10, duration: 0.1, ease: easings.sharp })
    .to(element, { x: -10, duration: 0.1, ease: easings.sharp })
    .to(element, { x: 0, duration: 0.1, ease: easings.sharp });
};

// Error message slide in
export const animateErrorIn = (element: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0, height: "auto" });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: -10, height: 0 },
    {
      opacity: 1,
      y: 0,
      height: "auto",
      duration: durations.fast,
      ease: easings.smooth,
    }
  );
};

// Success checkmark animation
export const animateCheckmark = (element: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 1, opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: durations.fast,
      ease: easings.bounce,
    }
  );
};

// Button success animation
export const animateButtonSuccess = (element: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { backgroundColor: "#10b981" });
    return;
  }

  const timeline = gsap.timeline();
  timeline
    .to(element, {
      backgroundColor: "#10b981",
      scale: 1.05,
      duration: durations.fast,
      ease: easings.smooth,
    })
    .to(element, {
      scale: 1,
      duration: 0.4,
      ease: easings.elastic,
    });
};

// Button error animation
export const animateButtonError = (element: HTMLElement) => {
  if (prefersReducedMotion()) return;

  const timeline = gsap.timeline();
  timeline
    .to(element, {
      backgroundColor: "#ef4444",
      duration: durations.instant,
    })
    .to(element, {
      x: -8,
      duration: 0.1,
      ease: easings.sharp,
    })
    .to(element, {
      x: 8,
      duration: 0.1,
      ease: easings.sharp,
    })
    .to(element, {
      x: 0,
      duration: 0.1,
      ease: easings.sharp,
    })
    .to(element, {
      backgroundColor: "#ffffff",
      duration: durations.fast,
      delay: 0.5,
    });
};

// Form success celebration
export const animateFormSuccess = (
  formElement: HTMLElement,
  successElement: HTMLElement,
  onComplete?: () => void
) => {
  if (prefersReducedMotion()) {
    gsap.set(formElement, { opacity: 0, display: "none" });
    gsap.set(successElement, { opacity: 1, scale: 1 });
    if (onComplete) onComplete();
    return;
  }

  const timeline = gsap.timeline({ onComplete });
  timeline
    .to(formElement, {
      opacity: 0,
      scale: 0.95,
      duration: durations.fast,
      ease: easings.smooth,
    })
    .fromTo(
      successElement,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: durations.medium,
        ease: easings.exponential,
      }
    )
    .to(successElement, {
      delay: 2,
      opacity: 0,
      y: -20,
      duration: durations.fast,
    })
    .to(formElement, {
      opacity: 1,
      scale: 1,
      duration: durations.medium,
    });
};

// Icon fade in
export const animateIconIn = (element: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, scale: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: durations.fast,
      ease: easings.smooth,
    }
  );
};

// Character counter pulse
export const animateCounterPulse = (element: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    element,
    { scale: 1 },
    {
      scale: 1.1,
      duration: 0.2,
      ease: easings.smooth,
      yoyo: true,
      repeat: 1,
    }
  );
};
