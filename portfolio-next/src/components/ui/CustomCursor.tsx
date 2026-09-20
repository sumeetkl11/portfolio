"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorDot || !cursorText) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Find the closest parent with data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text') || "View";
        setHoverText(text);
        setIsHovering(true);

        // Animate to pill shape
        gsap.to(cursor, {
          width: "auto",
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 1)",
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "expo.out"
        });

        gsap.to(cursorDot, { opacity: 0, scale: 0, duration: 0.2 });
        gsap.to(cursorText, { opacity: 1, scale: 1, delay: 0.1, duration: 0.2 });

      } else if (isHovering) {
        setIsHovering(false);

        // Revert to triangle
        gsap.to(cursor, {
          width: 48,
          height: 48,
          borderRadius: 0,
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          duration: 0.3,
          ease: "expo.out"
        });

        gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.2 });
        gsap.to(cursorDot, { opacity: 1, scale: 1, delay: 0.1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial styling
    gsap.set(cursor, {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      mixBlendMode: "difference"
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering]);

  // Re-run hover check when route changes (to avoid getting stuck)
  useEffect(() => {
    setIsHovering(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        width: 48,
        height: 48,
        borderRadius: 0,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "expo.out"
      });
    }
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden px-4"
      style={{
        width: 48,
        height: 48,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, width, height, border-radius',
      }}
    >
      <div
        ref={cursorDotRef}
        className="absolute flex items-center justify-center w-full h-full"
      >
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-full h-full -rotate-[24deg]"
        >
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>
      <div
        ref={cursorTextRef}
        className="flex items-center gap-2 opacity-0 scale-0 text-black font-medium text-sm whitespace-nowrap"
      >
        <span>{hoverText}</span>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}
