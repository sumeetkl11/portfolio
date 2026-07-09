import { z } from 'zod'

/* ── Contact form schema ─────────────────────────────────────── */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2,  { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be 100 characters or fewer.' })
    .trim()
    .refine((v) => /^[\p{L}\p{M}'\s-]+$/u.test(v), {
      message: 'Name contains invalid characters.',
    }),

  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .max(200, { message: 'Email must be 200 characters or fewer.' })
    .email({ message: 'Please enter a valid email address.' })
    .toLowerCase()
    .trim(),

  message: z
    .string()
    .min(10,  { message: 'Message must be at least 10 characters.' })
    .max(5000, { message: 'Message must be 5,000 characters or fewer.' })
    .trim(),
})

export type ContactFormData = z.infer<typeof contactSchema>

/* ── Sanitize a free-text string (strip HTML tags) ───────────── */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')        // strip HTML tags
    .replace(/javascript:/gi, '')   // strip JS URIs
    .replace(/on\w+=/gi, '')        // strip event handlers
    .trim()
}
