"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import { DEPT_ACCENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import JobModal from "./JobModal";
import type { Job, Department } from "@/lib/types";

type TabValue = "All" | Department;

const TABS: TabValue[] = ["All", "AI", "Web", "Mobile", "DevOps", "Finance"];

// ── Job card ──────────────────────────────────────────────────────────────────

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  const accent = DEPT_ACCENT[job.department] ?? "#00F5FF";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="glass-card group flex cursor-pointer flex-col gap-4 p-6 transition-all hover:-translate-y-0.5"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
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
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered =
    activeTab === "All" ? jobs : jobs.filter((j) => j.department === activeTab);

  function tabCount(tab: TabValue) {
    return tab === "All"
      ? jobs.length
      : jobs.filter((j) => j.department === tab).length;
  }

  const closeModal = useCallback(() => setSelectedJob(null), []);

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
      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by department"
      >
        {TABS.map((tab) => {
          const accent =
            tab === "All"
              ? "#00F5FF"
              : (DEPT_ACCENT[tab as Department] ?? "#00F5FF");
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

      {/* Grid */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => setSelectedJob(job)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
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