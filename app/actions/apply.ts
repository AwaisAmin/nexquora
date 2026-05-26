"use server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  jobId: z.string().min(1),
  jobTitle: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Cover note must be at least 10 characters"),
});

export async function applyForJob(
  formData: FormData,
): Promise<{ success: boolean; message?: string }> {
  const raw = Object.fromEntries(formData.entries());
  const result = schema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0]?.message ?? "Please fill all fields correctly.",
    };
  }

  await db.application.create({ data: result.data });
  return { success: true };
}
