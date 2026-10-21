"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/layout/SmoothScroll";
import { ArrowDownRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 192;

interface BeatRange {
  start: number;
  peakIn: number;
  peakOut: number;
  end: number;
}

const BEAT_RANGES: BeatRange[] = [
  { start: 0.0, peakIn: 0.02, peakOut: 0.19, end: 0.25 },
  { start: 0.24, peakIn: 0.30, peakOut: 0.44, end: 0.50 },
  { start: 0.49, peakIn: 0.55, peakOut: 0.69, end: 0.75 },
  { start: 0.74, peakIn: 0.81, peakOut: 1.0, end: 1.05 },
];

function computeBeatState(progress: number, range: BeatRange, isFirst: boolean, isLast: boolean) {
  if (isFirst && progress <= range.peakOut) {
    return { opacity: 1, y: 0, pointerEvents: "auto" as const };
  }
  if (isLast && progress >= range.peakIn) {
    return { opacity: 1, y: 0, pointerEvents: "auto" as const };
  }
  if (progress <= range.start || progress >= range.end) {
    const y = progress <= range.start ? 28 : -28;
    return { opacity: 0, y, pointerEvents: "none" as const };
  }
  if (progress < range.peakIn) {
    const t = (progress - range.start) / (range.peakIn - range.start);
    const eased = 1 - Math.pow(1 - t, 3);
    return {
      opacity: eased,
      y: (1 - eased) * 28,
      pointerEvents: eased > 0.6 ? ("auto" as const) : ("none" as const),
    };
  }
  if (progress > range.peakOut) {
    const t = (progress - range.peakOut) / (range.end - range.peakOut);
    const eased = Math.pow(t, 2);
    return {
      opacity: 1 - eased,
      y: -eased * 28,
      pointerEvents: 1 - eased > 0.6 ? ("auto" as const) : ("none" as const),
    };
  }
  return { opacity: 1, y: 0, pointerEvents: "auto" as const };
}

export default function HeroScrollytelling() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trackRef.current) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId = 0;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const loadedMap = new Uint8Array(FRAME_COUNT);

    let targetIndex = 0;
    let isDisposed = false;
    let isHeroVisible = true;

    const getFrameUrl = (idx: number) => {
      const num = String(idx + 1).padStart(3, "0");
      return `/frames/ezgif-frame-${num}.jpg`;
    };

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
    };

    const renderFrame = () => {
      let frameToDraw = images[targetIndex];
      if (!frameToDraw || !loadedMap[targetIndex]) {
        for (let delta = 1; delta < FRAME_COUNT; delta++) {
          const prev = targetIndex - delta;
          if (prev >= 0 && loadedMap[prev] && images[prev]) {
            frameToDraw = images[prev];
            break;
          }
          const next = targetIndex + delta;
          if (next < FRAME_COUNT && loadedMap[next] && images[next]) {
            frameToDraw = images[next];
            break;
          }
        }
      }

      if (frameToDraw && frameToDraw.complete && frameToDraw.naturalWidth > 0) {
        drawCover(frameToDraw);
      }
    };

    const updateNarrativeBeats = (progress: number) => {
      for (let i = 0; i < BEAT_RANGES.length; i++) {
        const el = beatRefs.current[i];
        if (!el) continue;
        const state = computeBeatState(
          progress,
          BEAT_RANGES[i],
          i === 0,
          i === BEAT_RANGES.length - 1
        );
        el.style.opacity = state.opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${state.y.toFixed(1)}px, 0)`;
        el.style.pointerEvents = state.pointerEvents;
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleY(${Math.max(0.02, progress).toFixed(3)})`;
      }
      if (frameCounterRef.current) {
        const currentFrameNum = String(targetIndex + 1).padStart(3, "0");
        frameCounterRef.current.textContent = `${currentFrameNum} / ${FRAME_COUNT}`;
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      renderFrame();
    };

    handleResize();
    updateNarrativeBeats(0);
    window.addEventListener("resize", handleResize);

    // 1. Immediately load frame 0 for instant display
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      if (isDisposed) return;
      loadedMap[0] = 1;
      renderFrame();
    };

    // 2. Progressive background preload with priority sparse anchors
    const preloadSparse = () => {
      for (let i = 0; i < FRAME_COUNT; i += 4) {
        if (!images[i]) {
          const img = new Image();
          img.src = getFrameUrl(i);
          images[i] = img;
          img.onload = () => {
            if (isDisposed) return;
            loadedMap[i] = 1;
            if (Math.abs(targetIndex - i) <= 2) {
              renderFrame();
            }
          };
        }
      }

      let idx = 1;
      const loadNextBatch = () => {
        if (isDisposed || idx >= FRAME_COUNT) return;
        const end = Math.min(idx + 8, FRAME_COUNT);
        for (; idx < end; idx++) {
          if (!images[idx]) {
            const img = new Image();
            const curr = idx;
            img.src = getFrameUrl(curr);
            images[curr] = img;
            img.onload = () => {
              if (isDisposed) return;
              loadedMap[curr] = 1;
              if (targetIndex === curr) {
                renderFrame();
              }
            };
          }
        }
        if (typeof window !== "undefined") {
          const win = window as Window & {
            requestIdleCallback?: (cb: () => void) => number;
          };
          if (typeof win.requestIdleCallback === "function") {
            win.requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 16);
          }
        }
      };

      if (typeof window !== "undefined") {
        const win = window as Window & {
          requestIdleCallback?: (cb: () => void) => number;
        };
        if (typeof win.requestIdleCallback === "function") {
          win.requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };

    preloadSparse();

    // 3. Smooth scroll tracking with GSAP ScrollTrigger & viewport-gated RAF lerp
    let currentProgress = 0;
    let targetProgress = 0;

    const tick = () => {
      if (isDisposed || !isHeroVisible) {
        animationFrameId = 0;
        return;
      }

      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.25;
        const newTargetIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
        );
        if (newTargetIndex !== targetIndex) {
          targetIndex = newTargetIndex;
          renderFrame();
        }
        updateNarrativeBeats(currentProgress);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!animationFrameId && !isDisposed && isHeroVisible) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress;
        startLoop();
      },
      onToggle: (self) => {
        isHeroVisible = self.isActive;
        if (isHeroVisible) {
          startLoop();
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
    });

    startLoop();

    return () => {
      isDisposed = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", handleResize);
      st.kill();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full bg-black" style={{ height: "400vh" }} id="top">
      <section
        aria-label="Cinematic Scrollytelling Hero"
        className="sticky top-0 w-full h-screen bg-black overflow-hidden"
      >
        {/* Instant SSR First-Frame Visual Placeholder */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/frames/ezgif-frame-001.jpg"
          alt="Sumit Kanhiya — Systems Architect & Creative Developer"
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />

        {/* 192-Frame Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block relative z-10"
        />

        {/* Measured Contrast Scrim on Right Negative Space for WCAG AA Legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-black/35 to-black/85 pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Synchronized Narrative Beats Layer (Right-Aligned in Negative Space) */}
        <div className="relative z-30 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-end pointer-events-none">
          <div className="relative w-full max-w-xl h-80 flex items-center justify-end">
            {/* Beat 1: 0–25% Scroll (Intro) */}
            <div
              ref={(el) => {
                beatRefs.current[0] = el;
              }}
              className="absolute inset-x-0 text-right flex flex-col items-end will-change-transform"
              style={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
            >
              <span className="text-xs font-mono text-white/50 tracking-widest mb-3">
                01 · SYSTEMS ARCHITECT &amp; CREATIVE DEVELOPER
              </span>
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05]"
                style={{ textWrap: "balance" }}
              >
                Hi, I&apos;m Sumit.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/65 max-w-md leading-relaxed">
                Creative Developer &amp; Distributed Systems Architect crafting resilient infrastructure and cinematic web interfaces.
              </p>
            </div>

            {/* Beat 2: 25–50% Scroll (The Reveal) */}
            <div
              ref={(el) => {
                beatRefs.current[1] = el;
              }}
              className="absolute inset-x-0 text-right flex flex-col items-end will-change-transform"
              style={{ opacity: 0, transform: "translate3d(0, 28px, 0)" }}
            >
              <span className="text-xs font-mono text-white/50 tracking-widest mb-3">
                02 · DISCIPLINE &amp; ARCHITECTURE
              </span>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
                style={{ textWrap: "balance" }}
              >
                Precision in every pixel.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/65 max-w-md leading-relaxed">
                Building digital experiences with the discipline of a warrior. No clutter. No compromises. Just pure performance.
              </p>
            </div>

            {/* Beat 3: 50–75% Scroll (The Action) */}
            <div
              ref={(el) => {
                beatRefs.current[2] = el;
              }}
              className="absolute inset-x-0 text-right flex flex-col items-end will-change-transform"
              style={{ opacity: 0, transform: "translate3d(0, 28px, 0)" }}
            >
              <span className="text-xs font-mono text-white/50 tracking-widest mb-3">
                03 · FULL-STACK EXECUTION
              </span>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
                style={{ textWrap: "balance" }}
              >
                Sharpening the edge of the web.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/65 max-w-md leading-relaxed">
                Mastering Next.js, sub-25ms distributed brokers, and interactive storytelling. Every line of code serves a purpose.
              </p>
            </div>

            {/* Beat 4: 75–100% Scroll (The Stance & CTA) */}
            <div
              ref={(el) => {
                beatRefs.current[3] = el;
              }}
              className="absolute inset-x-0 text-right flex flex-col items-end will-change-transform"
              style={{ opacity: 0, transform: "translate3d(0, 28px, 0)" }}
            >
              <span className="text-xs font-mono text-white/50 tracking-widest mb-3">
                04 · READY FOR DEPLOYMENT
              </span>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
                style={{ textWrap: "balance" }}
              >
                Let&apos;s build something extraordinary.
              </h2>
              <div className="mt-7 flex flex-wrap items-center justify-end gap-5">
                <a
                  href="#projects"
                  onClick={(e) => handleScrollToSection(e, "projects")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-xs font-semibold tracking-wide hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>View My Work</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollToSection(e, "contact")}
                  className="text-xs font-mono text-white/75 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors py-2 whitespace-nowrap shrink-0"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Scroll Sequence Telemetry Rail (Bottom-Right) */}
        <div className="absolute bottom-8 right-6 sm:right-10 lg:right-16 z-30 flex items-center gap-4 pointer-events-none">
          <span
            ref={frameCounterRef}
            className="text-[11px] font-mono tabular-nums text-white/45 tracking-wider"
          >
            001 / 192
          </span>
          <div className="w-[1px] h-10 bg-white/15 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-white origin-top will-change-transform"
              style={{ transform: "scaleY(0.02)" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
