"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Download, ExternalLink, ShieldCheck, Eye } from "lucide-react";
import { Certification } from "@/types";
import { useLenis } from "@/components/layout/SmoothScroll";

interface CertificateModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certification,
  isOpen,
  onClose,
}: CertificateModalProps) {
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [tabOverride, setTabOverride] = useState<{
    certId: string;
    tab: "badge" | "full";
  } | null>(null);
  const [loadedPdfUrl, setLoadedPdfUrl] = useState<string | null>(null);

  const activeTab: "badge" | "full" =
    certification && tabOverride?.certId === certification.id
      ? tabOverride.tab
      : certification?.badgeUrl
      ? "badge"
      : "full";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  useEffect(() => {
    if (isOpen && overlayRef.current && dialogRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        dialogRef.current,
        { scale: 0.96, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    } else if (!isOpen && overlayRef.current && dialogRef.current) {
      gsap.to(dialogRef.current, {
        scale: 0.97,
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  if (!isOpen || !certification) return null;

  const currentPdfUrl =
    activeTab === "badge" && certification.badgeUrl
      ? certification.badgeUrl
      : certification.pdfUrl || certification.badgeUrl;

  const isLoadingPdf = Boolean(currentPdfUrl && loadedPdfUrl !== currentPdfUrl);

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md opacity-0 pointer-events-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[90vh] max-h-[850px] bg-[#0a0a0a] border border-white/15 rounded-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-[#0a0a0a] relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
                <span className="uppercase tracking-wider">{certification.category}</span>
                <span aria-hidden="true">·</span>
                <span>{certification.issuer}</span>
              </div>
              <h3
                id="cert-modal-title"
                className="text-sm sm:text-base font-display font-bold text-white tracking-tight"
              >
                {certification.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {certification.badgeUrl && certification.pdfUrl && (
              <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setTabOverride({ certId: certification.id, tab: "badge" });
                  }}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === "badge"
                      ? "bg-white text-black font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Badge View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTabOverride({ certId: certification.id, tab: "full" });
                  }}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === "full"
                      ? "bg-white text-black font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Full Certificate
                </button>
              </div>
            )}

            {currentPdfUrl && (
              <a
                href={currentPdfUrl}
                download={`${certification.id}-${activeTab}.pdf`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-mono border border-white/15 transition-colors whitespace-nowrap"
                title="Download Certificate PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            )}

            {certification.verificationUrl && (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-colors whitespace-nowrap"
                title="Verify authentic credential badge on Credly"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify Credly</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-colors ml-1"
              aria-label="Close certificate preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 w-full bg-black relative overflow-hidden flex flex-col items-center justify-center">
          {isLoadingPdf && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 pointer-events-none">
              <div className="w-7 h-7 border border-white/20 border-t-white rounded-full animate-spin mb-3" />
              <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
                Loading Verified Document...
              </p>
            </div>
          )}

          {currentPdfUrl ? (
            <object
              data={`${currentPdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full min-h-[500px]"
              onLoad={() => setLoadedPdfUrl(currentPdfUrl)}
            >
              <div className="flex flex-col items-center justify-center p-8 text-center h-full max-w-md mx-auto">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-display font-bold text-white mb-2">
                  Preview in Native Viewer
                </h4>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">
                  Your browser does not support embedded PDF views directly. You can open or download the verified document below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    Open Full PDF
                  </a>
                  <a
                    href={currentPdfUrl}
                    download={`${certification.id}.pdf`}
                    className="px-5 py-2.5 rounded-lg bg-white/5 text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </object>
          ) : (
            <div className="text-center p-8 text-white/50 text-sm font-mono">
              Certificate file unavailable.
            </div>
          )}
        </div>

        {/* Modal Footer Info (Zero Pulsing Dots) */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#0a0a0a] flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 gap-2">
          <div className="flex items-center gap-3">
            {certification.credentialId && (
              <span>
                ID: <strong className="text-white/80 tabular-nums">{certification.credentialId}</strong>
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>
              Issued: <strong className="text-white/80 tabular-nums">{certification.issueDate}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/75">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cryptographically Verified Credential</span>
          </div>
        </div>
      </div>
    </div>
  );
}
