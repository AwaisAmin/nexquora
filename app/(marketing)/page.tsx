import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { getPublishedServices } from "@/lib/dal";
import {
  Hero,
  StatsBar,
  ServicesGrid,
  HowWeWork,
  FeaturedWork,
  TechMarquee,
  Testimonials,
  CareerTeaser,
  ContactBanner,
} from "@/components/sections";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default async function HomePage() {
  const services = await getPublishedServices();
  return (
    <main>
      <Hero services={services} />
      <StatsBar />
      <ServicesGrid />
      <HowWeWork />
      <FeaturedWork />
      <TechMarquee />
      <Testimonials />
      <CareerTeaser />
      <ContactBanner />
    </main>
  );
}
