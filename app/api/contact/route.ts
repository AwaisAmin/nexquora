import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas/contact'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid form data', issues: result.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // TODO Phase 8: send email via Resend
  console.log('[contact form submission]', result.data)

  return NextResponse.json({ ok: true })
}
