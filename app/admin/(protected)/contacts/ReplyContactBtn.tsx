"use client";
import { useState, useTransition } from "react";
import { replyToContact } from "@/app/actions/admin";
import { Reply, Send, X } from "lucide-react";

export default function ReplyContactBtn({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  function handleSend() {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setError("");
    start(async () => {
      try {
        await replyToContact(id, message.trim());
        setSent(true);
        setOpen(false);
        setMessage("");
      } catch {
        setError("Failed to send reply. Please try again.");
      }
    });
  }

  if (sent) {
    return (
      <span className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-emerald-400">
        Replied
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        title="Reply"
        className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-indigo-500/10 hover:text-indigo-400 disabled:opacity-50"
      >
        <Reply size={15} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-1 w-80 rounded-xl border border-white/10 bg-bg-card p-4 shadow-xl"
          style={{ top: "100%" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              Reply to contact
            </span>
            <button
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              className="cursor-pointer text-muted transition-colors hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your reply…"
            rows={5}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-muted focus:border-cyan/40 focus:outline-none"
          />

          {error && <p className="mt-1 text-xs text-red-400">{error}</p>}

          <button
            onClick={handleSend}
            disabled={pending}
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={13} />
            {pending ? "Sending…" : "Send reply"}
          </button>
        </div>
      )}
    </>
  );
}
