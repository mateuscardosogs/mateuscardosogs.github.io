import type { SiteContent } from '../content/types';
import { Reveal } from '../ds/motion';
import { MetricStat, Rule, Section } from '../ds/primitives';

export function Proof({ content }: { content: SiteContent }) {
  return (
    <Section id="proof" tone="sunken" tight>
      <Rule label={content.proof.label} />
      <div className="mc-proof">
        {content.proof.items.map((item, i) => (
          <Reveal key={item.value + item.label} delay={i * 60}>
            <div className="mc-proof__item">
              <MetricStat {...item} size="sm" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
