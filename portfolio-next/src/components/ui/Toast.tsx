"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import gsap from "gsap";

export type ToastType = "success" | "error" | "loading" | "info";

export interface ToastProps {
  isOpen: boolean;
  type: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  isOpen,
  type,
  title,
  message,
  onClose,
  duration = 5000,
}: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isOpen) {
      if (toastRef.current) {
        gsap.killTweensOf(toastRef.current);
        gsap.fromTo(
          toastRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "expo.out",
          }
        );
      }

      if (type !== "loading" && duration > 0) {
        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, duration);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, type, duration, title, message]);

  const handleDismiss = () => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "loading":
        return <Loader2 className="w-5 h-5 text-zinc-400 animate-spin flex-shrink-0" />;
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.15)]";
      case "error":
        return "border-rose-500/30 shadow-[0_8px_32px_rgba(244,63,94,0.15)]";
      case "loading":
        return "border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.05)]";
      default:
        return "border-white/10";
    }
  };

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] pointer-events-auto"
    >
      <div
        ref={toastRef}
        role={type === "error" ? "alert" : "status"}
        aria-live={type === "error" ? "assertive" : "polite"}
        className={`flex items-start gap-4 p-4 rounded-xl bg-black/90 backdrop-blur-2xl border ${getBorderColor()} transition-colors`}
      >
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-sm font-semibold text-white tracking-wide font-display">{title}</h4>
          {message && (
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans break-words">
              {message}
            </p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Close notification"
          className="text-zinc-500 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
