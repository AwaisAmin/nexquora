"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import ServiceIcon from "@/components/icons/ServiceIcon";
import type { Service } from "@/lib/types";
import { ROUTES } from "@/lib/routes";
import { BRAND } from "@/lib/constants";
import { TEAM_MEMBERS } from "@/lib/data/team";

const CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Hero({ services }: { services: Service[] }) {
  return (
    <section className="relative grid-bg overflow-hidden py-28 lg:py-36">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/4 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/8 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-purple/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ── Left: Copy ─────────────────────────────────────────────────── */}
          <motion.div variants={CONTAINER} initial="hidden" animate="show">
            {/* Eyebrow badge */}
            <motion.p
              variants={ITEM}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 font-syne text-xs font-semibold uppercase tracking-[0.2em] text-cyan"
            >
              <Zap size={10} aria-hidden /> {BRAND.tagline}
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={ITEM}
              className="mt-5 font-syne text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
            >
              We build digital{" "}
              <span className="gradient-text">products that last</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={ITEM}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
            >
              {BRAND.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ITEM}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={ROUTES.contact}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-cyan px-7 text-sm font-semibold text-bg-primary shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all hover:brightness-110"
              >
                Start a project <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href={ROUTES.work}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 px-7 text-sm text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                View our work
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={ITEM}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {TEAM_MEMBERS.map(({ initials }) => (
                  <div
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg-primary bg-linear-to-br from-cyan/20 to-purple/20 font-syne text-xs font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted">
                Trusted by{" "}
                <span className="font-semibold text-white">50+ founders</span>{" "}
                worldwide
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Floating service cards ──────────────────────────────── */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="grid grid-cols-3 gap-4">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                >
                  <motion.div
                    animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                    className="glass-card flex flex-col items-center gap-3 p-5 text-center"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${service.accentHex}18` }}
                    >
                      <ServiceIcon
                        name={service.icon}
                        size={18}
                        style={{ color: service.accentHex }}
                      />
                    </span>
                    <p className="font-syne text-xs font-bold leading-tight text-white">
                      {service.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
