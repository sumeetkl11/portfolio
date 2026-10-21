"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface KineticHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}

export default function KineticHeading({
  text,
  as: Tag = "h2",
  className,
  id,
}: KineticHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const wordNodes = el.querySelectorAll<HTMLElement>(".kinetic-word");
    if (wordNodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(wordNodes, { yPercent: 0, rotateZ: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordNodes,
        { yPercent: 105, rotateZ: 1.5, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.045,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag
      ref={headingRef}
      id={id}
      aria-label={text}
      className={clsx("flex flex-wrap gap-x-[0.26em] gap-y-1", className)}
      style={{ textWrap: "balance" }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]"
          aria-hidden="true"
        >
          <span className="kinetic-word inline-block will-change-transform origin-bottom-left">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
