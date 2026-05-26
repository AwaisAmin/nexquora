"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { contactSchema } from "@/lib/schemas/contact";
import { CONTACT_SERVICES, BUDGET_RANGES } from "@/lib/data/contact";
import { Input, Textarea, Select, Button } from "@/components/ui";
import type { ContactFormData } from "@/lib/schemas/contact";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFormData, string[]>>;

interface ContactFormProps {
  prefillService?: string;
}

export default function ContactForm({
  prefillService = "",
}: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function clearError(field: keyof ContactFormData) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const raw = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: (fd.get("company") as string) || undefined,
      service: fd.get("service") as string,
      budget: (fd.get("budget") as string) || undefined,
      role: undefined,
      message: fd.get("message") as string,
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormData;
        if (key)
          fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(
          (data as { error?: string }).error ??
            "Something went wrong. Please try again.",
        );
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
      setState("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-6 py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan/10"
          >
            <CheckCircle size={40} className="text-cyan" aria-hidden />
          </motion.div>

          <div>
            <h3 className="font-syne text-2xl font-bold text-white">
              Message sent!
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Thanks for reaching out. We&apos;ll review your project and get
              back to you within 24 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setState("idle");
              setErrors({});
              setServerError("");
            }}
            className="cursor-pointer text-sm text-muted underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={false}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="name"
              type="text"
              label="Name"
              placeholder="Alex Johnson"
              required
              autoComplete="name"
              error={errors.name?.[0]}
              onChange={() => clearError("name")}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="alex@company.com"
              required
              autoComplete="email"
              error={errors.email?.[0]}
              onChange={() => clearError("email")}
            />
          </div>

          {/* Company + Service */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="company"
              type="text"
              label="Company"
              hint="Optional"
              placeholder="Acme Inc."
              autoComplete="organization"
              error={errors.company?.[0]}
              onChange={() => clearError("company")}
            />
            <Select
              name="service"
              label="Service"
              required
              defaultValue={prefillService}
              error={errors.service?.[0]}
              onChange={() => clearError("service")}
            >
              <option value="" disabled>
                Select a service…
              </option>
              {CONTACT_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>

          {/* Budget */}
          <Select
            name="budget"
            label="Budget range"
            hint="Optional"
            defaultValue=""
          >
            <option value="">Not decided yet</option>
            {BUDGET_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>

          {/* Message */}
          <Textarea
            name="message"
            label="Tell us about your project"
            rows={5}
            placeholder="Describe what you're building, your goals, and timeline…"
            required
            error={errors.message?.[0]}
            onChange={() => clearError("message")}
          />

          {/* Server error */}
          {state === "error" && serverError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-red-400"
                aria-hidden
              />
              <p className="text-sm text-red-400">{serverError}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            loading={state === "submitting"}
            className="w-full"
          >
            Send message <ArrowRight size={16} aria-hidden />
          </Button>

          <p className="text-center text-xs text-muted">
            We respond within 24 hours · NDA available on request
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
