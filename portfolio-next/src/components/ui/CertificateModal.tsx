"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Download, ExternalLink, ShieldCheck, Eye, Sparkles } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"badge" | "full">("badge");
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);

  // Close on Escape key & manage scroll lock
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

  // Reset tab & loading state when certification changes
  useEffect(() => {
    if (certification) {
      setActiveTab(certification.badgeUrl ? "badge" : "full");
      setIsLoadingPdf(true);
    }
  }, [certification]);

  // GSAP animation
  useEffect(() => {
    if (isOpen && overlayRef.current && dialogRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        backdropFilter: "blur(20px)",
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        dialogRef.current,
        { scale: 0.94, opacity: 0, y: 25 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          delay: 0.05,
        }
      );
    } else if (!isOpen && overlayRef.current && dialogRef.current) {
      gsap.to(dialogRef.current, {
        scale: 0.96,
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  if (!isOpen || !certification) return null;

  const currentPdfUrl = activeTab === "badge" && certification.badgeUrl
    ? certification.badgeUrl
    : certification.pdfUrl || certification.badgeUrl;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 opacity-0 pointer-events-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[90vh] max-h-[850px] bg-[#0d0d0f] border border-white/15 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#adc6ff]/10 border border-[#adc6ff]/20 flex items-center justify-center text-[#adc6ff]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#adc6ff]">
                  {certification.category}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {certification.issuer}
                </span>
              </div>
              <h3 id="cert-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                {certification.title}
              </h3>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* View Selector Tabs */}
            {certification.badgeUrl && certification.pdfUrl && (
              <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("badge");
                    setIsLoadingPdf(true);
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "badge"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Badge View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("full");
                    setIsLoadingPdf(true);
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "full"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Full Certificate
                </button>
              </div>
            )}

            {/* Download Button */}
            {currentPdfUrl && (
              <a
                href={currentPdfUrl}
                download={`${certification.id}-${activeTab}.pdf`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono border border-white/10 transition-colors"
                title="Download Certificate PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            )}

            {/* Verification Link */}
            {certification.verificationUrl && (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors"
                title="Verify authentic credential badge on Credly"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Verify Credly</span>
                <span className="xs:hidden">Verify</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors ml-1"
              aria-label="Close certificate preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 w-full bg-[#0a0a0b] relative overflow-hidden flex flex-col items-center justify-center">
          {isLoadingPdf && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0b]/80 backdrop-blur-sm pointer-events-none">
              <div className="w-8 h-8 border-2 border-white/20 border-t-[#adc6ff] rounded-full animate-spin mb-3" />
              <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                Loading Verified Document...
              </p>
            </div>
          )}

          {currentPdfUrl ? (
            <object
              data={`${currentPdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full min-h-[500px]"
              onLoad={() => setIsLoadingPdf(false)}
            >
              {/* Fallback for browsers that block embedded PDF objects */}
              <div className="flex flex-col items-center justify-center p-8 text-center h-full max-w-md mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#adc6ff] mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Preview in Native Viewer
                </h4>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Your browser does not support embedded PDF views directly. You can view or download the verified document instantly.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#adc6ff] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#8eb3ff] transition-colors"
                  >
                    Open Full PDF
                  </a>
                  <a
                    href={currentPdfUrl}
                    download={`${certification.id}.pdf`}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/20 border border-white/10 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </object>
          ) : (
            <div className="text-center p-8 text-zinc-400 text-sm font-mono">
              Certificate file unavailable.
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="px-5 py-3 border-t border-white/10 bg-zinc-950/90 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
          <div className="flex items-center gap-3">
            {certification.credentialId && (
              <span>ID: <strong className="text-zinc-300">{certification.credentialId}</strong></span>
            )}
            <span>•</span>
            <span>Issued: <strong className="text-zinc-300">{certification.issueDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cryptographically Verified & Authentic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
