"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Code2, Cpu, Activity, Layers } from "lucide-react";
import { type Project } from "@/types";
import { useLenis } from "@/components/layout/SmoothScroll";

interface CinematicDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type InspectorTab = "overview" | "topology" | "telemetry";

const ARCHITECTURE_SPECS: Record<
  string,
  {
    topologyDiagram: string[];
    telemetryRows: Array<{ metric: string; p50: string; p99: string; guarantee: string }>;
    faultStrategy: string;
  }
> = {
  faultflow: {
    topologyDiagram: [
      "[Ingress Gateway (Express + Zod)] ──(SETNX Idempotency)──> [Redis Cluster]",
      "       │",
      "       ▼",
      "[BullMQ 20-Worker Pool] ──(HMAC-SHA256 Sign + Jitter Backoff)──> [Target Webhook URI]",
      "       │",
      "       ├──(2xx ACK)──────> [PostgreSQL Audit Ledger + Live SSE Stream]",
      "       └──(5xx / Timeout)─> [Dead-Letter Queue (DLQ) · 50 req/s Replay]",
    ],
    telemetryRows: [
      { metric: "API Ingress Validation", p50: "8.4ms", p99: "22.1ms", guarantee: "Atomic Redis SETNX" },
      { metric: "Worker Dispatch Queue", p50: "14.0ms", p99: "34.5ms", guarantee: "20 Concurrent Workers" },
      { metric: "DLQ Replay Throughput", p50: "50 req/s", p99: "50 req/s", guarantee: "Token-Bucket Throttled" },
    ],
    faultStrategy:
      "Exponential backoff with full jitter across 5 retry tiers before deterministic Dead-Letter Queue isolation and real-time Server-Sent Events (SSE) operator alerting.",
  },
  chefcraft: {
    topologyDiagram: [
      "[Next.js Client] ──(Dietary Constraints)──> [Express 25+ REST Router]",
      "       │",
      "       ├──(Cache Hit)───> [PostgreSQL Indexed Query Layer (+25% Speedup)]",
      "       └──(Cache Miss)──> [Gemini 1.5 Pro Structured JSON Pipeline (<2s)]",
    ],
    telemetryRows: [
      { metric: "Gemini Structured Synthesis", p50: "1.15s", p99: "1.88s", guarantee: "Strict JSON Schema" },
      { metric: "Cached Regimen Retrieval", p50: "19.2ms", p99: "42.0ms", guarantee: "Indexed PostgreSQL" },
      { metric: "REST Endpoint Availability", p50: "99.95%", p99: "99.90%", guarantee: "Multi-Tier Fallback" },
    ],
    faultStrategy:
      "Deterministic JSON schema validation with automatic model fallback and PostgreSQL query caching to eliminate redundant LLM token expenditure.",
  },
  linkforge: {
    topologyDiagram: [
      "[React 19 Workspace (4 Suites)] <──(WebSocket Frame)──> [Socket.io Gateway]",
      "       │",
      "       ├──(Pub/Sub Fanout)──> [Redis Adapter (500+ Concurrent Nodes)]",
      "       └──(Sprint AI Task)──> [Gemini API Sprint Prioritization Engine]",
    ],
    telemetryRows: [
      { metric: "Socket Broadcast Fanout", p50: "11.6ms", p99: "28.4ms", guarantee: "Redis Pub/Sub Adapter" },
      { metric: "Concurrent Workspace Load", p50: "500+ users", p99: "500+ users", guarantee: "Horizontal Socket Rooms" },
      { metric: "Kanban State Persistence", p50: "16.8ms", p99: "39.0ms", guarantee: "ACID PostgreSQL Sync" },
    ],
    faultStrategy:
      "Optimistic UI mutations backed by transactional PostgreSQL rollbacks and Redis pub/sub room resynchronization on socket reconnect.",
  },
  "sock-io": {
    topologyDiagram: [
      "[Peer A (React 19 + IndexedDB)] <──(STUN/ICE NAT Traversal)──> [Peer B (WebRTC Audio)]",
      "       │",
      "       └──(Signaling & Offline Queue)──> [Socket.io + Redis + MongoDB Atlas]",
    ],
    telemetryRows: [
      { metric: "WebSocket Signaling Sync", p50: "9.8ms", p99: "23.4ms", guarantee: "Redis Multi-Instance" },
      { metric: "Offline Queue Drain", p50: "15.0ms", p99: "38.2ms", guarantee: "IndexedDB Local Store" },
      { metric: "WebRTC Audio Stream", p50: "P2P Direct", p99: "<45ms", guarantee: "STUN ICE Negotiation" },
    ],
    faultStrategy:
      "Offline-first IndexedDB outbox queues outbound payloads during network drops and flushes idempotently upon WebSocket re-authentication.",
  },
};

