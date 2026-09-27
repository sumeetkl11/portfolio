"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificateCard from "@/components/ui/CertificateCard";
import CertificateModal from "@/components/ui/CertificateModal";
import { certifications } from "@/lib/certifications";
import { Certification } from "@/types";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      className="relative w-full py-30 md:py-40 bg-[#0a0a0b] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#adc6ff] font-semibold">
                VERIFIED CREDENTIALS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight">
              Certifications & Badges
            </h2>
          </div>
          <span className="text-sm font-mono text-zinc-400">
            CONTINUOUS SPECIALIZATION
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

      {/* Certificate Modal */}
      <CertificateModal
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
