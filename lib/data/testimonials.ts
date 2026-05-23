export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  accentHex: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'recruitiq',
    quote:
      "Nexquora delivered our AI platform in 8 weeks — ahead of schedule and over spec. They felt like part of the founding team, not a vendor. The RAG architecture they designed is still serving us two years later.",
    author: 'Sarah K.',
    role: 'CEO',
    company: 'RecruitIQ',
    accentHex: '#00F5FF',
  },
  {
    id: 'analytix',
    quote:
      "We went from wireframes to production in 10 weeks. The code quality was exceptional — our in-house team had zero cleanup work to do post-handoff. That never happens with agencies.",
    author: 'Marcus D.',
    role: 'CTO',
    company: 'Analytix',
    accentHex: '#3B82F6',
  },
  {
    id: 'paystream',
    quote:
      "Finally, an agency that actually understands financial compliance. Our fintech dashboard passed legal review on the first attempt. The audit trail they built saved us months of remediation work.",
    author: 'Priya L.',
    role: 'Head of Product',
    company: 'PayStream',
    accentHex: '#FFB800',
  },
]
