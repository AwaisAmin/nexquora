import { X, MapPin, DollarSign, Briefcase, ArrowRight, Check } from "lucide-react";
import type { Job } from "@/lib/types";

interface JobDetailsProps {
  job: Job;
  accent: string;
  onClose: () => void;
  onApply: () => void;
}

export default function JobDetails({
  job,
  accent,
  onClose,
  onApply,
}: JobDetailsProps) {
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span
              className="rounded-md px-2 py-0.5 text-xs font-semibold"
              style={{ background: `${accent}18`, color: accent }}
            >
              {job.department}
            </span>
            <span className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted">
              {job.type}
            </span>
          </div>
          <h2 className="font-syne text-2xl font-bold text-white">
            {job.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/8 text-muted transition-colors hover:border-white/20 hover:text-white"
          aria-label="Close"
        >
          <X size={16} aria-hidden />
        </button>
      </div>

      {/* Meta strip */}
      <div className="mb-6 flex flex-wrap gap-4 rounded-lg border border-white/8 bg-bg-card/50 px-4 py-3 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} aria-hidden /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign size={12} aria-hidden /> {job.salary}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={12} aria-hidden /> {job.department}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted">{job.description}</p>

      {/* Requirements */}
      <div className="mt-6">
        <h3 className="mb-3 font-syne text-sm font-bold text-white">
          Requirements
        </h3>
        <ul className="flex flex-col gap-2.5" role="list">
          {job.requirements.map((req) => (
            <li key={req} className="flex items-start gap-2.5 text-sm text-muted">
              <Check
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: accent }}
                aria-hidden
              />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Nice to have */}
      {job.niceToHave && job.niceToHave.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 font-syne text-sm font-bold text-white">
            Nice to have
          </h3>
          <ul className="flex flex-col gap-2.5" role="list">
            {job.niceToHave.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-muted/70"
              >
                <Check
                  size={14}
                  className="mt-0.5 shrink-0 opacity-50"
                  style={{ color: accent }}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3 border-t border-white/6 pt-6">
        <button
          type="button"
          onClick={onApply}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-bg-primary transition-all hover:brightness-110"
          style={{ background: accent, boxShadow: `0 0 20px ${accent}40` }}
        >
          Apply for this role <ArrowRight size={14} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-white/8 py-3 text-sm text-muted transition-colors hover:border-white/15 hover:text-white"
        >
          Close
        </button>
      </div>
    </>
  );
}