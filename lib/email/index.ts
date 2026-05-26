import { Resend } from "resend";
import { render } from "react-email";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Nexquora <onboarding@resend.dev>"; // change to your domain after verification
const ADMIN = process.env.ADMIN_EMAIL!;

interface SendOptions {
  to: string;
  subject: string;
  template: ReactElement;
}

export async function sendEmail({ to, subject, template }: SendOptions) {
  const html = await render(template);
  return resend.emails.send({ from: FROM, to, subject, html });
}

export { ADMIN };
