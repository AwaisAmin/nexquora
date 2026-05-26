import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nexquora.com'),
  title: 'Nexquora — Build What\'s Next',
  description:
    'From AI automation to fintech platforms — Nexquora engineers digital products that scale, perform, and last.',
  openGraph: {
    title: 'Nexquora — Build What\'s Next',
    description:
      'From AI automation to fintech platforms — Nexquora engineers digital products that scale, perform, and last.',
    url: 'https://nexquora.com',
    siteName: 'Nexquora',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexquora — Build What\'s Next',
    description:
      'From AI automation to fintech platforms — Nexquora engineers digital products that scale, perform, and last.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
