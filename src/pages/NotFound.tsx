import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { Section } from '../ds/primitives';
import { homePath } from '../routes';

export function NotFound({ content }: { content: SiteContent }) {
  return (
    <Section gridLines>
      <div className="mc-notfound">
        <span className="mc-notfound__code">404</span>
        <h1 className="mc-sechead__title">{content.notFound.title}</h1>
        <p className="mc-sechead__lead">{content.notFound.body}</p>
        <div>
          <Button variant="signal" href={homePath(content.lang)}>
            {content.notFound.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
