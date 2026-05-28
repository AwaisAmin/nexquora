type Variant = "cyan" | "indigo" | "emerald";

const styles: Record<Variant, { icon: string; badge: string; value: string }> = {
  cyan: {
    icon: "bg-cyan/10 text-cyan ring-cyan/20",
    badge: "bg-cyan/10 text-cyan",
    value: "text-white",
  },
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20",
    badge: "bg-indigo-500/10 text-indigo-400",
    value: "text-white",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400",
    value: "text-white",
  },
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  badge?: string;
  sub?: string;
  variant?: Variant;
}

export function StatCard({
  icon,
  label,
  value,
  badge,
  sub,
  variant = "cyan",
}: StatCardProps) {
  const s = styles[variant];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-bg-card p-5">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2.5 ring-1 ${s.icon}`}>{icon}</div>
        {badge && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
            {badge}
          </span>
        )}
      </div>
      <p className={`mt-4 font-syne text-3xl font-bold ${s.value}`}>{value}</p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
      {sub && <p className="mt-2 text-xs text-white/30">{sub}</p>}
    </div>
  );
}
