"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;

export default function HeroScrollytelling() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trackRef.current) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const loadedMap = new Uint8Array(FRAME_COUNT);

    let targetIndex = 0;
    let isDisposed = false;

    // Helper: Pad frame numbers e.g. 1 -> "001"
    const getFrameUrl = (idx: number) => {
      const num = String(idx + 1).padStart(3, "0");
      return `/frames/ezgif-frame-${num}.jpg`;
    };

    // Draw frame to canvas with object-fit: cover
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

      ctx.drawImage(img, nx, ny, nw, nh);
    };

    const render = () => {
      // Find nearest loaded frame to current targetIndex
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

    // Responsive Canvas Resize with DPR clamping for high-DPI smoothness
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      render();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 1. Immediately load frame 0 for instant initial display
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      if (isDisposed) return;
      loadedMap[0] = 1;
      render();
    };

    // 2. Progressive background preload with priority sparse anchors
    const preloadSparse = () => {
      // First pass: Preload every 4th frame so fast scrubs always have close anchors
      for (let i = 0; i < FRAME_COUNT; i += 4) {
        if (!images[i]) {
          const img = new Image();
          img.src = getFrameUrl(i);
          images[i] = img;
          img.onload = () => {
            if (isDisposed) return;
            loadedMap[i] = 1;
            if (Math.abs(targetIndex - i) <= 2) {
              render();
            }
          };
        }
      }

      // Second pass: Preload all intermediate frames in idle batches
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
                render();
              }
            };
          }
        }
        if (typeof window !== "undefined") {
          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 16);
          }
        }
      };

      if (typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };

    preloadSparse();

    // 3. Smooth scroll tracking with GSAP ScrollTrigger & RAF damped lerp
    let currentProgress = 0;
    let targetProgress = 0;

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    const tick = () => {
      if (isDisposed) return;
      // Damped lerp for buttery, natural inertia
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.3; // Responsive & buttery smooth
        const newTargetIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
        );
        if (newTargetIndex !== targetIndex) {
          targetIndex = newTargetIndex;
          render();
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      st.kill();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: "400vh" }} id="top">
      <section className="sticky top-0 w-full h-screen bg-black overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </section>
    </div>
  );
}
