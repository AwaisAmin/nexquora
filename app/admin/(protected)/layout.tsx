import { verifySession } from "@/lib/dal";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession();

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Desktop sidebar — hidden on mobile */}
      <AdminSidebar />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar + drawer — hidden on md+ */}
        <AdminMobileNav />

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
