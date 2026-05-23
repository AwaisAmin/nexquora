'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/lib/types'

interface AccordionProps {
  items: FaqItem[]
  accentHex?: string
  className?: string
}

export default function Accordion({ items, accentHex = '#00F5FF', className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={cn('divide-y divide-white/6', className)}>
      {items.map(({ q, a }, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <span className="text-sm font-semibold text-white">{q}</span>
            <ChevronDown
              size={16}
              className={cn(
                'mt-0.5 shrink-0 text-muted transition-transform duration-300',
                open === i && 'rotate-180',
              )}
              style={open === i ? { color: accentHex } : undefined}
              aria-hidden
            />
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
