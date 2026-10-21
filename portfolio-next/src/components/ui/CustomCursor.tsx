"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const cursorLabelTextRef = useRef<HTMLSpanElement>(null);
  const isHoveringRef = useRef(false);
  const activeContextLabelRef = useRef<string | null>(null);
  const isVisibleRef = useRef(false);
  const isKeyboardModeRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorLabel = cursorLabelRef.current;
    const cursorLabelText = cursorLabelTextRef.current;

    if (!cursor || !cursorDot || !cursorLabel || !cursorLabelText) return;

    document.documentElement.classList.add("has-custom-cursor");

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.4,
    });

    gsap.set(cursorLabel, {
      opacity: 0,
      scale: 0.8,
    });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3" });

    const showCursor = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.22,
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
          duration: 0.22,
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

      if (target.closest('[data-cursor="none"]')) {
        hideCursor();
        return;
      }

      const contextTarget = target.closest<HTMLElement>("[data-cursor]");
      const contextLabel = contextTarget?.getAttribute("data-cursor") || null;

      if (contextLabel && contextLabel !== "none") {
        if (activeContextLabelRef.current !== contextLabel) {
          activeContextLabelRef.current = contextLabel;
          cursorLabelText.textContent = contextLabel;
          gsap.to(cursorDot, {
            opacity: 0,
            scale: 0.5,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(cursorLabel, {
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        return;
      }

      if (activeContextLabelRef.current !== null) {
        activeContextLabelRef.current = null;
        gsap.to(cursorLabel, {
          opacity: 0,
          scale: 0.8,
          duration: 0.18,
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.to(cursorDot, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const isInteractive = target.closest(
        "a, button, [role='button'], .project-card, input, textarea, select, [contenteditable='true']"
      );

      if (isInteractive && !isHoveringRef.current) {
        isHoveringRef.current = true;
        gsap.to(cursorDot, {
          scale: 1.24,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (!isInteractive && isHoveringRef.current) {
        isHoveringRef.current = false;
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        !e.relatedTarget ||
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        hideCursor();
      }
    };

    const handleDocMouseLeave = () => hideCursor();
    const handleDocMouseEnter = () => showCursor();
    const handleWindowBlur = () => hideCursor();

    const handleKeyDown = (e: KeyboardEvent) => {
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
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    isHoveringRef.current = false;
    activeContextLabelRef.current = null;
    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, { opacity: 1, scale: 1, duration: 0.2, overwrite: "auto" });
    }
    if (cursorLabelRef.current) {
      gsap.to(cursorLabelRef.current, { opacity: 0, scale: 0.8, duration: 0.15, overwrite: "auto" });
    }
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center opacity-0 cursor-none"
      style={{
        width: 48,
        height: 48,
        transform: "translate(-50%, -50%)",
        willChange: "transform, opacity",
      }}
    >
      {/* Precision Monochrome Pointer */}
      <div
        ref={cursorDotRef}
        className="flex items-center justify-center w-11 h-11 mix-blend-difference"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full -rotate-[24deg]">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>

      {/* Contextual Action Lens (VIEW SPEC / DRAG BLADE / INSPECT) */}
      <div
        ref={cursorLabelRef}
        className="absolute flex items-center justify-center px-3 py-1.5 rounded-full bg-white text-black border border-black/15 shadow-2xl whitespace-nowrap opacity-0"
      >
        <span
          ref={cursorLabelTextRef}
          className="text-[10px] font-mono font-bold uppercase tracking-widest leading-none"
        >
          INSPECT
        </span>
      </div>
    </div>
  );
}
