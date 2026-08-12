import type { SiteContent } from './types';

/**
 * English is the primary channel and the authored original — this copy is
 * transcribed from Mateus's own text sprint, not translated from Portuguese.
 * British spelling throughout (optimised, prioritisation, summarised).
 */
export const en: SiteContent = {
  lang: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Mateus Cardoso — Senior full-stack developer',
    description:
      'Writing code stopped being the differentiator. What makes the difference is understanding the business behind it. 40k+ offers an hour across 100+ marketplaces, −30% in routing cost, −73% fewer support tickets.',
    siteName: 'Mateus Cardoso',
  },

  nav: {
    items: [
      { id: 'proof', label: 'proof' },
      { id: 'cases', label: 'cases' },
      { id: 'method', label: 'method' },
      { id: 'about', label: 'about' },
      { id: 'experience', label: 'experience' },
      { id: 'contact', label: 'contact' },
    ],
    soundLabel: 'sound',
    soundOn: 'Sound on',
    soundOff: 'Sound off',
    skip: 'Skip to content',
  },

  hero: {
    eyebrow: 'Senior full-stack developer',
    titleBefore: 'Writing code stopped being the differentiator. What makes the difference is ',
    titleHighlight: 'understanding the business behind it',
    titleAfter: '.',
    lead: 'I look at a project from both sides: the business rule, the user, how the client reads the result. And I build it with an optimised workflow — process, structure and AI as part of it.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'See the cases',
    stack: [
      'Ruby on Rails',
      'NestJS',
      'Hono',
      'Next.js',
      'React Native',
      'Vite',
      'Python',
      'PostgreSQL',
      'Turborepo',
    ],
  },

  proof: {
    label: '01 / Quick proof',
    items: [
      { value: '−73%', label: 'fewer support tickets after the AI pipeline I built' },
      { value: '−30%', label: 'in travel cost across 70+ field routes after the routing work' },
      { value: '40k+', label: 'offers monitored per hour across 100+ marketplaces' },
      { value: '2,000+', label: 'paying users on a product I helped build' },
      { value: '200', label: 'people on the waitlist of a product of my own, before any marketing' },
    ],
  },

  cases: {
    index: '02',
    eyebrow: 'Cases',
    title: 'Told by the decision, not by the stack',
    lead: 'Each case follows the same shape: context, my role, the decision, the trade-off it carried, and the outcome. Clients are not named — restricted work is described by architecture and scale.',
    readMore: 'Read the full case →',
    detail: {
      back: '← back',
      context: 'Context',
      role: 'Role',
      decision: 'Decision',
      tradeoff: 'Trade-off',
      outcome: 'Outcome',
      architecture: 'Architecture',
      next: 'Next case →',
      previous: '← Previous case',
    },
    items: [
      {
        id: 'scraping',
        index: 'Case 01 · Price monitoring',
        result: '40k+ offers / hour',
        title: 'Collecting 40k offers an hour across 100+ marketplaces, with proof attached',
        context:
          "The product monitors price offers — the brand's and its competitors' — across many marketplaces, 24/7. The hard rule came from the business side: the whole universe of offers has to be collected inside a one-hour window that starts at :00 and closes at :59.",
        role: 'I designed and run the collection end to end, from the architecture to keeping it healthy in production.',
        decision:
          'A serial crawler could never fit that window, so the collection scales horizontally on Kubernetes — 100 GB+ machines, 150+ pods. Each collection stores a screenshot as evidence, which is what lets the client audit any offer, and an anti-detection layer keeps the crawlers from being blocked as bots.',
        tradeoff:
          'It costs more infrastructure and permanent maintenance of the anti-bot evasion. That is a cost I chose knowingly, because the window and the proof are what the client is actually buying.',
        outcome:
          '40k+ offers monitored across 100+ marketplaces, complete inside the hourly window, with visual proof per offer.',
        tags: ['Kubernetes', 'Anti-bot', 'Auditability'],
        flow: [
          { label: 'scheduler' },
          { label: '150+ pods' },
          { label: 'screenshot' },
          { label: 'proof', accent: true },
        ],
      },
      {
        id: 'routing',
        index: 'Case 02 · Field routing',
        result: '−30%',
        title: '−30% in travel cost across 70+ field routes',
        context:
          '70+ routes across Brazil, walked by people who visit stores to audit them. The routes had to be optimised without ignoring what field work really looks like.',
        role: 'Modelling the problem with the operations team, choosing the solver and connecting it to the real cost of travel.',
        decision:
          'The problem is a VRPTW, so I modelled it with Google OR-Tools (this was before LLMs), adding penalties, visit priority by coordinate and real capacity limits: working hours, lunch, first and last store, the trip home. Public transport cost came from Google APIs per city, and where there was no data, from the average fare by postal code — so a route could be checked for economic sense, not only geographic sense.',
        tradeoff:
          'A classic solver means modelling every constraint by hand, which is slower to build. I took that on because the flexibility to tune each parameter mattered more than getting there fast.',
        outcome: '−30% in real travel cost compared to what was being spent before.',
        tags: ['OR-Tools', 'VRPTW', 'Google APIs'],
        flow: [
          { label: 'constraints' },
          { label: 'VRPTW' },
          { label: 'real cost' },
          { label: 'feasible route', accent: true },
        ],
      },
      {
        id: 'apex',
        index: 'Case 03 · Apex · Product of my own',
        result: '200 on the waitlist',
        title: 'A product built inside a domain I live in, with 200 people waiting before any marketing',
        context:
          'Training apps are fragmented by sport. Apex is my attempt to bring multi-sport training and AI coaching into one place. I train — running, strength, trail, conditioning — so I am the user, which removes most of the ramp-up in understanding the domain.',
        role: 'Everything: product, back end, front end in Vite, AI orchestration with context optimisation, infrastructure and go-to-market.',
        decision:
          'Marketing is treated as part of the product: automated blog content with real sources, social output and an SEO structure built to rank. On the infrastructure side I leaned on managed services — Fly.io and Vercel for hosting, AWS workers, Trigger.dev for background jobs, Supabase for auth, Stripe for payments — so one person could carry the whole thing.',
        tradeoff:
          'The scope is large for one person, and leaning on automation means also maintaining those pipelines. In exchange I get to learn each of those services deeply, which comes back into the work I do for others.',
        outcome: '~200 people on the interest list with no marketing spend. Launch is close.',
        tags: ['Product of my own', 'AI', 'Vite'],
        flow: [
          { label: 'training' },
          { label: 'athlete context' },
          { label: 'AI coaching', accent: true },
        ],
      },
    ],
  },

  method: {
    index: '03',
    eyebrow: 'Method',
    title: "The part of the work that isn't code",
    lead: 'Building is the last step. Most of what determines whether a project works happens before and around it — and each principle below points at something I actually did.',
    loopLabel: 'Verifiable AI loop',
    loop: [
      { label: 'context' },
      { label: 'plan' },
      { label: 'verifiable units' },
      { label: 'review', sub: 'final check is mine', accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'AI as a process I can verify',
        body: 'Context comes before the prompt, work is broken into units that can be checked, and review happens in a loop. Generated code follows the architecture and the standards agreed at the start, and documentation is the point of truth for the flow. The final review is mine.',
        evidence:
          'Support pipeline that cut tickets by 73%: user question → AI reads the context → checks the documentation → resolves it, or opens a ticket already summarised for me.',
      },
      {
        marker: '02',
        title: 'Talking to people who are not developers',
        body: 'A technical decision only means something when it is translated into cost, deadline and risk. At one point the product was too complex for the sales team to present on its own, so I joined the calls as the person who explains it.',
        evidence:
          'Showing the flow in non-technical terms to leadership helped unlock large contracts with leading electronics and retail brands.',
      },
      {
        marker: '03',
        title: 'Architecture chosen by the constraint',
        body: 'Scale, dependencies, cost and trade-off come before the stack. Knowing many tools is useful mostly because it makes the choice possible.',
        evidence: 'OR-Tools on the routing VRPTW —',
        evidenceLink: { text: 'see case 02', caseId: 'routing' },
      },
      {
        marker: '04',
        title: 'I run the infrastructure I design',
        body: 'I like infrastructure and networking enough to keep my own self-hosted setup running. Operating it keeps my architectural decisions anchored in what actually has to be maintained.',
        evidence: 'Proxmox · TrueNAS · UniFi · 10GbE · RAID 10 · Home Assistant · Arduino · UPS',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'About',
    title: 'Context, not biography',
    paragraphs: [
      'I am a senior full-stack developer. I joined my current company as an intern and moved through every level it has, which today means I am involved beyond development: product structuring, planning, prioritisation and conversations with clients and end users.',
      'Alongside that work I build products of my own, always in areas I already know from the inside. Sport is the clearest example: I train, I study it, and Apex came out of using what I already understand as a practitioner to build something useful for other people.',
      'I have been self-taught since I was a kid. I started studying quadcopters when there was nothing ready to buy, then networks, then servers — I built my own network and my own home server because I wanted to understand how they work, not because a job asked for it.',
      'That habit keeps paying off in work that is not strictly development. Infrastructure is the clearest case: from the self-hosted setup at home to Fly.io, Vercel and AWS workers on my own projects, each thing I set up becomes something I can bring to the next problem.',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experience',
    title: 'Where the work happened',
    entries: [
      {
        period: 'in parallel',
        role: 'Products of my own',
        org: 'Apex',
        current: true,
        body: 'Apex is a multi-sport training product with AI coaching, built in a domain I practise myself. Carrying it alone meant learning the surrounding pieces properly: hosting on Fly.io and Vercel, workers on AWS, background jobs on Trigger.dev, Supabase for fast auth and Postgres, Stripe for payments, transactional email, and analytics to follow what people actually do. Each of those comes back into the work I do for clients.',
      },
      {
        period: 'mar 2020 — now',
        role: 'Software engineer',
        org: 'Tracking Trade',
        current: true,
        body: 'I work across several products at once, which pushed a lot of structural work: consolidating services into a monorepo, standardising how new projects start, and automating parts of the operation that used to depend on someone being available. Price monitoring and field routing are the two largest pieces, and I also built the support pipeline that reads context and documentation before a ticket ever reaches a person.',
      },
      {
        period: 'jul 2018 — feb 2020',
        role: 'Full stack',
        org: 'Tracking Trade',
        body: 'The internship went well enough that I was moved to a full-stack position in a short period. From there I took part in most of the product front: the migration from AngularJS to React and from Ionic to React Native, plus new products and market features.',
      },
      {
        period: 'apr — jun 2018',
        role: 'Intern',
        org: 'Tracking Trade',
      },
    ],
    columns: [
      {
        label: 'Product and web',
        value: 'Next.js · React · React Native · Expo · Vite · tRPC · Drizzle',
      },
      {
        label: 'Back end and data',
        value: 'Ruby on Rails · NestJS · Hono · Python · PostgreSQL · Supabase · Trigger.dev',
      },
      {
        label: 'Infrastructure and services',
        value:
          'Kubernetes · Fly.io · Vercel · AWS · Google Cloud · Stripe · self-hosted: Proxmox, TrueNAS, UniFi',
      },
      {
        label: 'Education',
        value:
          'BSc in Information Systems (UFPE) · Technical degree in Computer Networks (ETEMAC)',
      },
    ],
  },

  contact: {
    index: '06',
    eyebrow: 'Contact',
    title: 'Two paths, zero friction',
    lead: 'If you are hiring for a project, tell me the business problem. If you are recruiting, the CV carries the same numbers as this page.',
    cvButton: 'Read the CV',
    directLabel: 'Or go direct',
    formName: 'Name',
    formNamePlaceholder: 'What should I call you?',
    formEmail: 'Email',
    formEmailPlaceholder: 'you@company.com',
    formMessage: 'Context',
    formMessagePlaceholder: 'What business problem do you need solved?',
    submit: 'Send',
    sending: 'Sending…',
    sentLabel: 'Received',
    sentBody: 'I reply within one business day.',
    sendAnother: 'Send another',
    errorLabel: 'Not sent',
    errorBody: 'Something broke on the way. Write to me directly at mateuscardosogs@gmail.com.',
    required: 'Required.',
    invalidEmail: 'Check the email address.',
  },

  footer: {
    cvLink: 'cv',
  },

  notFound: {
    title: 'This page does not exist',
    body: 'The link is broken or the page was retired in the 2026 rebuild.',
    cta: 'Go to the home page',
  },

  cv: {
    title: 'Mateus Cardoso — CV',
    description: 'One-column, ATS-safe CV of Mateus Cardoso, senior full-stack developer.',
    role: 'Senior full-stack developer',
    location: 'Recife, Brazil · remote (BR / EU / US)',
    summaryLabel: 'Summary',
    summary:
      'Senior full-stack developer. Writing code stopped being the differentiator; what makes the difference is understanding the business behind it. I look at a project from both sides — the business rule, the user, how the client reads the result — and I build it with an optimised workflow, with process, structure and AI as part of it. I also run products of my own, and the infrastructure behind them.',
    experienceLabel: 'Experience',
    jobs: [
      {
        role: 'Software engineer',
        org: 'Tracking Trade',
        period: 'mar 2020 — now',
        bullets: [
          'Designed and run price collection of 40k+ offers per hour across 100+ marketplaces on 150+ Kubernetes pods, with anti-bot evasion and a screenshot stored as evidence per collection.',
          'Modelled field routing for 70+ routes as a VRPTW on Google OR-Tools, with penalties, visit priority by coordinate and real capacity limits — 30% reduction in real travel cost.',
          'Built the AI support pipeline that reads context and documentation before a ticket reaches a person, cutting tickets by 73%.',
          'Consolidated services into a monorepo and standardised how new projects start, automating parts of the operation that depended on someone being available.',
          'Joined sales calls as the person who explains the product in non-technical terms, which helped unlock large contracts with leading electronics and retail brands.',
        ],
      },
      {
        role: 'Products of my own · Apex',
        org: 'In parallel',
        period: 'in parallel',
        bullets: [
          'Multi-sport training product with AI coaching, carried end to end: product, back end, front end in Vite, AI orchestration with context optimisation, infrastructure and go-to-market.',
          'Marketing treated as part of the product: automated blog content with real sources, social output and an SEO structure built to rank.',
          'Managed services chosen so one person could carry it: Fly.io and Vercel for hosting, AWS workers, Trigger.dev for background jobs, Supabase for auth and Postgres, Stripe for payments.',
          '~200 people on the waitlist with no marketing spend.',
        ],
      },
      {
        role: 'Full stack',
        org: 'Tracking Trade',
        period: 'jul 2018 — feb 2020',
        bullets: [
          'Moved from intern to a full-stack position in a short period.',
          'Took part in most of the product front: the migration from AngularJS to React and from Ionic to React Native, plus new products and market features.',
        ],
      },
      {
        role: 'Intern',
        org: 'Tracking Trade',
        period: 'apr — jun 2018',
      },
    ],
    skillsLabel: 'Skills',
    skills: [
      { label: 'Product and web', value: 'Next.js, React, React Native, Expo, Vite, tRPC, Drizzle' },
      {
        label: 'Back end and data',
        value: 'Ruby on Rails, NestJS, Hono, Python, PostgreSQL, Supabase, Trigger.dev',
      },
      {
        label: 'Infrastructure',
        value:
          'Kubernetes, Fly.io, Vercel, AWS, Google Cloud, Stripe, self-hosted: Proxmox, TrueNAS, UniFi',
      },
    ],
    educationLabel: 'Education',
    education: [
      'BSc in Information Systems — UFPE',
      'Technical degree in Computer Networks — ETEMAC',
    ],
    printLabel: 'Print / save as PDF',
    downloadLabel: 'Download PDF',
    backLabel: '← back to the site',
  },
};
