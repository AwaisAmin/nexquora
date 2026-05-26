"use client";
import { useActionState } from "react";
import type { ServiceFormState } from "@/app/actions/services";
import { Input, Textarea, Select, Checkbox, Button } from "@/components/ui";
import { SERVICE_ICON_OPTIONS } from "@/lib/data/services";

interface DefaultValues {
  slug?: string;
  title?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  icon?: string;
  accentHex?: string;
  features?: string[];
  tools?: string[];
  faqRaw?: string;
  caseStudyTeaser?: string;
  published?: boolean;
  order?: number;
}

interface ServiceFormProps {
  action: (
    prev: ServiceFormState,
    formData: FormData,
  ) => Promise<ServiceFormState>;
  defaultValues?: DefaultValues;
  submitLabel: string;
}

export default function ServiceForm({
  action,
  defaultValues = {},
  submitLabel,
}: ServiceFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

        {/* ── Left: primary content ───────────────────────────────────────── */}
        <div className="space-y-5 rounded-xl border border-white/8 bg-bg-card p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="title"
              type="text"
              label="Title"
              required
              defaultValue={defaultValues.title}
              placeholder="e.g. AI & Machine Learning"
              error={state?.errors?.title?.[0]}
            />
            <Input
              name="slug"
              type="text"
              label="URL Slug"
              hint="Lowercase, hyphens only"
              required
              defaultValue={defaultValues.slug}
              placeholder="e.g. ai"
              error={state?.errors?.slug?.[0]}
            />
          </div>

          <Input
            name="tagline"
            type="text"
            label="Tagline"
            required
            defaultValue={defaultValues.tagline}
            placeholder="e.g. Intelligent systems that learn and scale"
            error={state?.errors?.tagline?.[0]}
          />

          <Textarea
            name="description"
            label="Short Description"
            hint="Shown on service cards"
            rows={3}
            required
            defaultValue={defaultValues.description}
            placeholder="One-paragraph summary shown on service cards and SEO…"
            error={state?.errors?.description?.[0]}
          />

          <Textarea
            name="longDescription"
            label="Long Description"
            hint="Shown on the detail page hero"
            rows={4}
            required
            defaultValue={defaultValues.longDescription}
            placeholder="Expanded paragraph for the service detail page…"
            error={state?.errors?.longDescription?.[0]}
          />

          <Textarea
            name="features"
            label="Features"
            hint="One per line"
            rows={6}
            required
            defaultValue={defaultValues.features?.join("\n")}
            placeholder={
              "LLM integration & fine-tuning\nRAG systems\nAI automation pipelines"
            }
            error={state?.errors?.features?.[0]}
            className="font-mono text-xs"
          />

          <Textarea
            name="tools"
            label="Tools & Tech"
            hint="One per line"
            rows={4}
            required
            defaultValue={defaultValues.tools?.join("\n")}
            placeholder={"OpenAI\nLangChain\nPython"}
            error={state?.errors?.tools?.[0]}
            className="font-mono text-xs"
          />

          <Textarea
            name="faqRaw"
            label="FAQ"
            hint="Format: Q: question\nA: answer — separate pairs with a blank line"
            rows={8}
            defaultValue={defaultValues.faqRaw}
            placeholder={
              "Q: How long does it take?\nA: Typically 6–12 weeks.\n\nQ: Do you sign an NDA?\nA: Yes, before any data sharing."
            }
            className="font-mono text-xs"
          />
        </div>

        {/* ── Right: metadata sidebar ─────────────────────────────────────── */}
        <div className="space-y-5 rounded-xl border border-white/8 bg-bg-card p-5">
          <Select
            name="icon"
            label="Icon"
            required
            defaultValue={defaultValues.icon ?? ""}
            error={state?.errors?.icon?.[0]}
          >
            <option value="" disabled>
              Select an icon…
            </option>
            {SERVICE_ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </Select>

          <Input
            name="accentHex"
            type="text"
            label="Accent Color"
            hint="Hex e.g. #00F5FF"
            required
            defaultValue={defaultValues.accentHex}
            placeholder="#00F5FF"
            error={state?.errors?.accentHex?.[0]}
          />

          <Input
            name="caseStudyTeaser"
            type="text"
            label="Case Study Teaser"
            hint="Optional one-liner for CTA card"
            defaultValue={defaultValues.caseStudyTeaser}
            placeholder="Built a platform that reduced costs by 40%."
          />

          <Input
            name="order"
            type="number"
            label="Display Order"
            hint="Lower = appears first"
            defaultValue={String(defaultValues.order ?? 0)}
            placeholder="0"
          />

          <Checkbox
            name="published"
            label="Publish immediately"
            hint="Visible on the public services pages"
            defaultChecked={defaultValues.published}
          />

          {state?.message && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}

          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" loading={pending} className="w-full justify-center">
              {submitLabel}
            </Button>
            <Button href="/admin/services" variant="outline" className="w-full justify-center">
              Cancel
            </Button>
          </div>
        </div>

      </div>
    </form>
  );
}