"use client";
import { useTransition } from "react";
import { deleteJob, toggleJobPublished } from "@/app/actions/jobs";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export function JobRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [delPending, startDel] = useTransition();
  const [togglePending, startToggle] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => startToggle(() => toggleJobPublished(id, !published))}
        disabled={togglePending}
        title={published ? "Unpublish" : "Publish"}
        className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-cyan/10 hover:text-cyan disabled:opacity-50"
      >
        {published ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>

      <Link
        href={`/admin/jobs/${id}`}
        className="rounded p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
        title="Edit"
      >
        <Pencil size={15} />
      </Link>

      <button
        onClick={() => {
          if (confirm("Delete this job posting?"))
            startDel(() => deleteJob(id));
        }}
        disabled={delPending}
        title="Delete"
        className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
