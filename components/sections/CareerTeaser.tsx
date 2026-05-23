import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { JOBS } from '@/lib/data/jobs'
import { ROUTES } from '@/lib/routes'

export default function CareerTeaser() {
  const featured = JOBS.slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <SectionHeading
          eyebrow="Join the team"
          title="We're"
          titleAccent="hiring"
          centered={false}
        />
        <Link
          href={ROUTES.careers}
          className="mb-16 hidden items-center gap-1.5 text-sm font-medium text-cyan transition-all hover:gap-2.5 sm:flex"
        >
          All openings <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {featured.map((job) => (
          <Link
            key={job.id}
            href={`${ROUTES.contact}?role=${encodeURIComponent(job.title)}`}
            className="group flex items-center justify-between rounded-xl border border-white/8 bg-bg-card/50 px-6 py-4 transition-all hover:border-white/15 hover:bg-bg-card"
          >
            <div>
              <p className="font-syne text-sm font-bold text-white transition-colors group-hover:text-cyan">
                {job.title}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                <span>{job.department}</span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1">
                  <MapPin size={10} aria-hidden />
                  {job.location}
                </span>
                <span aria-hidden>·</span>
                <span>{job.salary}</span>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-muted transition-all group-hover:translate-x-1 group-hover:text-cyan"
              aria-hidden
            />
          </Link>
        ))}
      </div>

      <Link
        href={ROUTES.careers}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-all hover:gap-2.5 sm:hidden"
      >
        See all openings <ArrowRight size={14} aria-hidden />
      </Link>
    </section>
  )
}
