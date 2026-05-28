import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/icons/ServiceIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPublishedServices } from "@/lib/dal";
import { getServiceUrl } from "@/lib/data/services";

export default async function ServicesGrid() {
  const services = await getPublishedServices();

  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="What we build"
        title={`${services.length} specialist practice${services.length !== 1 ? "s" : ""}`}
        titleAccent="under one roof"
        subtitle="No more coordinating five agencies to ship a single product. Strategy, engineering, and operations — all in one team."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={getServiceUrl(service)}
            className="group glass-card flex flex-col gap-4 p-7 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Icon */}
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

            {/* Tagline + title */}
            <div>
              <p
                className="font-syne text-xs font-semibold uppercase tracking-widest"
                style={{ color: service.accentHex }}
              >
                {service.tagline}
              </p>
              <h3 className="mt-1.5 font-syne text-xl font-bold leading-snug text-white">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="flex-1 text-sm leading-relaxed text-muted">
              {service.description}
            </p>

            {/* CTA */}
            <span
              className="flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2.5"
              style={{ color: service.accentHex }}
            >
              Learn more <ArrowRight size={14} aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
