'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface FinanceTabsProps {
  services: Service[]
  initialTabIndex?: number
}

export default function FinanceTabs({ services, initialTabIndex = 0 }: FinanceTabsProps) {
  const [active, setActive] = useState(initialTabIndex)
  const service = services[active]

  return (
    <div>
      {/* Tab buttons */}
      <div className="mb-8 flex gap-2 rounded-xl border border-white/8 bg-bg-card/50 p-1.5">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-semibold transition-all',
              active === i
                ? 'text-bg-primary shadow-sm'
                : 'text-muted hover:text-white',
            )}
            style={active === i ? { background: s.accentHex } : undefined}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3" role="list">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: service.accentHex }}
              aria-hidden
            />
            <span className="text-sm leading-relaxed text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tools */}
      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Tools &amp; tech
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-white/8 px-3 py-1.5 text-xs font-medium text-white/70"
              style={{ background: `${service.accentHex}0A` }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}