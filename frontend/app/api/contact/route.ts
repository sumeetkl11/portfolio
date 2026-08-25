import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema, sanitizeText } from '@/lib/validators'

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || record.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count += 1
  return false
}

function safeLog(message: string, error: unknown) {
  console.error(message, {
    name: error instanceof Error ? error.name : 'UnknownError',
    message: error instanceof Error ? error.message : 'Unknown error',
  })
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('Contact route misconfigured: RESEND_API_KEY is missing')
    return NextResponse.json(
      { error: 'Service temporarily unavailable.' },
      { status: 503 }
    )
  }

  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()

    // Validate incoming payload
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request.' },
        { status: 400 }
      )
    }

    const name = sanitizeText(validation.data.name)
    const email = validation.data.email
    const message = sanitizeText(validation.data.message)

    const resend = new Resend(apiKey)

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'sumeetkanhiya11@gmail.com',
      subject: `New message from ${name} - Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    })

    if (result.error) {
      safeLog('Resend API error', result.error)
      return NextResponse.json(
        { error: 'Failed to send message.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    safeLog('Contact request failed', error)
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    )
  }
}
