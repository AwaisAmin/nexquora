"use client";

import { useState, useTransition } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({
  onDelete,
  label = "this item",
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await onDelete();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !pending && setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              className="relative w-full max-w-sm rounded-xl border border-white/10 bg-bg-card p-6 shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                  <AlertTriangle size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Delete {label}?
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                  disabled={pending}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  loading={pending}
                  onClick={handleConfirm}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
