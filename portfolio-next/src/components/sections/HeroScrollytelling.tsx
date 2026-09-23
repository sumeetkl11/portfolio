"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollytelling() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 192;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !trackRef.current) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const images: (HTMLImageElement | undefined)[] = new Array(frameCount);
    const imageSeq = { frame: 0 };

    function preloadRange(center: number) {
      const start = Math.max(0, center - 5);
      const end = Math.min(frameCount - 1, center + 5);
      for (let i = start; i <= end; i++) {
        if (!images[i]) {
          const img = new Image();
          img.src = `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
          img.onload = () => {
            if (Math.round(imageSeq.frame) === i) render();
          };
          images[i] = img;
        }
      }
    }

    // Eagerly preload first 12 frames
    preloadRange(6);

    function render() {
      const frameIndex = Math.round(imageSeq.frame);
      const img = images[frameIndex];

      if (img && img.complete && img.naturalWidth > 0) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

        const hRatio = canvas!.width / img.naturalWidth;
        const vRatio = canvas!.height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas!.width - img.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas!.height - img.naturalHeight * ratio) / 2;

        ctx!.drawImage(
          img,
          0, 0, img.naturalWidth, img.naturalHeight,
          centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio
        );
      }
    }

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      animation: gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => {
          preloadRange(Math.round(imageSeq.frame));
          render();
        },
      }),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: "400vh" }} id="top">
      <section className="sticky top-0 w-full h-screen bg-black overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </section>
    </div>
  );
}
