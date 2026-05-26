import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter: new PrismaPg(pool) });

const SERVICES = [
  {
    slug: "ai",
    title: "AI & Machine Learning",
    tagline: "Intelligent systems that learn and scale",
    description:
      "LLM integration, custom model training, and AI automation pipelines that transform your operations at every level.",
    longDescription:
      "We build production-grade AI systems — from fine-tuned language models to computer vision pipelines. Our team has shipped RAG systems, intelligent chatbots, and fully automated workflows for startups and enterprises alike. Every system is designed to be maintainable, observable, and built to improve over time.",
    icon: "Brain",
    accentHex: "#00F5FF",
    features: [
      "LLM integration & fine-tuning (OpenAI, Anthropic, open-source)",
      "Retrieval-Augmented Generation (RAG) systems",
      "AI automation pipelines & agents",
      "Computer vision & image processing",
      "Intelligent chatbots & virtual assistants",
      "Vector databases & semantic search",
      "AI-powered document processing",
    ],
    tools: [
      "OpenAI",
      "Anthropic",
      "HuggingFace",
      "LangChain",
      "Python",
      "FastAPI",
      "Pinecone",
      "Weaviate",
    ],
    caseStudyTeaser:
      "Built an AI recruitment platform that reduced time-to-hire by 60%.",
    faq: [
      {
        q: "How long does it take to build an AI product?",
        a: "Most AI engagements take 6–12 weeks depending on scope. A focused RAG chatbot can ship in 4 weeks; a full autonomous pipeline with custom model training typically takes 10–16 weeks. We scope precisely before we start.",
      },
      {
        q: "Do you work with our proprietary data?",
        a: "Yes. All training data, embeddings, and fine-tuned models are yours — we sign an NDA before any data sharing. We can work on-premise or in your cloud account if needed.",
      },
      {
        q: "Will we own the models and code?",
        a: "Fully. IP transfers to you at handoff — models, weights, vector stores, and all source code. We retain no rights to anything we build for you.",
      },
      {
        q: "Can you integrate AI into our existing product?",
        a: "That's usually the fastest path. We design AI layers to slot into existing systems via API — no full rewrites required unless your architecture genuinely needs it.",
      },
    ],
    published: true,
    order: 0,
  },
  {
    slug: "web",
    title: "Web Development",
    tagline: "Scalable platforms built to perform",
    description:
      "Scalable SaaS platforms, enterprise portals, and high-performance web apps built with Next.js, React, and modern backend architectures.",
    longDescription:
      "From MVP to enterprise scale — we architect and build web applications that handle real load. Our stack is opinionated and battle-tested: Next.js, TypeScript, PostgreSQL, and cloud-native infrastructure from day one. We write the code, design the schema, and ship features that stick.",
    icon: "Globe",
    accentHex: "#3B82F6",
    features: [
      "SaaS platform architecture & development",
      "Enterprise portals & internal dashboards",
      "RESTful & GraphQL API design",
      "CMS-driven marketing sites",
      "Real-time features (WebSockets, SSE)",
      "Database design & query optimisation",
      "Multi-tenancy & role-based access control",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "tRPC",
      "Redis",
    ],
    caseStudyTeaser:
      "Built a multi-tenant SaaS analytics platform serving 10k+ active users.",
    faq: [
      {
        q: "Do you build custom designs or use templates?",
        a: "All custom. We design from scratch in Figma — or work from your existing designs — before writing a line of code. No templates, no shortcuts.",
      },
      {
        q: "What tech stack do you default to?",
        a: "Next.js + TypeScript + PostgreSQL + Prisma is our standard setup. It scales well, has excellent tooling, and is easy to hand over to your in-house team. We adapt if your requirements call for something different.",
      },
      {
        q: "Who handles hosting after launch?",
        a: "You own everything. We set up Vercel (frontend), Railway or AWS (backend), and Neon or Supabase (database) — all in your accounts. We document the full setup and hand over admin access.",
      },
      {
        q: "Do you offer ongoing support after launch?",
        a: "Yes. We offer monthly retainers for feature development, bug fixes, and infrastructure monitoring. Most clients stay on retainer for at least 3–6 months post-launch.",
      },
    ],
    published: true,
    order: 1,
  },
  {
    slug: "mobile",
    title: "Mobile Apps",
    tagline: "Pixel-perfect apps for iOS & Android",
    description:
      "React Native for iOS and Android. MVP to App Store launch — smooth, performant, and pixel-perfect.",
    longDescription:
      "One codebase, two stores. We build React Native apps that feel native on both iOS and Android — with offline support, push notifications, in-app purchases, and a design quality that clears App Review on the first submission.",
    icon: "Smartphone",
    accentHex: "#7C3AED",
    features: [
      "React Native for iOS & Android",
      "App Store & Google Play submission",
      "Offline-first architecture",
      "Push notifications (FCM / APNs)",
      "In-app purchases & subscriptions",
      "OTA updates with Expo EAS",
      "Performance profiling & optimisation",
    ],
    tools: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Stripe Mobile SDK",
      "React Navigation",
      "Zustand",
    ],
    caseStudyTeaser:
      "50k+ active users on a live sports app with real-time match scoring.",
    faq: [
      {
        q: "Native or cross-platform?",
        a: "We default to React Native via Expo — one codebase for iOS and Android, with near-native performance. For apps with very demanding native requirements (AR, heavy graphics, custom hardware) we discuss Flutter or fully native.",
      },
      {
        q: "What's your App Store approval track record?",
        a: "We have a 100% first-submission approval rate on the App Store. We know the guidelines and design accordingly — no guesswork at the end of the project.",
      },
      {
        q: "How do updates work after launch?",
        a: "Minor UI and logic changes are deployed over-the-air via Expo EAS — no App Store submission required. Major releases (new features, native module changes) go through the normal review process.",
      },
      {
        q: "Can you take over an existing React Native app?",
        a: "Yes. We do a code audit first — typically 3–5 days — to understand technical debt and identify risks. Then we scope a realistic plan, whether that's incremental improvements or a strategic rewrite.",
      },
    ],
    published: true,
    order: 2,
  },
  {
    slug: "devops",
    title: "DevOps & Cloud",
    tagline: "Infrastructure that never sleeps",
    description:
      "CI/CD pipelines, AWS/Azure, Docker/Kubernetes, monitoring, and zero-downtime deployments.",
    longDescription:
      "We build the infrastructure layer that lets your team ship fast without breaking things. From Dockerised environments and Kubernetes clusters to GitHub Actions pipelines and Datadog dashboards — your ops game becomes a competitive advantage, not a liability.",
    icon: "Cloud",
    accentHex: "#10B981",
    features: [
      "CI/CD pipeline design & implementation",
      "AWS & Azure cloud architecture",
      "Docker & Kubernetes orchestration",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Monitoring & alerting (Datadog, Grafana, Prometheus)",
      "Zero-downtime blue/green deployments",
      "Security hardening & SOC 2 readiness",
    ],
    tools: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Datadog",
    ],
    caseStudyTeaser:
      "Reduced deployment time from 2 hours to 4 minutes for a Series B startup.",
    faq: [
      {
        q: "Can you migrate our existing infrastructure?",
        a: "Yes — we've handled bare-metal to cloud, single-server to Kubernetes, and multi-cloud consolidations. We do a discovery phase first to map the current state and plan a zero-downtime migration path.",
      },
      {
        q: "Who responds when something breaks at 3am?",
        a: "We set up on-call alerting (PagerDuty or Datadog) with clear runbooks, so your team — or ours on retainer — knows exactly what to do. We don't leave you with black-box infrastructure.",
      },
      {
        q: "Do you work with our existing AWS/Azure setup?",
        a: "Absolutely. We adapt to your current cloud provider and tooling. We don't force migrations just to standardise on our preferences.",
      },
      {
        q: "Will we have full access and control?",
        a: "Always. You own the accounts, keys, and credentials. We operate with least-privilege access and document everything so you're never dependent on us to keep the lights on.",
      },
    ],
    published: true,
    order: 3,
  },
  {
    slug: "finance",
    title: "Fintech Solutions",
    tagline: "Payment systems & financial infrastructure",
    description:
      "Payment systems, financial dashboards, compliance automation (KYC/AML), secure transaction processing, multi-currency, and fraud detection.",
    longDescription:
      "We understand the compliance landscape as well as the engineering. Whether you need Stripe integration, custom payment rails, KYC workflows, or a real-time financial dashboard — we build it right the first time, with audit trails and security baked in from the start.",
    icon: "CreditCard",
    accentHex: "#FFB800",
    features: [
      "Payment system integration (Stripe, custom gateways)",
      "Real-time financial dashboards & reporting",
      "Compliance automation (KYC / AML workflows)",
      "Secure transaction processing & encryption",
      "Multi-currency & cross-border support",
      "Fraud detection & risk scoring",
      "Audit trails & regulatory reporting",
    ],
    tools: [
      "Stripe",
      "Plaid",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "TypeScript",
      "Python",
    ],
    caseStudyTeaser:
      "Built a multi-currency payment system processing $2M+ monthly volume.",
    faq: [
      {
        q: "How do you handle PCI compliance?",
        a: "We follow PCI DSS best practices by default — cardholder data never touches your servers. We use Stripe Elements / Tokenisation to handle sensitive data within their PCI-certified environment.",
      },
      {
        q: "Which payment processors can you integrate?",
        a: "Stripe, Adyen, Braintree, PayPal, and custom payment rails. If your market requires a regional processor, we've worked with them too. We advise on the best fit for your volume, currency mix, and regulatory context.",
      },
      {
        q: "How do you approach KYC / AML requirements?",
        a: "We integrate with identity verification providers (Jumio, Persona, Onfido) for document checks and build the AML screening workflows your compliance team specifies. We've worked with legal counsel on regulated financial products.",
      },
      {
        q: "How long does a fintech build typically take?",
        a: "A focused payment integration takes 4–6 weeks. A full compliance platform with KYC, dashboards, and reporting is typically 12–20 weeks. Scope drives timeline — we'll give you a precise estimate after discovery.",
      },
    ],
    published: true,
    order: 4,
  },
  {
    slug: "finance",
    title: "Bookkeeping & Payroll",
    tagline: "Clean books, accurate payroll, zero stress",
    description:
      "Monthly bookkeeping, payroll processing, tax filing, AP/AR management, bank reconciliation, W-2s and 1099s.",
    longDescription:
      "Messy books cost more than clean ones. We handle everything from daily transaction recording to year-end tax filings — giving you a real-time view of your financial health so you can focus on building the business, not chasing receipts.",
    icon: "BookOpen",
    accentHex: "#F59E0B",
    features: [
      "Monthly & quarterly bookkeeping",
      "Catch-up & cleanup bookkeeping",
      "Full-service payroll processing",
      "Payroll tax filing & deposits (941, 940)",
      "Accounts payable & receivable management",
      "Bank & credit card reconciliation",
      "W-2 and 1099 preparation",
    ],
    tools: [
      "QuickBooks",
      "Xero",
      "Gusto",
      "ADP",
      "Stripe",
      "Bill.com",
      "Google Sheets",
    ],
    caseStudyTeaser:
      "Cleaned up 18 months of backlogged books for a Series A fintech startup in 3 weeks.",
    faq: [
      {
        q: "What accounting software do you use?",
        a: "QuickBooks Online and Xero are our primary platforms. We work with whatever you already have and can handle migrations between systems as part of the onboarding.",
      },
      {
        q: "How quickly can you start?",
        a: "Typically within 3 business days. Onboarding involves connecting your bank accounts, reviewing the chart of accounts, and aligning on reporting preferences — most clients are fully live within a week.",
      },
      {
        q: "Can you handle catch-up bookkeeping?",
        a: "Yes, and we do it often. We quote catch-up work as a one-time fee, complete it alongside your ongoing engagement, and deliver clean books going forward.",
      },
      {
        q: "Do you handle both bookkeeping and payroll?",
        a: "Yes. Handling both eliminates the reconciliation friction that happens when you have two separate vendors. Our staff handles payroll runs, tax deposits, and year-end W-2/1099 preparation under one engagement.",
      },
    ],
    published: true,
    order: 5,
  },
];

async function main() {
  const existing = await db.service.count();
  if (existing > 0) {
    console.log(`Already have ${existing} service(s) in DB — skipping seed.`);
    return;
  }
  await db.service.createMany({ data: SERVICES });
  console.log(`Seeded ${SERVICES.length} services successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
