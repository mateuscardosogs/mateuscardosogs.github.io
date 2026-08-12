import type { SiteContent } from '../content/types';
import { CaseCard } from '../ds/CaseCard';
import { Reveal } from '../ds/motion';
import { Section, SectionHeader } from '../ds/primitives';
import { casePath } from '../routes';

export function Cases({ content }: { content: SiteContent }) {
  const { cases } = content;
  return (
    <Section id="cases">
      <SectionHeader index={cases.index} eyebrow={cases.eyebrow} title={cases.title} lead={cases.lead} />
      <div className="mc-stack">
        {cases.items.map((item, i) => (
          <Reveal key={item.id} delay={i * 60}>
            <CaseCard
              item={item}
              href={casePath(content.lang, item.id)}
              labels={cases.detail}
              readMore={cases.readMore}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
