import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type TextareaProps = {
  label?:     string
  error?:     string
  className?: string
} & Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className'>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id: idProp, ...props }, ref) => {
    const generatedId = useId()
    const id = idProp ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-white/80"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-cyan" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg bg-bg-card px-4 py-3 text-sm text-white',
            'border border-white/8',
            'placeholder:text-muted',
            'outline-none ring-0',
            'focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30',
            'transition-colors duration-150',
            'resize-y min-h-[120px]',
            error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {error && (
          <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
export default Textarea
