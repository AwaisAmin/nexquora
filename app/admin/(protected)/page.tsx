import Link from "next/link";
import { db } from "@/lib/db";
import {
  MessageSquare,
  FileText,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { RecentTable } from "@/components/admin/RecentTable";

export const metadata = { title: "Dashboard — Nexquora Admin" };

const quickActions = [
  { label: "Contacts", href: "/admin/contacts", accent: "hover:border-cyan/30 hover:bg-cyan/5 hover:text-cyan" },
  { label: "Applications", href: "/admin/applications", accent: "hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-indigo-400" },
  { label: "Jobs", href: "/admin/jobs", accent: "hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400" },
  { label: "Services", href: "/admin/services", accent: "hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-purple-400" },
];

export default async function AdminDashboard() {
  const [
    totalContacts,
    unreadContacts,
    repliedContacts,
    totalApps,
    unreadApps,
    totalJobs,
  ] = await Promise.all([
    db.contact.count(),
    db.contact.count({ where: { read: false } }),
    db.contact.count({ where: { replied: true } }),
    db.application.count(),
    db.application.count({ where: { read: false } }),
    db.job.count({ where: { published: true } }),
  ]);

  const [recentContacts, recentApps] = await Promise.all([
    db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, service: true, createdAt: true, read: true },
    }),
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, jobTitle: true, createdAt: true, read: true },
    }),
  ]);

  const pendingActions = unreadContacts + unreadApps;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            {pendingActions > 0 ? (
              <>
                <span className="text-cyan">{pendingActions} item{pendingActions !== 1 ? "s" : ""}</span>
                {" "}need{pendingActions === 1 ? "s" : ""} your attention
              </>
            ) : (
              "All caught up — nothing pending"
            )}
          </p>
        </div>

        {pendingActions === 0 && (
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <CheckCircle2 size={12} />
            All clear
          </div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<MessageSquare size={18} />}
          label="Total Contacts"
          value={totalContacts}
          badge={unreadContacts > 0 ? `${unreadContacts} unread` : undefined}
          sub={repliedContacts > 0 ? `${repliedContacts} replied` : undefined}
          variant="cyan"
        />
        <StatCard
          icon={<FileText size={18} />}
          label="Applications"
          value={totalApps}
          badge={unreadApps > 0 ? `${unreadApps} new` : undefined}
          variant="indigo"
        />
        <StatCard
          icon={<Briefcase size={18} />}
          label="Active Jobs"
          value={totalJobs}
          sub="Published positions"
          variant="emerald"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
          Quick navigate
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map(({ label, href, accent }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded-xl border border-white/8 bg-bg-card px-4 py-3 text-sm font-medium text-muted transition-all duration-200 ${accent}`}
            >
              {label}
              <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
          Recent activity
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentTable
            title="Recent Contacts"
            href="/admin/contacts"
            emptyText="No contacts yet"
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
            emptyText="No applications yet"
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
    </div>
  );
}
