import { Search, PenTool, Code2, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { PROCESS_STEPS } from '@/lib/data/process'

const ICON_MAP: Record<string, LucideIcon> = { Search, PenTool, Code2, Rocket }

export default function HowWeWork() {
  return (
    <section className="bg-bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our process"
          title="How we turn your idea"
          titleAccent="into a product"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map(({ step, iconName, title, description, accentHex }) => {
            const Icon = ICON_MAP[iconName]
            return (
              <div key={step} className="glass-card flex flex-col gap-4 p-7">
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${accentHex}18` }}
                    aria-hidden
                  >
                    {Icon && <Icon size={20} style={{ color: accentHex }} />}
                  </span>
                  <span
                    className="font-syne text-4xl font-bold"
                    style={{ color: `${accentHex}25` }}
                    aria-hidden
                  >
                    {step}
                  </span>
                </div>

                <h3 className="font-syne text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
