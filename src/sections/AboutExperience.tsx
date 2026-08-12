import type { SiteContent } from '../content/types';
import { Section, SectionHeader, TimelineItem } from '../ds/primitives';

export function About({ content }: { content: SiteContent }) {
  const { about } = content;
  return (
    <Section id="about">
      <div className="mc-about">
        <SectionHeader index={about.index} eyebrow={about.eyebrow} title={about.title} />
        <div className="mc-about__body">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
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

      <div className="mc-timeline">
        {experience.entries.map((e) => (
          <TimelineItem key={e.period + e.role} {...e} />
        ))}
      </div>

      {/* Skills and education close the section as data, never as a section of
          their own — no skill bars, no technology cloud. */}
      <div className="mc-columns">
        {experience.columns.map((c) => (
          <div className="mc-columns__item" key={c.label}>
            <span className="eyebrow">{c.label}</span>
            <p>{c.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
