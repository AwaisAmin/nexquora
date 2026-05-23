import type { ProcessStep } from '@/lib/types'

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    iconName: 'Search',
    title: 'Discover',
    description:
      'We start by deeply understanding your business, users, and constraints. No assumptions — just clear requirements and a scoped plan.',
    accentHex: '#00F5FF',
  },
  {
    step: '02',
    iconName: 'PenTool',
    title: 'Design',
    description:
      'Architecture decisions, data models, and UI wireframes before a single line of production code is written. We build the right thing.',
    accentHex: '#3B82F6',
  },
  {
    step: '03',
    iconName: 'Code2',
    title: 'Build',
    description:
      'Weekly demos, no black-box sprints. You see real progress every week and can redirect at any point without losing momentum.',
    accentHex: '#7C3AED',
  },
  {
    step: '04',
    iconName: 'Rocket',
    title: 'Ship',
    description:
      "Deployment, handoff, and knowledge transfer. We don't disappear at go-live — we make sure it works in production.",
    accentHex: '#10B981',
  },
]
