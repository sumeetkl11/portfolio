"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider mb-6">
            Initiate Protocol
          </h2>
          <p className="text-zinc-400 text-lg">
            Looking for a resilient systems architect to build your next high-throughput platform? Send a transmission.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Name</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Message</label>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
              placeholder="How can I help you?"
            />
            {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Transmit <Send className="w-4 h-4" /></>
            )}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-400 text-center text-sm font-mono mt-4">
              Transmission successful. I will respond shortly.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 text-center text-sm font-mono mt-4">
              Transmission failed. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
