"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { useLenis } from "@/components/layout/SmoothScroll";
import { projects, profile } from "@/lib/data";
import { useRouter } from "next/navigation";
import {
  Search,
  Terminal,
  Compass,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
  CornerDownLeft,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  group: "ARCHITECTURE TRD" | "NAVIGATION" | "RECRUITER ACTIONS";
  title: string;
  subtitle: string;
  keywords: string;
  badge?: string;
  action: () => void;
}

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    toggleCommandPalette,
    openResumeModal,
    openProjectModal,
  } = useResumeModal();
  const lenis = useLenis();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    closeCommandPalette();
    if (id === "top") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items: CommandItem[] = useMemo(
    () => [
      ...projects.map((project, idx) => ({
        id: `trd-${project.id}`,
        group: "ARCHITECTURE TRD" as const,
        title: `Inspect TRD: ${project.title}`,
        subtitle: `${project.category} · ${project.metrics?.[0]?.value ?? ""}`,
        keywords: `${project.title} ${project.techStack.join(" ")} ${project.category} trd architecture`,
        badge: `0${idx + 1} // SPEC`,
        action: () => {
          closeCommandPalette();
          openProjectModal(project);
        },
      })),

      {
        id: "action-cv-modal",
        group: "RECRUITER ACTIONS",
        title: "Inspect Interactive Curriculum Vitae",
        subtitle: "Open ATS-ready engineering dossier modal",
        keywords: "resume cv curriculum vitae experience education",
        badge: "MODAL",
        action: () => {
          closeCommandPalette();
          openResumeModal();
        },
      },
      {
        id: "action-copy-email",
        group: "RECRUITER ACTIONS",
        title: copiedEmail ? "Copied: sumeetkanhiya11@gmail.com" : "Copy Direct Email Address",
        subtitle: profile.email,
        keywords: "email contact copy hire sumeetkanhiya11",
        badge: copiedEmail ? "COPIED" : "CLIPBOARD",
        action: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            closeCommandPalette();
          }, 650);
        },
      },
      {
        id: "action-cv-page",
        group: "RECRUITER ACTIONS",
        title: "Open Print-Ready CV Route (/resume)",
        subtitle: "Full-page printable technical curriculum vitae",
        keywords: "print pdf resume page route",
        badge: "/RESUME",
        action: () => {
          closeCommandPalette();
          router.push("/resume");
        },
      },
      {
        id: "action-github",
        group: "RECRUITER ACTIONS",
        title: "Open GitHub Profile (@sumeetkl11)",
        subtitle: "Inspect public repositories and commit history",
        keywords: "github source code git repos",
        badge: "EXTERNAL",
        action: () => {
          closeCommandPalette();
          window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "action-linkedin",
        group: "RECRUITER ACTIONS",
        title: "Connect on LinkedIn",
        subtitle: "Direct professional network profile",
        keywords: "linkedin social connect network",
        badge: "EXTERNAL",
        action: () => {
          closeCommandPalette();
          window.open(profile.linkedin, "_blank", "noopener,noreferrer");
        },
      },

      {
        id: "nav-top",
        group: "NAVIGATION",
        title: "00 · Hero Scrollytelling Sequence",
        subtitle: "192-frame scrubbed sequence & 4 narrative beats",
        keywords: "hero top start intro scrollytelling",
        badge: "JUMP",
        action: () => scrollToSection("top"),
      },
      {
        id: "nav-about",
        group: "NAVIGATION",
        title: "01 · Engineering Philosophy & Dossier",
        subtitle: "Core distributed systems architecture & metrics",
        keywords: "about bio philosophy dossier stats",
        badge: "JUMP",
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-projects",
        group: "NAVIGATION",
        title: "02 · Selected Works Carousel",
        subtitle: "FaultFlow, ChefCraft, Linkforge, Sock.io",
        keywords: "projects work portfolio case studies",
        badge: "JUMP",
        action: () => scrollToSection("projects"),
      },
      {
        id: "nav-skills",
        group: "NAVIGATION",
        title: "03 · 3D Katana Technical Arsenal",
        subtitle: "Interactive WebGL blade forge & core stack",
        keywords: "skills stack katana 3d typescript nextjs",
        badge: "JUMP",
        action: () => scrollToSection("skills"),
      },
      {
        id: "nav-certifications",
        group: "NAVIGATION",
        title: "04 · Verified Credentials & Badges",
        subtitle: "Google Cloud, Coursera & Credly certifications",
        keywords: "certifications credentials badges google",
        badge: "JUMP",
        action: () => scrollToSection("certifications"),
      },
      {
        id: "nav-experience",
        group: "NAVIGATION",
        title: "05 · Experience & Academic Foundation",
        subtitle: "ChefCraft Backend, Freelance & DUET Computer Science",
        keywords: "experience education duet university work history",
        badge: "JUMP",
        action: () => scrollToSection("experience"),
      },
      {
        id: "nav-contact",
        group: "NAVIGATION",
        title: "06 · Initiate Direct Dialogue",
        subtitle: "Encrypted dispatch form & direct channels",
        keywords: "contact message form hire talk",
        badge: "JUMP",
        action: () => scrollToSection("contact"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copiedEmail]
  );

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.subtitle.toLowerCase().includes(trimmed) ||
        item.keywords.toLowerCase().includes(trimmed)
    );
  }, [items, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      if (!isCommandPaletteOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeCommandPalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length > 0
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isCommandPaletteOpen,
    toggleCommandPalette,
    closeCommandPalette,
    filteredItems,
    selectedIndex,
  ]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isCommandPaletteOpen, lenis]);

  if (!isCommandPaletteOpen) return null;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const groups: Array<CommandItem["group"]> = [
    "ARCHITECTURE TRD",
    "RECRUITER ACTIONS",
    "NAVIGATION",
  ];

  return (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onClick={closeCommandPalette}
      className="fixed inset-0 z-[120] flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-4 bg-black/85 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Architecture Command Palette"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#0a0a0a] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[76vh]"
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-4 h-4 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type a command, system TRD (FaultFlow, ChefCraft), or section..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-mono"
            aria-label="Filter command palette"
          />
          <button
            type="button"
            onClick={closeCommandPalette}
            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 hover:text-white hover:border-white/30 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            aria-label="Close Command Palette"
          >
            <span>ESC</span>
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Command List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-white/45">
              No matching architectural specifications or commands found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            groups.map((groupName) => {
              const groupItems = filteredItems.filter(
                (i) => i.group === groupName
              );
              if (groupItems.length === 0) return null;

              return (
                <div key={groupName}>
                  <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center justify-between">
                    <span>{groupName}</span>
                    <span>{groupItems.length} NODES</span>
                  </div>
                  <div className="space-y-1">
                    {groupItems.map((item) => {
                      const globalIndex = filteredItems.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          onClick={item.action}
                          className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between gap-4 transition-colors duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-white text-black"
                              : "bg-transparent text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                                isSelected
                                  ? "bg-black/10 border-black/20 text-black"
                                  : "bg-white/5 border-white/10 text-white/70"
                              }`}
                            >
                              {item.group === "ARCHITECTURE TRD" ? (
                                <Terminal className="w-4 h-4" />
                              ) : item.id === "action-copy-email" ? (
                                copiedEmail ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )
                              ) : item.group === "RECRUITER ACTIONS" ? (
                                <FileText className="w-4 h-4" />
                              ) : (
                                <Compass className="w-4 h-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div
                                className={`text-xs sm:text-sm font-display font-bold tracking-tight truncate ${
                                  isSelected ? "text-black" : "text-white"
                                }`}
                              >
                                {item.title}
                              </div>
                              <div
                                className={`text-[11px] font-mono truncate mt-0.5 ${
                                  isSelected
                                    ? "text-black/70"
                                    : "text-white/50"
                                }`}
                              >
                                {item.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.badge && (
                              <span
                                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                                  isSelected
                                    ? "border-black/25 text-black/80"
                                    : "border-white/12 text-white/45"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                            {item.badge === "EXTERNAL" ? (
                              <ArrowUpRight
                                className={`w-3.5 h-3.5 ${
                                  isSelected
                                    ? "text-black"
                                    : "text-white/40"
                                }`}
                              />
                            ) : (
                              <CornerDownLeft
                                className={`w-3.5 h-3.5 ${
                                  isSelected
                                    ? "text-black"
                                    : "text-white/30"
                                }`}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Legend */}
        <div className="px-5 py-3 border-t border-white/10 bg-black flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-white/45">
          <div className="flex items-center gap-4">
            <span>↑↓ NAVIGATE</span>
            <span>↵ EXECUTE</span>
            <span>ESC CLOSE</span>
          </div>
          <span className="text-white/35">
            SUMEET KANHIYA · ARCHITECTURE INSPECTOR
          </span>
        </div>
      </div>
    </div>
  );
}
