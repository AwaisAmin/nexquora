// ── Shared domain types ──────────────────────────────────────────────────────
// Single source of truth imported by data files, API routes, and components.

export interface Stat {
  value: string
  label: string
}

export interface CulturePillar {
  label: string
  desc: string
}

export interface TeamMember {
  initials: string
  role: string
}

export interface CompanyValue {
  iconName: string
  title: string
  description: string
}

export interface ProcessStep {
  step: string
  iconName: string
  title: string
  description: string
  accentHex: string
}

export interface ComparisonRow {
  service: string
  bestFor: string
  timeline: string
  budget: string
}

export type AccentColor = 'cyan' | 'blue' | 'purple' | 'green' | 'gold' | 'amber'

export type ServiceId =
  | 'ai'
  | 'web'
  | 'mobile'
  | 'devops'
  | 'fintech'
  | 'bookkeeping'

export type ServiceSlug = 'ai' | 'web' | 'mobile' | 'devops' | 'finance'

export type Service = {
  id: ServiceId
  slug: ServiceSlug
  title: string
  tagline: string
  /** Short copy — homepage cards */
  description: string
  /** Full paragraph — service detail page hero */
  longDescription: string
  /** Lucide icon component name */
  icon: string
  accent: AccentColor
  /** Raw hex — used by GSAP glow tweens */
  accentHex: string
  features: string[]
  /** Tech/tool names shown as small badges */
  tools: string[]
  caseStudyTeaser?: string
}

export type Department = 'AI' | 'Web' | 'Mobile' | 'DevOps' | 'Finance'

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote'

export type Job = {
  id: string
  title: string
  department: Department
  type: JobType
  location: string
  salary: string
  postedAt: string // ISO date string
  description: string
  requirements: string[]
  niceToHave?: string[]
}
