import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  emptyText?: string;
}

function Avatar({ name, read }: { name: string; read: boolean }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        read
          ? "bg-white/5 text-white/40 ring-1 ring-white/8"
          : "bg-cyan/10 text-cyan ring-1 ring-cyan/20"
      }`}
    >
      {initials}
    </div>
  );
}

function relativeDate(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentTable({ title, href, rows, emptyText = "Nothing yet" }: RecentTableProps) {
  return (
    <div className="rounded-xl border border-white/8 bg-bg-card">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-cyan/70 transition-colors hover:text-cyan"
        >
          View all <ArrowRight size={11} />
        </Link>
      </div>

      <div className="divide-y divide-white/5">
        {rows.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">{emptyText}</p>
        ) : (
          rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-white/2">
              <Avatar name={r.primary} read={r.read} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{r.primary}</p>
                <p className="truncate text-xs text-muted">{r.secondary}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <time className="text-xs text-white/30">{relativeDate(r.date)}</time>
                {!r.read && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
