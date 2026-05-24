import type { Metadata } from 'next'
import { Mail, Clock, MapPin } from 'lucide-react'
import { BrandIcon } from '@/components/icons'
import { CONTACT_INFO, SOCIAL_LINKS, BRAND } from '@/lib/constants'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: `Contact — ${BRAND.name}`,
  description: `Start your project with ${BRAND.name}. We respond within 24 hours.`,
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; service?: string }>
}) {
  const { role, service } = await searchParams

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* ── Left: contact info ──────────────────────────────────────── */}
            <div>
              <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                Get in touch
              </p>
              <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl">
                Let&apos;s talk about{' '}
                <span className="gradient-text">your project</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Tell us what you&apos;re building. We&apos;ll put together a clear proposal
                and get back to you within 24 hours.
              </p>

              <ul className="mt-10 flex flex-col gap-5" role="list">
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
                    <Mail size={18} className="text-cyan" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm font-medium text-white transition-colors hover:text-cyan"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
                    <Clock size={18} className="text-cyan" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Response time</p>
                    <p className="text-sm font-medium text-white">&lt; 24 hours</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
                    <MapPin size={18} className="text-cyan" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="text-sm font-medium text-white">{CONTACT_INFO.location}</p>
                  </div>
                </li>
              </ul>

              {/* Social */}
              <div className="mt-10">
                <p className="mb-3 text-xs text-muted">Find us on</p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 text-muted transition-colors hover:border-cyan/30 hover:text-cyan"
                    >
                      <BrandIcon icon={icon} size={16} />
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted">NDA available on request.</p>
              </div>
            </div>

            {/* ── Right: contact form ─────────────────────────────────────── */}
            <div className="glass-card p-8">
              <ContactForm
                prefillService={service ?? ''}
                prefillRole={role ?? ''}
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
