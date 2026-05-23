import type { ReactNode } from 'react'

// Navbar and Footer are added in Phase 3
// They are imported here when built: import Navbar from '@/components/layout/Navbar'
// import Footer from '@/components/layout/Footer'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
