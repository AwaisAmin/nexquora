import Link from "next/link";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { ServiceRowActions } from "./ServiceRowActions";

export const metadata = { title: "Services — Nexquora Admin" };

export default async function ServicesPage() {
  const services = await db.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-sm text-muted">
            {services.length} service{services.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-lg bg-cyan px-4 py-2.5 text-sm font-semibold text-bg-primary shadow-[0_0_16px_rgba(0,245,255,0.2)] transition-all hover:brightness-110"
        >
          <Plus size={16} />
          New Service
        </Link>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card">
        {services.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-muted">
            No services yet.{" "}
            <Link
              href="/admin/services/new"
              className="text-cyan hover:underline"
            >
              Create one
            </Link>{" "}
            or seed the defaults.
          </p>
        )}

        {services.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Service
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:table-cell">
                  Slug
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted md:table-cell">
                  Order
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((s) => (
                <tr key={s.id} className="group hover:bg-white/2">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ background: s.accentHex }}
                      />
                      <div>
                        <p className="font-medium text-white">{s.title}</p>
                        <p className="mt-0.5 text-xs text-muted">{s.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span className="font-mono text-xs text-muted">
                      /services/{s.slug}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <span className="text-white/70">{s.order}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        s.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ServiceRowActions id={s.id} published={s.published} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
