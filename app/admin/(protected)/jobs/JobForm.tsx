"use client";
import { useActionState } from "react";
import type { JobFormState } from "@/app/actions/jobs";
import { Input, Textarea, Select, Checkbox, Button } from "@/components/ui";
import { JOB_DEPARTMENTS, JOB_TYPES, SALARY_RANGES } from "@/lib/data/jobs";

interface DefaultValues {
  title?: string;
  department?: string;
  type?: string;
  location?: string;
  salary?: string;
  description?: string;
  requirements?: string[];
  niceToHave?: string[];
  published?: boolean;
}

interface JobFormProps {
  action: (prev: JobFormState, formData: FormData) => Promise<JobFormState>;
  defaultValues?: DefaultValues;
  submitLabel: string;
}

export default function JobForm({
  action,
  defaultValues = {},
  submitLabel,
}: JobFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

        {/* ── Left: primary content ───────────────────────────────────────── */}
        <div className="space-y-5 rounded-xl border border-white/8 bg-bg-card p-6">
          <Input
            name="title"
            type="text"
            label="Job Title"
            required
            defaultValue={defaultValues.title}
            placeholder="e.g. Senior Full-Stack Engineer"
            error={state?.errors?.title?.[0]}
          />

          <Textarea
            name="description"
            label="Job Description"
            rows={5}
            required
            defaultValue={defaultValues.description}
            placeholder="Describe the role, responsibilities, and what success looks like…"
            error={state?.errors?.description?.[0]}
          />

          <Textarea
            name="requirements"
            label="Requirements"
            hint="One per line"
            rows={6}
            required
            defaultValue={defaultValues.requirements?.join("\n")}
            placeholder={
              "5+ years React experience\nStrong TypeScript skills\nExperience with Node.js"
            }
            error={state?.errors?.requirements?.[0]}
            className="font-mono text-xs"
          />

          <Textarea
            name="niceToHave"
            label="Nice to Have"
            hint="One per line · Optional"
            rows={4}
            defaultValue={defaultValues.niceToHave?.join("\n")}
            placeholder={"Experience with AWS\nOpen-source contributions"}
            className="font-mono text-xs"
          />
        </div>

        {/* ── Right: metadata sidebar ─────────────────────────────────────── */}
        <div className="space-y-5 rounded-xl border border-white/8 bg-bg-card p-5">
          <Select
            name="department"
            label="Department"
            required
            defaultValue={defaultValues.department ?? ""}
            error={state?.errors?.department?.[0]}
          >
            <option value="" disabled>
              Select…
            </option>
            {JOB_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>

          <Select
            name="type"
            label="Employment Type"
            required
            defaultValue={defaultValues.type ?? ""}
            error={state?.errors?.type?.[0]}
          >
            <option value="" disabled>
              Select…
            </option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>

          <Input
            name="location"
            type="text"
            label="Location"
            required
            defaultValue={defaultValues.location}
            placeholder="e.g. Remote · Worldwide"
            error={state?.errors?.location?.[0]}
          />

          <Select
            name="salary"
            label="Salary Range"
            required
            defaultValue={defaultValues.salary ?? ""}
            error={state?.errors?.salary?.[0]}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {SALARY_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>

          <Checkbox
            name="published"
            label="Publish immediately"
            hint="Visible on the careers page"
            defaultChecked={defaultValues.published}
          />

          {state?.message && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}

          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" loading={pending} className="w-full justify-center">
              {submitLabel}
            </Button>
            <Button href="/admin/jobs" variant="outline" className="w-full justify-center">
              Cancel
            </Button>
          </div>
        </div>

      </div>
    </form>
  );
}