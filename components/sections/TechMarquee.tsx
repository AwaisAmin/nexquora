import { TECH_ROW_1, TECH_ROW_2 } from '@/lib/data/tech'

export default function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/6 bg-bg-secondary py-14">
      <p className="mb-8 text-center font-syne text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Technologies we work with
      </p>

      {/* Row 1 — scrolls left */}
      <div className="flex overflow-hidden" aria-hidden>
        <div className="flex animate-marquee gap-10 whitespace-nowrap pr-10">
          {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
            <span key={`r1-${i}`} className="font-syne text-sm font-semibold text-white/30">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="mt-5 flex overflow-hidden" aria-hidden>
        <div className="flex animate-marquee-reverse gap-10 whitespace-nowrap pr-10">
          {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
            <span key={`r2-${i}`} className="font-syne text-sm font-semibold text-white/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
