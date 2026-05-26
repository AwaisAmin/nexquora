"use client";

import { ArrowLeft } from "lucide-react";
import { Input, Textarea, Button } from "@/components/ui";
import type { Job } from "@/lib/types";

interface ApplyFormProps {
  job: Job;
  accent: string;
  pending: boolean;
  error: string | null;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export default function ApplyForm({
  job,
  accent,
  pending,
  error,
  onSubmit,
  onBack,
}: ApplyFormProps) {
  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded p-1 text-muted transition-colors hover:text-white"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-syne text-xl font-bold text-white">
          Apply — {job.title}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="jobId" value={job.id} />
        <input type="hidden" name="jobTitle" value={job.title} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            label="Full name"
            required
            placeholder="Jane Smith"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            required
            placeholder="jane@example.com"
          />
        </div>

        <Textarea
          name="message"
          label="Cover note"
          required
          rows={4}
          placeholder="Tell us why you're a great fit…"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex gap-3 border-t border-white/6 pt-4">
          <button
            type="submit"
            disabled={pending}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-bg-primary transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: accent, boxShadow: `0 0 20px ${accent}40` }}
          >
            {pending ? "Submitting…" : "Submit application"}
          </button>
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
        </div>
      </form>
    </>
  );
}
