import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type InputProps = {
  label?:     string
  error?:     string
  className?: string
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'className'>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id: idProp, ...props }, ref) => {
    // Stable generated id so label↔input are always linked
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

        <input
          ref={ref}
          id={id}
          className={cn(
            // base
            'h-10 w-full rounded-lg bg-bg-card px-4 text-sm text-white',
            'border border-white/8',
            'placeholder:text-muted',
            // focus
            'outline-none ring-0',
            'focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30',
            'transition-colors duration-150',
            // error
            error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30',
            // disabled
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

Input.displayName = 'Input'
export default Input
