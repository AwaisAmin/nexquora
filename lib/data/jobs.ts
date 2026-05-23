// TODO: Replace static array with ATS API call (Lever / Greenhouse)
// Swap point: fetch from /api/careers instead of importing directly.

import type { Job } from '@/lib/types'

export const JOBS: Job[] = [
  {
    id: 'ai-senior-engineer',
    title: 'Senior AI Engineer',
    department: 'AI',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$140k–$180k',
    postedAt: '2025-05-01T00:00:00Z',
    description:
      'Design and ship production AI systems — LLM pipelines, RAG architectures, and agentic workflows — for clients across fintech, recruiting, and SaaS.',
    requirements: [
      '4+ years building ML/AI systems in production',
      'Hands-on experience with OpenAI, Anthropic, or open-source LLMs',
      'Strong Python and FastAPI skills',
      'Experience with vector databases (Pinecone, Weaviate, pgvector)',
      'Ability to translate business requirements into model design decisions',
    ],
    niceToHave: [
      'Published research or open-source AI contributions',
      'Experience fine-tuning foundation models',
      'Familiarity with LangChain or LlamaIndex',
    ],
  },
  {
    id: 'ai-ml-engineer',
    title: 'ML Engineer',
    department: 'AI',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$120k–$160k',
    postedAt: '2025-05-05T00:00:00Z',
    description:
      'Own the data and training side of client AI projects — from data pipelines and feature engineering to model evaluation and deployment.',
    requirements: [
      '3+ years in ML engineering or data science',
      'Proficiency in Python, PyTorch or TensorFlow',
      'Experience building and maintaining ML pipelines',
      'Comfortable working with unstructured data (text, images)',
      'Solid understanding of model evaluation metrics',
    ],
    niceToHave: [
      'Experience with MLflow or similar experiment tracking',
      'Computer vision background',
      'Familiarity with cloud ML services (AWS SageMaker, Vertex AI)',
    ],
  },
  {
    id: 'web-senior-fullstack',
    title: 'Senior Full Stack Developer',
    department: 'Web',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$130k–$170k',
    postedAt: '2025-04-28T00:00:00Z',
    description:
      'Lead full-stack development on client SaaS and enterprise products. Own features end-to-end — from database schema to polished UI.',
    requirements: [
      '5+ years full-stack web development',
      'Expert-level TypeScript, React, and Next.js',
      'Strong PostgreSQL and API design skills',
      'Experience with multi-tenant SaaS architecture',
      'Ability to lead and mentor junior developers',
    ],
    niceToHave: [
      'Experience with tRPC or similar type-safe API layers',
      'Familiarity with Prisma ORM',
      'Background in performance optimisation and caching strategies',
    ],
  },
  {
    id: 'web-frontend-engineer',
    title: 'Frontend Engineer',
    department: 'Web',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$100k–$140k',
    postedAt: '2025-05-10T00:00:00Z',
    description:
      'Build pixel-perfect, accessible, and highly animated UIs for client-facing products. You care deeply about performance and design fidelity.',
    requirements: [
      '3+ years frontend development',
      'Strong React and TypeScript',
      'Experience with Tailwind CSS or similar utility-first frameworks',
      'Solid understanding of web performance and Core Web Vitals',
      'Comfortable with GSAP or Framer Motion for animations',
    ],
    niceToHave: [
      'Design sense — can spot misaligned spacing at 50px',
      'Experience with Next.js App Router',
      'Figma prototyping skills',
    ],
  },
  {
    id: 'mobile-rn-developer',
    title: 'React Native Developer',
    department: 'Mobile',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$110k–$150k',
    postedAt: '2025-05-08T00:00:00Z',
    description:
      'Build and ship polished React Native apps for iOS and Android. You know the platform quirks and take pride in apps that feel genuinely native.',
    requirements: [
      '3+ years React Native development',
      'Experience shipping to App Store and Google Play',
      'Strong TypeScript skills',
      'Experience with Expo EAS and OTA updates',
      'Familiarity with push notifications, deep linking, and background tasks',
    ],
    niceToHave: [
      'Experience with React Navigation v6+',
      'Stripe mobile SDK or in-app purchases',
      'Native module development (Swift / Kotlin)',
    ],
  },
  {
    id: 'devops-senior-engineer',
    title: 'Senior DevOps Engineer',
    department: 'DevOps',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$130k–$170k',
    postedAt: '2025-04-20T00:00:00Z',
    description:
      'Design, build, and maintain cloud infrastructure for client products. Own CI/CD pipelines, Kubernetes clusters, and observability stacks.',
    requirements: [
      '5+ years in DevOps or platform engineering',
      'Expert AWS or Azure — architecting production workloads',
      'Kubernetes and Docker in production',
      'Infrastructure as Code with Terraform',
      'Experience with GitHub Actions or GitLab CI',
    ],
    niceToHave: [
      'Datadog or Grafana/Prometheus experience',
      'SOC 2 or ISO 27001 compliance work',
      'Security scanning in CI pipelines (Snyk, Trivy)',
    ],
  },
  {
    id: 'devops-cloud-architect',
    title: 'Cloud Architect',
    department: 'DevOps',
    type: 'Contract',
    location: 'Remote — Global',
    salary: '$150–$200/hr',
    postedAt: '2025-05-12T00:00:00Z',
    description:
      'Consult on cloud architecture for client greenfield and migration projects. Produce architecture documents, review existing infra, and define the roadmap.',
    requirements: [
      '8+ years cloud architecture experience',
      'AWS Solutions Architect Professional or Azure equivalent',
      'Track record of architecting for scale (10M+ req/day)',
      'Strong written communication for architecture docs',
      'Experience with FinOps / cloud cost optimisation',
    ],
    niceToHave: [
      'Multi-cloud strategy experience',
      'Background in fintech or healthcare compliance',
    ],
  },
  {
    id: 'finance-fintech-engineer',
    title: 'Fintech Engineer',
    department: 'Finance',
    type: 'Full-time',
    location: 'Remote — Global',
    salary: '$120k–$160k',
    postedAt: '2025-05-03T00:00:00Z',
    description:
      'Build the financial infrastructure layer for client products — payment integrations, compliance workflows, and real-time financial dashboards.',
    requirements: [
      '4+ years backend engineering',
      'Hands-on experience with Stripe or similar payment processors',
      'Strong TypeScript and Node.js (or Python)',
      'Understanding of KYC/AML compliance requirements',
      'Experience with financial data modelling and double-entry bookkeeping',
    ],
    niceToHave: [
      'Plaid or banking API integration experience',
      'Familiarity with PCI DSS requirements',
      'Background in accounting or financial services',
    ],
  },
  {
    id: 'finance-staff-accountant',
    title: 'Staff Accountant',
    department: 'Finance',
    type: 'Part-time',
    location: 'Remote — US',
    salary: '$60k–$80k',
    postedAt: '2025-05-15T00:00:00Z',
    description:
      'Handle day-to-day bookkeeping and payroll for a portfolio of SMB clients. You bring accuracy, speed, and a client-first mindset to every engagement.',
    requirements: [
      '2+ years bookkeeping or accounting experience',
      'Proficiency in QuickBooks Online and/or Xero',
      'Experience running payroll (Gusto, ADP, or similar)',
      'Strong attention to detail and deadline orientation',
      'Excellent written communication with clients',
    ],
    niceToHave: [
      'CPA or EA credential (in progress counts)',
      'Experience with multi-entity or multi-currency bookkeeping',
      'Familiarity with Bill.com for AP/AR automation',
    ],
  },
]

/** Filter jobs by department. Passing undefined returns all jobs. */
export function getJobsByDepartment(department?: string): Job[] {
  if (!department) return JOBS
  return JOBS.filter((j) => j.department === department)
}

/** Look up a single job by its unique id. */
export function getJobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id)
}
