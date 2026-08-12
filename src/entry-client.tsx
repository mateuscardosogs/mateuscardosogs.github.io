import { hydrateRoot } from 'react-dom/client';
import { Page } from './Page';
import { routes, type RouteDef } from './routes';
import './styles/global.css';

declare global {
  interface Window {
    __ROUTE__?: { path: string; lang: string; kind: string; caseId: string | null };
  }
}

/** Prerendered pages announce themselves; the dev server falls back to the URL. */
function currentRoute(): RouteDef {
  const injected = window.__ROUTE__;
  if (injected) {
    const match = routes.find((r) => r.path === injected.path);
    if (match) return match;
  }

  const path = window.location.pathname.replace(/index\.html$/, '');
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return routes.find((r) => r.path === withSlash) ?? routes[routes.length - 1];
}

const container = document.getElementById('root');

if (container) {
  try {
    hydrateRoot(container, <Page route={currentRoute()} />);
  } catch (err) {
    // If the app cannot boot, undo the reveal-hiding class so the prerendered
    // content stays readable instead of sitting at opacity 0 forever.
    document.documentElement.classList.remove('js');
    throw err;
  }
}
