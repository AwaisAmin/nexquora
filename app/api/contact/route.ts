import { NextResponse } from "next/server";
import { createElement } from "react";
import { contactSchema } from "@/lib/schemas/contact";
import { db } from "@/lib/db";
import { sendEmail, ADMIN } from "@/lib/email";
import ContactNotification from "@/lib/email/templates/ContactNotification";
import ContactConfirmation from "@/lib/email/templates/ContactConfirmation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: result.error.issues },
      { status: 400 },
    );
  }

  const data = result.data;

  // 1. Save to database
  await db.contact.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company,
      service: data.service,
      budget: data.budget,
      message: data.message,
      role: data.role,
    },
  });

  // 2. Send emails — failures are logged but don't block the success response
  const [adminResult, userResult] = await Promise.all([
    sendEmail({
      to: ADMIN,
      subject: `New contact from ${data.name} — ${data.service}`,
      template: createElement(ContactNotification, data),
      replyTo: data.email,
    }),
    sendEmail({
      to: data.email,
      subject: "We received your message — Nexquora",
      template: createElement(ContactConfirmation, {
        name: data.name,
        service: data.service,
      }),
    }),
  ]);

  if (adminResult.error) {
    console.error("[contact] Admin notification failed:", adminResult.error);
  }
  if (userResult.error) {
    console.error("[contact] User confirmation failed:", userResult.error);
  }

  return NextResponse.json({ ok: true });
}
