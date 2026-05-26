import { db } from "@/lib/db";
import { MessageSquare, FileText, Briefcase } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { RecentTable } from "@/components/admin/RecentTable";

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
    select: { id: true, name: true, service: true, createdAt: true, read: true },
  });

  const recentApps = await db.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, jobTitle: true, createdAt: true, read: true },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of your Nexquora activity
        </p>
      </div>

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
