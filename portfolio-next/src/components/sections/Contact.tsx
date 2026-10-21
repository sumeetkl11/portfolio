"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, MessageSquare, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FormInput, FormTextarea, FormButton } from "@/components/ui/form";
import KineticHeading from "@/components/ui/KineticHeading";
import Magnetic from "@/components/ui/Magnetic";
import {
  contactFormSchema,
  ContactFormData,
  ContactFormInput,
  FormStatus,
} from "@/lib/formValidation";
import { useRateLimitTimer } from "@/hooks/useRateLimitTimer";
import { animateFormSuccess } from "@/hooks/useFormAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { secondsRemaining, isActive: isRateLimited, startTimer } = useRateLimitTimer();

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const messageValue = watch("message");

  const isNameValid = Boolean(nameValue && nameValue.length >= 2 && !errors.name);
  const isEmailValid = Boolean(
    emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) && !errors.email
  );
  const isMessageValid = Boolean(messageValue && messageValue.length >= 10 && !errors.message);

  useEffect(() => {
    if (!sectionRef.current) return;
    const fields = fieldsRef.current.filter(Boolean);
    if (fields.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(fields, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fields,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setSubmitStatus("rate-limited");
        setErrorMessage(
          `Rate limit exceeded. Please wait ${secondsRemaining || 60} seconds.`
        );
        startTimer(60);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");

      if (formRef.current && successRef.current) {
        animateFormSuccess(formRef.current, successRef.current, () => {
          reset();
          setSubmitStatus("idle");
        });
      } else {
        setTimeout(() => {
          reset();
          setSubmitStatus("idle");
        }, 3000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Transmission failed. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 md:py-36 bg-black relative border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Header */}
        <div className="mb-14 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2.5">
              06 · DIRECT DISPATCH
            </span>
            <KineticHeading
              text="Initiate Dialogue"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white"
            />
          </div>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0a0a0a] hover:border-white/40 text-white/80 hover:text-white border border-white/15 text-xs font-mono transition-colors whitespace-nowrap self-start md:self-auto"
            title="Connect with Sumeet on LinkedIn"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          {/* Honeypot field */}
          <input
            {...register("website")}
            type="text"
            name="website"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          />

          {/* Name & Email Row */}
          <div
            ref={(el) => {
              fieldsRef.current[0] = el;
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            <FormInput
              {...register("name", {
                onChange: () => trigger("name"),
              })}
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              icon={User}
              error={errors.name?.message}
              isValid={isNameValid}
              required
            />

            <FormInput
              {...register("email", {
                onChange: () => trigger("email"),
              })}
              id="email"
              type="email"
              label="Email"
              placeholder="name@company.com"
              icon={Mail}
              error={errors.email?.message}
              isValid={isEmailValid}
              required
            />
          </div>

          {/* Message Field */}
          <div
            ref={(el) => {
              fieldsRef.current[1] = el;
            }}
            className="relative z-10"
          >
            <FormTextarea
              {...register("message", {
                onChange: () => trigger("message"),
              })}
              id="message"
              label="Message"
              placeholder="Describe your architectural requirements or project timeline..."
              icon={MessageSquare}
              error={errors.message?.message}
              isValid={isMessageValid}
              showCounter
              maxLength={1000}
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div
            ref={(el) => {
              fieldsRef.current[2] = el;
            }}
          >
            <Magnetic className="w-full block">
              <FormButton
                type="submit"
                isLoading={submitStatus === "submitting"}
                isSuccess={submitStatus === "success"}
                isError={submitStatus === "error"}
                disabled={isSubmitting || isRateLimited}
                loadingText="Sending..."
                successText="Message Sent"
                errorText="Failed to Send"
              >
                Send Message
              </FormButton>
            </Magnetic>
          </div>

          {/* Rate Limit Cooldown (Compositor scaleX instead of layout width) */}
          {isRateLimited && (
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-[#0a0a0a] border border-white/20">
              <div className="relative w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-white origin-left transition-transform duration-1000 ease-linear"
                  style={{ transform: `scaleX(${Math.max(0, secondsRemaining / 60)})` }}
                />
              </div>
              <p className="text-white/80 text-xs font-mono tabular-nums">
                Cooldown: {secondsRemaining}s
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-lg bg-[#0a0a0a] border border-red-500/40 text-red-400 text-center text-xs font-mono"
            >
              {errorMessage}
            </div>
          )}
        </form>

        {/* Success Message Overlay */}
        <div
          ref={successRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="text-center p-8 rounded-2xl bg-[#0a0a0a] border border-white/20 max-w-md">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold mb-2 text-white">
              Message Sent
            </h3>
            <p className="text-white/60 font-mono text-xs">
              Thank you for reaching out. I will respond shortly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
