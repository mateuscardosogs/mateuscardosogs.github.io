export type Lang = 'en' | 'pt';

export interface FlowNode {
  label: string;
  sub?: string;
  accent?: boolean;
}

export interface CaseItem {
  /** Stable slug — identical across languages, so /cases/<id>/ and /pt/cases/<id>/ pair up. */
  id: string;
  index: string;
  result: string;
  title: string;
  context: string;
  role: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  /** Calibrated honesty note: printed under the outcome when the number needs a caveat. */
  caveat?: string;
  tags: string[];
  flow: FlowNode[];
}

export interface ProofItem {
  value: string;
  unit?: string;
  label: string;
  note?: string;
}

export interface Principle {
  marker: string;
  title: string;
  body: string;
  evidence: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  current?: boolean;
  bullets?: string[];
}

export interface CvJob {
  role: string;
  org: string;
  period: string;
  bullets?: string[];
}

export interface CvContent {
  title: string;
  description: string;
  role: string;
  summaryLabel: string;
  summary: string;
  experienceLabel: string;
  jobs: CvJob[];
  skillsLabel: string;
  skills: { label: string; value: string }[];
  educationLabel: string;
  education: string[];
  printLabel: string;
  downloadLabel: string;
  backLabel: string;
  location: string;
}

export interface SiteContent {
  lang: Lang;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
    siteName: string;
  };
  nav: {
    items: { id: string; label: string }[];
    soundLabel: string;
    soundOn: string;
    soundOff: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    ctaClient: string;
    ctaRecruiter: string;
    tags: string[];
  };
  proof: {
    label: string;
    items: ProofItem[];
  };
  cases: {
    index: string;
    eyebrow: string;
    title: string;
    lead: string;
    readMore: string;
    items: CaseItem[];
    detail: {
      back: string;
      context: string;
      role: string;
      decision: string;
      tradeoff: string;
      outcome: string;
      architecture: string;
      next: string;
      previous: string;
    };
  };
  method: {
    index: string;
    eyebrow: string;
    title: string;
    loopLabel: string;
    loop: FlowNode[];
    principles: Principle[];
  };
  about: {
    index: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    stack: string[];
  };
  experience: {
    index: string;
    eyebrow: string;
    title: string;
    entries: TimelineEntry[];
    educationLabel: string;
    education: string;
  };
  contact: {
    index: string;
    eyebrow: string;
    title: string;
    lead: string;
    cvButton: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    submit: string;
    sending: string;
    sentLabel: string;
    sentBody: string;
    sendAnother: string;
    errorLabel: string;
    errorBody: string;
    directLabel: string;
    required: string;
    invalidEmail: string;
  };
  footer: {
    tagline: string;
    note: string;
    cvLink: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  cv: CvContent;
}
