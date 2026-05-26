interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  badge?: string;
}

export function StatCard({ icon, label, value, badge }: StatCardProps) {
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
