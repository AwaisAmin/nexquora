# Nexquora — Master Build Guide

> **How to use this file:** Work through the phases in order. Feed each phase
> (or individual step within a phase) to your AI assistant and ask it to
> implement **only that step**. Check the result in the browser before moving on.
> Every step is self-contained and references the exact files to create or edit.

---

## Project Snapshot

| Item | Value |
|---|---|
| Framework | Next.js 16 (App Router) |
| React | 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animations | **GSAP + ScrollTrigger** (primary) · Framer Motion (page transitions + micro) |
| Icons | Lucide React |
| Fonts | Syne (display) + DM Sans (body) via `next/font/google` |
| Images | `next/image` everywhere |
| Validation | Zod (API routes) |
| Package manager | pnpm |
| Data layer | `lib/data/` static files (swap for DB later — no changes to pages needed) |

---

## Brand System (reference in every prompt)

```
Company:   Nexquora
Tagline:   "Build What's Next"
Vibe:      Dark · Premium · Futuristic (Vercel × top-tier consulting)

-- Colors (CSS variables in globals.css) --
--bg-primary:    #050810
--bg-secondary:  #0A0F1E
--bg-card:       #0D1529
--accent-cyan:   #00F5FF
--accent-gold:   #FFB800
--accent-purple: #7C3AED
--accent-blue:   #3B82F6
--accent-green:  #10B981
--accent-amber:  #F59E0B
--text-primary:  #FFFFFF
--text-muted:    #8892A4
--border:        rgba(255,255,255,0.08)

-- Recurring patterns --
Glassmorphism card:  bg rgba(13,21,41,0.8) · backdrop-blur-md · border 1px rgba(255,255,255,0.08)
Cyan CTA glow:       box-shadow 0 0 24px rgba(0,245,255,0.3)
Gradient heading:    bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
Section padding:     py-24 md:py-32
Grid bg texture:     1px lines, white at 3% opacity (CSS only, no image)
```

---

## Final Folder Structure

```
nexquora/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx              ← wraps all public pages (Navbar + Footer)
│   │   ├── page.tsx                ← homepage
│   │   ├── about/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   └── services/
│   │       ├── page.tsx            ← all-services overview
│   │       ├── ai/page.tsx
│   │       ├── web/page.tsx
│   │       ├── mobile/page.tsx
│   │       ├── devops/page.tsx
│   │       └── finance/page.tsx    ← most detailed page
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── careers/route.ts
│   │   └── services/route.ts
│   ├── layout.tsx                  ← root layout (fonts, metadata, providers)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── ServicesGrid.tsx
│       ├── StatsBar.tsx
│       ├── HowWeWork.tsx
│       ├── FeaturedWork.tsx
│       ├── TechMarquee.tsx
│       ├── Testimonials.tsx
│       ├── CareerTeaser.tsx
│       └── ContactBanner.tsx
├── lib/
│   ├── data/
│   │   ├── services.ts
│   │   └── jobs.ts
│   └── utils.ts
├── hooks/
│   ├── useCountUp.ts
│   └── useGSAP.ts
├── public/
│   └── (SVGs, og-image, favicon)
├── project.md                      ← this file
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Future API Integration Points

> Keep these TODOs in the code — they mark exact swap points so future work
> is a 1-file change, not a refactor.

| Location | Current | Future swap |
|---|---|---|
| `app/api/contact/route.ts` | Returns JSON, logs to console | Resend email API |
| `app/api/careers/route.ts` | Returns `lib/data/jobs.ts` | Postgres / Airtable |
| `app/api/services/route.ts` | Returns `lib/data/services.ts` | CMS (Sanity / Contentful) |
| `lib/data/services.ts` | Static array | Fetched from CMS |
| `lib/data/jobs.ts` | Static array | Fetched from ATS (Lever / Greenhouse) |
| `components/sections/Testimonials.tsx` | Hardcoded | Fetched from CMS or G2/Capterra API |
| `components/sections/FeaturedWork.tsx` | Hardcoded | Case studies from CMS |

---

## Animation Strategy

**GSAP + ScrollTrigger** handles all scroll-driven, timeline, and performance-critical
animations. **Framer Motion** handles React-specific things (page transitions, conditional
mount/unmount, hover states).

```
GSAP ScrollTrigger use-cases:
  - Section reveal (fade + translateY) with stagger on child elements
  - Stats count-up (triggered once when the bar enters viewport)
  - Horizontal tech marquee (infinite, pauses on hover)
  - Service cards stagger-in
  - "How We Work" timeline drawing (SVG path stroke-dashoffset)
  - Hero particle/orb parallax on scroll
  - Pinned section for service feature tabs (on desktop)

