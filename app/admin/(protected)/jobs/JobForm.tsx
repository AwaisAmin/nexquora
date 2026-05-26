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
    <form action={formAction} className="space-y-5">
      <Input
        name="title"
        type="text"
        label="Job Title"
        required
        defaultValue={defaultValues.title}
        placeholder="e.g. Senior Full-Stack Engineer"
        error={state?.errors?.title?.[0]}
      />

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

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
        rows={5}
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
        rows={3}
        defaultValue={defaultValues.niceToHave?.join("\n")}
        placeholder={"Experience with AWS\nOpen-source contributions"}
        className="font-mono text-xs"
      />

      <Checkbox
        name="published"
        label="Publish immediately"
        hint="Visible on the careers page"
        defaultChecked={defaultValues.published}
      />

      {state?.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
        <Button href="/admin/jobs" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
