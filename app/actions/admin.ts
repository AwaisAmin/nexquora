"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

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
