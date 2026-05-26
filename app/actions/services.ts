"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import { parseFaq, DEFAULT_SERVICES } from "@/lib/data/services";

const serviceSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, or hyphens",
    ),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(10, "Description is required"),
  longDescription: z.string().min(20, "Long description is required"),
  icon: z.string().min(1, "Icon is required"),
  accentHex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color like #00F5FF"),
  features: z.string().min(1, "At least one feature"),
  tools: z.string().min(1, "At least one tool"),
  faqRaw: z.string(),
  caseStudyTeaser: z.string().optional(),
  published: z.string().optional(),
  order: z.string().optional(),
});

function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

type ServiceFieldErrors = Partial<
  Record<keyof z.infer<typeof serviceSchema>, string[]>
>;

export type ServiceFormState = {
  errors?: ServiceFieldErrors;
  message?: string;
} | null;

function revalidateAll() {
  revalidatePath("/admin/services");
  revalidatePath("/admin");
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/");
}

export async function createService(
  _prev: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await verifySession();

  const raw = Object.fromEntries(formData.entries());
  const result = serviceSchema.safeParse(raw);

  if (!result.success) {
    const errors: ServiceFieldErrors = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof typeof errors;
      if (k) errors[k] = [...(errors[k] ?? []), issue.message];
    }
    return { errors };
  }

  const d = result.data;

  await db.service.create({
    data: {
      slug: d.slug,
      title: d.title,
      tagline: d.tagline,
      description: d.description,
      longDescription: d.longDescription,
      icon: d.icon,
      accentHex: d.accentHex,
      features: parseLines(d.features),
      tools: parseLines(d.tools),
      faq: parseFaq(d.faqRaw) as unknown as object[],
      caseStudyTeaser: d.caseStudyTeaser || null,
      published: d.published === "on",
      order: d.order ? parseInt(d.order, 10) : 0,
    },
  });

  revalidateAll();
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prev: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await verifySession();

  const raw = Object.fromEntries(formData.entries());
  const result = serviceSchema.safeParse(raw);

  if (!result.success) {
    const errors: ServiceFieldErrors = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof typeof errors;
      if (k) errors[k] = [...(errors[k] ?? []), issue.message];
    }
    return { errors };
  }

  const d = result.data;

  await db.service.update({
    where: { id },
    data: {
      slug: d.slug,
      title: d.title,
      tagline: d.tagline,
      description: d.description,
      longDescription: d.longDescription,
      icon: d.icon,
      accentHex: d.accentHex,
      features: parseLines(d.features),
      tools: parseLines(d.tools),
      faq: parseFaq(d.faqRaw) as unknown as object[],
      caseStudyTeaser: d.caseStudyTeaser || null,
      published: d.published === "on",
      order: d.order ? parseInt(d.order, 10) : 0,
    },
  });

  revalidateAll();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifySession();
  await db.service.delete({ where: { id } });
  revalidateAll();
}

export async function toggleServicePublished(id: string, published: boolean) {
  await verifySession();
  await db.service.update({ where: { id }, data: { published } });
  revalidateAll();
}

export async function seedDefaultServices(): Promise<{ seeded: number }> {
  await verifySession();
  const existing = await db.service.count();
  if (existing > 0) return { seeded: 0 };

  const rows = DEFAULT_SERVICES.map((s) => ({
    ...s,
    faq: s.faq as object[],
  }));

  await db.service.createMany({ data: rows });
  revalidateAll();
  return { seeded: rows.length };
}
