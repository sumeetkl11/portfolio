"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't activate on touch / mobile devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorDot || !cursorText) return;

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
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

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
      showCursor();
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the closest parent with data-cursor attribute
      const cursorTarget = target.closest("[data-cursor]");

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor-text") || "View";
        setHoverText(text);
        isHoveringRef.current = true;

        // Animate to pill shape
        gsap.to(cursor, {
          width: "auto",
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 1)",
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "expo.out",
          overwrite: "auto",
        });

        gsap.to(cursorDot, { opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
        gsap.to(cursorText, { opacity: 1, scale: 1, delay: 0.1, duration: 0.2, overwrite: "auto" });
      } else if (isHoveringRef.current) {
        isHoveringRef.current = false;

        // Revert to default triangle
        gsap.to(cursor, {
          width: 48,
          height: 48,
          borderRadius: 0,
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          duration: 0.3,
          ease: "expo.out",
          overwrite: "auto",
        });

        gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
        gsap.to(cursorDot, { opacity: 1, scale: 1, delay: 0.1, duration: 0.2, overwrite: "auto" });
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleDocMouseLeave);
    document.addEventListener("mouseenter", handleDocMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleDocMouseLeave);
      document.removeEventListener("mouseenter", handleDocMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  // Re-run reset when route changes (to avoid getting stuck)
  useEffect(() => {
    isHoveringRef.current = false;
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        width: 48,
        height: 48,
        borderRadius: 0,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "expo.out",
      });
    }
    if (cursorTextRef.current && cursorDotRef.current) {
      gsap.to(cursorTextRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      gsap.to(cursorDotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
    }
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden px-4 opacity-0"
      style={{
        width: 48,
        height: 48,
        transform: "translate(-50%, -50%)",
        willChange: "transform, width, height, border-radius, opacity",
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
