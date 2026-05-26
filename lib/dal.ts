import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import type { Job, Department, JobType, Service, FaqItem } from "@/lib/types";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.role) redirect("/admin/login");
  return { isAdmin: true };
});

function mapJob(r: {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  niceToHave: string[];
  createdAt: Date;
}): Job {
  return {
    id: r.id,
    title: r.title,
    department: r.department as Department,
    type: r.type as JobType,
    location: r.location,
    salary: r.salary,
    postedAt: r.createdAt.toISOString(),
    description: r.description,
    requirements: r.requirements,
    niceToHave: r.niceToHave,
  };
}

export const getPublishedJobs = cache(async (): Promise<Job[]> => {
  const rows = await db.job.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapJob);
});

export const getFeaturedJobs = cache(async (limit = 3): Promise<Job[]> => {
  const rows = await db.job.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(mapJob);
});

// ── Services ──────────────────────────────────────────────────────────────────

function mapService(r: {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  accentHex: string;
  features: string[];
  tools: string[];
  faq: unknown;
  caseStudyTeaser: string | null;
  published: boolean;
  order: number;
}): Service {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    description: r.description,
    longDescription: r.longDescription,
    icon: r.icon,
    accentHex: r.accentHex,
    features: r.features,
    tools: r.tools,
    faq: (r.faq as FaqItem[]) ?? [],
    caseStudyTeaser: r.caseStudyTeaser ?? undefined,
    published: r.published,
    order: r.order,
  };
}

export const getPublishedServices = cache(async (): Promise<Service[]> => {
  const rows = await db.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(mapService);
});

export const getServicesBySlug = cache(
  async (slug: string): Promise<Service[]> => {
    const rows = await db.service.findMany({
      where: { published: true, slug },
      orderBy: { order: "asc" },
    });
    return rows.map(mapService);
  },
);
