/**
 * Centralized route map — the only place URLs are written.
 * Import ROUTES everywhere instead of hardcoding strings.
 */
export const ROUTES = {
  home:    '/',
  about:   '/about',
  careers: '/careers',
  contact: '/contact',
  work:    '/work',

  services: {
    root:    '/services',
    ai:      '/services/ai',
    web:     '/services/web',
    mobile:  '/services/mobile',
    devops:  '/services/devops',
    finance: '/services/finance',
  },
} as const

/** Derive a union of every leaf route string for typed href props. */
type LeafValues<T> = T extends string
  ? T
  : T extends object
  ? { [K in keyof T]: LeafValues<T[K]> }[keyof T]
  : never

export type AppRoute = LeafValues<typeof ROUTES>

/** Build the /services/[slug] path from a slug string. */
export function serviceRoute(slug: string): string {
  return `/services/${slug}`
}
