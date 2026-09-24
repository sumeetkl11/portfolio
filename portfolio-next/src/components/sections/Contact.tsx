"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, MessageSquare, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FormInput, FormTextarea, FormButton } from "@/components/ui/form";
import { contactFormSchema, ContactFormData, ContactFormInput, FormStatus } from "@/lib/formValidation";
import { useRateLimitTimer } from "@/hooks/useRateLimitTimer";
import { animateFieldEntry, animateFormSuccess } from "@/hooks/useFormAnimation";

// Register GSAP plugin
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
  } = useForm<ContactFormInput, any, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  // Watch form values for validation states
  const nameValue = watch("name");
  const emailValue = watch("email");
  const messageValue = watch("message");

  // Check if fields are valid
  const isNameValid = nameValue && nameValue.length >= 2 && !errors.name;
  const isEmailValid = emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) && !errors.email;
  const isMessageValid = messageValue && messageValue.length >= 10 && !errors.message;

  // Entry animations on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const fields = fieldsRef.current.filter(Boolean);
    if (fields.length === 0) return;

    // Animate fields with stagger
    fields.forEach((field, index) => {
      if (field) {
        animateFieldEntry(field, index * 0.15);
      }
    });

    // ScrollTrigger for visibility
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        fields.forEach((field, index) => {
          if (field) {
            gsap.fromTo(
              field,
              { opacity: 0, y: 40, rotateX: 10 },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "expo.out",
              }
            );
          }
        });
      },
    });

    return () => {
      st.kill();
    };
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
        setErrorMessage(`Rate limit exceeded. Please wait ${secondsRemaining || 60} seconds.`);
        startTimer(60);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");

      // Animate success
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
        error instanceof Error ? error.message : "Transmission failed. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg mb-6">
            Have a project in mind or want to collaborate?
            <br />
            Let&apos;s talk.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077B5]/15 hover:bg-[#0077B5]/25 text-[#0077B5] hover:text-white border border-[#0077B5]/30 text-xs font-mono font-medium transition-all duration-300 hover:scale-105 group"
              title="Connect with Sumeet on LinkedIn"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          {/* Honeypot field (hidden) */}
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
            ref={(el) => { fieldsRef.current[0] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 relative z-10"
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
              isValid={Boolean(isNameValid)}
              required
            />

            <FormInput
              {...register("email", {
                onChange: () => trigger("email"),
              })}
              id="email"
              type="email"
              label="Email"
              placeholder="example.at@gmail.com"
              icon={Mail}
              error={errors.email?.message}
              isValid={Boolean(isEmailValid)}
              required
            />
          </div>

          {/* Message Field */}
          <div
            ref={(el) => { fieldsRef.current[1] = el; }}
            className="opacity-0 relative z-10"
          >
            <FormTextarea
              {...register("message", {
                onChange: () => trigger("message"),
              })}
              id="message"
              label="Message"
              placeholder="How can I help you?"
              icon={MessageSquare}
              error={errors.message?.message}
              isValid={Boolean(isMessageValid)}
              showCounter
              maxLength={1000}
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div
            ref={(el) => { fieldsRef.current[2] = el; }}
            className="opacity-0"
          >
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
          </div>

          {/* Rate Limit Message */}
          {isRateLimited && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="relative w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-yellow-400 transition-all duration-1000 ease-linear"
                  style={{ width: `${(secondsRemaining / 60) * 100}%` }}
                />
              </div>
              <p className="text-yellow-400 text-sm font-mono">
                Cooldown: {secondsRemaining}s
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm font-mono"
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
          <div className="text-center p-8 rounded-2xl enhanced-glass max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-400"
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
            <h3 className="text-2xl font-display font-bold mb-2">Message Sent Successfully</h3>
            <p className="text-zinc-400 font-mono text-sm">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
