import type { SiteContent } from '../content/types';
import { Section, SectionHeader, TagList, TimelineItem } from '../ds/primitives';

export function About({ content }: { content: SiteContent }) {
  const { about } = content;
  return (
    <Section id="about" width="narrow">
      <SectionHeader index={about.index} eyebrow={about.eyebrow} title={about.title} />
      <div className="mc-about__body">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {/* Repertoire, not a skill list: the stack is evidence that I can choose. */}
        <div className="mc-about__tags">
          <TagList items={about.stack} />
        </div>
      </div>
    </Section>
  );
}

export function Experience({ content }: { content: SiteContent }) {
  const { experience } = content;
  return (
    <Section id="experience" tone="sunken">
      <SectionHeader index={experience.index} eyebrow={experience.eyebrow} title={experience.title} />
      <div style={{ marginTop: 'var(--space-8)' }}>
        {experience.entries.map((e) => (
          <TimelineItem key={e.period + e.role} {...e} />
        ))}
        {/* Education stays minimised — senior profiles do not lead with it. */}
        <div className="mc-education">
          <span className="eyebrow">{experience.educationLabel}</span>
          <span className="mc-education__value">{experience.education}</span>
        </div>
      </div>
    </Section>
  );
}
