import type { SiteContent } from './types';

/**
 * English is the primary channel: remote foreign companies read this one.
 * Copy follows the design system's content rules — first person singular,
 * show don't tell, numbers before prose, sentence case, no emoji, no client
 * names. Every claim here traces back to the consolidated content base.
 */
export const en: SiteContent = {
  lang: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Mateus Cardoso — Senior full-stack engineer',
    description:
      "I take products end to end: business rules, architecture, direct client conversation and AI as a verified process. 40k+ offers an hour on 100+ marketplaces, −30% routing cost, −73% support tickets.",
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
    eyebrow: 'Senior full-stack engineer · MCode Studio Labs',
    titleBefore: "I'm not hired to write code. I'm hired to decide ",
    titleHighlight: 'what to build',
    titleAfter: ' and why.',
    lead: 'I take products end to end: I understand the business rules, choose the architecture that fits them, talk to the client directly, and use AI as a controlled process.',
    ctaClient: 'Hire me for a project',
    ctaRecruiter: "I'm recruiting",
    tags: ['Business rules', 'Architecture under constraint', 'Direct communication', 'Verifiable AI'],
  },

  proof: {
    label: '01 / Quick proof',
    items: [
      { value: '−73%', label: 'support tickets, through an AI pipeline' },
      { value: '−30%', label: 'travel cost across 70+ field routes' },
      {
        value: '40k+',
        unit: 'offers/h',
        label: 'across 100+ marketplaces, on 150+ Kubernetes pods',
      },
      {
        value: '2,000+',
        label: 'paying users on a product I built',
        note: "partner's product · unnamed under NDA",
      },
      {
        value: '200',
        label: 'sign-ups for Apex with zero marketing',
        note: 'validated demand, not a paying base',
      },
    ],
  },

  cases: {
    index: '02',
    eyebrow: 'Cases',
    title: 'Told through the decision, not the stack',
    lead: 'Context, decision, a named trade-off, and the number at the end. Clients are never named — restricted work is described by architecture and magnitude.',
    readMore: 'Read the full case →',
    detail: {
      back: '← back',
      context: 'Context',
      role: 'My role',
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
        index: 'Case 01',
        result: '40k+ offers / hour',
        title: 'Forty thousand offers an hour across 100+ marketplaces, without getting blocked',
        context:
          'Monitor price offers for a brand and its competitors across many marketplaces, 24/7. The hard rule was the window: the entire universe of offers had to be collected inside one hour — it opens at :00, closes by :59, and starts over.',
        role: 'I owned the architecture, the infrastructure and the operation, and I answered for the number in front of the client.',
        decision:
          'Scale horizontally on Kubernetes — 150+ pods on 100 GB+ machines — instead of collecting serially. A proof screenshot per collection, so the client can audit any single data point. An anti-detection layer so the crawlers are not blocked as bots.',
        tradeoff:
          'High infrastructure cost and permanent complexity in keeping the anti-bot evasion alive. Paid deliberately: without it there is no one-hour window and no proof, and those two are the product.',
        outcome:
          '40,000+ offers monitored across 100+ marketplaces, collected in full 24/7 inside the hourly window, with visual proof attached to every offer.',
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
        index: 'Case 02',
        result: '−30% travel cost',
        title: 'Thirty per cent off the travel cost of 70+ field routes',
        context:
          '70+ routes across Brazil, walked by people who visit stores to run audits. They had to be optimised under real field constraints, not on a clean map.',
        role: 'I modelled the problem, chose the solver, tuned the constraints and validated the result against the money actually spent.',
        decision:
          'Model it as a VRPTW — vehicle routing with time windows — on Google OR-Tools, in the pre-LLM era. Adapted with penalties, per-coordinate visit priority and capacity: working hours, lunch, start and end store, trip home. Public transport cost came from Google APIs per city; where there was no data, average fare by postcode — so a route is validated economically, not only geographically.',
        tradeoff:
          'A classical model means hand-modelling every constraint, one at a time. I chose it for parameter flexibility, not for speed of implementation.',
        outcome: '−30% in real travel cost compared with what was being spent before.',
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
        index: 'Case 03',
        result: '200 sign-ups, zero marketing',
        title: 'Apex: a multi-sport app with AI coaching, run end to end by one person',
        context:
          'The sports app market is fragmented by discipline — one app per sport. The product thesis is to unify multi-sport training with AI coaching in a single place. I train across those sports myself, so I am the user.',
        role: 'Everything: product, back end, front end, AI orchestration, and the marketing pipeline that sells it.',
        decision:
          'Run it solo end to end and automate marketing and sales inside the same flow: automatic blog generation with real sources rather than generic filler, Instagram, and the SEO structure of the landing page — the blog exists to rank.',
        tradeoff:
          'Enormous scope for one person. The bet is heavy automation to make solo viable, at the cost of owning and maintaining those pipelines forever.',
        outcome: '~200 people on the interest list with no marketing spend at all. Launch is imminent.',
        caveat: 'That is validated demand, not an active paying base — it becomes a strong number at launch.',
        tags: ['Own product', 'AI', 'Vite'],
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
    eyebrow: 'How I work',
    title: 'A method with proof — every principle points at a case',
    loopLabel: 'Verifiable AI loop',
    loop: [
      { label: 'context' },
      { label: 'plan' },
      { label: 'verifiable units' },
      { label: 'review', sub: "I'm the gate", accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'AI as a verified process',
        body: 'Context before the prompt, decomposition into verifiable units, parallel workflows and a review loop. Generated code has to respect the architecture and the conventions set at the start, and documentation is the point of truth for the flow.',
        evidence:
          'A support pipeline that cut 73% of tickets: user question → AI reads the context → checks the documentation → resolves it, or opens a ticket already summarised for me.',
      },
      {
        marker: '02',
        title: 'Communication that closes contracts',
        body: 'I translate a technical decision into impact: cost, deadline, risk. I stepped into the sales channel as the presenter, on top of the engineering, because the tool was too complex for a salesperson to demo alone.',
        evidence:
          'Presenting directly to the board unlocked large contracts with leading electronics and retail brands.',
      },
      {
        marker: '03',
        title: 'Architecture under the constraint of the problem',
        body: 'I pick the tool for the constraint, not for the trend. Scale, dependencies, cost and trade-off get decided before the first line of code.',
        evidence: 'OR-Tools on the routing VRPTW — parameter flexibility chosen over raw speed.',
      },
      {
        marker: '04',
        title: 'Self-taught, with a home lab',
        body: 'I architect and operate my own self-hosted infrastructure: Proxmox, TrueNAS, UniFi, 10GbE, RAID 10, Home Assistant, UPS. It is the test bench for the infrastructure decisions I make at work.',
        evidence:
          'I learn a domain from zero: I built a quadcopter from Chinese parts at 13, before ready-made drones existed.',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'About',
    title: 'Context, not biography',
    paragraphs: [
      'I am a senior full-stack engineer and a partner at Tracking Trade, and I run MCode Studio Labs — my own studio, where Apex (multi-sport training with AI coaching) and Pricetrack (price monitoring) come from.',
      'I run, lift and hike — I am the user of Apex, so I understand the end user with no ramp-up time. Outside the product, I operate a self-hosted home lab that doubles as the test bench for the infrastructure decisions I make at work.',
    ],
    stack: [
      'Next.js',
      'React',
      'React Native',
      'NestJS',
      'Python',
      'PostgreSQL',
      'Kubernetes',
      'Supabase',
      'Trigger.dev',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experience',
    title: 'Factual track record',
    educationLabel: 'Education',
    education:
      "Bachelor's in Information Systems (UFPE) · Technical degree in Computer Networks (ETEMAC)",
    entries: [
      {
        period: 'mar 2020 — present',
        role: 'Software Engineer / Partner',
        org: 'Tracking Trade',
        current: true,
        bullets: [
          'Architected the collection of 40,000+ offers per hour across 100+ marketplaces on 150+ Kubernetes pods, with anti-bot evasion and screenshot proof.',
          'Modelled field routing as a VRPTW on Google OR-Tools for 70+ routes, cutting 30% of the real travel cost.',
        ],
      },
      {
        period: '2023 — present',
        role: 'Founder',
        org: 'MCode Studio Labs',
        bullets: [
          'Apex: a multi-sport app with AI coaching, run end to end — 200 sign-ups before launch, with no marketing.',
          'An AI support pipeline that cut 73% of tickets.',
        ],
      },
      {
        period: 'jul 2018 — feb 2020',
        role: 'Full Stack Developer',
        org: 'Tracking Trade',
        bullets: [
          'Led the AngularJS → React and Ionic → React Native migrations, alongside microservices and market-facing features.',
        ],
      },
      {
        period: 'apr — jun 2018',
        role: 'Intern',
        org: 'Tracking Trade',
      },
    ],
  },

  contact: {
    index: '06',
    eyebrow: 'Contact',
    title: 'Two paths, zero friction',
    lead: 'If you are hiring for a project, tell me the business problem. If you are recruiting, the CV carries the same numbers as this page.',
    cvButton: 'Read the CV',
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
    errorBody: 'Something broke on the way. Write to me directly at contato@mateuscardosogs.com.',
    directLabel: 'Or go direct',
    required: 'Required.',
    invalidEmail: 'Check the email address.',
  },

  footer: {
    tagline: 'Product end to end: the decision, the architecture, the client and the metric.',
    note: 'MCode Studio Labs · clients under NDA are described by architecture and magnitude, never by name.',
    cvLink: 'cv',
  },

  notFound: {
    title: 'This page does not exist',
    body: 'The link is broken or the page was retired in the 2026 rebuild.',
    cta: 'Go to the home page',
  },

  cv: {
    title: 'Mateus Cardoso — CV',
    description: 'One-column, ATS-safe CV of Mateus Cardoso, senior full-stack engineer.',
    role: 'Software Engineer · Senior full-stack',
    location: 'Recife, Brazil · remote (BR / EU / US)',
    summaryLabel: 'Summary',
    summary:
      'Senior full-stack software engineer and partner, with my own products in operation. I translate business rules into architecture, talk directly to clients and boards, and use AI as a verified process — with review and conventions, not as a loose generator. I own the decision, the code and the metric after launch.',
    experienceLabel: 'Experience',
    jobs: [
      {
        role: 'Software Engineer / Partner',
        org: 'Tracking Trade',
        period: 'mar 2020 — present',
        bullets: [
          'Architected the collection of 40,000+ offers per hour across 100+ marketplaces on 150+ Kubernetes pods, with anti-bot evasion and screenshot proof.',
          'Modelled routing for 70+ field routes as a VRPTW on Google OR-Tools, with penalties and working-hour capacity — 30% reduction in real travel cost.',
          'Built an AI support pipeline (context → documentation → resolution or summarised ticket) that cut 73% of tickets.',
          'Presented the tool directly to the boards of leading electronics and retail brands, unlocking large contracts.',
        ],
      },
      {
        role: 'Founder',
        org: 'MCode Studio Labs',
        period: '2023 — present',
        bullets: [
          'Apex — a multi-sport app with AI coaching, run end to end: product, back end, Vite front end and AI orchestration. 200 sign-ups before launch, with no paid marketing.',
          'Marketing automation inside the product flow: blog generation with real sources, Instagram, and the SEO structure of the landing page.',
          'Pricetrack — price monitoring and scraping at scale (under Tracking Trade).',
        ],
      },
      {
        role: 'Full Stack Developer',
        org: 'Tracking Trade',
        period: 'jul 2018 — feb 2020',
        bullets: [
          'Led the AngularJS → React and Ionic → React Native migrations.',
          'Built products, microservices and market-facing features from zero to operation.',
        ],
      },
      {
        role: 'Development Intern',
        org: 'Tracking Trade',
        period: 'apr — jun 2018',
      },
    ],
    skillsLabel: 'Skills',
    skills: [
      { label: 'Languages', value: 'TypeScript, JavaScript, Python, Ruby' },
      { label: 'Front end', value: 'React, Next.js, React Native, Expo, Vite' },
      {
        label: 'Back end',
        value: 'NestJS, tRPC, Trigger.dev, Ruby on Rails, PostgreSQL, Drizzle, Supabase',
      },
      { label: 'Infrastructure', value: 'Kubernetes, Docker, Proxmox, TrueNAS, UniFi, self-hosted' },
      {
        label: 'Method',
        value:
          'Architecture under constraint, optimisation (OR-Tools / VRPTW), AI as a verified process, client communication',
      },
    ],
    educationLabel: 'Education',
    education: [
      "Bachelor's in Information Systems — UFPE",
      'Technical degree in Computer Networks — ETEMAC',
    ],
    printLabel: 'Print / save as PDF',
    downloadLabel: 'Download PDF',
    backLabel: '← back to the site',
  },
};
