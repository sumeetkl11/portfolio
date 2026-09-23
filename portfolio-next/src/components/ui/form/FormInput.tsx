"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { animateFocusGlow, animateCheckmark, animateIconIn } from "@/hooks/useFormAnimation";
import { Check } from "lucide-react";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  isValid?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon: Icon, isValid, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const checkRef = useRef<HTMLDivElement>(null);

    const shouldFloat = isFocused || hasValue;

    useEffect(() => {
      if (containerRef.current) {
        animateFocusGlow(containerRef.current, isFocused);
      }
    }, [isFocused]);

    useEffect(() => {
      if (iconRef.current && Icon) {
        animateIconIn(iconRef.current);
      }
    }, [Icon]);

    useEffect(() => {
      if (checkRef.current && isValid) {
        animateCheckmark(checkRef.current);
      }
    }, [isValid]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const stateClasses = error
      ? "border-red-500/40 bg-red-500/5"
      : isValid
      ? "border-emerald-500/30 bg-emerald-500/5"
      : isFocused
      ? "border-white/30 bg-white/8"
      : "border-white/10 bg-white/5";

    return (
      <div className="relative">
        <div
          ref={containerRef}
          className={`relative rounded-lg transition-all ${stateClasses} ${className}`}
          style={{ willChange: "transform, box-shadow, border-color, background-color" }}
        >
          {/* Icon */}
          {Icon && (
            <div
              ref={iconRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0"
            >
              <Icon className={`w-5 h-5 ${isFocused ? "text-white" : "text-zinc-500"} transition-colors`} />
            </div>
          )}

          {/* Floating Label */}
          <label
            ref={labelRef}
            htmlFor={props.id}
            className={`absolute left-4 font-mono uppercase tracking-widest text-xs pointer-events-none transition-all origin-left ${
              shouldFloat ? "-translate-y-7 scale-85 text-zinc-400" : "top-1/2 -translate-y-1/2 text-zinc-500"
            } ${Icon ? "left-12" : "left-4"}`}
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>

          {/* Input */}
          <input
            ref={ref}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-label={label}
            aria-required={props.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            className={`w-full px-4 py-3 bg-transparent text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
              Icon ? "pl-12" : ""
            } ${isValid ? "pr-12" : ""}`}
          />

          {/* Valid Checkmark */}
          {isValid && (
            <div
              ref={checkRef}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0"
            >
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${props.id}-error`}
            role="alert"
            aria-live="polite"
            className="text-red-400 text-xs mt-2 font-mono"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
