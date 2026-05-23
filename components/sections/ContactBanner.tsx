import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/lib/routes'

export default function ContactBanner() {
  return (
    <section className="relative overflow-hidden border-t border-white/6 py-28">
      {/* Background gradient + glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-bg-secondary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/4 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Ready to build?
        </p>

        <h2 className="mt-4 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Let&apos;s build something{' '}
          <span className="gradient-text">great together</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Tell us about your project. We respond within 24 hours with a clear proposal — no sales calls, no fluff.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.contact}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan px-8 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110"
          >
            Start a project <ArrowRight size={16} aria-hidden />
          </Link>
          <Link
            href={ROUTES.services.root}
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-8 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  )
}
