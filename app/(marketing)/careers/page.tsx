import type { Metadata } from "next";
import Link from "next/link";
import { CULTURE_PILLARS } from "@/lib/data/team";
import { ROUTES } from "@/lib/routes";
import { BRAND } from "@/lib/constants";
import { getPublishedJobs } from "@/lib/dal";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: `Careers — ${BRAND.name}`,
  description:
    "Join the remote-first team building AI, fintech, and digital products at Nexquora.",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  return (
    <div className="min-h-screen pt-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Join the team
          </p>
          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl">
            Build the future <span className="gradient-text">with us</span>
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
                <p className="font-syne text-sm font-bold text-white">
                  {label}
                </p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job listings (interactive — filter + modal) ────────────────────── */}
      <section id="openings" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-8 font-syne text-2xl font-bold text-white">
          Open roles
        </h2>
        <CareersClient jobs={jobs} />
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
  );
}
