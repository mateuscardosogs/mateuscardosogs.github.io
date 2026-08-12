import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { FlowDiagram } from '../ds/motion';
import { Section, TagList } from '../ds/primitives';
import { casePath, homePath } from '../routes';

export function CaseDetail({ content, caseId }: { content: SiteContent; caseId: string }) {
  const { items, detail } = content.cases;
  const index = items.findIndex((c) => c.id === caseId);
  const item = items[index];
  if (!item) return null;

  const previous = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  /* Fixed case anatomy: context → role → decision → trade-off → outcome. */
  const blocks: [string, string][] = [
    [detail.context, item.context],
    [detail.role, item.role],
    [detail.decision, item.decision],
    [detail.tradeoff, item.tradeoff],
    [detail.outcome, item.outcome],
  ];

  return (
    <Section>
      <Button variant="ghost" size="sm" href={`${homePath(content.lang)}#cases`}>
        {detail.back}
      </Button>

      <div className="mc-casedetail__meta">
        <span className="eyebrow" style={{ color: 'var(--text-signal)' }}>
          {item.index}
        </span>
        <span className="eyebrow">{item.result}</span>
      </div>

      <h1 className="mc-casedetail__title">{item.title}</h1>

      <div className="mc-casedetail__grid">
        <div className="mc-casedetail__body">
          {blocks.map(([key, value]) => (
            <div className="mc-casedetail__block" key={key}>
              <span className="eyebrow">{key}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <aside className="mc-casedetail__aside">
          <span className="eyebrow">{detail.architecture}</span>
          <FlowDiagram orientation="vertical" nodes={item.flow} />
          <TagList items={item.tags} />
        </aside>
      </div>

      <nav className="mc-casedetail__nav">
        {previous ? (
          <Button variant="ghost" size="sm" href={casePath(content.lang, previous.id)}>
            {detail.previous}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button variant="ghost" size="sm" href={casePath(content.lang, next.id)}>
            {detail.next}
          </Button>
        )}
      </nav>
    </Section>
  );
}
