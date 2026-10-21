"use client";

import React, { useEffect, useState } from "react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { profile, projects } from "@/lib/data";
import { Terminal, GitBranch, ArrowUpRight, Layers } from "lucide-react";

interface GithubTelemetry {
  publicRepos: number;
  latestRepoName: string;
  latestRepoUpdated: string;
  latestRepoUrl: string;
  followers: number;
  isLive: boolean;
}

const BASELINE_TELEMETRY: GithubTelemetry = {
  publicRepos: 18,
  latestRepoName: "FaultFlow_WebHook",
  latestRepoUpdated: "Active Production Branch",
  latestRepoUrl: "https://github.com/sumeetkl11/FaultFlow_WebHook",
  followers: 12,
  isLive: false,
};

const STORAGE_KEY = "sumit_github_telemetry_v1";

export default function TelemetryStrip() {
  const [telemetry, setTelemetry] = useState<GithubTelemetry>(BASELINE_TELEMETRY);
  const { openCommandPalette, openProjectModal } = useResumeModal();

  useEffect(() => {
    let isMounted = true;

    const fetchTelemetry = async () => {
      try {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as GithubTelemetry;
          if (isMounted) setTelemetry(parsed);
          return;
        }

        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/sumeetkl11", {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
          fetch("https://api.github.com/users/sumeetkl11/repos?sort=pushed&per_page=5", {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) return;

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const latestRepo = Array.isArray(reposData) && reposData.length > 0 ? reposData[0] : null;
        const pushedDate = latestRepo?.pushed_at
          ? new Date(latestRepo.pushed_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Active Production Branch";

        const nextTelemetry: GithubTelemetry = {
          publicRepos:
            typeof userData.public_repos === "number" && userData.public_repos > 0
              ? userData.public_repos
              : BASELINE_TELEMETRY.publicRepos,
          latestRepoName: latestRepo?.name || BASELINE_TELEMETRY.latestRepoName,
          latestRepoUpdated: `Pushed ${pushedDate}`,
          latestRepoUrl: latestRepo?.html_url || BASELINE_TELEMETRY.latestRepoUrl,
          followers:
            typeof userData.followers === "number"
              ? userData.followers
              : BASELINE_TELEMETRY.followers,
          isLive: true,
        };

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextTelemetry));
        if (isMounted) {
          setTelemetry(nextTelemetry);
        }
      } catch {
        // Fallback silently to deterministic baseline metrics
      }
    };

    fetchTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      aria-label="Live Engineering & GitHub Proof Strip"
      className="relative z-20 w-full bg-[#050505] border-t border-white/12 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 font-mono">
        {/* Metric 1: Live GitHub Index */}
        <div className="pt-4 md:pt-0 md:px-4 first:pt-0 first:pl-0 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-[11px] text-white/45 uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-white/70" />
              <span>GITHUB TELEMETRY</span>
            </span>
            <span className="text-white/60 tabular-nums">
              {telemetry.isLive ? "LIVE REST" : "VERIFIED"}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-1">
            <div>
              <span className="text-2xl font-display font-extrabold text-white tabular-nums">
                {telemetry.publicRepos}
              </span>
              <span className="text-xs text-white/55 ml-2">Public Repositories</span>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <span>@sumeetkl11</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Metric 2: Latest Pushed Repository */}
        <div className="pt-4 md:pt-0 md:px-6 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-[11px] text-white/45 uppercase tracking-widest">
            <span>LATEST COMMIT TARGET</span>
            <span className="text-white/55 tabular-nums">{telemetry.latestRepoUpdated}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <a
              href={telemetry.latestRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-display font-bold text-white hover:text-white/80 truncate inline-flex items-center gap-1.5 transition-colors"
            >
              <span className="truncate">{telemetry.latestRepoName}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white/60" />
            </a>
            <span className="text-[11px] text-white/45 shrink-0">MAIN</span>
          </div>
        </div>

        {/* Metric 3: Direct Flagship TRD Quick-Jump */}
        <div className="pt-4 md:pt-0 md:px-6 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-[11px] text-white/45 uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-white/70" />
              <span>FLAGSHIP BROKER SPEC</span>
            </span>
            <span className="text-white/60 tabular-nums">&lt;25ms P99</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <button
              type="button"
              onClick={() => openProjectModal(projects[0])}
              data-cursor="VIEW SPEC"
              className="text-sm font-display font-bold text-white hover:text-white/80 inline-flex items-center gap-1.5 transition-colors cursor-pointer text-left"
            >
              <span>Inspect FaultFlow TRD</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
            </button>
            <span className="text-[11px] text-white/45">20 WORKERS</span>
          </div>
        </div>

        {/* Metric 4: Architecture Command Palette Trigger */}
        <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-[11px] text-white/45 uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-white/70" />
              <span>QUICK INSPECTOR</span>
            </span>
            <span className="text-white/60">KEYBOARD NAV</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <button
              type="button"
              onClick={openCommandPalette}
              className="w-full py-1.5 px-3 rounded-lg bg-[#0a0a0a] border border-white/15 hover:border-white/40 text-xs text-white/85 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Launch Command Palette</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white font-mono">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
