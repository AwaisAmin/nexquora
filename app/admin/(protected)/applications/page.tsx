import { db } from "@/lib/db";
import { MarkReadBtn, DeleteApplicationBtn } from "./ApplicationActions";
import { Inbox, Mail, Briefcase } from "lucide-react";

export const metadata = { title: "Applications — Nexquora Admin" };

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 text-xs font-bold text-white ring-1 ring-white/10">
      {initials}
    </div>
  );
}

function StatusBadge({ read }: { read: boolean }) {
  if (!read)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-2 py-0.5 text-xs font-medium text-cyan ring-1 ring-cyan/20">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        New
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-muted ring-1 ring-white/8">
      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      Reviewed
    </span>
  );
}

export default async function ApplicationsPage() {
  const applications = await db.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalCount = applications.length;
  const unreadCount = applications.filter((a) => !a.read).length;

  const stats = [
    { label: "Total", value: totalCount, icon: Briefcase, color: "text-white" },
    { label: "New", value: unreadCount, icon: Mail, color: "text-cyan" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Applications</h1>
        <p className="mt-1 text-sm text-muted">Review job applications from candidates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:w-80">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/8 bg-bg-card px-5 py-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{label}</span>
              <Icon size={14} className={color} />
            </div>
            <p className={`mt-2 font-syne text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="rounded-xl border border-white/8 bg-bg-card">
        {applications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Inbox size={32} className="text-white/20" />
            <p className="text-sm text-muted">No applications yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {applications.map((a) => (
              <div
                key={a.id}
                className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-white/2"
              >
                <Avatar name={a.name} />

                <div className="min-w-0 flex-1 space-y-2">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{a.name}</span>
                    <a
                      href={`mailto:${a.email}`}
                      className="text-xs text-cyan/80 hover:text-cyan hover:underline"
                    >
                      {a.email}
                    </a>
                    <StatusBadge read={a.read} />
                  </div>

                  {/* Job title */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/20 bg-indigo-500/8 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                      <Briefcase size={10} />
                      {a.jobTitle}
                    </span>
                  </div>

                  {/* Cover letter */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
                    {a.message}
                  </p>

                  {/* Time */}
                  <time className="block text-xs text-white/30">
                    {a.createdAt.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
                  {!a.read && <MarkReadBtn id={a.id} />}
                  <DeleteApplicationBtn id={a.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
