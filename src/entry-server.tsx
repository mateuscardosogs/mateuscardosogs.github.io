import { renderToString } from 'react-dom/server';
import { renderHead } from './head';
import { Page } from './Page';
import { routes, type RouteDef } from './routes';
import { SITE } from './site';
import './styles/global.css';

export { routes };
export const ORIGIN = SITE.origin;

export interface Rendered {
  html: string;
  head: string;
  lang: string;
}

/** Build-time render; the client hydrates this exact markup. */
export function render(route: RouteDef): Rendered {
  return {
    html: renderToString(<Page route={route} />),
    head: renderHead(route),
    lang: route.lang === 'pt' ? 'pt-BR' : 'en',
  };
}
