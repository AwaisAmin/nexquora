import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Globe, Users, Eye } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROUTES } from '@/lib/routes'
import { BRAND } from '@/lib/constants'
import { COMPANY_VALUES, TEAM_MEMBERS } from '@/lib/data/team'

export const metadata: Metadata = {
  title: `About — ${BRAND.name}`,
  description: `We exist to build technology that gives founders and growing companies an unfair advantage.`,
}

const VALUE_ICON_MAP: Record<string, LucideIcon> = { Zap, Globe, Users, Eye }

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className="grid-bg py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Our Mission
          </p>
          <h1 className="mt-5 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            We exist to build technology that gives founders an{' '}
            <span className="gradient-text">unfair advantage</span>
          </h1>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
              Our Story
            </p>
            <h2 className="font-syne text-3xl font-bold text-white">
              Built for founders who can&apos;t afford to wait
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted">
              <p>
                {BRAND.name} was founded with a simple belief: the gap between a great idea
                and a great product shouldn&apos;t be measured in years or millions of dollars.
              </p>
              <p>
                We assembled a remote-first team of engineers, designers, and domain experts
                who&apos;ve shipped products across AI, fintech, mobile, and infrastructure.
                We work the way modern software teams should — asynchronously, transparently,
                and obsessively focused on outcomes.
              </p>
              <p>
                Every engagement starts with understanding your business, not just your tech
                requirements. That&apos;s what makes the difference between software that ships
                and software that scales.
              </p>
            </div>
          </div>

          <div className="relative flex h-80 items-center justify-center" aria-hidden>
            <div
              className="absolute h-64 w-64 rounded-3xl border border-cyan/20 opacity-40 rotate-12"
              style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.05), transparent)' }}
            />
            <div
              className="absolute h-48 w-48 rounded-3xl border border-purple/20 opacity-40 -rotate-6"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), transparent)' }}
            />
            <div className="relative z-10 text-center">
              <p className="font-syne text-5xl font-bold gradient-text">50+</p>
              <p className="mt-1 text-sm text-muted">Projects delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="bg-bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              How We Work
            </p>
            <h2 className="mt-3 font-syne text-3xl font-bold text-white">
              The values we ship by
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_VALUES.map(({ iconName, title, description }) => {
              const Icon = VALUE_ICON_MAP[iconName]
              return (
                <div key={title} className="glass-card p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10">
                    {Icon && <Icon size={20} className="text-cyan" aria-hidden />}
                  </span>
                  <h3 className="mt-5 font-syne text-base font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">The Team</p>
          <h2 className="mt-3 font-syne text-3xl font-bold text-white">Who builds your product</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {TEAM_MEMBERS.map(({ initials, role }) => (
            <div key={initials} className="flex flex-col items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan/20 to-purple/20 font-syne text-xl font-bold text-white">
                {initials}
              </div>
              <p className="text-sm text-muted">{role}</p>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/15">
              <span className="text-2xl text-white/20">+</span>
            </div>
            <p className="text-sm text-muted">More joining soon</p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="font-syne text-3xl font-bold text-white">
            Ready to build with us?
          </h2>
          <p className="mt-4 text-muted">
            Tell us about your project and we&apos;ll put together a proposal within 24 hours.
          </p>
          <Link
            href={ROUTES.contact}
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg bg-cyan px-8 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  )
}
