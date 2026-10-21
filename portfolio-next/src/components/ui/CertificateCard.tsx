"use client";

import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { Certification } from "@/types";

interface CertificateCardProps {
  certification: Certification;
  onClick: (certification: Certification) => void;
  index: number;
}

export default function CertificateCard({
  certification,
  onClick,
}: CertificateCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      data-cursor="INSPECT"
      onClick={() => onClick(certification)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(certification);
        }
      }}
      className="cert-card group relative cursor-pointer rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/35 transition-colors duration-200 flex flex-col justify-between p-7 focus:outline-none"
      aria-label={`View ${certification.title} certificate`}
    >
      <div>
        {/* Clean Unboxed Metadata Header */}
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-white/50 mb-4">
          <span className="uppercase tracking-wider">{certification.category}</span>
          <span className="inline-flex items-center gap-1 text-white/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified</span>
          </span>
        </div>

        <h3 className="text-xl font-display font-bold text-white group-hover:text-white/90 transition-colors mb-2 leading-snug">
          {certification.title}
        </h3>

        <div className="flex items-center gap-2 text-xs font-mono text-white/55">
          <span>{certification.issuer}</span>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">{certification.issueDate}</span>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/10">
        {certification.credentialId && (
          <div className="mb-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-0.5">
              Credential ID
            </p>
            <p className="text-xs font-mono text-white/75 tabular-nums">
              {certification.credentialId}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-white/75 group-hover:text-white transition-colors inline-flex items-center gap-1 whitespace-nowrap">
            <span>Inspect Document</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>

          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white text-[11px] font-mono transition-colors z-20 whitespace-nowrap"
              title="Verify authentic credential on Credly"
            >
              <span>Verify Credly</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
