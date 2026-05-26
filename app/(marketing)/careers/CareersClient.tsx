"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  DollarSign,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { DEPT_ACCENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { applyForJob } from "@/app/actions/apply";
import type { Job, Department } from "@/lib/types";

type TabValue = "All" | Department;

const TABS: TabValue[] = ["All", "AI", "Web", "Mobile", "DevOps", "Finance"];

// ── Modal content ─────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-white/10 bg-bg-card px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 hover:border-white/20";

function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [view, setView] = useState<"details" | "apply" | "success">("details");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const accent = DEPT_ACCENT[job.department] ?? "#00F5FF";

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await applyForJob(fd);
      if (res.success) setView("success");
      else setError(res.message ?? "Something went wrong.");
    });
  }

  /* ── Success ── */
  if (view === "success")
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: `${accent}18` }}
        >
          <Check size={26} style={{ color: accent }} />
        </span>
        <h2 className="font-syne text-xl font-bold text-white">
          Application sent!
        </h2>
        <p className="max-w-xs text-sm text-muted">
          We&apos;ll review your application and get back to you soon.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 cursor-pointer rounded-lg border border-white/8 px-6 py-2.5 text-sm text-muted transition-colors hover:border-white/15 hover:text-white"
        >
          Close
        </button>
      </div>
    );

  /* ── Apply form ── */
  if (view === "apply")
    return (
      <>
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("details")}
            className="cursor-pointer rounded p-1 text-muted transition-colors hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-syne text-xl font-bold text-white">
            Apply — {job.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="jobId" value={job.id} />
          <input type="hidden" name="jobTitle" value={job.title} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/80">
                Full name <span className="text-cyan">*</span>
              </label>
              <input
                name="name"
                required
                placeholder="Jane Smith"
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/80">
                Email <span className="text-cyan">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/80">
              Cover note <span className="text-cyan">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us why you're a great fit…"
              className={cn(inputCls, "resize-none")}
            />
          </div>

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
            <button
              type="button"
              onClick={() => setView("details")}
              className="cursor-pointer rounded-lg border border-white/8 px-5 text-sm text-muted transition-colors hover:border-white/15 hover:text-white"
            >
              Back
            </button>
          </div>
        </form>
      </>
    );

  /* ── Job details ── */
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
            <li
              key={req}
              className="flex items-start gap-2.5 text-sm text-muted"
            >
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

      {/* Footer CTAs */}
      <div className="mt-8 flex flex-col gap-3 border-t border-white/6 pt-6">
        <button
          type="button"
          onClick={() => setView("apply")}
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

// ── Main client component ─────────────────────────────────────────────────────

export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered =
    activeTab === "All" ? jobs : jobs.filter((j) => j.department === activeTab);

  function tabCount(tab: TabValue): number {
    return tab === "All"
      ? jobs.length
      : jobs.filter((j) => j.department === tab).length;
  }

  const closeModal = useCallback(() => setSelectedJob(null), []);

  // Keyboard + scroll lock when modal is open
  useEffect(() => {
    if (!selectedJob) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedJob, closeModal]);

  return (
    <>
      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by department"
      >
        {TABS.map((tab) => {
          const accent =
            tab === "All" ? "#00F5FF" : DEPT_ACCENT[tab as Department];
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                isActive ? "text-white" : "text-muted hover:text-white",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `${accent}18`,
                    border: `1px solid ${accent}30`,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className="relative">{tab}</span>
              <span
                className="relative rounded-full px-1.5 py-0.5 text-xs font-bold"
                style={
                  isActive
                    ? { background: `${accent}20`, color: accent }
                    : { opacity: 0.45 }
                }
              >
                {tabCount(tab)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Job grid ──────────────────────────────────────────────────────── */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((job) => {
            const accent = DEPT_ACCENT[job.department];
            return (
              <motion.article
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="glass-card group flex cursor-pointer flex-col gap-4 p-6 transition-all hover:-translate-y-0.5"
                onClick={() => setSelectedJob(job)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedJob(job)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${job.title}`}
              >
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
                  <h3 className="font-syne text-lg font-bold text-white transition-colors group-hover:text-cyan">
                    {job.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} aria-hidden /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} aria-hidden /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} aria-hidden /> {job.department}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {job.description}
                </p>

                <span
                  className="mt-auto flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                  style={{ color: accent }}
                >
                  View role <ArrowRight size={14} aria-hidden />
                </span>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Apply modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            style={{
              background: "rgba(5, 8, 16, 0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={closeModal}
            aria-label="Close modal"
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal
              aria-label={selectedJob.title}
            >
              <JobModal job={selectedJob} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
