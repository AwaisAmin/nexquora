"use client";
import { useTransition } from "react";
import { markContactRead, deleteContact } from "@/app/actions/admin";
import { Eye } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import ReplyContactBtn from "./ReplyContactBtn";

export function MarkReadBtn({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => start(() => markContactRead(id))}
      disabled={pending}
      title="Mark as read"
      className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-cyan/10 hover:text-cyan disabled:opacity-50"
    >
      <Eye size={15} />
    </button>
  );
}

export function DeleteContactBtn({ id }: { id: string }) {
  return (
    <DeleteButton label="this contact" onDelete={() => deleteContact(id)} />
  );
}

export { ReplyContactBtn };
