import type { SiteContent } from './types';

/**
 * English is the primary channel and the authored original — the Portuguese
 * copy is adapted from it, not the other way round. British spelling
 * throughout (optimised, prioritisation, summarised).
 *
 * Every AI claim below maps to code that exists: the vision extraction, OCR +
 * LLM pipeline and audit pass in the price-monitoring product, and the AI layer
 * in Apex. Numbers are identical in both languages.
 */
export const en: SiteContent = {
  lang: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Mateus Cardoso — AI engineer & software engineer',
    description:
      'AI engineer and software engineer. I build AI automations and integrations that hold up in production: vision extraction across 100+ marketplaces, an AI support pipeline that cut tickets by 73%, and AI coaching in a product of my own.',
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
    eyebrow: 'AI engineer · Software engineer',
    availability: 'Open to AI engineering roles · remote',
    titleBefore: 'I build AI automations and integrations that ',
    titleHighlight: 'hold up in production',
    titleAfter: '.',
    lead: 'I connect LLMs to the systems a business already runs on — agents, vision extraction, structured output, background jobs — and treat every model call like the rest of the code: typed, validated, costed and reviewed.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'See the cases',
    stack: [
      'TypeScript',
      'Python',
      'Vercel AI SDK',
      'Claude',
      'OpenAI',
      'Gemini',
      'LiteLLM',
      'Trigger.dev',
      'NestJS',
      'PostgreSQL',
    ],
  },

  proof: {
    label: '01 / Quick proof',
    items: [
      { value: '−73%', label: 'fewer support tickets after the AI support pipeline I built' },
      {
        value: '158',
        label: 'per-marketplace vision-extraction configs, drafted by Claude agents and checked by a test harness',
      },
      { value: '40k+', label: 'offers monitored per hour across 100+ marketplaces' },
      { value: '−30%', label: 'in travel cost across 70+ field routes after the routing work' },
      { value: '2,000+', label: 'paying users on a product I helped build' },
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
        id: 'vision',
        index: 'Case 01 · AI extraction',
        result: '158 marketplace configs',
        title: 'Reading prices straight from the screenshot with vision models, across 100+ marketplaces',
        context:
          "The price-monitoring product already stores a screenshot of every offer as evidence. Pulling title, price, instalments and seller out of each marketplace's HTML meant a different set of selectors per site, kept up to date by hand every time a layout changed.",
        role: 'I created the vision-extraction bot and the AI audit pass, and built the pipeline that combines OCR with an LLM.',
        decision:
          'A browser bot captures the product page and Gemini Vision returns title, prices, instalments and seller as JSON, guided by a prompt config per marketplace. Instead of writing those configs by hand, a Claude agent per marketplace read two screenshots and drafted its config, and a test harness checked each one against Gemini. A second pipeline runs PaddleOCR first and has an LLM structure the text through LiteLLM, falling back to another model when validation fails. An audit pass re-reads prices and seller names from the screenshots and writes corrections back to the database.',
        tradeoff:
          'Every read now costs tokens and depends on a model provider, where a CSS selector cost nothing. I accepted that because a config is cheap to regenerate when a layout changes, and I kept the bill visible: flash-class models first, a fallback only on failed validation, and tokens and cost logged on every call.',
        outcome:
          '158 marketplace configs drafted by agents and validated by a harness, structured price data read from the same screenshot that proves it, and an audit loop that corrects the database instead of a person doing it.',
        tags: ['Gemini Vision', 'LiteLLM', 'Claude agents', 'Structured output'],
        flow: [
          { label: 'screenshot' },
          { label: 'vision LLM' },
          { label: 'schema check', sub: 'fallback model' },
          { label: 'audited price', accent: true },
        ],
      },
      {
        id: 'apex',
        index: 'Case 02 · Apex · Product of my own',
        result: '200 on the waitlist',
        title: 'AI coaching that proposes the training plan, and only applies it once the athlete confirms',
        context:
          'Training apps are fragmented by sport. Apex plans running, gym, bike and swimming in one place, with AI that builds periodised training blocks and adapts them when life gets in the way. I train myself, so I am the user — which removes most of the ramp-up in understanding the domain.',
        role: 'Everything: product, back end, front end, the AI layer, infrastructure and go-to-market.',
        decision:
          "The AI never writes straight to the athlete's plan. Generating a block, rescheduling a missed workout or adapting a session each comes back as a proposal, validated against a Zod schema with a fix-and-retry loop, and applied only after the user confirms. Brand, medical and nutrition guardrails are enforced in code, not just in the prompt. Behind it the provider is pluggable — Anthropic or OpenAI through the Vercel AI SDK — prompts are cached, each generation is costed and tracked in PostHog, usage is capped per plan, and 18+ background jobs run on Trigger.dev. The same layer drafts blog posts and Instagram copy, which a person publishes.",
        tradeoff:
          'Asking for confirmation adds a step for the user, and a validation layer is more code than a single prompt. I chose it because a training plan touches health: a wrong suggestion that applies itself costs more trust than one extra tap.',
        outcome:
          '~200 people on the interest list with no marketing spend, and an AI layer where every generation is validated, costed and tracked from day one.',
        tags: ['Vercel AI SDK', 'Structured output', 'Trigger.dev', 'Guardrails'],
        flow: [
          { label: 'athlete context' },
          { label: 'model' },
          { label: 'schema + guardrails' },
          { label: 'athlete confirms', accent: true },
        ],
      },
      {
        id: 'scraping',
        index: 'Case 03 · Price monitoring',
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
          '40k+ offers monitored across 100+ marketplaces, complete inside the hourly window, with visual proof per offer — the same screenshots the AI extraction in case 01 reads from.',
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
        index: 'Case 04 · Field routing',
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
    ],
  },

  method: {
    index: '03',
    eyebrow: 'Method',
    title: 'How I put AI into production',
    lead: 'A model call is the easy part. What makes it usable is everything around it — and each principle below points at something I actually built.',
    loopLabel: 'One AI step, in production',
    loop: [
      { label: 'context' },
      { label: 'model' },
      { label: 'schema check', sub: 'retry · fallback' },
      { label: 'code decides', sub: 'the model only proposes', accent: true },
    ],
    principles: [
      {
        marker: '01',
        title: 'The model proposes, code decides',
        body: "An LLM output is a suggestion until something deterministic accepts it: a schema, a business rule, a guardrail in code, or the user's confirmation. Nothing a model says writes straight to production data.",
        evidence: 'Apex: every plan change is a proposal, applied only after the athlete confirms —',
        evidenceLink: { text: 'see case 02', caseId: 'apex' },
      },
      {
        marker: '02',
        title: 'Structured output, with a way back',
        body: 'Every call returns typed data — Zod in TypeScript, Pydantic in Python — and a failure is expected, not exceptional: a correction retry, then a fallback model, then a clear error instead of a silent guess.',
        evidence: 'PaddleOCR → LLM via LiteLLM → validation → fallback model —',
        evidenceLink: { text: 'see case 01', caseId: 'vision' },
      },
      {
        marker: '03',
        title: 'Cost is a design constraint',
        body: "Tokens are a line on someone's bill. I pick the cheapest model that passes validation, cache prompts, log cost per call and cap usage per plan, so the spend is known before it grows.",
        evidence: 'Anthropic prompt caching · per-generation cost in PostHog · per-plan AI quotas · per-call cost in LiteLLM',
      },
      {
        marker: '04',
        title: 'Agents in the workflow, the review stays mine',
        body: 'I use agents for work that is wide and repetitive — Claude agents drafted 158 marketplace configs that a harness then checked. Context comes first, work is broken into units that can be verified, and documentation is the point of truth. The final check is mine.',
        evidence:
          'Support pipeline that cut tickets by 73%: user question → AI reads the context → checks the documentation → resolves it, or opens a ticket already summarised for me.',
      },
    ],
  },

  about: {
    index: '04',
    eyebrow: 'About',
    title: 'Context, not biography',
    paragraphs: [
      'I am an AI engineer and software engineer. I joined my current company as an intern and moved through every level it has, which today means I am involved beyond development: product structuring, planning, prioritisation and conversations with clients and end users — at one point joining sales calls as the person who explains the product to leadership.',
      'Most of my work now is putting AI to work inside real operations: automations for tasks that used to depend on someone being available, integrations with the services a business already runs on, and pipelines that read, extract and decide with a model in the loop and code holding the final word.',
      'Alongside that I build products of my own, always in areas I know from the inside. Sport is the clearest example: I train, I study it, and Apex came out of using what I understand as a practitioner to build AI coaching that is useful to other people.',
      'I have been self-taught since I was a kid: quadcopters when there was nothing ready to buy, then networks, then servers. I still run my own self-hosted setup — Proxmox, TrueNAS, UniFi, 10GbE — because operating infrastructure keeps my architecture decisions anchored in what actually has to be maintained.',
    ],
  },

  experience: {
    index: '05',
    eyebrow: 'Experience',
    title: 'Where the work happened',
    entries: [
      {
        period: 'mar 2020 — now',
        role: 'AI & software engineer',
        org: 'Tracking Trade',
        current: true,
        body: 'I work across several products at once. On the AI side I built the vision bot that reads prices from screenshots, the OCR + LLM pipeline with model fallback, an AI audit pass that corrects the database, and the support pipeline that reads context and documentation before a ticket reaches a person. On the engineering side: price collection on Kubernetes, the field-routing solver, a monorepo for the services, and automation of the parts of the operation that used to depend on someone being available.',
      },
      {
        period: 'in parallel',
        role: 'Products of my own',
        org: 'Apex',
        current: true,
        body: 'A multi-sport training product with AI coaching, built in a domain I practise myself. The AI layer runs on the Vercel AI SDK with Anthropic or OpenAI behind it: Zod-validated structured output, prompt caching, per-generation cost tracking and per-plan quotas, plus 18+ background jobs on Trigger.dev. Around it: Supabase for auth and Postgres, Stripe for subscriptions, Payload CMS, the Instagram Graph API and PostHog.',
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
        label: 'AI engineering',
        value:
          'Vercel AI SDK · Claude · OpenAI · Gemini · LiteLLM · structured output (Zod, Pydantic) · vision and OCR extraction · prompt caching · evals · Claude Code',
      },
      {
        label: 'Automation and integrations',
        value: 'Trigger.dev · Stripe · Supabase · Instagram Graph API · Google APIs · PostHog · Selenium · Playwright',
      },
      {
        label: 'Back end and data',
        value: 'TypeScript · Python · NestJS · Hono · Ruby on Rails · PostgreSQL · Redis',
      },
      {
        label: 'Product and web',
        value: 'Next.js · React · React Native · Expo · Vite · tRPC · Drizzle',
      },
      {
        label: 'Infrastructure',
        value:
          'Kubernetes · Fly.io · Vercel · AWS · Google Cloud · Railway · self-hosted: Proxmox, TrueNAS, UniFi',
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
    lead: 'If you are hiring an AI or software engineer, the CV carries the same numbers as this page. If you have a process that should run on its own, tell me what it is.',
    cvButton: 'Read the CV',
    directLabel: 'Or go direct',
    formName: 'Name',
    formNamePlaceholder: 'What should I call you?',
    formEmail: 'Email',
    formEmailPlaceholder: 'you@company.com',
    formMessage: 'Context',
    formMessagePlaceholder: 'What do you want to automate or build?',
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
    description: 'One-column, ATS-safe CV of Mateus Cardoso, AI engineer and software engineer.',
    role: 'AI engineer · Software engineer',
    location: 'Recife, Brazil · remote (BR / EU / US)',
    summaryLabel: 'Summary',
    summary:
      'AI engineer and software engineer with 8+ years building production software. I put LLMs to work inside real products and operations — vision extraction, agents, structured output, background AI jobs and integrations — and treat each model call like the rest of the code: typed, validated, costed and reviewed. I also run products of my own, and the infrastructure behind them.',
    experienceLabel: 'Experience',
    jobs: [
      {
        role: 'AI & software engineer',
        org: 'Tracking Trade',
        period: 'mar 2020 — now',
        bullets: [
          'Built the AI support pipeline that reads context and documentation before a ticket reaches a person, cutting support tickets by 73%.',
          'Created a vision-extraction bot that reads title, prices, instalments and seller from product-page screenshots with Gemini Vision into JSON; its 158 per-marketplace prompt configs were drafted by Claude agents and validated by a test harness.',
          'Built an OCR + LLM extraction pipeline (PaddleOCR, LiteLLM) with schema validation, model fallback and per-call token and cost logging, plus an AI audit pass that re-checks prices and sellers from screenshots and writes corrections back to the database.',
          'Designed and run price collection of 40k+ offers per hour across 100+ marketplaces on 150+ Kubernetes pods, with anti-bot evasion and a screenshot stored as evidence per collection.',
          'Modelled field routing for 70+ routes as a VRPTW on Google OR-Tools, with penalties, visit priority by coordinate and real capacity limits — 30% reduction in real travel cost.',
          'Consolidated services into a monorepo and standardised how new projects start, automating parts of the operation that depended on someone being available.',
          'Joined sales calls as the person who explains the product in non-technical terms, which helped unlock large contracts with leading electronics and retail brands.',
        ],
      },
      {
        role: 'Products of my own · Apex',
        org: 'In parallel',
        period: 'in parallel',
        bullets: [
          'Multi-sport training product with AI coaching, carried end to end: product, back end, front end, AI layer, infrastructure and go-to-market.',
          'AI layer on the Vercel AI SDK with pluggable Anthropic and OpenAI providers: Zod-validated structured output with a fix-and-retry loop, guardrails enforced in code, and plan changes applied only after the user confirms.',
          'Prompt caching, per-generation cost tracking in PostHog and per-plan AI quotas; 18+ background jobs on Trigger.dev, including AI drafts of blog and Instagram content that a person publishes.',
          'Integrations: Supabase auth and Postgres, Stripe subscriptions and webhooks, Payload CMS, Instagram Graph API; hosted on Fly.io and Vercel with AWS workers.',
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
      {
        label: 'AI engineering',
        value:
          'Vercel AI SDK, Anthropic Claude, OpenAI, Gemini, LiteLLM, structured output (Zod, Pydantic), vision and OCR extraction, prompt caching, evals, Claude Code',
      },
      {
        label: 'Automation and integrations',
        value: 'Trigger.dev, Stripe, Supabase, Instagram Graph API, Google APIs, PostHog, Selenium, Playwright',
      },
      {
        label: 'Back end and data',
        value: 'TypeScript, Python, NestJS, Hono, Ruby on Rails, PostgreSQL, Redis',
      },
      { label: 'Product and web', value: 'Next.js, React, React Native, Expo, Vite, tRPC, Drizzle' },
      {
        label: 'Infrastructure',
        value:
          'Kubernetes, Fly.io, Vercel, AWS, Google Cloud, Railway, self-hosted: Proxmox, TrueNAS, UniFi',
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
