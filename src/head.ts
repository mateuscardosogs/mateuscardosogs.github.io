import { alternatePath, content, type RouteDef } from './routes';
import { SITE } from './site';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function titleFor(route: RouteDef): string {
  const site = content[route.lang];
  switch (route.kind) {
    case 'cv':
      return site.cv.title;
    case 'case': {
      const item = site.cases.items.find((c) => c.id === route.caseId);
      return item ? `${item.title} — ${site.meta.siteName}` : site.meta.title;
    }
    case 'notFound':
      return `404 — ${site.meta.siteName}`;
    default:
      return site.meta.title;
  }
}

function descriptionFor(route: RouteDef): string {
  const site = content[route.lang];
  switch (route.kind) {
    case 'cv':
      return site.cv.description;
    case 'case': {
      const item = site.cases.items.find((c) => c.id === route.caseId);
      return item ? `${item.context} ${item.outcome}` : site.meta.description;
    }
    default:
      return site.meta.description;
  }
}

/** Person schema — this is the page a recruiter's search lands on. */
function jsonLd(route: RouteDef): string {
  const site = content[route.lang];
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.origin,
    email: `mailto:${SITE.email}`,
    jobTitle: site.cv.role,
    description: site.meta.description,
    sameAs: [SITE.github, SITE.linkedin, SITE.instagram],
    knowsAbout: [
      'Software architecture',
      'Kubernetes',
      'Distributed web scraping',
      'Vehicle routing optimisation',
      'React',
      'TypeScript',
      'AI-assisted engineering',
    ],
    worksFor: { '@type': 'Organization', name: 'Tracking Trade' },
    founder: { '@type': 'Organization', name: 'MCode Studio Labs' },
  });
}

export function renderHead(route: RouteDef): string {
  const site = content[route.lang];
  const title = titleFor(route);
  const description = descriptionFor(route);
  const canonical = SITE.origin + route.path;
  const ogImage = `${SITE.origin}/og.png`;

  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta name="author" content="${SITE.name}" />`,
    route.noIndex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE.origin}${alternatePath(route, 'en')}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${SITE.origin}${alternatePath(route, 'pt')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE.origin}${alternatePath(route, 'en')}" />`,
    `<meta property="og:type" content="${route.kind === 'case' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${site.meta.siteName}" />`,
    `<meta property="og:locale" content="${route.lang === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="theme-color" content="#fafaf9" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<script type="application/ld+json">${jsonLd(route)}</script>`,
    // Runs before first paint: arms the reveal animation without a flash of
    // already-visible content, and tells the client entry which page this is.
    `<script>document.documentElement.classList.add("js");window.__ROUTE__=${JSON.stringify({ path: route.path, lang: route.lang, kind: route.kind, caseId: route.caseId ?? null })}</script>`,
  ];

  return tags.filter(Boolean).join('\n    ');
}
