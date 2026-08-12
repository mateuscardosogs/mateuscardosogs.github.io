import { Shell } from './App';
import type { Lang } from './content/types';
import { CaseDetail } from './pages/CaseDetail';
import { Cv } from './pages/Cv';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { alternatePath, content, type RouteDef } from './routes';

export function Page({ route }: { route: RouteDef }) {
  const site = content[route.lang];
  const alternates: Record<Lang, string> = {
    en: alternatePath(route, 'en'),
    pt: alternatePath(route, 'pt'),
  };

  const body = (() => {
    switch (route.kind) {
      case 'home':
        return <Home content={site} />;
      case 'case':
        return <CaseDetail content={site} caseId={route.caseId!} />;
      case 'cv':
        return <Cv content={site} />;
      case 'notFound':
        return <NotFound content={site} />;
    }
  })();

  return (
    <Shell content={site} alternates={alternates} sectionLinks={route.kind === 'home'}>
      {body}
    </Shell>
  );
}
