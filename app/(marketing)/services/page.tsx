import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { getPublishedServices } from "@/lib/dal";
import { getServiceUrl, SERVICE_COMPARISON } from "@/lib/data/services";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Services — ${BRAND.name}`,
  description:
    "AI, web, mobile, DevOps, fintech, and bookkeeping services — everything you need to build and scale a modern digital product.",
  openGraph: {
    title: `Services — ${BRAND.name}`,
    description:
      "AI, web, mobile, DevOps, fintech, and bookkeeping services — everything you need to build and scale a modern digital product.",
    url: "https://nexquora.com/services",
    siteName: BRAND.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services — ${BRAND.name}`,
    description:
      "AI, web, mobile, DevOps, fintech, and bookkeeping services — everything you need to build and scale a modern digital product.",
    images: ["/opengraph-image"],
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  // Deduplicate by slug for display (finance appears once)
  const seen = new Set<string>();
  const uniqueServices = services.filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });

  return (
    <div className="min-h-screen pt-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="grid-bg py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            What We Build
          </p>
          <h1 className="mt-4 font-syne text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Everything you need <span className="gradient-text">to scale</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Six specialist practices under one roof — so you never have to
            coordinate five agencies to ship a single product.
          </p>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {uniqueServices.map((service) => (
            <Link
              key={service.id}
              href={getServiceUrl(service)}
              className={cn(
                "group glass-card flex flex-col gap-5 p-7 transition-all duration-300",
                "hover:-translate-y-1.5",
              )}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${service.accentHex}18` }}
                aria-hidden
              >
                <ServiceIcon
                  name={service.icon}
                  size={22}
                  strokeWidth={1.7}
                  style={{ color: service.accentHex }}
                />
              </span>

              <p
                className="font-syne text-xs font-semibold uppercase tracking-widest"
                style={{ color: service.accentHex }}
              >
                {service.tagline}
              </p>

              <h2 className="font-syne text-xl font-bold leading-snug text-white">
                {service.title}
              </h2>

              <p className="flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {service.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted"
                  >
                    {tool}
                  </span>
                ))}
                {service.tools.length > 4 && (
                  <span className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted">
                    +{service.tools.length - 4}
                  </span>
                )}
              </div>

              <span
                className="flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                style={{ color: service.accentHex }}
              >
                Learn more
                <ArrowRight size={14} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <h2 className="mb-10 font-syne text-2xl font-bold text-white">
          Compare services
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm" aria-label="Service comparison">
            <thead>
              <tr className="border-b border-white/8 bg-bg-card">
                <th className="px-6 py-4 text-left font-semibold text-white">
                  Service
                </th>
                <th className="px-6 py-4 text-left font-semibold text-white">
                  Best for
                </th>
                <th className="px-6 py-4 text-left font-semibold text-white">
                  Typical timeline
                </th>
                <th className="px-6 py-4 text-left font-semibold text-white">
                  Starting budget
                </th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_COMPARISON.map((row, i) => (
                <tr
                  key={row.service}
                  className={cn(
                    "border-b border-white/5 transition-colors hover:bg-white/3",
                    i % 2 === 0 ? "bg-transparent" : "bg-bg-card/30",
                  )}
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {row.service}
                  </td>
                  <td className="px-6 py-4 text-muted">{row.bestFor}</td>
                  <td className="px-6 py-4 text-muted">{row.timeline}</td>
                  <td className="px-6 py-4 text-muted">{row.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
