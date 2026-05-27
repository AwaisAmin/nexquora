"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import type { WorkItem, WorkCategory } from "@/lib/data/work";
import { WORK_CATEGORIES } from "@/lib/data/work";

const CATEGORY_ACCENT: Record<WorkCategory, string> = {
  All: "#00e5ff",
  AI: "#00F5FF",
  Web: "#3B82F6",
  Mobile: "#7C3AED",
  DevOps: "#10B981",
  Finance: "#FFB800",
};

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<WorkCategory>("All");

  const filtered =
    active === "All" ? items : items.filter((w) => w.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {WORK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              active === cat
                ? "text-bg-primary"
                : "border border-white/10 text-muted hover:border-white/20 hover:text-white",
            )}
            style={
              active === cat ? { background: CATEGORY_ACCENT[cat] } : undefined
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-card group flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Top: service badge */}
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: `${item.accentHex}18`,
                  color: item.accentHex,
                }}
              >
                {item.service}
              </span>
              {item.featured && (
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted">
                  Featured
                </span>
              )}
            </div>

            {/* Title + description */}
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-lg font-bold leading-snug text-white">
                {item.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>

            {/* Outcome pill */}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{
                background: `${item.accentHex}10`,
                color: item.accentHex,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: item.accentHex }}
              />
              {item.outcome}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`${ROUTES.services.root}/${item.serviceSlug}`}
              className="mt-auto flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
              style={{ color: item.accentHex }}
            >
              See this service
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
