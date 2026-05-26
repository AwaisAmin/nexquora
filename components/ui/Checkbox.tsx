import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "className"
> {
  label: string;
  hint?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, className, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cn("flex cursor-pointer items-center gap-3", className)}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="h-4 w-4 cursor-pointer accent-cyan disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        <span className="flex flex-col gap-0.5">
          <span className="text-sm text-white/80">{label}</span>
          {hint && <span className="text-xs text-muted">{hint}</span>}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
