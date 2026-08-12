import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { GeoField } from '../ds/motion';

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;
  return (
    <section className="mc-hero" id="hero">
      <GeoField density={9} speed={1.25} drift={26} />
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

        <div className="mc-hero__ctas">
          <Button variant="signal" size="lg" href="#contact">
            {hero.ctaPrimary}
          </Button>
          <Button variant="secondary" size="lg" href="#cases">
            {hero.ctaSecondary}
          </Button>
        </div>

        {/* Repertoire, not a skill list: mono, dimmed, one line, no chips. */}
        <p className="mc-hero__stack">{hero.stack.join(' · ')}</p>
      </div>
    </section>
  );
}
