'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { contactSchema } from '@/lib/schemas/contact'
import { CONTACT_SERVICES, BUDGET_RANGES } from '@/lib/data/contact'
import { cn } from '@/lib/utils'
import type { ContactFormData } from '@/lib/schemas/contact'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type FieldErrors = Partial<Record<keyof ContactFormData, string[]>>

interface ContactFormProps {
  prefillService?: string
  prefillRole?: string
}

export default function ContactForm({ prefillService = '', prefillRole = '' }: ContactFormProps) {
  const [state, setState]           = useState<FormState>('idle')
  const [errors, setErrors]         = useState<FieldErrors>({})
  const [serverError, setServerError] = useState('')

  function clearError(field: keyof ContactFormData) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const raw = {
      name:    fd.get('name') as string,
      email:   fd.get('email') as string,
      company: (fd.get('company') as string) || undefined,
      service: fd.get('service') as string,
      budget:  (fd.get('budget') as string) || undefined,
      role:    prefillRole || undefined,
      message: fd.get('message') as string,
    }

    const result = contactSchema.safeParse(raw)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setErrors({})
    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(result.data),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setServerError((data as { error?: string }).error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      setState('success')
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'success' ? (
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
            transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 20 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan/10"
          >
            <CheckCircle size={40} className="text-cyan" aria-hidden />
          </motion.div>

          <div>
            <h3 className="font-syne text-2xl font-bold text-white">Message sent!</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Thanks for reaching out. We&apos;ll review your project and get back to you within 24 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => { setState('idle'); setErrors({}); setServerError('') }}
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
            <Field label="Name" error={errors.name?.[0]}>
              <input
                name="name"
                type="text"
                placeholder="Alex Johnson"
                required
                autoComplete="name"
                onChange={() => clearError('name')}
                className={inputCls(!!errors.name)}
              />
            </Field>
            <Field label="Email" error={errors.email?.[0]}>
              <input
                name="email"
                type="email"
                placeholder="alex@company.com"
                required
                autoComplete="email"
                onChange={() => clearError('email')}
                className={inputCls(!!errors.email)}
              />
            </Field>
          </div>

          {/* Company + Service */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company" hint="Optional" error={errors.company?.[0]}>
              <input
                name="company"
                type="text"
                placeholder="Acme Inc."
                autoComplete="organization"
                onChange={() => clearError('company')}
                className={inputCls(!!errors.company)}
              />
            </Field>
            <Field label="Service" error={errors.service?.[0]}>
              <select
                name="service"
                required
                defaultValue={prefillService}
                onChange={() => clearError('service')}
                className={cn(inputCls(!!errors.service), 'cursor-pointer bg-bg-card')}
              >
                <option value="" disabled>Select a service…</option>
                {CONTACT_SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Budget */}
          <Field label="Budget range" hint="Optional">
            <select
              name="budget"
              defaultValue=""
              className={cn(inputCls(false), 'cursor-pointer bg-bg-card')}
            >
              <option value="">Not decided yet</option>
              {BUDGET_RANGES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>

          {/* Message */}
          <Field label="Tell us about your project" error={errors.message?.[0]}>
            <textarea
              name="message"
              rows={5}
              placeholder="Describe what you&apos;re building, your goals, and timeline…"
              required
              onChange={() => clearError('message')}
              className={cn(inputCls(!!errors.message), 'resize-none')}
            />
          </Field>

          {/* Role hint (careers apply flow) */}
          {prefillRole && (
            <p className="rounded-lg border border-cyan/20 bg-cyan/5 px-4 py-2.5 text-xs text-cyan">
              Applying for: <span className="font-semibold">{prefillRole}</span>
            </p>
          )}

          {/* Server error */}
          {state === 'error' && serverError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
              <p className="text-sm text-red-400">{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan py-3.5 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Send message <ArrowRight size={16} aria-hidden />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted">
            We respond within 24 hours · NDA available on request
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white/80">{label}</label>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean): string {
  return cn(
    'w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30',
    'bg-bg-card/50 outline-none transition-colors',
    'focus:border-cyan/50 focus:bg-bg-card focus:ring-1 focus:ring-cyan/20',
    hasError ? 'border-red-500/40' : 'border-white/8 hover:border-white/15',
  )
}
