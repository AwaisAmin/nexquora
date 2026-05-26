import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login — Nexquora" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-syne text-2xl font-bold text-cyan">
            Nexquora
          </span>
          <p className="mt-1 text-sm text-muted">Admin Dashboard</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-bg-card p-8 shadow-xl">
          <h1 className="mb-6 font-syne text-xl font-bold text-white">
            Sign in
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
