import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?:     string
  title:        string
  /** Single word/phrase within the title that receives gradient styling */
  titleAccent?: string
  subtitle?:    string
  centered?:    boolean
  className?:   string
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-16 flex flex-col gap-4',
        centered && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          {centered && <span className="h-px w-8 bg-cyan/40" />}
          <span className="font-dm-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </span>
          {centered && <span className="h-px w-8 bg-cyan/40" />}
          {!centered && <span className="h-px flex-1 bg-white/6" />}
        </div>
      )}

      <h2 className="font-syne text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}{' '}
        {titleAccent && (
          <span className="gradient-text">{titleAccent}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'font-dm-sans text-base leading-relaxed text-muted',
            centered && 'max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
