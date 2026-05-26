import { NextResponse } from "next/server";
import { createElement } from "react";
import { applicationSchema } from "@/lib/schemas/application";
import { db } from "@/lib/db";
import { sendEmail, ADMIN } from "@/lib/email";
import ApplicationNotification from "@/lib/email/templates/ApplicationNotification";
import ApplicationConfirmation from "@/lib/email/templates/ApplicationConfirmation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: result.error.issues },
      { status: 400 },
    );
  }

  const data = result.data;

  // 1. Save to database
  await db.application.create({
    data: {
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });

  // 2. Send emails in parallel
  await Promise.all([
    sendEmail({
      to: ADMIN,
      subject: `New application for ${data.jobTitle} — ${data.name}`,
      template: createElement(ApplicationNotification, {
        name: data.name,
        email: data.email,
        jobTitle: data.jobTitle,
        message: data.message,
      }),
    }),
    sendEmail({
      to: data.email,
      subject: `Application received — ${data.jobTitle}`,
      template: createElement(ApplicationConfirmation, {
        name: data.name,
        jobTitle: data.jobTitle,
      }),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
