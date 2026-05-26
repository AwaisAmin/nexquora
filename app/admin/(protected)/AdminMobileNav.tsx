"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import { ADMIN_NAV } from "@/app/admin/_nav";

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function close() {
    setOpen(false);
  }

  return (
    <>
      {/* Top bar — mobile only */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-bg-card px-4 py-3 md:hidden">
        <span className="font-syne text-lg font-bold text-cyan">Nexquora</span>
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/8 bg-bg-card transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <span className="font-syne text-lg font-bold text-cyan">
              Nexquora
            </span>
            <p className="text-xs text-muted">Admin</p>
          </div>
          <button
            onClick={close}
            className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {ADMIN_NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-cyan/10 text-cyan"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/8 p-3">
          <button
            onClick={() => startTransition(() => logout())}
            disabled={pending}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
            <LogOut size={16} />
            {pending ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
    </>
  );
}