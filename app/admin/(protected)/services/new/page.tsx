import { createService } from "@/app/actions/services";
import ServiceForm from "../ServiceForm";

export const metadata = { title: "New Service — Nexquora Admin" };

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">New Service</h1>
        <p className="mt-1 text-sm text-muted">
          Add a new service to the public site.
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card p-6">
        <ServiceForm action={createService} submitLabel="Create Service" />
      </div>
    </div>
  );
}
