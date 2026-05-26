import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateJob } from "@/app/actions/jobs";
import JobForm from "../JobForm";

export const metadata = { title: "Edit Job — Nexquora Admin" };

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await db.job.findUnique({ where: { id } });
  if (!job) notFound();

  const action = updateJob.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">Edit Job</h1>
        <p className="mt-1 text-sm text-muted">{job.title}</p>
      </div>

      <JobForm
        action={action}
        defaultValues={{
          title: job.title,
          department: job.department,
          type: job.type,
          location: job.location,
          salary: job.salary,
          description: job.description,
          requirements: job.requirements,
          niceToHave: job.niceToHave,
          published: job.published,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}