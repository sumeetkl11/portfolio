"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { useAutoResize } from "@/hooks/useAutoResize";
import { animateFocusGlow, animateCheckmark, animateCounterPulse } from "@/hooks/useFormAnimation";
import { Check } from "lucide-react";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  isValid?: boolean;
  showCounter?: boolean;
  maxLength?: number;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, icon: Icon, isValid, showCounter = true, maxLength = 1000, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const checkRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const autoResizeRef = useAutoResize();
    const prevCountRef = useRef(0);

    const shouldFloat = isFocused || hasValue;

    useEffect(() => {
      if (props.value !== undefined) {
        setHasValue(Boolean(props.value));
      }
    }, [props.value]);

    // Merge refs
    const mergedRef = (node: HTMLTextAreaElement) => {
      (autoResizeRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (containerRef.current) {
        animateFocusGlow(containerRef.current, isFocused);
      }
    }, [isFocused]);

    useEffect(() => {
      if (checkRef.current && isValid) {
        animateCheckmark(checkRef.current);
      }
    }, [isValid]);

    useEffect(() => {
      if (counterRef.current && charCount !== prevCountRef.current) {
        animateCounterPulse(counterRef.current);
        prevCountRef.current = charCount;
      }
    }, [charCount]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setHasValue(!!value);
      setCharCount(value.length);
      props.onChange?.(e);
    };

    const stateClasses = error
      ? "border-red-500/40 bg-red-500/5"
      : isValid
      ? "border-emerald-500/30 bg-emerald-500/5"
      : isFocused
      ? "border-white/30 bg-white/8"
      : "border-white/10 bg-white/5";

    const getCounterColor = () => {
      if (charCount >= maxLength) return "text-red-400";
      if (charCount > maxLength * 0.8) return "text-yellow-400";
      return "text-zinc-500";
    };

    return (
      <div className={`relative transition-all ${isFocused ? "z-20" : "z-10"}`}>
        <div
          ref={containerRef}
          className={`relative rounded-lg transition-all ${stateClasses} ${className}`}
          style={{ willChange: "transform, box-shadow, border-color, background-color" }}
        >
          {/* Icon */}
          {Icon && (
            <div
              ref={iconRef}
              className="absolute left-4 top-4 pointer-events-none"
            >
              <Icon className={`w-5 h-5 ${isFocused ? "text-white" : "text-zinc-500"} transition-colors`} />
            </div>
          )}

          {/* Floating Label */}
          <label
            ref={labelRef}
            htmlFor={props.id}
            className={`absolute font-mono uppercase tracking-widest text-xs pointer-events-none transition-all duration-200 ease-out origin-left z-20 ${
              Icon ? "left-12" : "left-4"
            } ${
              shouldFloat
                ? "top-0 -translate-y-6 scale-85 text-zinc-400"
                : "top-4 translate-y-0 text-zinc-500"
            }`}
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>

          {/* Textarea */}
          <textarea
            ref={mergedRef}
            {...props}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-label={label}
            aria-required={props.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            className={`w-full px-4 py-3 bg-transparent text-white focus:outline-none transition-colors resize-none min-h-[120px] ${
              Icon ? "pl-12" : ""
            } ${showCounter ? "pb-8" : ""} placeholder:text-zinc-600 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-200`}
            style={{ overflow: "hidden" }}
          />

          {/* Character Counter */}
          {showCounter && (
            <div className="absolute right-4 bottom-3 pointer-events-none">
              <span
                ref={counterRef}
                className={`text-xs font-mono transition-colors ${getCounterColor()}`}
              >
                {charCount}/{maxLength}
              </span>
            </div>
          )}

          {/* Valid Checkmark */}
          {isValid && (
            <div
              ref={checkRef}
              className="absolute right-4 top-4 opacity-0"
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
            className="text-red-400 text-xs mt-1.5 font-mono"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