export default function CinematicDialog({ project, isOpen, onClose }: CinematicDialogProps) {
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<InspectorTab>("overview");
  const displayProject = project;

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
    if (isOpen) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      }

      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { scale: 0.96, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
      }
    } else {
      if (dialogRef.current) {
        gsap.to(dialogRef.current, {
          scale: 0.97,
          opacity: 0,
          y: 12,
          duration: 0.18,
          ease: "power2.in",
        });
      }

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          pointerEvents: "none",
        });
      }
    }
  }, [isOpen]);

  if (!displayProject) return null;

  const spec =
    ARCHITECTURE_SPECS[displayProject.id] || ARCHITECTURE_SPECS.faultflow;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 opacity-0 pointer-events-none bg-black/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trd-dialog-title"
    >
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0a0a0a] border border-white/15 rounded-2xl overflow-hidden relative max-h-[88vh] flex flex-col opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-7 sm:p-10 lg:p-12">
          <div ref={contentRef} className="max-w-3xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-2.5">
              {displayProject.category} · TECHNICAL REFERENCE DOCUMENT
            </span>

            <h2
              id="trd-dialog-title"
              className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-3"
            >
              {displayProject.title}
            </h2>

            <p className="text-base md:text-lg text-white/75 leading-relaxed mb-6">
              {displayProject.tagline}
            </p>

            {/* Interactive TRD Inspector Tabs */}
            <div
              role="tablist"
              aria-label="Technical Reference Sections"
              className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8 font-mono text-xs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-2 rounded-lg border transition-colors inline-flex items-center gap-2 cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#050505] text-white/65 border-white/12 hover:text-white hover:border-white/30"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>01 // OVERVIEW &amp; STACK</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "topology"}
                onClick={() => setActiveTab("topology")}
                className={`px-3.5 py-2 rounded-lg border transition-colors inline-flex items-center gap-2 cursor-pointer ${
                  activeTab === "topology"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#050505] text-white/65 border-white/12 hover:text-white hover:border-white/30"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>02 // SYSTEM TOPOLOGY</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "telemetry"}
                onClick={() => setActiveTab("telemetry")}
                className={`px-3.5 py-2 rounded-lg border transition-colors inline-flex items-center gap-2 cursor-pointer ${
                  activeTab === "telemetry"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#050505] text-white/65 border-white/12 hover:text-white hover:border-white/30"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>03 // PRODUCTION TELEMETRY</span>
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-8">
                {displayProject.metrics && (
                  <div className="grid grid-cols-2 gap-6 py-5 border-y border-white/10 font-mono">
                    {displayProject.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-xs text-white/45 uppercase tracking-wider block">
                          {m.label}
                        </span>
                        <span className="text-xl font-bold text-white tabular-nums mt-1 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                      System Architecture
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      {displayProject.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-white/85">
                      {displayProject.techStack.map((tech: string, idx: number) => (
                        <span key={tech} className="inline-flex items-center gap-3">
                          <span>{tech}</span>
                          {idx < displayProject.techStack.length - 1 && (
                            <span className="text-white/25" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "topology" && (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-black border border-white/12 font-mono text-xs text-white/85 overflow-x-auto">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">
                    DETERMINISTIC DATA-FLOW PIPELINE
                  </div>
                  <pre className="leading-relaxed whitespace-pre">
                    {spec.topologyDiagram.join("\n")}
                  </pre>
                </div>

                <div className="p-5 rounded-xl bg-[#050505] border border-white/10">
                  <span className="text-[11px] font-mono text-white/45 uppercase tracking-widest block mb-2">
                    FAULT-TOLERANCE &amp; RECOVERY INVARIANT
                  </span>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {spec.faultStrategy}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "telemetry" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-white/12 overflow-hidden font-mono text-xs">
                  <div className="grid grid-cols-4 gap-3 px-4 py-3 bg-white/5 border-b border-white/10 text-[10px] text-white/50 uppercase tracking-wider">
                    <span className="col-span-2 sm:col-span-1">Subsystem</span>
                    <span className="hidden sm:block">P50 Median</span>
                    <span>P99 Tail</span>
                    <span>Invariant</span>
                  </div>
                  <div className="divide-y divide-white/10 bg-black">
                    {spec.telemetryRows.map((row) => (
                      <div
                        key={row.metric}
                        className="grid grid-cols-4 gap-3 px-4 py-3.5 items-center"
                      >
                        <span className="col-span-2 sm:col-span-1 text-white font-medium">
                          {row.metric}
                        </span>
                        <span className="hidden sm:block text-white/65 tabular-nums">
                          {row.p50}
                        </span>
                        <span className="text-white font-semibold tabular-nums">
                          {row.p99}
                        </span>
                        <span className="text-white/55 text-[11px]">
                          {row.guarantee}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-8 mt-8 border-t border-white/10">
              {displayProject.liveUrl && (
                <a
                  href={displayProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide hover:bg-zinc-200 transition-colors whitespace-nowrap"
                >
                  <span>Visit Live Deployment</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {displayProject.repoUrl && (
                <a
                  href={displayProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0a0a0a] border border-white/20 text-white px-5 py-2.5 rounded-lg text-xs font-mono hover:border-white/50 transition-colors whitespace-nowrap"
                >
                  <Code2 className="w-4 h-4" />
                  <span>View Source Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
