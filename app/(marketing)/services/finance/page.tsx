import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react'
import ServiceIcon from '@/components/icons/ServiceIcon'
import Accordion from '@/components/ui/Accordion'
import FinanceTabs from './FinanceTabs'
import { getServicesBySlug, SERVICES, BOOKKEEPING_PLANS } from '@/lib/data/services'
import { ROUTES } from '@/lib/routes'
import { BRAND } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Finance & Operations — ${BRAND.name}`,
  description:
    'Fintech engineering and bookkeeping services — payment systems, compliance automation, payroll, and clean books for growing companies.',
}

const TRUST_SIGNALS = [
  { icon: Shield,       label: 'PCI DSS compliant approach' },
  { icon: CheckCircle,  label: 'Catch-up bookkeeping in weeks' },
  { icon: Clock,        label: 'Live in 3 business days' },
]

export default function FinancePage() {
  const services = getServicesBySlug('finance')
  const fintech     = services.find((s) => s.id === 'fintech')!
  const bookkeeping = services.find((s) => s.id === 'bookkeeping')!

  // Combined FAQ
  const allFaq = [...fintech.faq, ...bookkeeping.faq]

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFB800, transparent)' }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Dual icons */}
          <div className="mb-6 flex items-center justify-center gap-3" aria-hidden>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: '#FFB80018' }}>
              <ServiceIcon name="CreditCard" size={24} strokeWidth={1.6} style={{ color: '#FFB800' }} />
            </span>
            <span className="h-px w-6 bg-white/15" />
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: '#F59E0B18' }}>
              <ServiceIcon name="BookOpen" size={24} strokeWidth={1.6} style={{ color: '#F59E0B' }} />
            </span>
          </div>

          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Finance &amp; Operations
          </p>

          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Financial infrastructure that{' '}
            <span className="gradient-text-gold">scales with you</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            From payment systems and compliance automation to clean books and accurate payroll —
            we handle the financial layer so you can focus on the product.
          </p>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-xs text-muted">
                <Icon size={13} className="text-gold" aria-hidden /> {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.contact}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-7 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(255,184,0,0.3)] transition-all hover:brightness-110"
            >
              Start a project <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={ROUTES.services.root}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-7 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
            >
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tab panel: Fintech / Bookkeeping ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FinanceTabs services={services} />
          </div>

          {/* Sticky CTA */}
          <div className="lg:col-span-2">
            <div className="glass-card sticky top-24 p-8">
              <h3 className="font-syne text-lg font-bold text-white">Ready to get started?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tell us about your project — we&apos;ll respond within 24 hours with a clear proposal.
              </p>

              <blockquote className="mt-5 border-l-2 border-gold pl-4 text-sm italic text-muted/80">
                {fintech.caseStudyTeaser}
              </blockquote>

              <blockquote className="mt-3 border-l-2 border-amber pl-4 text-sm italic text-muted/80">
                {bookkeeping.caseStudyTeaser}
              </blockquote>

              <Link
                href={ROUTES.contact}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-semibold text-bg-primary shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all hover:brightness-110"
              >
                Start the conversation <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bookkeeping pricing ───────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Bookkeeping &amp; Payroll
            </p>
            <h2 className="mt-3 font-syne text-3xl font-bold text-white">
              Simple, transparent <span className="gradient-text-gold">pricing</span>
            </h2>
            <p className="mt-3 text-sm text-muted">
              All plans include a dedicated bookkeeper, monthly reports, and no hidden fees.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {BOOKKEEPING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'glass-card relative flex flex-col gap-6 p-8',
                  plan.highlighted && 'border-gold/30 shadow-[0_0_40px_rgba(255,184,0,0.08)]',
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-bg-primary">
                    Most popular
                  </span>
                )}

                <div>
                  <p className="font-syne text-sm font-bold text-white">{plan.name}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-syne text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-muted">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{plan.description}</p>
                </div>

                <ul className="flex flex-col gap-2.5" role="list">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: plan.highlighted ? '#FFB800' : '#F59E0B' }}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`${ROUTES.contact}?service=bookkeeping&plan=${encodeURIComponent(plan.name)}`}
                  className={cn(
                    'mt-auto flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-gold text-bg-primary shadow-[0_0_16px_rgba(255,184,0,0.3)] hover:brightness-110'
                      : 'border border-white/10 text-muted hover:border-white/20 hover:text-white',
                  )}
                >
                  Get started <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Need catch-up bookkeeping? We quote it as a one-time fee added to your first month.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-2 font-syne text-2xl font-bold text-white">Common questions</h2>
          <p className="mb-10 text-sm text-muted">Everything you need to know before we start.</p>

          <Accordion items={allFaq} accentHex="#FFB800" />

          <div className="mt-12 rounded-xl border border-white/8 bg-bg-card/50 p-6 text-center">
            <p className="text-sm text-muted">Still have questions?</p>
            <Link
              href={ROUTES.contact}
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg border border-gold px-5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              Ask us directly <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Other services ────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted">
            Other services
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SERVICES.filter((s) => s.slug !== 'finance').map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex items-center gap-2.5 rounded-xl border border-white/6 bg-bg-card/50 p-4 transition-all hover:border-white/12 hover:bg-bg-card"
              >
                <ServiceIcon
                  name={service.icon}
                  size={14}
                  style={{ color: service.accentHex }}
                  aria-hidden
                />
                <span className="text-sm text-muted transition-colors group-hover:text-white">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
