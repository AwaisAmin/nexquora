"use server";
import { revalidatePath } from "next/cache";
import { createElement } from "react";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import { sendEmail } from "@/lib/email";
import ContactReply from "@/lib/email/templates/ContactReply";

export async function markContactRead(id: string) {
  await verifySession();
  await db.contact.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function markApplicationRead(id: string) {
  await verifySession();
  await db.application.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function deleteContact(id: string) {
  await verifySession();
  await db.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteApplication(id: string) {
  await verifySession();
  await db.application.delete({ where: { id } });
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function replyToContact(id: string, message: string) {
  await verifySession();

  const contact = await db.contact.findUniqueOrThrow({ where: { id } });

  await db.contact.update({
    where: { id },
    data: { read: true, replied: true, repliedAt: new Date() },
  });

  const result = await sendEmail({
    to: contact.email,
    subject: `Re: Your ${contact.service} inquiry — Nexquora`,
    template: createElement(ContactReply, {
      name: contact.name,
      service: contact.service,
      message,
    }),
  });

  if (result.error) {
    console.error("[replyToContact] email failed:", result.error);
    throw new Error("Failed to send reply email.");
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}
