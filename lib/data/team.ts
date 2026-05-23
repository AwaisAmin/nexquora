import type { TeamMember, CulturePillar, CompanyValue } from '@/lib/types'

export const TEAM_MEMBERS: TeamMember[] = [
  { initials: 'AK', role: 'Founder & CEO' },
  { initials: 'SR', role: 'Head of Engineering' },
  { initials: 'MJ', role: 'Lead AI Engineer' },
  { initials: 'PL', role: 'Head of Design' },
]

export const CULTURE_PILLARS: CulturePillar[] = [
  { label: 'Remote First',    desc: 'Work from anywhere, always.' },
  { label: 'Async Friendly',  desc: 'Deep work is never interrupted.' },
  { label: 'Equity for All',  desc: 'Everyone has skin in the game.' },
  { label: 'Learning Budget', desc: '$2k/yr for courses & conferences.' },
]

export const COMPANY_VALUES: CompanyValue[] = [
  {
    iconName: 'Zap',
    title: 'Speed without shortcuts',
    description:
      'We ship fast because our process is tight, not because we cut corners. Quality is non-negotiable.',
  },
  {
    iconName: 'Globe',
    title: 'Remote by design',
    description:
      'Our team spans time zones. Async-first communication means deep work is always protected.',
  },
  {
    iconName: 'Users',
    title: 'Client obsession',
    description:
      "Your success is the metric we optimise for. We don't stop at delivery — we make sure it works.",
  },
  {
    iconName: 'Eye',
    title: 'Radical transparency',
    description:
      'Weekly demos, open roadmaps, honest timelines. No surprises — ever.',
  },
]
