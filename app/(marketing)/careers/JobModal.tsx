"use client";

import { useState, useTransition } from "react";
import { DEPT_ACCENT } from "@/lib/constants";
import { applyForJob } from "@/app/actions/apply";
import JobDetails from "@/components/careers/JobDetails";
import ApplyForm from "@/components/careers/ApplyForm";
import SuccessView from "@/components/careers/SuccessView";
import type { Job } from "@/lib/types";

type ModalView = "details" | "apply" | "success";

export default function JobModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [view, setView] = useState<ModalView>("details");
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

  if (view === "success")
    return <SuccessView accent={accent} onClose={onClose} />;

  if (view === "apply")
    return (
      <ApplyForm
        job={job}
        accent={accent}
        pending={pending}
        error={error}
        onSubmit={handleSubmit}
        onBack={() => setView("details")}
      />
    );

  return (
    <JobDetails
      job={job}
      accent={accent}
      onClose={onClose}
      onApply={() => setView("apply")}
    />
  );
}
