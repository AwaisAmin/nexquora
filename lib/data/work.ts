import type { ServiceSlug } from '@/lib/types'

export interface WorkItem {
  id: string
  title: string
  description: string
  service: string
  serviceSlug: ServiceSlug
  outcome: string
  accentHex: string
  tags: string[]
}

export const FEATURED_WORK: WorkItem[] = [
  {
    id: 'recruitment-ai',
    title: 'AI Recruitment Platform',
    description:
      'End-to-end AI-powered hiring platform that screens resumes, ranks candidates, and schedules interviews autonomously — eliminating 80% of manual HR overhead.',
    service: 'AI & Machine Learning',
    serviceSlug: 'ai',
    outcome: '60% reduction in time-to-hire',
    accentHex: '#00F5FF',
    tags: ['LLM', 'RAG', 'Python', 'Next.js', 'Pinecone'],
  },
  {
    id: 'saas-analytics',
    title: 'Multi-Tenant Analytics SaaS',
    description:
      'Real-time analytics dashboard with role-based access control, custom report builder, and white-label support for 10k+ concurrent users across 200+ organisations.',
    service: 'Web Development',
    serviceSlug: 'web',
    outcome: '10k+ active users on launch day',
    accentHex: '#3B82F6',
    tags: ['Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'Redis'],
  },
  {
    id: 'sports-companion',
    title: 'Live Sports Companion App',
    description:
      'React Native app with real-time match scoring, fantasy leagues, push notifications, and in-app purchases — cleared App Review on first submission.',
    service: 'Mobile Apps',
    serviceSlug: 'mobile',
    outcome: '50k+ downloads in month one',
    accentHex: '#7C3AED',
    tags: ['React Native', 'Expo', 'Firebase', 'WebSockets', 'Stripe'],
  },
]
