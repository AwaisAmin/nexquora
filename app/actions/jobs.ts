"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  type: z.string().min(1, "Type is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary is required"),
  description: z.string().min(10, "Description is required"),
  requirements: z.string().min(1, "At least one requirement"),
  niceToHave: z.string(),
  published: z.string().optional(),
});

function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

type JobFieldErrors = Partial<
  Record<keyof z.infer<typeof jobSchema>, string[]>
>;

export type JobFormState = {
  errors?: JobFieldErrors;
  message?: string;
} | null;

export async function createJob(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  await verifySession();

  const raw = Object.fromEntries(formData.entries());
  const result = jobSchema.safeParse(raw);

  if (!result.success) {
    const errors: JobFieldErrors = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof typeof errors;
      if (k) errors[k] = [...(errors[k] ?? []), issue.message];
    }
    return { errors };
  }

  const d = result.data;

  await db.job.create({
    data: {
      title: d.title,
      department: d.department,
      type: d.type,
      location: d.location,
      salary: d.salary,
      description: d.description,
      requirements: parseLines(d.requirements),
      niceToHave: parseLines(d.niceToHave),
      published: d.published === "on",
    },
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/admin");
  redirect("/admin/jobs");
}

export async function updateJob(
  id: string,
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  await verifySession();

  const raw = Object.fromEntries(formData.entries());
  const result = jobSchema.safeParse(raw);

  if (!result.success) {
    const errors: JobFieldErrors = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof typeof errors;
      if (k) errors[k] = [...(errors[k] ?? []), issue.message];
    }
    return { errors };
  }

  const d = result.data;

  await db.job.update({
    where: { id },
    data: {
      title: d.title,
      department: d.department,
      type: d.type,
      location: d.location,
      salary: d.salary,
      description: d.description,
      requirements: parseLines(d.requirements),
      niceToHave: parseLines(d.niceToHave),
      published: d.published === "on",
    },
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/admin");
  redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
  await verifySession();
  await db.job.delete({ where: { id } });
  revalidatePath("/admin/jobs");
  revalidatePath("/admin");
}

export async function toggleJobPublished(id: string, published: boolean) {
  await verifySession();
  await db.job.update({ where: { id }, data: { published } });
  revalidatePath("/admin/jobs");
  revalidatePath("/admin");
}
