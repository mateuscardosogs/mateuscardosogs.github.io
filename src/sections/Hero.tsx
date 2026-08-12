import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { GeoField } from '../ds/motion';
import { TagList } from '../ds/primitives';

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;
  return (
    <section className="mc-hero" id="hero">
      <GeoField density={9} speed={0.7} />
      <div className="mc-hero__inner">
        <div className="mc-hero__eyebrow">
          <span className="mc-hero__mark" aria-hidden="true" />
          <span className="eyebrow">{hero.eyebrow}</span>
        </div>

        <h1 className="mc-hero__title">
          {hero.titleBefore}
          <em>{hero.titleHighlight}</em>
          {hero.titleAfter}
        </h1>

        <p className="mc-hero__lead">{hero.lead}</p>

        {/* The two audiences fork here: client on the left, recruiter on the right. */}
        <div className="mc-hero__ctas">
          <Button variant="signal" size="lg" href="#contact">
            {hero.ctaClient}
          </Button>
          <Button variant="secondary" size="lg" href="#experience">
            {hero.ctaRecruiter}
          </Button>
        </div>

        <div className="mc-hero__tags">
          <TagList items={hero.tags} />
        </div>
      </div>
    </section>
  );
}
