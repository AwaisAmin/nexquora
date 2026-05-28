import { db } from "@/lib/db";
import { MarkReadBtn, DeleteContactBtn, ReplyContactBtn } from "./ContactActions";
import { CheckCircle2, Mail, Inbox, MessageSquare } from "lucide-react";

export const metadata = { title: "Contacts — Nexquora Admin" };

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan/20 to-indigo-500/20 text-xs font-bold text-white ring-1 ring-white/10">
      {initials}
    </div>
  );
}

function StatusBadge({ read, replied }: { read: boolean; replied: boolean }) {
  if (replied)
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
        <CheckCircle2 size={10} />
        Replied
      </span>
    );
  if (!read)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-2 py-0.5 text-xs font-medium text-cyan ring-1 ring-cyan/20">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        Unread
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-muted ring-1 ring-white/8">
      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      Read
    </span>
  );
}

export default async function ContactsPage() {
  const contacts = await db.contact.findMany({ orderBy: { createdAt: "desc" } });

  const totalCount = contacts.length;
  const unreadCount = contacts.filter((c) => !c.read).length;
  const repliedCount = contacts.filter((c) => c.replied).length;

  const stats = [
    { label: "Total", value: totalCount, icon: Inbox, color: "text-white" },
    { label: "Unread", value: unreadCount, icon: Mail, color: "text-cyan" },
    { label: "Replied", value: repliedCount, icon: MessageSquare, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Contacts</h1>
        <p className="mt-1 text-sm text-muted">Manage inbound inquiries and replies</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
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
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Inbox size={32} className="text-white/20" />
            <p className="text-sm text-muted">No contact submissions yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-white/2"
              >
                <Avatar name={c.name} />

                <div className="min-w-0 flex-1 space-y-2">
                  {/* Top row: name, email, company, status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-xs text-cyan/80 hover:text-cyan hover:underline"
                    >
                      {c.email}
                    </a>
                    {c.company && (
                      <span className="text-xs text-muted">· {c.company}</span>
                    )}
                    <StatusBadge read={c.read} replied={c.replied} />
                    {c.replied && c.repliedAt && (
                      <span className="text-xs text-emerald-400/60">
                        {c.repliedAt.toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md border border-indigo-500/20 bg-indigo-500/8 px-2 py-0.5 text-xs font-medium text-indigo-300">
                      {c.service}
                    </span>
                    {c.budget && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted">
                        {c.budget}
                      </span>
                    )}
                    {c.role && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted">
                        {c.role}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
                    {c.message}
                  </p>

                  {/* Time */}
                  <time className="block text-xs text-white/30">
                    {c.createdAt.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                {/* Actions */}
                <div className="relative flex shrink-0 items-center gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
                  {!c.read && <MarkReadBtn id={c.id} />}
                  {!c.replied && <ReplyContactBtn id={c.id} />}
                  <DeleteContactBtn id={c.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
