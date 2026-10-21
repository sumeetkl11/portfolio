"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificateCard from "@/components/ui/CertificateCard";
import CertificateModal from "@/components/ui/CertificateModal";
import KineticHeading from "@/components/ui/KineticHeading";
import { certifications } from "@/lib/certifications";
import { Certification } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertification(null);
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative w-full py-28 md:py-36 bg-black text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2.5">
              04 · VERIFIED CREDENTIALS
            </span>
            <KineticHeading
              text="Certifications & Badges"
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white"
            />
          </div>
          <span className="text-xs font-mono text-white/50">
            GOOGLE · COURSERA · CREDLY VERIFIED
          </span>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certification={cert}
              onClick={handleCardClick}
              index={index}
            />
          ))}
        </div>
      </div>

      <CertificateModal
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
