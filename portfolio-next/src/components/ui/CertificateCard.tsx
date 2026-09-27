"use client";

import { useRef, useState } from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { Certification } from "@/types";

interface CertificateCardProps {
  certification: Certification;
  onClick: (certification: Certification) => void;
  index: number;
}

export default function CertificateCard({
  certification,
  onClick,
  index,
}: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg rotation
    const rotateY = ((x - centerX) / centerX) * 6; // Max 6deg rotation

    setTilt({ x: rotateX, y: rotateY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onClick(certification)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(certification);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card group relative cursor-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#adc6ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] rounded-2xl transition-all duration-300"
      aria-label={`View ${certification.title} certificate`}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Card Container */}
      <div className="dark-glass-card h-full flex flex-col relative overflow-hidden">
        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(173, 198, 255, 0.08) 0%, transparent 60%)",
          }}
        />

        {/* Card Header */}
        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#adc6ff] group-hover:bg-[#adc6ff]/10 group-hover:border-[#adc6ff]/30 transition-all">
              {certification.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-[#adc6ff] transition-colors">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-[#adc6ff] transition-colors mb-1 leading-tight">
            {certification.title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>{certification.issuer}</span>
            <span className="text-zinc-600">•</span>
            <span>{certification.issueDate}</span>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="mt-auto p-6 pt-0">
          {/* Credential ID */}
          {certification.credentialId && (
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Credential ID</p>
              <p className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                {certification.credentialId}
              </p>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-[#adc6ff]/20 transition-colors">
            <span className="text-[11px] font-mono text-[#adc6ff] flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" />
              View Certificate
            </span>
            <div className="flex items-center gap-2">
              {certification.verificationUrl && (
                <a
                  href={certification.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-[10px] font-mono transition-all z-20"
                  title="Verify authentic credential on Credly"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verify Credly</span>
                </a>
              )}
              <div className="w-8 h-8 rounded-full bg-[#adc6ff]/10 group-hover:bg-[#adc6ff]/20 border border-[#adc6ff]/20 flex items-center justify-center transition-all group-hover:scale-110">
                <ExternalLink className="w-3.5 h-3.5 text-[#adc6ff]" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Shine Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
            transform: `translate(${tilt.y * 2}px, ${tilt.x * 2}px)`,
          }}
        />
      </div>

      {/* 3D Border Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none border border-[#adc6ff]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          boxShadow: isHovering ? "0 0 30px rgba(173, 198, 255, 0.2)" : "none",
        }}
      />
    </div>
  );
}
