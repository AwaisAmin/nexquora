"use client";
import { useTransition } from "react";
import { deleteService, toggleServicePublished } from "@/app/actions/services";
import { Pencil, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export function ServiceRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [togglePending, startToggle] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() =>
          startToggle(() => toggleServicePublished(id, !published))
        }
        disabled={togglePending}
        title={published ? "Unpublish" : "Publish"}
        className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-cyan/10 hover:text-cyan disabled:opacity-50"
      >
        {published ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>

      <Link
        href={`/admin/services/${id}`}
        className="rounded p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
        title="Edit"
      >
        <Pencil size={15} />
      </Link>

      <DeleteButton label="this service" onDelete={() => deleteService(id)} />
    </div>
  );
}
