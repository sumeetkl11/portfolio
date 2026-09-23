"use client";

import { forwardRef, useEffect, useRef } from "react";
import { LucideIcon, Send, Loader2, Check, X } from "lucide-react";
import { animateButtonSuccess, animateButtonError } from "@/hooks/useFormAnimation";

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  icon?: LucideIcon;
}

const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      children,
      isLoading = false,
      isSuccess = false,
      isError = false,
      loadingText = "Transmitting...",
      successText = "Transmission Complete",
      errorText = "Transmission Failed",
      icon: Icon = Send,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const prevSuccessRef = useRef(false);
    const prevErrorRef = useRef(false);

    // Merge refs
    const mergedRef = (node: HTMLButtonElement) => {
      buttonRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (isSuccess && !prevSuccessRef.current && buttonRef.current) {
        animateButtonSuccess(buttonRef.current);
        prevSuccessRef.current = true;
      } else if (!isSuccess) {
        prevSuccessRef.current = false;
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError && !prevErrorRef.current && buttonRef.current) {
        animateButtonError(buttonRef.current);
        prevErrorRef.current = true;
      } else if (!isError) {
        prevErrorRef.current = false;
      }
    }, [isError]);

    const getContent = () => {
      if (isLoading) {
        return (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{loadingText}</span>
          </>
        );
      }

      if (isSuccess) {
        return (
          <>
            <Check className="w-5 h-5" />
            <span>{successText}</span>
          </>
        );
      }

      if (isError) {
        return (
          <>
            <X className="w-5 h-5" />
            <span>{errorText}</span>
          </>
        );
      }

      return (
        <>
          <span>{children}</span>
          <Icon className="w-4 h-4" />
        </>
      );
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={mergedRef}
        {...props}
        disabled={isDisabled}
        className={`w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
        } ${className}`}
        style={{ willChange: "transform, background-color" }}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {getContent()}
      </button>
    );
  }
);

FormButton.displayName = "FormButton";

export default FormButton;
