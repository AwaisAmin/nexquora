import Link from "next/link";

export interface RecentRow {
  id: string;
  primary: string;
  secondary: string;
  date: Date;
  read: boolean;
}

interface RecentTableProps {
  title: string;
  href: string;
  rows: RecentRow[];
}

export function RecentTable({ title, href, rows }: RecentTableProps) {
  return (
    <div className="rounded-xl border border-white/8 bg-bg-card">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <Link href={href} className="text-xs text-cyan hover:underline">
          View all
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {rows.length === 0 && (
          <p className="px-5 py-6 text-center text-sm text-muted">
            Nothing yet
          </p>
        )}
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-3 px-5 py-3">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${!r.read ? "bg-cyan" : ""}`}
            />
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
