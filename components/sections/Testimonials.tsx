import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export default function Testimonials() {
  return (
    <section className="bg-bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Client stories"
          title="What founders"
          titleAccent="say about us"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="glass-card flex flex-col gap-6 p-7"
            >
              {/* Opening quote mark */}
              <span
                className="font-syne text-5xl font-bold leading-none"
                style={{ color: `${t.accentHex}40` }}
                aria-hidden
              >
                &ldquo;
              </span>

              <p className="-mt-4 text-sm leading-relaxed text-muted">{t.quote}</p>

              <footer className="flex items-center gap-3 border-t border-white/6 pt-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-syne text-sm font-bold text-white"
                  style={{ background: `${t.accentHex}20` }}
                  aria-hidden
                >
                  {t.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
