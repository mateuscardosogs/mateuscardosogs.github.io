import type { CaseItem } from '../content/types';
import { TagList } from './primitives';

export function CaseCard({
  item,
  href,
  labels,
  readMore,
}: {
  item: CaseItem;
  href: string;
  labels: { context: string; decision: string; tradeoff: string };
  readMore: string;
}) {
  const rows: [string, string][] = [
    [labels.context, item.context],
    [labels.decision, item.decision],
    [labels.tradeoff, item.tradeoff],
  ];

  return (
    <a className="mc-case" href={href} aria-label={item.title}>
      <div className="mc-case__top">
        <span className="mc-case__index">{item.index}</span>
        <span className="mc-case__result">{item.result}</span>
      </div>
      <h3 className="mc-case__title">{item.title}</h3>
      <div className="mc-case__rows">
        {rows.map(([key, value]) => (
          <div className="mc-case__row" key={key}>
            <span className="mc-case__key">{key}</span>
            <p className="mc-case__value">{value}</p>
          </div>
        ))}
      </div>
      <TagList items={item.tags} />
      <span className="mc-case__more">{readMore}</span>
    </a>
  );
}
