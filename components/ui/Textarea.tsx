import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "className"
> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: boolean;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, hint, error, resize = false, className, id: idProp, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-xs font-semibold text-white/80">
              {label}
              {props.required && (
                <span className="ml-1 text-cyan" aria-hidden>
                  *
                </span>
              )}
            </label>
            {hint && <span className="text-xs text-muted">{hint}</span>}
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-sm text-white",
            "bg-bg-card/60 placeholder:text-white/30",
            "outline-none transition-colors duration-150",
            "focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            resize ? "resize-y min-h-25" : "resize-none",
            error
              ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20"
              : "border-white/10 hover:border-white/20",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
