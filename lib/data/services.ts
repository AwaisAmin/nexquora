// TODO: Replace static array with CMS API call (Sanity / Contentful)
// Swap point: fetch from /api/services instead of importing directly.

import type { Service, ComparisonRow } from '@/lib/types'

export const SERVICES: Service[] = [
  {
    id: 'ai',
    slug: 'ai',
    title: 'AI & Machine Learning',
    tagline: 'Intelligent systems that learn and scale',
    description:
      'LLM integration, custom model training, and AI automation pipelines that transform your operations at every level.',
    longDescription:
      'We build production-grade AI systems — from fine-tuned language models to computer vision pipelines. Our team has shipped RAG systems, intelligent chatbots, and fully automated workflows for startups and enterprises alike. Every system is designed to be maintainable, observable, and built to improve over time.',
    icon: 'Brain',
    accent: 'cyan',
    accentHex: '#00F5FF',
    features: [
      'LLM integration & fine-tuning (OpenAI, Anthropic, open-source)',
      'Retrieval-Augmented Generation (RAG) systems',
      'AI automation pipelines & agents',
      'Computer vision & image processing',
      'Intelligent chatbots & virtual assistants',
      'Vector databases & semantic search',
      'AI-powered document processing',
    ],
    tools: ['OpenAI', 'Anthropic', 'HuggingFace', 'LangChain', 'Python', 'FastAPI', 'Pinecone', 'Weaviate'],
    caseStudyTeaser: 'Built an AI recruitment platform that reduced time-to-hire by 60%.',
  },
  {
    id: 'web',
    slug: 'web',
    title: 'Web Development',
    tagline: 'Scalable platforms built to perform',
    description:
      'Scalable SaaS platforms, enterprise portals, and high-performance web apps built with Next.js, React, and modern backend architectures.',
    longDescription:
      'From MVP to enterprise scale — we architect and build web applications that handle real load. Our stack is opinionated and battle-tested: Next.js, TypeScript, PostgreSQL, and cloud-native infrastructure from day one. We write the code, design the schema, and ship features that stick.',
    icon: 'Globe',
    accent: 'blue',
    accentHex: '#3B82F6',
    features: [
      'SaaS platform architecture & development',
      'Enterprise portals & internal dashboards',
      'RESTful & GraphQL API design',
      'CMS-driven marketing sites',
      'Real-time features (WebSockets, SSE)',
      'Database design & query optimisation',
      'Multi-tenancy & role-based access control',
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'tRPC', 'Redis'],
    caseStudyTeaser: 'Built a multi-tenant SaaS analytics platform serving 10k+ active users.',
  },
  {
    id: 'mobile',
    slug: 'mobile',
    title: 'Mobile Apps',
    tagline: 'Pixel-perfect apps for iOS & Android',
    description:
      'React Native for iOS and Android. MVP to App Store launch — smooth, performant, and pixel-perfect.',
    longDescription:
      'One codebase, two stores. We build React Native apps that feel native on both iOS and Android — with offline support, push notifications, in-app purchases, and a design quality that clears App Review on the first submission.',
    icon: 'Smartphone',
    accent: 'purple',
    accentHex: '#7C3AED',
    features: [
      'React Native for iOS & Android',
      'App Store & Google Play submission',
      'Offline-first architecture',
      'Push notifications (FCM / APNs)',
      'In-app purchases & subscriptions',
      'OTA updates with Expo EAS',
      'Performance profiling & optimisation',
    ],
    tools: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Stripe Mobile SDK', 'React Navigation', 'Zustand'],
    caseStudyTeaser: '50k+ active users on a live sports app with real-time match scoring.',
  },
  {
    id: 'devops',
    slug: 'devops',
    title: 'DevOps & Cloud',
    tagline: 'Infrastructure that never sleeps',
    description:
      'CI/CD pipelines, AWS/Azure, Docker/Kubernetes, monitoring, and zero-downtime deployments.',
    longDescription:
      'We build the infrastructure layer that lets your team ship fast without breaking things. From Dockerised environments and Kubernetes clusters to GitHub Actions pipelines and Datadog dashboards — your ops game becomes a competitive advantage, not a liability.',
    icon: 'Cloud',
    accent: 'green',
    accentHex: '#10B981',
    features: [
      'CI/CD pipeline design & implementation',
      'AWS & Azure cloud architecture',
      'Docker & Kubernetes orchestration',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Monitoring & alerting (Datadog, Grafana, Prometheus)',
      'Zero-downtime blue/green deployments',
      'Security hardening & SOC 2 readiness',
    ],
    tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Datadog'],
    caseStudyTeaser: 'Reduced deployment time from 2 hours to 4 minutes for a Series B startup.',
  },
  {
    id: 'fintech',
    slug: 'finance',
    title: 'Fintech Solutions',
    tagline: 'Payment systems & financial infrastructure',
    description:
      'Payment systems, financial dashboards, compliance automation (KYC/AML), secure transaction processing, multi-currency, and fraud detection.',
    longDescription:
      'We understand the compliance landscape as well as the engineering. Whether you need Stripe integration, custom payment rails, KYC workflows, or a real-time financial dashboard — we build it right the first time, with audit trails and security baked in from the start.',
    icon: 'CreditCard',
    accent: 'gold',
    accentHex: '#FFB800',
    features: [
      'Payment system integration (Stripe, custom gateways)',
      'Real-time financial dashboards & reporting',
      'Compliance automation (KYC / AML workflows)',
      'Secure transaction processing & encryption',
      'Multi-currency & cross-border support',
      'Fraud detection & risk scoring',
      'Audit trails & regulatory reporting',
    ],
    tools: ['Stripe', 'Plaid', 'Node.js', 'PostgreSQL', 'Redis', 'TypeScript', 'Python'],
    caseStudyTeaser: 'Built a multi-currency payment system processing $2M+ monthly volume.',
  },
  {
    id: 'bookkeeping',
    slug: 'finance',
    title: 'Bookkeeping & Payroll',
    tagline: 'Clean books, accurate payroll, zero stress',
    description:
      'Monthly bookkeeping, payroll processing, tax filing, AP/AR management, bank reconciliation, W-2s and 1099s.',
    longDescription:
      'Messy books cost more than clean ones. We handle everything from daily transaction recording to year-end tax filings — giving you a real-time view of your financial health so you can focus on building the business, not chasing receipts.',
    icon: 'BookOpen',
    accent: 'amber',
    accentHex: '#F59E0B',
    features: [
      'Monthly & quarterly bookkeeping',
      'Catch-up & cleanup bookkeeping',
      'Full-service payroll processing',
      'Payroll tax filing & deposits (941, 940)',
      'Accounts payable & receivable management',
      'Bank & credit card reconciliation',
      'W-2 and 1099 preparation',
    ],
    tools: ['QuickBooks', 'Xero', 'Gusto', 'ADP', 'Stripe', 'Bill.com', 'Google Sheets'],
    caseStudyTeaser: 'Cleaned up 18 months of backlogged books for a Series A fintech startup in 3 weeks.',
  },
]

/** Look up a single service by its URL slug. Returns all matches for 'finance' (two tabs). */
export function getServicesBySlug(slug: string): Service[] {
  return SERVICES.filter((s) => s.slug === slug)
}

/** Look up a single service by its unique id. */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

export const SERVICE_COMPARISON: ComparisonRow[] = [
  { service: 'AI & Machine Learning', bestFor: 'Automation, chatbots, data products', timeline: '6–12 weeks',  budget: '$25k+' },
  { service: 'Web Development',       bestFor: 'SaaS, portals, marketing sites',      timeline: '4–10 weeks',  budget: '$15k+' },
  { service: 'Mobile Apps',           bestFor: 'iOS & Android consumer/B2B apps',     timeline: '8–16 weeks',  budget: '$20k+' },
  { service: 'DevOps & Cloud',        bestFor: 'Infrastructure, CI/CD, scaling',       timeline: '2–6 weeks',   budget: '$8k+' },
  { service: 'Fintech Solutions',     bestFor: 'Payments, compliance, dashboards',     timeline: '8–20 weeks',  budget: '$30k+' },
  { service: 'Bookkeeping & Payroll', bestFor: 'SMBs, startups, distributed teams',   timeline: 'Ongoing',     budget: '$500/mo+' },
]
