"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Progress interval for smooth perceived loading feedback
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(progressInterval);
          return 92;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 120);

    const startTime = Date.now();

    Promise.all([
      typeof document !== "undefined" ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, 1400)), // minimum smooth presentation threshold
    ]).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1400 - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsReady(true), 250);
      }, remaining);
    });

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (isReady) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
        },
      });

      tl.to(".loading-bar-container", {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.out",
      })
      .to(
        ".loading-screen",
        {
          opacity: 0,
          duration: 0.65,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <div
      className="loading-screen fixed inset-0 z-[99999] bg-[#0a0a0b] flex flex-col items-center justify-center select-none"
      style={{ willChange: "opacity" }}
    >
      {/* Brand Identity / Animated Monogram */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(173,198,255,0.15)]">
            <span className="font-mono font-bold text-lg text-white tracking-widest">SK</span>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-1.5">
          <span>SUMEET</span>
          <span className="text-zinc-500 font-light">KANHIYA</span>
        </h1>
        <p className="text-xs font-mono text-[#adc6ff] tracking-[0.25em] uppercase mt-1">
          Systems Architect
        </p>
      </div>

      {/* Progress Bar with Glow */}
      <div className="loading-bar-container w-52 sm:w-64 flex flex-col items-center">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#adc6ff] via-[#d0bcff] to-[#adc6ff] transition-all duration-200 ease-out rounded-full shadow-[0_0_12px_rgba(173,198,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between mt-2.5 px-0.5 text-[11px] font-mono text-zinc-500">
          <span className="tracking-wider">
            {progress < 100 ? "INITIALIZING NEXUS..." : "READY"}
          </span>
          <span className="text-zinc-400 font-medium">{Math.min(100, Math.round(progress))}%</span>
        </div>
      </div>
    </div>
  );
}
