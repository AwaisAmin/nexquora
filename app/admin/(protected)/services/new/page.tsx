import { createService } from "@/app/actions/services";
import ServiceForm from "../ServiceForm";

export const metadata = { title: "New Service — Nexquora Admin" };

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">New Service</h1>
        <p className="mt-1 text-sm text-muted">
          Add a new service to the public site.
        </p>
      </div>

      <ServiceForm action={createService} submitLabel="Create Service" />
    </div>
  );
}