"use client";
import { useActionState } from "react";
import type { JobFormState } from "@/app/actions/jobs";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "Operations",
  "Sales",
];

interface JobFormProps {
  action: (prev: JobFormState, formData: FormData) => Promise<JobFormState>;
  defaultValues?: {
    title?: string;
    department?: string;
    type?: string;
    location?: string;
    salary?: string;
    description?: string;
    requirements?: string[];
    niceToHave?: string[];
    published?: boolean;
  };
  submitLabel: string;
}

export default function JobForm({
  action,
  defaultValues = {},
  submitLabel,
}: JobFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {/* Title */}
      <Field label="Job Title" error={state?.errors?.title?.[0]}>
        <input
          name="title"
          type="text"
          required
          defaultValue={defaultValues.title}
          placeholder="e.g. Senior Full-Stack Engineer"
          className={inputCls(!!state?.errors?.title)}
        />
      </Field>

      {/* Department + Type */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Department" error={state?.errors?.department?.[0]}>
          <select
            name="department"
            required
            defaultValue={defaultValues.department ?? ""}
            className={cn(
              inputCls(!!state?.errors?.department),
              "cursor-pointer bg-bg-card",
            )}
          >
            <option value="" disabled>
              Select…
            </option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Employment Type" error={state?.errors?.type?.[0]}>
          <select
            name="type"
            required
            defaultValue={defaultValues.type ?? ""}
            className={cn(
              inputCls(!!state?.errors?.type),
              "cursor-pointer bg-bg-card",
            )}
          >
            <option value="" disabled>
              Select…
            </option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Location + Salary */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location" error={state?.errors?.location?.[0]}>
          <input
            name="location"
            type="text"
            required
            defaultValue={defaultValues.location}
            placeholder="e.g. Remote · Worldwide"
            className={inputCls(!!state?.errors?.location)}
          />
        </Field>

        <Field label="Salary Range" error={state?.errors?.salary?.[0]}>
          <input
            name="salary"
            type="text"
            required
            defaultValue={defaultValues.salary}
            placeholder="e.g. $80k – $120k"
            className={inputCls(!!state?.errors?.salary)}
          />
        </Field>
      </div>

      {/* Description */}
      <Field label="Job Description" error={state?.errors?.description?.[0]}>
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={defaultValues.description}
          placeholder="Describe the role, responsibilities, and what success looks like…"
          className={cn(inputCls(!!state?.errors?.description), "resize-none")}
        />
      </Field>

      {/* Requirements */}
      <Field
        label="Requirements"
        hint="One per line"
        error={state?.errors?.requirements?.[0]}
      >
        <textarea
          name="requirements"
          rows={5}
          required
          defaultValue={defaultValues.requirements?.join("\n")}
          placeholder={
            "5+ years React experience\nStrong TypeScript skills\nExperience with Node.js"
          }
          className={cn(
            inputCls(!!state?.errors?.requirements),
            "resize-none font-mono text-xs",
          )}
        />
      </Field>

      {/* Nice to have */}
      <Field label="Nice to Have" hint="One per line · Optional">
        <textarea
          name="niceToHave"
          rows={3}
          defaultValue={defaultValues.niceToHave?.join("\n")}
          placeholder={"Experience with AWS\nOpen-source contributions"}
          className={cn(inputCls(false), "resize-none font-mono text-xs")}
        />
      </Field>

      {/* Published toggle */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          name="published"
          type="checkbox"
          defaultChecked={defaultValues.published}
          className="h-4 w-4 accent-cyan"
        />
        <span className="text-sm text-white/80">
          Publish immediately (visible on the careers page)
        </span>
      </label>

      {state?.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-bg-primary shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {submitLabel}
        </button>
        <a
          href="/admin/jobs"
          className="flex cursor-pointer items-center rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-white/20 hover:text-white"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white/80">{label}</label>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean): string {
  return cn(
    "w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/25",
    "bg-bg-card/60 outline-none transition-colors",
    "focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20",
    hasError ? "border-red-500/40" : "border-white/10 hover:border-white/20",
  );
}
