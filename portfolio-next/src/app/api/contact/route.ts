import { NextResponse } from "next/server";

// Simple in-memory per-IP rate limiter (1 request per 60 seconds)
const rateMap = new Map<string, number>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const last = rateMap.get(ip) ?? 0;
  const timeRemaining = Math.ceil((60_000 - (Date.now() - last)) / 1000);

  if (Date.now() - last < 60_000) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute.", retryAfter: timeRemaining },
      {
        status: 429,
        headers: {
          "Retry-After": timeRemaining.toString(),
        }
      }
    );
  }
  rateMap.set(ip, Date.now());

  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot check - if website field is filled, it's likely a bot
    if (website && website.length > 0) {
      console.log("Honeypot triggered - potential spam submission");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "portfolio@resend.dev",
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
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
