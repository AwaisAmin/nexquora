import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Globe,
  Users,
  Eye,
  MapPin,
  Clock,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BRAND, STATS } from "@/lib/constants";
import { COMPANY_VALUES, TEAM_MEMBERS, CULTURE_PILLARS } from "@/lib/data/team";

export const metadata: Metadata = {
  title: `About — ${BRAND.name}`,
  description:
    "We exist to build technology that gives founders and growing companies an unfair advantage.",
  openGraph: {
    title: "About — ${BRAND.name}",
    description:
      "We exist to build technology that gives founders and growing companies an unfair advantage.",
    url: "https://nexquora.com/about",
    siteName: BRAND.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — ${BRAND.name}",
    description:
      "We exist to build technology that gives founders and growing companies an unfair advantage.",
    images: ["/og-image.png"],
  },
};
;

const VALUE_ICON_MAP: Record<string, LucideIcon> = { Zap, Globe, Users, Eye };

const CULTURE_ICON_MAP: Record<string, LucideIcon> = {
  "Remote First": MapPin,
  "Async Friendly": Clock,
  "Equity for All": TrendingUp,
  "Learning Budget": BookOpen,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen sm:pt-24">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="grid-bg relative overflow-hidden py-28 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Our Mission
          </p>
          <h1 className="mt-5 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            We exist to build technology that gives founders an{" "}
            <span className="gradient-text">unfair advantage</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Remote-first. Process-obsessed. Built to ship things that last.
          </p>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-center gap-2 text-center",
                  i < STATS.length - 1 && "sm:border-r sm:border-white/8",
                )}
              >
                <p className="font-syne text-4xl font-bold gradient-text">
                  {value}
                </p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
              Our Story
            </p>
            <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
              Built for founders who can&apos;t afford to wait
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted">
              <p>
                {BRAND.name} was founded with a simple belief: the gap between a
                great idea and a great product shouldn&apos;t be measured in
                years or millions of dollars.
              </p>
              <p>
                We assembled a remote-first team of engineers, designers, and
                domain experts who&apos;ve shipped products across AI, fintech,
                mobile, and infrastructure. We work the way modern software
                teams should — asynchronously, transparently, and obsessively
                focused on outcomes.
              </p>
              <p>
                Every engagement starts with understanding your business, not
                just your tech requirements. That&apos;s what makes the
                difference between software that ships and software that scales.
              </p>
            </div>
            <Link
              href={ROUTES.contact}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan transition-all duration-200 hover:gap-3"
            >
              Start a conversation <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          {/* Decorative visual */}
          <div
            className="relative flex h-80 items-center justify-center"
            aria-hidden
          >
            <div
              className="absolute h-72 w-72 rounded-3xl border border-cyan/15 rotate-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,245,255,0.04), transparent)",
              }}
            />
            <div
              className="absolute h-56 w-56 rounded-3xl border border-purple/15 -rotate-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.04), transparent)",
              }}
            />
            <div
              className="absolute h-40 w-40 rounded-2xl border border-blue/15 rotate-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.04), transparent)",
              }}
            />
            <div className="relative z-10 text-center">
              <p className="font-syne text-6xl font-bold gradient-text">50+</p>
              <p className="mt-2 text-sm text-muted">Projects delivered</p>
              <p className="mt-1 text-xs text-muted/60">across 12+ countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────────── */}
      <section className="bg-bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              How We Work
            </p>
            <h2 className="mt-3 font-syne text-3xl font-bold text-white sm:text-4xl">
              The values we ship by
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_VALUES.map(({ iconName, title, description }) => {
              const Icon = VALUE_ICON_MAP[iconName];
              return (
                <div
                  key={title}
                  className="glass-card group p-7 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 transition-colors group-hover:bg-cyan/15">
                    {Icon && (
                      <Icon size={20} className="text-cyan" aria-hidden />
                    )}
                  </span>
                  <h3 className="mt-5 font-syne text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Culture / Perks ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Life at {BRAND.name}
          </p>
          <h2 className="mt-3 font-syne text-3xl font-bold text-white sm:text-4xl">
            A team built to do{" "}
            <span className="gradient-text">its best work</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            We hire people who want ownership, not just a job. Here&apos;s what
            that looks like in practice.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CULTURE_PILLARS.map(({ label, desc }) => {
            const Icon = CULTURE_ICON_MAP[label] ?? Zap;
            return (
              <div
                key={label}
                className="rounded-xl border border-white/8 bg-bg-card p-6 transition-all duration-300 hover:border-cyan/20 hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <Icon size={18} className="text-white/60" aria-hidden />
                </span>
                <h3 className="mt-4 font-syne text-base font-bold text-white">
                  {label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────────── */}
      <section className="bg-bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              The Team
            </p>
            <h2 className="mt-3 font-syne text-3xl font-bold text-white sm:text-4xl">
              Who builds your product
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              A small, senior team. No juniors padded into your estimate, no
              account managers between you and the engineers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {TEAM_MEMBERS.map(({ initials, role }) => (
              <div
                key={initials}
                className="group flex flex-col items-center gap-3"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan/20 to-purple/20 font-syne text-xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                  {initials}
                </div>
                <p className="text-sm text-muted">{role}</p>
              </div>
            ))}
            <div className="group flex flex-col items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/15 transition-all duration-300 group-hover:border-cyan/30">
                <span className="font-syne text-2xl text-white/20 transition-colors group-hover:text-cyan/40">
                  +
                </span>
              </div>
              <p className="text-sm text-muted">More joining soon</p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={ROUTES.careers}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm text-muted transition-all duration-200 hover:border-white/20 hover:text-white"
            >
              View open roles <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/6 py-28 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-bg-secondary"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/4 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-xl px-6">
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Ready to build with us?
          </h2>
          <p className="mt-4 text-muted">
            Tell us about your project and we&apos;ll put together a proposal
            within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.contact}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan px-8 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110"
            >
              Start a conversation <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={ROUTES.careers}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-8 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
            >
              Join the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
