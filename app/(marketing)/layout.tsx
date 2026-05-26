import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPublishedServices } from "@/lib/dal";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const services = await getPublishedServices();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar services={services} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer services={services} />
    </div>
  );
}
