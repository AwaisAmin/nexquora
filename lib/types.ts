// ── Shared domain types ──────────────────────────────────────────────────────
// Single source of truth imported by data files, API routes, and components.

export interface Stat {
  value: string;
  label: string;
}

export interface CulturePillar {
  label: string;
  desc: string;
}

export interface TeamMember {
  initials: string;
  role: string;
}

export interface CompanyValue {
  iconName: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  iconName: string;
  title: string;
  description: string;
  accentHex: string;
}

export interface ComparisonRow {
  service: string;
  bestFor: string;
  timeline: string;
  budget: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  accentHex: string;
  features: string[];
  tools: string[];
  caseStudyTeaser?: string;
  faq: FaqItem[];
  published: boolean;
  order: number;
};

export type AccentColor =
  | "cyan"
  | "blue"
  | "purple"
  | "green"
  | "gold"
  | "amber";

export type Department = "AI" | "Web" | "Mobile" | "DevOps" | "Finance";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type Job = {
  id: string;
  title: string;
  department: Department;
  type: JobType;
  location: string;
  salary: string;
  postedAt: string; // ISO date string
  description: string;
  requirements: string[];
  niceToHave?: string[];
};
