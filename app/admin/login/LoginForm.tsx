"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/70">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@nexquora.com"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/70">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputCls}
        />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan py-3 text-sm font-semibold text-bg-primary shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <LogIn size={16} />
        )}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

const inputCls = cn(
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5",
  "text-sm text-white placeholder:text-white/25 outline-none",
  "focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-colors",
);
