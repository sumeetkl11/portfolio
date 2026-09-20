"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollytelling() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Using 192 frames safely, if you have up to 200 just change this to 200!
  const frameCount = 192; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !trackRef.current) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        // If the currently scrolled frame just loaded, re-render it
        if (Math.round(imageSeq.frame) === i - 1) {
          render();
        }
      };
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      const frameIndex = Math.round(imageSeq.frame);
      const img = images[frameIndex];

      if (img && img.complete && img.naturalWidth > 0) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        
        // Draw image covering the canvas while maintaining aspect ratio
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
        onUpdate: render,
      }),
    });
    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: "400vh" }} id="top">
      {/* Sticky Child */}
      <section className="sticky top-0 w-full h-screen bg-black overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        
        {/* Radial gradient overlay to blend edges into black - reduced opacity for more brightness */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </section>
    </div>
  );
}
