import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Define the validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

// Initialize the Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate incoming payload
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.format() },
        { status: 400 }
      )
    }

    const { name, email, message } = validation.data

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'sumeetkanhiya11@gmail.com',
      subject: `New Message from ${name} - Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (result.error) {
      console.error('Resend API error:', result.error)
      return NextResponse.json(
        { error: 'Failed to send message.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Server error handling contact request:', error)
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    )
  }
}
