import { db } from "@/lib/db";
import { MessageSquare, FileText, Briefcase, Eye } from "lucide-react";

export const metadata = { title: "Dashboard — Nexquora Admin" };

export default async function AdminDashboard() {
  const [totalContacts, unreadContacts, totalApps, unreadApps, totalJobs] =
    await Promise.all([
      db.contact.count(),
      db.contact.count({ where: { read: false } }),
      db.application.count(),
      db.application.count({ where: { read: false } }),
      db.job.count({ where: { published: true } }),
    ]);

  const recentContacts = await db.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      service: true,
      createdAt: true,
      read: true,
    },
  });

  const recentApps = await db.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      jobTitle: true,
      createdAt: true,
      read: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of your Nexquora activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<MessageSquare size={20} />}
          label="Contacts"
          value={totalContacts}
          badge={unreadContacts > 0 ? `${unreadContacts} new` : undefined}
        />
        <StatCard
          icon={<FileText size={20} />}
          label="Applications"
          value={totalApps}
          badge={unreadApps > 0 ? `${unreadApps} new` : undefined}
        />
        <StatCard
          icon={<Briefcase size={20} />}
          label="Active Jobs"
          value={totalJobs}
        />
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentTable
          title="Recent Contacts"
          href="/admin/contacts"
          rows={recentContacts.map((c) => ({
            id: c.id,
            primary: c.name,
            secondary: c.service,
            date: c.createdAt,
            read: c.read,
          }))}
        />
        <RecentTable
          title="Recent Applications"
          href="/admin/applications"
          rows={recentApps.map((a) => ({
            id: a.id,
            primary: a.name,
            secondary: a.jobTitle,
            date: a.createdAt,
            read: a.read,
          }))}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-muted">{icon}</span>
        {badge && (
          <span className="rounded-full bg-cyan/10 px-2.5 py-0.5 text-xs font-semibold text-cyan">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 font-syne text-3xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
    </div>
  );
}

function RecentTable({
  title,
  href,
  rows,
}: {
  title: string;
  href: string;
  rows: {
    id: string;
    primary: string;
    secondary: string;
    date: Date;
    read: boolean;
  }[];
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-bg-card">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <a href={href} className="text-xs text-cyan hover:underline">
          View all
        </a>
      </div>
      <div className="divide-y divide-white/5">
        {rows.length === 0 && (
          <p className="px-5 py-6 text-center text-sm text-muted">
            Nothing yet
          </p>
        )}
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-3 px-5 py-3">
            {!r.read && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" />
            )}
            {r.read && <span className="h-2 w-2 shrink-0" />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {r.primary}
              </p>
              <p className="truncate text-xs text-muted">{r.secondary}</p>
            </div>
            <time className="shrink-0 text-xs text-muted">
              {r.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
