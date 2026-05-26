import Link from "next/link";
import { Mail, Clock, MapPin } from "lucide-react";
import { BrandIcon } from "@/components/icons";
import {
  NAV_LINKS,
  COMPANY_LINKS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  BRAND,
} from "@/lib/constants";
import { ROUTES, serviceRoute } from "@/lib/routes";
import type { Service } from "@/lib/types";

export default function Footer({ services }: { services: Service[] }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site footer">
      {/* Gradient top border: cyan → transparent → purple */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,245,255,0.4) 0%, transparent 50%, rgba(124,58,237,0.4) 100%)",
        }}
        aria-hidden
      />

      <div className="bg-bg-secondary">
        {/* ── Main grid ──────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
            {/* Col 1–2: Brand ─────────────────────────────────────────────── */}
            <div className="md:col-span-2">
              <Link
                href={ROUTES.home}
                className="inline-block font-syne text-xl font-bold text-white"
                aria-label={`${BRAND.name} home`}
              >
                {BRAND.name}
                <span className="text-cyan" aria-hidden>
                  ·
                </span>
              </Link>

              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {BRAND.description}
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-muted transition-colors duration-150 hover:border-cyan/30 hover:text-cyan"
                  >
                    <BrandIcon icon={icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3: Services ─────────────────────────────────────────────── */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                Services
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={serviceRoute(service.slug)}
                      className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Company + Legal ──────────────────────────────────────── */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                Company
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                    {link.soon && (
                      <span className="rounded-sm bg-white/8 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                        Soon
                      </span>
                    )}
                  </li>
                ))}

                {/* Divider between company and legal */}
                <li aria-hidden>
                  <div className="my-1 h-px bg-white/5" />
                </li>

                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Connect ──────────────────────────────────────────────── */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                Connect
              </p>
              <ul className="flex flex-col gap-3" role="list">
                <li className="flex items-start gap-2.5">
                  <Mail
                    size={14}
                    className="mt-0.5 shrink-0 text-cyan"
                    aria-hidden
                  />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock
                    size={14}
                    className="mt-0.5 shrink-0 text-cyan"
                    aria-hidden
                  />
                  <span className="text-sm text-white/60">
                    {CONTACT_INFO.hours}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-cyan"
                    aria-hidden
                  />
                  <span className="text-sm text-white/60">
                    {CONTACT_INFO.location}
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-muted">
                NDA available on request.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div className="border-t border-white/6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
            <p className="text-xs text-muted">
              © {currentYear} {BRAND.name}. All rights reserved.
            </p>
            <nav aria-label="Footer links" className="flex items-center gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
