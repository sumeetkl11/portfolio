import * as z from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be under 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
  website: z.string().max(0, "Invalid submission"), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type FormStatus = "idle" | "submitting" | "success" | "error" | "rate-limited";
export type FieldState = "idle" | "focused" | "valid" | "invalid" | "disabled";
export type ValidationMode = "onBlur" | "onChange" | "onSubmit";
