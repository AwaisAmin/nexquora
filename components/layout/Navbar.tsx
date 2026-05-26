"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import { getServiceUrl } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Animation variants ────────────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07 + 0.1, duration: 0.35, ease: "easeOut" },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar({ services }: { services: Service[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function isActive(href: string): boolean {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  }

  useGSAP(
    () => {
      gsap.set(megaRef.current, { autoAlpha: 0, y: -8 });
      ScrollTrigger.create({
        start: 60,
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });
    },
    { dependencies: [] },
  );

  const openMega = () =>
    gsap.to(megaRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  const closeMega = () =>
    gsap.to(megaRef.current, {
      autoAlpha: 0,
      y: -8,
      duration: 0.15,
      ease: "power2.in",
    });

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 motion-reduce:transition-none",
          "relative transition-[background,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-white/8 bg-bg-secondary/80 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href={ROUTES.home}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            aria-label={`${BRAND.name} home`}
          >
            <span className="font-syne text-xl font-bold text-white">
              {BRAND.name}
              <span className="text-cyan" aria-hidden>
                ·
              </span>
            </span>
          </Link>

          {/* ── Desktop links ──────────────────────────────────────────────── */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Services trigger — panel is lifted to header level */}
            <div onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors duration-150 hover:text-white",
                  isActive("/services") ? "text-cyan" : "text-muted",
                )}
                aria-haspopup="true"
                aria-label="Services menu"
              >
                Services
                <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
              </button>
            </div>

            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "text-sm transition-colors duration-150 hover:text-white",
                  isActive(href) ? "text-cyan" : "text-muted",
                )}
              >
                {label}
              </Link>
            ))}

            <Button variant="outline" size="sm" href={ROUTES.contact}>
              Start a Project
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} aria-hidden />
          </button>
        </nav>

        {/* ── Mega panel — positioned relative to header so it never overflows ── */}
        <div
          ref={megaRef}
          className="absolute inset-x-0 top-full z-50 hidden lg:block"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          style={{ visibility: "hidden", opacity: 0 }}
          role="menu"
          aria-label="Services"
        >
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-2">
            <div className="rounded-2xl border border-white/8 bg-bg-secondary/95 p-6 shadow-2xl backdrop-blur-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                What We Build
              </p>
              <div className="grid grid-cols-3 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={getServiceUrl(service)}
                    role="menuitem"
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-white/5"
                    onClick={closeMega}
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${service.accentHex}1A` }}
                      aria-hidden
                    >
                      <ServiceIcon
                        name={service.icon}
                        size={16}
                        strokeWidth={1.8}
                        style={{ color: service.accentHex }}
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                        {service.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs leading-snug text-muted">
                        {service.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col bg-bg-primary/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <Link
                href={ROUTES.home}
                onClick={() => setMobileOpen(false)}
                className="font-syne text-xl font-bold text-white"
              >
                {BRAND.name}
                <span className="text-cyan" aria-hidden>
                  ·
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-white"
                aria-label="Close navigation"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8">
              {/* Services grid */}
              <motion.div
                custom={0}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                  Services
                </p>
                <div className="mb-6 grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={getServiceUrl(service)}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium transition-colors hover:bg-white/5"
                      style={{ color: service.accentHex }}
                    >
                      <ServiceIcon name={service.icon} size={14} aria-hidden />
                      {service.title}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <div className="mb-6 h-px bg-white/6" aria-hidden />

              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  custom={i + 1}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-2 font-syne text-2xl font-bold transition-colors hover:text-white",
                      isActive(href) ? "text-cyan" : "text-white/70",
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <Button
                  variant="primary"
                  size="lg"
                  href={ROUTES.contact}
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Start a Project
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
