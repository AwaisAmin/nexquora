"use client";
import { useTransition } from "react";
import { markApplicationRead, deleteApplication } from "@/app/actions/admin";
import { Eye, Trash2 } from "lucide-react";

export function MarkReadBtn({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => start(() => markApplicationRead(id))}
      disabled={pending}
      title="Mark as read"
      className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-cyan/10 hover:text-cyan disabled:opacity-50"
    >
      <Eye size={15} />
    </button>
  );
}

export function DeleteApplicationBtn({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => {
        if (confirm("Delete this application?"))
          start(() => deleteApplication(id));
      }}
      disabled={pending}
      title="Delete"
      className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 size={15} />
    </button>
  );
}
