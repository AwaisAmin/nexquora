"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { LogIn } from "lucide-react";
import { Input, Button } from "@/components/ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="admin@nexquora.com"
        required
        autoComplete="email"
      />

      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      {state?.error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        loading={pending}
        className="mt-1 w-full py-3 h-auto"
      >
        <LogIn size={16} />
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
