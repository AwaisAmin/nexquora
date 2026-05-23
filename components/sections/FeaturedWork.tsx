import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_WORK } from '@/lib/data/work'
import { ROUTES } from '@/lib/routes'

export default function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <SectionHeading
          eyebrow="Case studies"
          title="Work we're"
          titleAccent="proud of"
          centered={false}
        />
        <Link
          href={ROUTES.contact}
          className="mb-16 hidden items-center gap-1.5 text-sm font-medium text-cyan transition-all hover:gap-2.5 sm:flex"
        >
          Start a project <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {FEATURED_WORK.map((item, i) => (
          <article
            key={item.id}
            className="glass-card flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Number + service badge */}
            <div className="flex items-center justify-between">
              <span
                className="font-syne text-4xl font-bold"
                style={{ color: `${item.accentHex}22` }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="rounded-md px-2.5 py-1 text-xs font-semibold"
                style={{ background: `${item.accentHex}18`, color: item.accentHex }}
              >
                {item.service}
              </span>
            </div>

            {/* Title + description */}
            <div>
              <h3 className="font-syne text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>

            {/* Outcome metric */}
            <div
              className="mt-auto rounded-lg px-4 py-3 text-sm font-semibold"
              style={{ background: `${item.accentHex}12`, color: item.accentHex }}
            >
              ✦ {item.outcome}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
