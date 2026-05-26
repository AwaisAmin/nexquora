"use client";
import { useTransition } from "react";
import { markApplicationRead, deleteApplication } from "@/app/actions/admin";
import { Eye } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

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
  return (
    <DeleteButton
      label="this application"
      onDelete={() => deleteApplication(id)}
    />
  );
}
