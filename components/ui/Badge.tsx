import { cn } from '@/lib/utils'
import type { AccentColor } from '@/lib/types'

const accentClasses: Record<AccentColor | 'default', string> = {
  default: 'border-white/10 text-muted',
  cyan:    'border-cyan/30   text-cyan   bg-cyan/10',
  blue:    'border-blue/30   text-blue   bg-blue/10',
  purple:  'border-purple/30 text-purple bg-purple/10',
  green:   'border-green/30  text-green  bg-green/10',
  gold:    'border-gold/30   text-gold   bg-gold/10',
  amber:   'border-amber/30  text-amber  bg-amber/10',
}

type BadgeVariant = AccentColor | 'default'

type BadgeProps = {
  variant?:  BadgeVariant
  dot?:      boolean
  className?: string
  children:  React.ReactNode
}

export default function Badge({
  variant = 'default',
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide',
        accentClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'relative flex h-1.5 w-1.5 shrink-0 rounded-full',
            variant === 'default' ? 'bg-muted' : `bg-current`,
          )}
          aria-hidden
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-75" />
        </span>
      )}
      {children}
    </span>
  )
}
