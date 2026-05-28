import { Resend } from "resend";
import { render } from "react-email";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Nexquora <onboarding@resend.dev>";
const ADMIN = process.env.ADMIN_EMAIL!;

interface SendOptions {
  to: string;
  subject: string;
  template: ReactElement;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  template,
  replyTo,
}: SendOptions) {
  try {
    const html = await render(template);
    return resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      ...(replyTo && { reply_to: replyTo }),
    });
  } catch (err) {
    console.error("[sendEmail] render/send error:", err);
    return { data: null, error: err };
  }
}

export { ADMIN };
