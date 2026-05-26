"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import { ADMIN_NAV } from "@/app/admin/_nav";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-white/8 bg-bg-card md:flex">
      <div className="border-b border-white/8 px-6 py-5">
        <span className="font-syne text-lg font-bold text-cyan">Nexquora</span>
        <p className="mt-0.5 text-xs text-muted">Admin</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {ADMIN_NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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

      <div className="border-t border-white/8 p-3">
        <button
          onClick={() => startTransition(() => logout())}
          disabled={pending}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        >
          <LogOut size={16} />
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
