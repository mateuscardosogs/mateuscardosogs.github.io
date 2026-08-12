import { en } from './content/en';
import { pt } from './content/pt';
import type { Lang, SiteContent } from './content/types';

export const LANGS: Lang[] = ['en', 'pt'];

export const content: Record<Lang, SiteContent> = { en, pt };

export type PageKind = 'home' | 'case' | 'cv' | 'notFound';

export interface RouteDef {
  /** Absolute, always trailing-slashed (except the 404 stub). */
  path: string;
  lang: Lang;
  kind: PageKind;
  caseId?: string;
  /** Written to disk as this file inside dist/. */
  file: string;
  /** Left out of the sitemap. */
  noIndex?: boolean;
}

/** English lives at the root; Portuguese is prefixed. */
const prefix = (lang: Lang) => (lang === 'en' ? '' : `/${lang}`);

export const homePath = (lang: Lang) => `${prefix(lang)}/`;
export const cvPath = (lang: Lang) => `${prefix(lang)}/cv/`;
export const casePath = (lang: Lang, id: string) => `${prefix(lang)}/cases/${id}/`;
export const cvPdfPath = (lang: Lang) => `/cv/mateus-cardoso-cv-${lang}.pdf`;

const fileFor = (path: string) => `${path.replace(/^\/|\/$/g, '')}${path === '/' ? '' : '/'}index.html`;

export const routes: RouteDef[] = [
  ...LANGS.flatMap<RouteDef>((lang) => [
    { path: homePath(lang), lang, kind: 'home', file: fileFor(homePath(lang)) },
    { path: cvPath(lang), lang, kind: 'cv', file: fileFor(cvPath(lang)) },
    ...content[lang].cases.items.map<RouteDef>((c) => ({
      path: casePath(lang, c.id),
      lang,
      kind: 'case' as const,
      caseId: c.id,
      file: fileFor(casePath(lang, c.id)),
    })),
  ]),
  { path: '/404.html', lang: 'en', kind: 'notFound', file: '404.html', noIndex: true },
];

/** The same page in the other language — powers the header language switch and hreflang. */
export function alternatePath(route: Pick<RouteDef, 'kind' | 'caseId'>, lang: Lang): string {
  switch (route.kind) {
    case 'cv':
      return cvPath(lang);
    case 'case':
      return casePath(lang, route.caseId!);
    default:
      return homePath(lang);
  }
}
