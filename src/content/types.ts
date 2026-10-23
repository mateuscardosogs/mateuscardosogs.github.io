export type Lang = 'en' | 'pt';

export interface FlowNode {
  label: string;
  sub?: string;
  accent?: boolean;
}

export interface CaseItem {
  /** Stable slug — identical across languages, so /cases/<id>/ and /pt/cases/<id>/ pair up. */
  id: string;
  /** Mono kicker, e.g. "CASE 01 · PRICE MONITORING". */
  index: string;
  result: string;
  title: string;
  context: string;
  role: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  tags: string[];
  flow: FlowNode[];
}

export interface ProofItem {
  value: string;
  unit?: string;
  label: string;
}

export interface Principle {
  marker: string;
  title: string;
  body: string;
  evidence: string;
  /** Appended to the evidence line as a link into the case that backs it. */
  evidenceLink?: { text: string; caseId: string };
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  current?: boolean;
  body?: string;
}

export interface LabelledList {
  label: string;
  value: string;
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
  skills: LabelledList[];
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
    /** Short status badge next to the eyebrow — what kind of work I'm open to. */
    availability: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Mono strip under the CTAs — repertoire, not a skill list. */
    stack: string[];
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
    lead: string;
    loopLabel: string;
    loop: FlowNode[];
    principles: Principle[];
  };
  about: {
    index: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  experience: {
    index: string;
    eyebrow: string;
    title: string;
    entries: TimelineEntry[];
    /** Skill groups plus education, as the closing grid of the section. */
    columns: LabelledList[];
  };
  contact: {
    index: string;
    eyebrow: string;
    title: string;
    lead: string;
    cvButton: string;
    directLabel: string;
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
    required: string;
    invalidEmail: string;
  };
  footer: {
    cvLink: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  cv: CvContent;
}
