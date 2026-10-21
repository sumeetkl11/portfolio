"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.28,
  className = "inline-block",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const xToRef = useRef<gsap.QuickToFunc | null>(null);
  const yToRef = useRef<gsap.QuickToFunc | null>(null);
  const isDisabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      isDisabledRef.current = true;
      return;
    }

    isDisabledRef.current = false;
    xToRef.current = gsap.quickTo(ref.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    yToRef.current = gsap.quickTo(ref.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabledRef.current || !ref.current || !xToRef.current || !yToRef.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    const maxDisplacement = 8;
    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

    xToRef.current(clampedX);
    yToRef.current(clampedY);
  };

  const handlePointerLeave = () => {
    if (isDisabledRef.current || !xToRef.current || !yToRef.current) return;
    xToRef.current(0);
    yToRef.current(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`${className} will-change-transform`}
    >
      {children}
    </div>
  );
}
