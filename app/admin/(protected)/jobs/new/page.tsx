import { createJob } from "@/app/actions/jobs";
import JobForm from "../JobForm";

export const metadata = { title: "New Job — Nexquora Admin" };

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">New Job</h1>
        <p className="mt-1 text-sm text-muted">
          Create a new job posting for the careers page
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card p-6">
        <JobForm action={createJob} submitLabel="Create Job" />
      </div>
    </div>
  );
}
