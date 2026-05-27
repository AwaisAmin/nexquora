import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WorkGrid from "./WorkGrid";
import { FEATURED_WORK } from "@/lib/data/work";
import { ROUTES } from "@/lib/routes";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Work — ${BRAND.name}`,
  description:
    "Case studies from AI platforms to fintech infrastructure — real projects, real outcomes.",
  openGraph: {
    title: `Work — ${BRAND.name}`,
    description:
      "Case studies from AI platforms to fintech infrastructure — real projects, real outcomes.",
    url: "https://nexquora.com/work",
    siteName: BRAND.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Work — ${BRAND.name}`,
    description:
      "Case studies from AI platforms to fintech infrastructure — real projects, real outcomes.",
    images: ["/opengraph-image"],
  },
};

const WORK_STATS = [
  { value: "50+", label: "Projects shipped" },
  { value: "9", label: "Industries served" },
  { value: "100%", label: "On-time delivery" },
  { value: "4.9★", label: "Average client rating" },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen sm:pt-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Our Work
          </p>
          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Projects that{" "}
            <span className="gradient-text">speak for themselves</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            From zero to production — a selection of the products, platforms,
            and systems we&apos;ve shipped across AI, web, mobile, fintech, and
            DevOps.
          </p>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="border-y border-white/6 bg-bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/6 md:grid-cols-4">
          {WORK_STATS.map(({ value, label }) => (
            <div key={label} className="px-8 py-8 text-center">
              <p className="font-syne text-3xl font-bold text-white">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Work grid ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <WorkGrid items={FEATURED_WORK} />
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 bg-bg-secondary py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Ready to be{" "}
            <span className="gradient-text">our next case study?</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us what you&apos;re building. We&apos;ll put together a clear
            proposal within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.contact}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan px-7 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,229,255,0.3)] transition-all hover:brightness-110"
            >
              Start a project <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={ROUTES.services.root}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-7 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
            >
              View services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
