import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants'
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
} from '@/components/sections'

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <HowWeWork />
      <FeaturedWork />
      <TechMarquee />
      <Testimonials />
      <CareerTeaser />
      <ContactBanner />
    </main>
  )
}
