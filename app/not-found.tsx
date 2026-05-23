import Link from 'next/link'
import { ROUTES } from '@/lib/routes'
import { BRAND } from '@/lib/constants'

export default function NotFound() {
  return (
    <main className="grid-bg flex min-h-screen items-center justify-center px-6">
      {/* Decorative orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00F5FF, transparent)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 text-center">
        <p className="font-syne text-[10rem] font-bold leading-none gradient-text select-none">
          404
        </p>
        <h1 className="mt-2 font-syne text-2xl font-bold text-white sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.home}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-cyan px-6 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110"
          >
            ← Back to home
          </Link>
          <Link
            href={ROUTES.contact}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-6 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
          >
            Contact us
          </Link>
        </div>

        <p className="mt-12 text-xs text-white/20">
          {BRAND.name} · {BRAND.tagline}
        </p>
      </div>
    </main>
  )
}
