import type { ReactNode } from 'react';

/* ── Tag ─────────────────────────────────────────────────────────────────── */

export function Tag({ tone = 'neutral', children }: { tone?: 'neutral' | 'solid' | 'signal'; children: ReactNode }) {
  return <span className={`mc-tag${tone === 'neutral' ? '' : ` mc-tag--${tone}`}`}>{children}</span>;
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="mc-taglist">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}

/* ── Rule ────────────────────────────────────────────────────────────────── */

export function Rule({ label, tone = 'hairline' }: { label?: string; tone?: 'hairline' | 'strong' }) {
  return (
    <div className={`mc-rule${tone === 'strong' ? ' mc-rule--strong' : ''}`} role="separator">
      {label && <span className="mc-rule__label">{label}</span>}
      <span className="mc-rule__line" />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export function Section({
  id,
  tone = 'page',
  width = 'wide',
  gridLines = false,
  tight = false,
  children,
}: {
  id?: string;
  tone?: 'page' | 'sunken' | 'inverse';
  width?: 'wide' | 'narrow';
  gridLines?: boolean;
  tight?: boolean;
  children: ReactNode;
}) {
  const cls = [
    'mc-section',
    tone !== 'page' ? `mc-section--${tone}` : '',
    tight ? 'mc-section--tight' : '',
    // Inverted bands re-scope the colour aliases rather than overriding colours.
    tone === 'inverse' ? 'theme-dark' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={cls}>
      {gridLines && <div aria-hidden="true" className="mc-section__lines" />}
      <div className={`mc-section__inner${width === 'narrow' ? ' mc-section__inner--narrow' : ''}`}>{children}</div>
    </section>
  );
}

/* ── SectionHeader ───────────────────────────────────────────────────────── */

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mc-sechead">
      {(index || eyebrow) && (
        <div className="mc-sechead__meta">
          {index && <span className="mc-sechead__index">{index}</span>}
          {eyebrow && <span className="mc-sechead__eyebrow">{eyebrow}</span>}
        </div>
      )}
      <h2 className="mc-sechead__title">{title}</h2>
      {lead && <p className="mc-sechead__lead">{lead}</p>}
    </header>
  );
}

/* ── MetricStat ──────────────────────────────────────────────────────────── */

export function MetricStat({
  value,
  unit,
  label,
  note,
  size = 'sm',
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div className={`mc-metric mc-metric--${size}`}>
      <div className="mc-metric__head">
        <span className="mc-metric__value">{value}</span>
        {unit && <span className="mc-metric__unit">{unit}</span>}
      </div>
      <span className="mc-metric__label">{label}</span>
      {note && <span className="mc-metric__note">{note}</span>}
    </div>
  );
}

/* ── PrincipleBlock ──────────────────────────────────────────────────────── */

export function PrincipleBlock({
  marker,
  title,
  body,
  evidence,
}: {
  marker: string;
  title: string;
  body: string;
  evidence?: string;
}) {
  return (
    <div className="mc-principle">
      <span className="mc-principle__marker">{marker}</span>
      <div className="mc-principle__body">
        <h3 className="mc-principle__title">{title}</h3>
        <p className="mc-principle__text">{body}</p>
        {evidence && <p className="mc-principle__evidence">{evidence}</p>}
      </div>
    </div>
  );
}

/* ── TimelineItem ────────────────────────────────────────────────────────── */

export function TimelineItem({
  period,
  role,
  org,
  bullets = [],
  current = false,
}: {
  period: string;
  role: string;
  org?: string;
  bullets?: string[];
  current?: boolean;
}) {
  return (
    <div className="mc-timeline-item">
      <div className="mc-timeline-item__period">
        <span className={`mc-timeline-item__dot${current ? ' mc-timeline-item__dot--current' : ''}`} />
        <span>{period}</span>
      </div>
      <div className="mc-timeline-item__body">
        <div className="mc-timeline-item__head">
          <span className="mc-timeline-item__role">{role}</span>
          {org && <span className="mc-timeline-item__org">{org}</span>}
        </div>
        {bullets.map((b) => (
          <p key={b} className="mc-timeline-item__bullet">
            {b}
          </p>
        ))}
      </div>
    </div>
  );
}
