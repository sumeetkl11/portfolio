import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/formValidation";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60_000; // 60 seconds

// Fallback in-memory store (only used if KV is unavailable)
const rateLimitMap = new Map<string, number>();

// Cleanup old entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of rateLimitMap.entries()) {
      if (now - timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

async function checkRateLimit(ip: string): Promise<{ limited: boolean; retryAfter: number }> {
  try {
    const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    // Use Upstash Redis when configured
    if (redisUrl && redisToken) {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      const key = `ratelimit:contact:${ip}`;
      const lastRequest = await redis.get<number>(key);

      if (lastRequest) {
        const timeRemaining = Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - lastRequest)) / 1000);
        if (Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
          return { limited: true, retryAfter: timeRemaining };
        }
      }

      // Set new timestamp with TTL (60s)
      await redis.set(key, Date.now(), { ex: Math.ceil(RATE_LIMIT_WINDOW / 1000) });
      return { limited: false, retryAfter: 0 };
    }
  } catch (error) {
    console.warn("Upstash Redis rate limiting failed, falling back to in-memory:", error);
  }

  // Fallback to in-memory (with cleanup)
  const lastRequest = rateLimitMap.get(ip) ?? 0;
  const timeRemaining = Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - lastRequest)) / 1000);

  if (Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
    return { limited: true, retryAfter: timeRemaining };
  }

  rateLimitMap.set(ip, Date.now());
  return { limited: false, retryAfter: 0 };
}

export async function POST(req: Request) {
  // Get IP with fallbacks for different hosting environments
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  // Check rate limit
  const { limited, retryAfter } = await checkRateLimit(ip);

  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute.", retryAfter },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        }
      }
    );
  }

  try {
    const body = await req.json();

    // Server-side validation with Zod schema
    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parseResult.data;

    // Honeypot check - if website field is filled, it's likely a bot
    if (website && website.length > 0) {
      console.log("Honeypot triggered - potential spam submission");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });

      if (error) {
        console.error("Resend API delivery error:", error);
        return NextResponse.json(
          { error: error.message || "Failed to deliver email" },
          { status: 400 }
        );
      }
    } else {
      // No email service configured — log for local dev
      console.log("=== NEW CONTACT SUBMISSION ===");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);
      console.log("(Set RESEND_API_KEY + CONTACT_EMAIL in .env.local to enable email delivery)");
    }

    return NextResponse.json(
      { message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
