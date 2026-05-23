/**
 * Site-wide navigation and link constants.
 * All labels, hrefs, and metadata live here — never hardcoded in components.
 */
import { ROUTES } from '@/lib/routes'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href:  string
}

export interface NavLinkWithBadge extends NavLink {
  soon?: boolean
}

export interface SocialLink {
  /** Used as aria-label and key */
  label: string
  href:  string
  /** Icon component name key — resolved in BrandIcons */
  icon:  'github' | 'linkedin' | 'x'
}

// ── Navigation ────────────────────────────────────────────────────────────────

/** Primary links shown in Navbar and mobile menu. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Work',    href: ROUTES.work },
  { label: 'About',   href: ROUTES.about },
  { label: 'Careers', href: ROUTES.careers },
  { label: 'Contact', href: ROUTES.contact },
]

// ── Footer columns ────────────────────────────────────────────────────────────

export const COMPANY_LINKS: NavLinkWithBadge[] = [
  { label: 'About',   href: ROUTES.about },
  { label: 'Careers', href: ROUTES.careers },
  { label: 'Work',    href: ROUTES.work },
  { label: 'Blog',    href: '#', soon: true },
]

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy',   href: '#' },
  { label: 'Terms of Service', href: '#' },
]

// ── Social ────────────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/nexquora',           icon: 'github' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/nexquora', icon: 'linkedin' },
  { label: 'X/Twitter', href: 'https://twitter.com/nexquora',          icon: 'x' },
]

// ── Contact info ──────────────────────────────────────────────────────────────

export const CONTACT_INFO = {
  email:    'hello@nexquora.com',
  hours:    'Mon–Fri, 9am–6pm EST',
  location: 'Remote · Global',
} as const

// ── Brand ─────────────────────────────────────────────────────────────────────

export const BRAND = {
  name:    'Nexquora',
  tagline: "Build What's Next",
  description:
    'We engineer digital products that scale, perform, and last — from AI automation to fintech platforms.',
} as const