Framer Motion use-cases:
  - Page-level AnimatePresence transitions
  - Navbar mobile menu slide-in / out
  - Modal open/close (careers apply, contact success)
  - Hover micro-interactions (card lift, button glow pulse)
  - Initial hero entrance (before scroll begins)
```

### GSAP Registration pattern (used in every component that needs it)

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MySection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)
    return () => ctx.revert()  // cleanup on unmount
  }, [])

  return <div ref={ref}>...</div>
}
```

> Always use `gsap.context(() => { ... }, ref)` + `ctx.revert()` — this prevents
> memory leaks and animation bleed between route navigations in Next.js.

---

# PHASE 0 — Dependencies & Config

**Goal:** Install all packages and set up config files. No UI yet.

### Step 0.1 — Install packages

```bash
pnpm add gsap framer-motion lucide-react zod clsx tailwind-merge
pnpm add @gsap/react
# Fonts are loaded via next/font/google — no install needed
```

> `@gsap/react` provides the `useGSAP` hook which handles cleanup
> automatically — prefer it over raw `useEffect` + `gsap.context`.

### Step 0.2 — `tailwind.config.ts`

Create this file. Key things to add:
- Extend `fontFamily` with `syne` and `dmSans`
- Extend `colors` with all brand accent colors
- Extend `backgroundImage` with gradient shorthands
- Extend `animation` + `keyframes` for: `marquee` (infinite scroll left),
  `marquee-reverse`, `pulse-glow` (box-shadow breathing on cyan),
  `float` (y up-down 20px)

