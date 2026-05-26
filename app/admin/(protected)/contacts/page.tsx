import { db } from "@/lib/db";
import { MarkReadBtn, DeleteContactBtn } from "./ContactActions";

export const metadata = { title: "Contacts — Nexquora Admin" };

export default async function ContactsPage() {
  const contacts = await db.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Contacts</h1>
        <p className="mt-1 text-sm text-muted">
          {contacts.length} submission{contacts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card">
        {contacts.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-muted">
            No contact submissions yet.
          </p>
        )}

        <div className="divide-y divide-white/5">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-start gap-4 px-6 py-4">
              {/* Unread dot */}
              <div className="mt-1.5 shrink-0">
                {!c.read ? (
                  <span className="block h-2 w-2 rounded-full bg-cyan" />
                ) : (
                  <span className="block h-2 w-2" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="text-sm font-semibold text-white">
                    {c.name}
                  </span>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-xs text-cyan hover:underline"
                  >
                    {c.email}
                  </a>
                  {c.company && (
                    <span className="text-xs text-muted">· {c.company}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-full border border-white/10 px-2 py-0.5">
                    {c.service}
                  </span>
                  {c.budget && (
                    <span className="rounded-full border border-white/10 px-2 py-0.5">
                      {c.budget}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {c.message}
                </p>
                <time className="text-xs text-muted">
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
              <div className="flex shrink-0 gap-1">
                {!c.read && <MarkReadBtn id={c.id} />}
                <DeleteContactBtn id={c.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
