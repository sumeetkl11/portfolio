"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isKeyboardModeRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't activate on touch / mobile devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Don't activate if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Set initial position & hide cursor until mouse enters
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.4,
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      mixBlendMode: "difference",
    });

    // GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });

    const showCursor = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const hideCursor = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(cursor, {
          opacity: 0,
          scale: 0.4,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isKeyboardModeRef.current) {
        isKeyboardModeRef.current = false;
        document.documentElement.classList.remove("keyboard-nav");
      }
      showCursor();
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Modal dialog asking to suppress custom cursor
      if (target.closest('[data-cursor="none"]')) {
        hideCursor();
        return;
      }

      // Check if hovering over any clickable / interactive element
      const isInteractive = target.closest("a, button, [role='button'], .project-card, [data-cursor]");

      if (isInteractive && !isHoveringRef.current) {
        isHoveringRef.current = true;
        // Smooth scale-up on interactive elements without clipping
        gsap.to(cursorDot, {
          scale: 1.22,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (!isInteractive && isHoveringRef.current) {
        isHoveringRef.current = false;
        // Revert to normal
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget || e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        hideCursor();
      }
    };

    const handleDocMouseLeave = () => {
      hideCursor();
    };

    const handleDocMouseEnter = () => {
      showCursor();
    };

    const handleWindowBlur = () => {
      hideCursor();
    };

    // Keyboard navigation detection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab key indicates keyboard navigation
      if (e.key === "Tab") {
        isKeyboardModeRef.current = true;
        document.documentElement.classList.add("keyboard-nav");
        hideCursor();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleDocMouseLeave);
    document.addEventListener("mouseenter", handleDocMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleDocMouseLeave);
      document.removeEventListener("mouseenter", handleDocMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("keyboard-nav");
    };
  }, []);

  // Re-run reset when route changes
  useEffect(() => {
    isHoveringRef.current = false;
    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2, overwrite: "auto" });
    }
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center opacity-0"
      style={{
        width: 48,
        height: 48,
        transform: "translate(-50%, -50%)",
        willChange: "transform, opacity",
      }}
    >
      <div
        ref={cursorDotRef}
        className="flex items-center justify-center w-full h-full"
      >
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-full h-full -rotate-[24deg]"
        >
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>
    </div>
  );
}
