import type { SiteContent } from '../content/types';
import { FlowDiagram, Reveal } from '../ds/motion';
import { PrincipleBlock, Section, SectionHeader } from '../ds/primitives';

export function Method({ content }: { content: SiteContent }) {
  const { method } = content;
  return (
    <Section id="method" tone="inverse">
      <SectionHeader index={method.index} eyebrow={method.eyebrow} title={method.title} />

      <div className="mc-method__loop">
        <div className="eyebrow mc-method__loop-label">{method.loopLabel}</div>
        <FlowDiagram nodes={method.loop} />
      </div>

      <div>
        {method.principles.map((p, i) => (
          <Reveal key={p.marker} delay={i * 60}>
            <PrincipleBlock {...p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