Tell AI: *"Create `tailwind.config.ts` for Tailwind v4 with the Nexquora brand
colors (cyan #00F5FF, gold #FFB800, purple #7C3AED, blue #3B82F6, green #10B981,
amber #F59E0B), custom font families (syne, dmSans), and keyframes for marquee,
marquee-reverse, pulse-glow, and float."*

### Step 0.3 — `app/globals.css`

Replace the default file. Include:
- CSS variables (all brand colors listed in Brand System above)
- Base: `body { background: var(--bg-primary); color: var(--text-primary); }`
- `.glass-card` utility: glassmorphism pattern
- `.gradient-text` utility: cyan → blue gradient text
- `.grid-bg` utility: subtle CSS grid lines background using
  `background-image: linear-gradient` (two perpendicular lines at 3% white opacity)
- `.glow-cyan` utility: `box-shadow: 0 0 24px rgba(0,245,255,0.3)`
- Custom scrollbar (thin, dark)
- `::selection` styling (cyan highlight)

### Step 0.4 — `app/layout.tsx` (root)

- Import Syne + DM Sans via `next/font/google`
- Apply fonts to `<html>` via className and CSS vars
- Metadata: title "Nexquora — Build What's Next", description, openGraph
- No Navbar/Footer here — those go in the marketing group layout

### Step 0.5 — `app/(marketing)/layout.tsx`

- Import and render `<Navbar />` above `{children}`
- Import and render `<Footer />` below `{children}`
- This layout wraps every public page automatically

---

# PHASE 1 — Data Layer

**Goal:** All static data in `lib/data/`. API routes serve these. Pages import
them directly during SSR.

### Step 1.1 — `lib/data/services.ts`

Export a typed array `SERVICES` with 6 objects:

```ts
type Service = {
  id: string           // 'ai' | 'web' | 'mobile' | 'devops' | 'fintech' | 'bookkeeping'
  slug: string         // URL segment: 'ai' | 'web' | 'mobile' | 'devops' | 'finance'
  title: string
  tagline: string
  description: string       // short — used in homepage cards
  longDescription: string   // paragraph — used on service detail page
  icon: string              // Lucide icon name
  accent: string            // 'cyan' | 'blue' | 'purple' | 'green' | 'gold' | 'amber'
  accentHex: string         // raw hex for GSAP glow effects
  features: string[]        // bullet points on service detail page
  tools: string[]           // tech/tools (shown as small badges)
  caseStudyTeaser?: string
}
```

Populate all 6 services with full content from the brief:

- **AI & Machine Learning** (slug: `ai`, accent: cyan)
  LLM integration, custom model training, AI automation pipelines,
  computer vision, intelligent chatbots, RAG systems.

- **Web Development** (slug: `web`, accent: blue)
  Scalable SaaS platforms, enterprise portals, high-performance web apps
  built with Next.js, React, and modern backend architectures.

- **Mobile Apps** (slug: `mobile`, accent: purple)
  React Native for iOS and Android. MVP to App Store launch —
  smooth, performant, pixel-perfect.

- **DevOps & Cloud** (slug: `devops`, accent: green)
  CI/CD pipelines, AWS/Azure, Docker/Kubernetes, monitoring,
  zero-downtime deployments.

- **Fintech Solutions** (slug: `finance`, accent: gold)
  Payment systems, financial dashboards, compliance automation (KYC/AML),
  secure transaction processing, multi-currency, fraud detection.

- **Bookkeeping & Payroll** (slug: `finance`, accent: amber — shares the finance page)
  Monthly bookkeeping, payroll processing, tax filing, AP/AR management,
  bank reconciliation, W-2s and 1099s.

> Note: Fintech and Bookkeeping share slug `finance` and one detail page with two tabs.
> Add a `subServices` field on the finance entry to hold both sets of features.

### Step 1.2 — `lib/data/jobs.ts`

Export a typed array `JOBS`:

```ts
type Job = {
  id: string
  title: string
  department: 'AI' | 'Web' | 'Mobile' | 'DevOps' | 'Finance'
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  location: string
  salary: string        // e.g. "$120k–$160k"
  postedAt: string      // ISO date string
  description: string
  requirements: string[]
  niceToHave?: string[]
}
```

Include at least 8 jobs across all departments so filter tabs are useful.

### Step 1.3 — `lib/utils.ts`

```ts
cn(...classes)          // clsx + tailwind-merge helper
formatDate(iso: string) // "May 2025"
slugify(str: string)    // lowercase-hyphenated
getAccentHex(accent: string) // returns hex from accent name
```

---

# PHASE 2 — UI Primitives

**Goal:** Reusable, typed components in `components/ui/`. No pages yet.

### Step 2.1 — `components/ui/Button.tsx`

Variants: `primary` (filled cyan + glow), `outline` (cyan border),
`ghost`, `gold` (filled gold).
Sizes: `sm`, `md`, `lg`.
Supports `asChild` or `as` prop for link rendering.
Framer Motion `whileHover={{ scale: 1.03 }}` + CSS glow transition.

### Step 2.2 — `components/ui/Badge.tsx`

Small pill. Color variants for each service accent.
Optional `dot` prop — animated pulse dot before label.

### Step 2.3 — `components/ui/Card.tsx`

Glassmorphism base. Props:
- `hover` (boolean) — enables lift + border glow on hover
- `accentColor` (string) — colored border-glow on hover via inline style

### Step 2.4 — `components/ui/Input.tsx` + `components/ui/Textarea.tsx`

Dark background, `border border-white/8`, focus ring in cyan.
Label above, error message slot below.

### Step 2.5 — `components/ui/SectionHeading.tsx`

Props: `eyebrow` (small caps, muted, with line), `title`, `titleAccent`
(the word that gets gradient color), `subtitle`.

---

# PHASE 3 — Layout Components

### Step 3.1 — `components/layout/Navbar.tsx`

**Desktop:**
- Fixed, `top-0`, full width, `z-50`
- On mount: transparent. On scroll past 60px: `backdrop-blur-md +
  bg-[#0A0F1E]/80 + border-b border-white/8`
  Use GSAP ScrollTrigger to toggle a CSS class at that threshold.
- Logo: "Nexquora" in Syne with a cyan `·` after the last `a`
- Links: Services (hover → mega-dropdown), Work, About, Careers, Contact
- CTA: `<Button variant="outline" size="sm">Start a Project</Button>`

**Services mega-dropdown:**
- Absolute panel below nav, 3×2 grid of mini service cards
- Each: icon + name + tagline, links to `/services/[slug]`
- GSAP `autoAlpha` + `y` tween on hover enter/leave

**Mobile (< lg):**
- Hamburger icon → Framer Motion `AnimatePresence` full-screen overlay
- Links stagger in from left. Close button top-right.
- Background: `bg-bg-primary/95 backdrop-blur-xl`

### Step 3.2 — `components/layout/Footer.tsx`

Grid: `grid-cols-1 md:grid-cols-5`
- Col 1 (span 2): Logo + tagline + social icons (GitHub, LinkedIn, X)
- Col 2: Services (all 6 links)
- Col 3: Company (About, Careers, Work, Blog — coming soon)
- Col 4: Legal (Privacy, Terms)
- Col 5: Connect (email, "Remote · Global")
- Bottom bar: `© 2025 Nexquora. Built with Next.js`
- Top: `border-t` with a horizontal gradient line (cyan → transparent → purple)

---

# PHASE 4 — Homepage Sections

Build each as its own file in `components/sections/`.
Assemble in `app/(marketing)/page.tsx` at the end of this phase.

### Step 4.1 — `components/sections/Hero.tsx`

```
Layout:      min-h-screen · flex items-center justify-center · relative · overflow-hidden

Background:
  Layer 1: .grid-bg class (CSS grid lines, 3% opacity)
  Layer 2: 3 floating orbs (position: absolute)
    Orb 1: 600px, cyan at 6% opacity, top-left
    Orb 2: 500px, purple at 8% opacity, bottom-right
    Orb 3: 400px, blue at 5% opacity, center-right
  GSAP: on scroll, orbs move at different y speeds (parallax)

Content (z-10, centered, max-w-5xl, text-center):
  1. <Badge dot>AI-Powered Digital Agency</Badge>
  2. H1 line 1: "We Build"  (white, Syne, clamp 48px–96px)
  3. H1 line 2: "What's Next"  (gradient-text, same size)
  4. Subheading: muted, max-w-2xl, DM Sans
     "From AI automation to fintech platforms — we engineer digital
      products that scale, perform, and last."
  5. Button row: <Button variant="primary">Start a Project →</Button>
                 <Button variant="outline">View Our Work</Button>
  6. Service quick-links row: 6 small pills linking to each /services/[slug]
     (subtle, gray, hover turns accent color)

GSAP entrance (plays on mount, no scroll):
  Each element animates: opacity 0→1, y 30→0, stagger 0.1s, ease power3.out

Scroll indicator (bottom center, absolute):
  "Scroll" small-caps text + ChevronDown icon
  GSAP: y bounce loop (0 → 8px → 0), repeat -1, duration 1.2s
```

### Step 4.2 — `components/sections/ServicesGrid.tsx`

```
Layout: Section py-24. SectionHeading "What We Build".
        3×2 grid — 1 col mobile, 2 col tablet, 3 col desktop.

Each card (use <Card hover accentColor={service.accentHex}>):
  - Icon: rounded square, 15% opacity accent bg + full accent color icon (32px)
  - Tagline: small, accent color, uppercase, tracking-wider
  - Title: white, Syne, xl
  - Description: muted, DM Sans, text-sm
  - "Learn more →" link → /services/[slug]

GSAP ScrollTrigger:
  - When section hits 80% viewport: cards stagger in (opacity 0→1, y 40→0, 0.12s stagger)
  - Hover per card: gsap.quickTo for smooth border-color glow

IMPORTANT — "Spotlight" feature block below the grid:
  Full-width, 2-column split (lg:grid-cols-2), dark card, rounded-2xl
  LEFT half — AI spotlight:
    Cyan accent. Heading "AI & Machine Learning".
    Mock "AI chat" UI element (static HTML):
      Small dark box with chat bubbles — user asks, AI responds.
      Purely decorative, shows visual capability.
  RIGHT half — Finance spotlight:
    Gold accent. Heading "Finance & Bookkeeping".
    Mock "dashboard" UI element (static HTML):
      Small dark box with fake P&L numbers, a mini bar chart made of divs.
      Purely decorative.
  Purpose: visually communicate what each service LOOKS like to the client.
```

### Step 4.3 — `components/sections/StatsBar.tsx`

```
Layout: bg-[#0A0F1E], py-16, 4-column grid, vertical separator lines

Stats:
  50+    Projects Delivered
  12     Countries Served
  98%    Client Retention
  4.9★   Average Rating

GSAP count-up:
  ScrollTrigger fires once when bar enters viewport.
  Tween { val: 0 } → { val: target } on each stat.
  onUpdate: write Math.floor(self.targets()[0].val) to a DOM ref.
  For "★" and "%" append the suffix after the number.

Design: each stat = large number (white, Syne, 4xl) + label (muted, sm)
        Subtle horizontal gradient across the bar (left cyan tint, right purple tint)
```

### Step 4.4 — `components/sections/HowWeWork.tsx`

```
Layout: Section py-24. SectionHeading "Our Process".
        Horizontal on desktop, vertical on mobile.

Steps:
  01 Discover  — "We audit your goals, tech stack, and market position."
  02 Design    — "UI/UX blueprints, architecture diagrams, and a delivery plan."
  03 Build     — "Agile sprints, weekly demos, full transparency throughout."
  04 Launch    — "Deployment, monitoring, handoff, and 30-day support included."

Design:
  Large gradient step number (Syne, 5xl, gradient cyan→blue)
  Title (white, Syne, xl) + description (muted, DM Sans)
  Between steps: SVG dashed line (desktop), vertical line (mobile)

GSAP:
  ScrollTrigger: SVG path stroke-dashoffset animates 100%→0 as user scrolls
  (the connecting line "draws" across the page).
  Each step fades in when the line reaches it.
```

### Step 4.5 — `components/sections/FeaturedWork.tsx`

```
Layout: Section py-24. SectionHeading "Featured Work". 3-column grid.

Cards:
  1. "AI Recruitment Platform"
     Accent: cyan · Category: AI / SaaS
     Metric displayed large: "60% faster hiring"
     Desc: "Automated candidate screening with custom LLM scoring."

  2. "Fintech Dashboard"
     Accent: gold · Category: Finance / Web
     Metric: "$2M+ tracked monthly"
     Desc: "Real-time P&L, payroll automation, multi-entity bookkeeping."

  3. "React Native Sports App"
     Accent: purple · Category: Mobile
     Metric: "50k+ active users"
     Desc: "Live match scoring, ticketing, push notifications."

Card design:
  Top: large gradient block (acts as image placeholder)
    Metric displayed centered, white, bold, 3xl
  Body: Category badge + Title (Syne, xl) + desc (muted) + "View Case Study →"

GSAP:
  ScrollTrigger: cards slide in from bottom with stagger.
  Hover: border glows accent color + metric number pulses once.
```

### Step 4.6 — `components/sections/TechMarquee.tsx`

```
Two rows scrolling in opposite directions.
Row 1 (→left): React · Next.js · TypeScript · Node.js · Python · FastAPI · Django · GraphQL
Row 2 (←left): AWS · Docker · Kubernetes · PostgreSQL · MongoDB · Redis · OpenAI · Stripe

Design:
  Each item: text in muted color, light border pill, monospace or DM Sans
  Left + right edges: fade mask via CSS gradient overlay (transparent → bg)
  Duplicate the array in JSX for seamless loop

GSAP implementation:
  gsap.to(row1Ref, { x: '-50%', duration: 30, ease: 'none', repeat: -1 })
  gsap.to(row2Ref, { x: '50%',  duration: 25, ease: 'none', repeat: -1 })
  On mouseenter: gsap.to(tween, { timeScale: 0, duration: 0.5 })
  On mouseleave: gsap.to(tween, { timeScale: 1, duration: 0.5 })
```

### Step 4.7 — `components/sections/Testimonials.tsx`

```
Two glassmorphism cards side by side (stack on mobile).

Card 1:
  Large " (gradient, 5xl, Syne)
  "Nexquora delivered our AI platform in 8 weeks. The quality was
   exceptional — they understood our domain without us having to
   explain the basics."
  — Sarah K., CTO @ TalentFlow
  ★★★★★

Card 2:
  "Their fintech team understood compliance requirements from day one.
   KYC workflows, audit trails — everything was built right the first time."
  — Ahmed R., CFO @ PayBridge
  ★★★★★

Design: subtle cyan top border on each card. Stars in gold (#FFB800).
GSAP: cards fade + slide up on scroll (stagger 0.15s).
```

### Step 4.8 — `components/sections/CareerTeaser.tsx`

```
Dark section, centered content.
Heading: "Join the team building what's next"
Sub: "Remote-first · Competitive pay · Meaningful work"

3 job cards in a row (stack on mobile):
  Senior AI Engineer      [AI] [Remote]
  Full Stack Developer    [Web] [Remote]
  DevOps Engineer         [Infrastructure] [Remote]

Each card: glassmorphism, title + badges + "Apply →" button.
CTA: <Button variant="outline">See all openings →</Button> → /careers
```

### Step 4.9 — `components/sections/ContactBanner.tsx`

```
Full-width section.
Top border: linear-gradient(90deg, cyan, purple, transparent)
Background: subtle radial gradient (cyan orb, very low opacity)

Centered:
  Heading: "Ready to build something great?"
  Sub: "Tell us about your project — we'll respond within 24 hours."
  Button: "Start the conversation →" → /contact

GSAP: wrap heading words in spans, stagger them in as section enters viewport
(poor man's SplitText — no plugin needed).
```

### Step 4.10 — `app/(marketing)/page.tsx`

```tsx
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import StatsBar from '@/components/sections/StatsBar'
import HowWeWork from '@/components/sections/HowWeWork'
import FeaturedWork from '@/components/sections/FeaturedWork'
import TechMarquee from '@/components/sections/TechMarquee'
import Testimonials from '@/components/sections/Testimonials'
import CareerTeaser from '@/components/sections/CareerTeaser'
import ContactBanner from '@/components/sections/ContactBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsBar />
      <HowWeWork />
      <FeaturedWork />
      <TechMarquee />
      <Testimonials />
      <CareerTeaser />
      <ContactBanner />
    </>
  )
}
```

---

# PHASE 5 — Services Pages

### Step 5.1 — `app/(marketing)/services/page.tsx` (All Services Overview)

```
Hero: "Everything you need to scale" + subheading
6 large service cards (more spacious than homepage grid)
Each card links to its detail page.

"Compare services" table at bottom:
  Rows: AI | Web | Mobile | DevOps | Fintech | Bookkeeping
  Cols: Best For | Typical Timeline | Starting Budget
```

### Step 5.2 — `app/(marketing)/services/finance/page.tsx` ⭐ (Most Detailed)

This is the flagship service page and template for all others. Build it in full.

**Section 1 — Hero**
```
Background: gold + amber radial gradient orbs
Badge: "Financial Technology & Operations"
H1: "Fintech & Financial" (white) + "Operations" (gradient gold→amber)
Sub: "From payment systems to payroll — we handle the financial
infrastructure that keeps your business running and growing."
CTAs: "Get a Free Audit →" (primary) + "View Our Work" (outline)
```

**Section 2 — Sub-service Tabs (Fintech | Bookkeeping & Payroll)**

```
Sticky tab switcher below nav on desktop (GSAP ScrollTrigger pin).
Framer Motion AnimatePresence for tab content swap.

TAB 1 — Fintech Solutions:
  Left col — capabilities with check icons:
    ✓ Payment system integration (Stripe, custom gateways)
    ✓ Real-time financial dashboards
    ✓ Compliance automation (KYC / AML workflows)
    ✓ Secure transaction processing
    ✓ Multi-currency support
    ✓ Fraud detection systems
  Right col — mock "dashboard" UI (static styled component):
    Dark card with fake chart bars + numbers. Visual only.

TAB 2 — Bookkeeping & Payroll:
  Two sub-columns rendered side by side:

  LEFT — BOOKKEEPING:
    Intro: "Systematic recording of every financial transaction your
    business makes — the foundation of financial clarity."
    
    Core tasks:
      • Recording daily transactions (sales, purchases, expenses)
      • Reconciling bank and credit card statements
      • Managing accounts payable and receivable
      • Maintaining the general ledger
      • Generating P&L, balance sheet, and cash flow reports

    Services we offer:
      - Monthly / quarterly bookkeeping
      - Catch-up and cleanup bookkeeping
      - AP & AR management
      - Bank reconciliation
      - Financial reporting & analysis
      - Tax preparation support

  RIGHT — PAYROLL:
    Intro: "Calculating and distributing employee compensation while
    managing every tax obligation — accurately and on time."
    
    Core tasks:
      • Calculating gross pay (salary, hourly, overtime)
      • Deducting federal and state taxes + FICA
      • Deducting benefits (health insurance, 401k)
      • Issuing paychecks and direct deposits
      • Filing payroll returns (941, 940)
      • Issuing W-2s and 1099s at year-end

    Services we offer:
      - Full-service payroll processing
      - Payroll tax filing & deposits
      - New hire reporting
      - Time & attendance integration
      - Benefits administration
      - Workers' comp management
      - HR compliance support
```

**Section 3 — "How Bookkeeping & Payroll Work Together"**

```
4-step horizontal flow with connecting arrows:

  Step 1: Track Revenue & Expenses
    "Every sale, purchase, and expense is recorded in real time."

  Step 2: Record Payroll as Expense
    "Salaries, taxes, and benefits flow directly into your books."

  Step 3: Reconcile Bank Accounts
    "We match every transaction to your statements — zero discrepancies."

  Step 4: Produce Financial Statements
    "Clean P&L, balance sheet, and cash flow — ready for decisions."

Design: cards connected by SVG arrows. Each: number + icon + title + desc.
GSAP: cards animate in left→right with SVG line drawing between them.
```

**Section 4 — Who Needs This (3 persona cards)**

```
Startups (0–20 employees):
  "Get clean books from day one. Avoid costly corrections later.
   Focus on building — we handle the numbers."
  Badge: "Startup-friendly pricing"

Growing SMBs (20–200 employees):
  "Multi-entity bookkeeping, payroll for distributed teams,
   and dashboards your CFO will actually love."
  Badge: "Most popular"

Enterprise Teams (200+ employees):
  "Complex org structures, multi-currency, audit-ready reporting,
   and ERP integration."
  Badge: "Custom engagement"
```

**Section 5 — CTA**

```
Heading: "Get a free financial operations audit"
Sub: "We'll review your bookkeeping, payroll, and reporting and tell
you exactly where you're losing time and money."
Inline mini-form: Name, Email, Company size dropdown, Challenge textarea.
POST to /api/contact with service: 'finance-audit'
```

### Step 5.3 — `app/(marketing)/services/ai/page.tsx`

Follow the finance page template. Key content:

```
Hero: cyan orbs · Badge: "AI & Machine Learning"
Capabilities: LLM integration, custom model training, AI automation pipelines,
computer vision, intelligent chatbots, RAG systems, vector databases.
"How we build AI products" — 5-step timeline with GSAP path drawing:
  Discovery → Data Audit → Model Design → Integration → Monitoring
Use case cards: Customer Support AI, Document Intelligence, Predictive Analytics.
Tech stack badges: OpenAI, Anthropic, HuggingFace, LangChain, Python, FastAPI, Pinecone.
CTA: "Book a free AI readiness assessment →"
```

### Step 5.4 — `app/(marketing)/services/web/page.tsx`

```
Hero: blue orbs · Badge: "Full-Stack Web Development"
Capabilities: SaaS platforms, enterprise portals, API development, CMS-driven sites.
Tech: Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, tRPC.
Process: Discovery → Wireframes → Build → QA → Launch
CTA: "Get a project estimate →"
```

### Step 5.5 — `app/(marketing)/services/mobile/page.tsx`

```
Hero: purple orbs · Badge: "Cross-Platform Mobile"
Capabilities: React Native iOS + Android, App Store submission, push notifications,
offline support, in-app purchases.
Tech: React Native, Expo, TypeScript, Firebase, Stripe Mobile SDK.
Process: Design → Build → Test → App Store
CTA: "Start your mobile project →"
```

### Step 5.6 — `app/(marketing)/services/devops/page.tsx`

```
Hero: green orbs · Badge: "DevOps & Cloud Infrastructure"
Capabilities: CI/CD (GitHub Actions, GitLab CI), AWS + Azure, Docker, Kubernetes,
Terraform, monitoring (Datadog, Grafana), zero-downtime deployments.
Tech: AWS, Azure, Docker, Kubernetes, Terraform, Ansible, Prometheus.
CTA: "Audit your infrastructure →"
```

---

# PHASE 6 — Careers Page

### Step 6.1 — `app/(marketing)/careers/page.tsx`

```
Hero:
  "Build the future with us"
  "Remote-first team solving hard problems in AI, fintech, and beyond."
  CTA: "See open roles ↓" (smooth scroll anchor)

Culture strip (4 pillars):
  Remote First · Async Friendly · Equity for All · Learning Budget
  Each: icon + label + 1-line desc

Filter tabs: All | AI | Web | Mobile | DevOps | Finance
  Client component, useState for active tab.
  Fetch jobs from /api/careers on mount.
  Filter displayed jobs by department.

Job cards grid (2 cols desktop, 1 mobile):
  Each card (glassmorphism):
    Department badge (accent color) + type badge (gray)
    Title (Syne, xl)
    Location + salary (muted, with MapPin + DollarSign icons)
    Short description (2 lines)
    "Apply Now →" button → opens apply modal

Apply Modal (Framer Motion AnimatePresence):
  Fields: Name, Email, LinkedIn URL, "Why Nexquora?" textarea
  File upload slot: Resume (label only — TODO: connect to storage)
  POST to /api/careers with jobId
  Success: animated checkmark + "We'll be in touch within 48 hours"
```

---

# PHASE 7 — Contact Page

### Step 7.1 — `app/(marketing)/contact/page.tsx`

```
Two-column layout (lg:grid-cols-2, gap-16):

LEFT — Contact Info:
  Heading: "Let's talk about your project"
  Items (with icons):
    Email: hello@nexquora.com
    Response time: < 24 hours
    Location: Remote · Global
    Hours: Mon–Fri, 9am–6pm EST
  Social row: LinkedIn, GitHub, X
  Note: "NDA available on request"

RIGHT — Contact Form (client component):
  Fields:
    Name* (Input)
    Email* (Input)
    Company (Input, optional)
    Service* (Select dropdown):
      AI & Machine Learning
      Web Development
      Mobile Apps
      DevOps & Cloud
      Fintech Solutions
      Bookkeeping & Payroll
      Multiple Services
      Other / Not Sure
    Budget (Select dropdown):
      < $10k
      $10k – $50k
      $50k – $150k
      $150k+
      Not sure yet
    Message* (Textarea, min 20 chars)
    Submit button: "Send Message →"

  Behavior:
    Client-side Zod validation → inline field errors
    POST to /api/contact
    Loading: spinner in button, fields disabled
    Success: form replaced by animated checkmark (Framer Motion)
             + "Message sent! We'll reply within 24 hours."
    Error: red banner at top of form

  URL param: if ?role=X in URL, pre-fill message with "Applying for: [X]"
```

---

# PHASE 8 — API Routes

### Step 8.1 — `app/api/contact/route.ts`

```ts
// POST /api/contact
// TODO: Replace console.log with Resend:
//   import { Resend } from 'resend'
//   const resend = new Resend(process.env.RESEND_API_KEY)
//   await resend.emails.send({ from, to: 'hello@nexquora.com', subject, html })

Zod schema:
  name:    z.string().min(2)
  email:   z.string().email()
  company: z.string().optional()
  service: z.string()
  budget:  z.string().optional()
  message: z.string().min(10)

Success: { success: true, message: "We'll be in touch within 24 hours." }
Error:   { success: false, errors: zodError.flatten().fieldErrors }
```

### Step 8.2 — `app/api/careers/route.ts`

```ts
// GET  /api/careers         → return all jobs (filter by ?department=AI)
// POST /api/careers         → receive job application
// TODO GET:  fetch from Lever / Greenhouse ATS API
// TODO POST: forward to ATS or send via Resend

GET response:  { jobs: Job[] }
POST Zod schema:
  jobId:        z.string()
  name:         z.string().min(2)
  email:        z.string().email()
  linkedIn:     z.string().url().optional()
  whyNexquora:  z.string().min(20)
```

### Step 8.3 — `app/api/services/route.ts`

```ts
// GET /api/services          → return all services
// GET /api/services?slug=ai  → return single service
// TODO: Replace static import with CMS API call (Sanity / Contentful)

Response: { services: Service[] } or { service: Service }
```

---

# PHASE 9 — About Page

### Step 9.1 — `app/(marketing)/about/page.tsx`

```
Section 1 — Mission:
  Large gradient heading: "We exist to build technology that gives
  founders and growing companies an unfair advantage."

Section 2 — Story (2-column):
  Left: Text — founding story, values, remote-first from day one.
  Right: Abstract GSAP-animated geometric shapes (CSS divs, no images).

Section 3 — Values (4 cards):
  Speed without shortcuts
  Remote by design
  Client obsession
  Radical transparency

Section 4 — Team (placeholder cards):
  Gradient circle avatar (initials) + Name + Role
  "More team members joining soon."

Section 5 — CTA → /contact
```

---

# PHASE 10 — Polish & Production

### Step 10.1 — Security headers in `next.config.ts`

Add `headers()` function returning:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Step 10.2 — SEO metadata per page

Each page exports `generateMetadata()`:
- Unique title and description
- OG image: `/og-image.png` (create 1200×630 placeholder in `/public`)
- Canonical URL
- Twitter card

### Step 10.3 — Accessibility pass

- All interactive elements: `aria-label`
- Visible focus rings (override Tailwind default outline-none on inputs)
- Color contrast ≥ 4.5:1 on all body text
- GSAP respects `prefers-reduced-motion`:
  ```ts
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // all GSAP animations here
  })
  ```

### Step 10.4 — Loading + Error states

- `app/(marketing)/loading.tsx` — skeleton matching page layout
- `app/(marketing)/error.tsx` — branded error page with "Go home"
- `app/not-found.tsx` — 404 page with animated large "404" + links

### Step 10.5 — Final checks

```bash
pnpm build      # zero type errors
pnpm lint       # zero warnings
# Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO
# Test at 375px mobile viewport
# Navigate between pages — verify no GSAP console errors (cleanup working)
# Keyboard navigation: tab through all interactive elements
```

---

# Quick Reference — Services

| Service | Slug | Route | Accent Color |
|---|---|---|---|
| AI & Machine Learning | `ai` | `/services/ai` | cyan `#00F5FF` |
| Web Development | `web` | `/services/web` | blue `#3B82F6` |
| Mobile Apps | `mobile` | `/services/mobile` | purple `#7C3AED` |
| DevOps & Cloud | `devops` | `/services/devops` | green `#10B981` |
| Fintech + Bookkeeping | `finance` | `/services/finance` | gold `#FFB800` |

---

# How to Use This Guide With AI

**Per session workflow:**

1. Open a new AI conversation
2. Paste the **Brand System** block at the top
3. Paste the specific step you want built
4. Say: *"Implement only this step. Do not create files outside the ones listed.
   Use Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict."*
5. Test in the browser before moving to the next step

**Prompts that work well:**

```
"Implement Step 4.2 — ServicesGrid. Use GSAP ScrollTrigger for the card
stagger animation and the spotlight block below the grid. Follow the brand
system colors from the top of project.md."

"The Navbar mega-dropdown isn't animating. Fix it using GSAP autoAlpha
and y tween on hover, as described in Step 3.1."

"Build Section 3 of the finance page (Step 5.2) — the 4-step
'How Bookkeeping & Payroll Work Together' flow with GSAP line-drawing."
```

**When something looks wrong:**
Paste the relevant design rule and say: *"The current output doesn't match this
spec — fix specifically: [describe the gap]."*

---

*Last updated: 2025-05-23 · Next.js 16 · React 19 · Tailwind v4 · GSAP 3*
