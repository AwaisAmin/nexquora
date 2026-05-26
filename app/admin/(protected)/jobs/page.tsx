import Link from "next/link";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { JobRowActions } from "./JobRowActions";

export const metadata = { title: "Jobs — Nexquora Admin" };

export default async function JobsPage() {
  const jobs = await db.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-white">Jobs</h1>
          <p className="mt-1 text-sm text-muted">
            {jobs.length} posting{jobs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 rounded-lg bg-cyan px-4 py-2.5 text-sm font-semibold text-bg-primary shadow-[0_0_16px_rgba(0,245,255,0.2)] transition-all hover:brightness-110"
        >
          <Plus size={16} />
          New Job
        </Link>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card">
        {jobs.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-muted">
            No job postings yet. Create one to get started.
          </p>
        )}

        {jobs.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Role
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted md:table-cell">
                  Dept · Type
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:table-cell">
                  Apps
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((j) => (
                <tr key={j.id} className="group hover:bg-white/2">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-white">{j.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{j.location}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <p className="text-white/80">{j.department}</p>
                    <p className="text-xs text-muted">{j.type}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span className="text-white/80">
                      {j._count.applications}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        j.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      {j.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <JobRowActions id={j.id} published={j.published} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
