import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, DollarSign, Briefcase, ArrowRight } from 'lucide-react'
import { JOBS } from '@/lib/data/jobs'
import { CULTURE_PILLARS } from '@/lib/data/team'
import { DEPT_ACCENT } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { BRAND } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Careers — ${BRAND.name}`,
  description: 'Join the remote-first team building AI, fintech, and digital products at Nexquora.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Join the team
          </p>
          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl">
            Build the future{' '}
            <span className="gradient-text">with us</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Remote-first team solving hard problems in AI, fintech, and beyond.
            We hire for impact, not credentials.
          </p>
        </div>
      </section>

      {/* ── Culture pillars ───────────────────────────────────────────────── */}
      <section className="bg-bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {CULTURE_PILLARS.map(({ label, desc }) => (
              <div key={label} className="flex flex-col gap-1 text-center">
                <p className="font-syne text-sm font-bold text-white">{label}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job listings ──────────────────────────────────────────────────── */}
      <section id="openings" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 font-syne text-2xl font-bold text-white">
          Open roles{' '}
          <span className="ml-2 rounded-full bg-cyan/10 px-3 py-1 text-sm font-medium text-cyan">
            {JOBS.length}
          </span>
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {JOBS.map((job) => {
            const accent = DEPT_ACCENT[job.department]
            return (
              <article
                key={job.id}
                className="glass-card flex flex-col gap-4 p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span
                        className="rounded-md px-2 py-0.5 text-xs font-semibold"
                        style={{ background: `${accent}18`, color: accent }}
                      >
                        {job.department}
                      </span>
                      <span className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-syne text-lg font-bold text-white">{job.title}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} aria-hidden /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} aria-hidden /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} aria-hidden /> {job.department}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {job.description}
                </p>

                <Link
                  href={`${ROUTES.contact}?role=${encodeURIComponent(job.title)}`}
                  className={cn('mt-auto flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5')}
                  style={{ color: accent }}
                  aria-label={`Apply for ${job.title}`}
                >
                  Apply now <ArrowRight size={14} aria-hidden />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="font-syne text-2xl font-bold text-white">
            Don&apos;t see the right role?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Send us your CV anyway. We hire great people ahead of the role.
          </p>
          <Link
            href={ROUTES.contact}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg border border-cyan px-6 text-sm text-cyan transition-colors hover:bg-cyan/10"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
