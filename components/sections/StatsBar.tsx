import { cn } from '@/lib/utils'
import { STATS } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section className="bg-bg-secondary py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={cn(
                'flex flex-col items-center gap-2 text-center',
                i < STATS.length - 1 && 'sm:border-r sm:border-white/8',
              )}
            >
              <p className="font-syne text-4xl font-bold gradient-text">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
