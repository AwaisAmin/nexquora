import { db } from "@/lib/db";
import { MarkReadBtn, DeleteApplicationBtn } from "./ApplicationActions";

export const metadata = { title: "Applications — Nexquora Admin" };

export default async function ApplicationsPage() {
  const applications = await db.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">
          Applications
        </h1>
        <p className="mt-1 text-sm text-muted">
          {applications.length} application
          {applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card">
        {applications.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-muted">
            No applications yet.
          </p>
        )}

        <div className="divide-y divide-white/5">
          {applications.map((a) => (
            <div key={a.id} className="flex items-start gap-4 px-6 py-4">
              <div className="mt-1.5 shrink-0">
                {!a.read ? (
                  <span className="block h-2 w-2 rounded-full bg-cyan" />
                ) : (
                  <span className="block h-2 w-2" />
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="text-sm font-semibold text-white">
                    {a.name}
                  </span>
                  <a
                    href={`mailto:${a.email}`}
                    className="text-xs text-cyan hover:underline"
                  >
                    {a.email}
                  </a>
                </div>
                <span className="inline-block rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-0.5 text-xs font-medium text-cyan">
                  {a.jobTitle}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {a.message}
                </p>
                <time className="text-xs text-muted">
                  {a.createdAt.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <div className="flex shrink-0 gap-1">
                {!a.read && <MarkReadBtn id={a.id} />}
                <DeleteApplicationBtn id={a.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
