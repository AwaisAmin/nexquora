import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { SERVICES, getServicesBySlug } from '@/lib/data/services'
import { ROUTES } from '@/lib/routes'
import { BRAND } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ── Static params — pre-render all known service slugs ────────────────────────
export function generateStaticParams() {
  const slugs = [...new Set(SERVICES.map((s) => s.slug))]
  return slugs.map((slug) => ({ slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const services = getServicesBySlug(slug)
  if (services.length === 0) return {}
  const primary = services[0]
  return {
    title: `${primary.title} — ${BRAND.name}`,
    description: primary.description,
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const services = getServicesBySlug(slug)
  if (services.length === 0) notFound()

  // Finance slug returns two services (fintech + bookkeeping)
  const isMulti  = services.length > 1
  const primary  = services[0]

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg relative overflow-hidden py-24">
        {/* Accent orb */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle, ${primary.accentHex}, transparent)` }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Icon */}
          <span
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: `${primary.accentHex}1A` }}
            aria-hidden
          >
            <ServiceIcon
              name={primary.icon}
              size={28}
              strokeWidth={1.6}
              style={{ color: primary.accentHex }}
            />
          </span>

          <p
            className="font-syne text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: primary.accentHex }}
          >
            {isMulti ? 'Finance & Operations' : primary.tagline}
          </p>

          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {isMulti ? (
              <>
                Finance &amp;{' '}
                <span className="gradient-text-gold">Operations</span>
              </>
            ) : (
              <>
                {primary.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="gradient-text">
                  {primary.title.split(' ').slice(-1)}
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {primary.longDescription}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.contact}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-semibold text-bg-primary transition-all hover:brightness-110"
              style={{
                background: primary.accentHex,
                boxShadow: `0 0 24px ${primary.accentHex}4D`,
              }}
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

      {/* ── Service content — single or multi-tab ─────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className={cn('grid gap-16', isMulti ? 'lg:grid-cols-2' : 'lg:grid-cols-5')}>
          {services.map((service) => (
            <div key={service.id} className={cn(!isMulti && 'lg:col-span-3')}>
              {isMulti && (
                <h2
                  className="mb-6 font-syne text-2xl font-bold"
                  style={{ color: service.accentHex }}
                >
                  {service.title}
                </h2>
              )}

              {/* Features */}
              <ul className="flex flex-col gap-3" role="list">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: service.accentHex }}
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Tools */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                  Tools &amp; tech
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-lg border border-white/8 px-3 py-1.5 text-xs font-medium text-white/70"
                      style={{ background: `${service.accentHex}0A` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* CTA card — only shown for single service */}
          {!isMulti && (
            <div className="lg:col-span-2">
              <div className="glass-card sticky top-24 p-8">
                <h3 className="font-syne text-lg font-bold text-white">
                  Ready to get started?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tell us about your project — we&apos;ll respond within 24 hours
                  with a clear proposal.
                </p>

                {primary.caseStudyTeaser && (
                  <blockquote className="mt-5 border-l-2 pl-4 text-sm italic text-muted/80" style={{ borderColor: primary.accentHex }}>
                    {primary.caseStudyTeaser}
                  </blockquote>
                )}

                <Link
                  href={ROUTES.contact}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-bg-primary transition-all hover:brightness-110"
                  style={{
                    background: primary.accentHex,
                    boxShadow: `0 0 20px ${primary.accentHex}40`,
                  }}
                >
                  Start the conversation <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Other services ────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted">
            Other services
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SERVICES.filter((s) => s.slug !== slug).map((service) => (
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
