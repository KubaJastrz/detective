import { Fragment, ReactNode } from 'react';
import { useAppSelector } from '../store';

const listFormatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

function useAvailableTropes() {
  const list = useAppSelector((state) => state.trope.present.list);
  const seenCards = useAppSelector((state) => state.trope.present.seenCards);

  const record = list.reduce<Record<string, string[]>>((acc, cur) => {
    const seen = !!seenCards[cur.to];
    if (!seen) {
      acc[cur.to] = (acc[cur.to] ?? []).concat(cur.from);
    }
    return acc;
  }, {});

  return Object.entries(record).map(([to, from]) => {
    return { to, from };
  });
}

export function TropeList() {
  const tropes = useAvailableTropes();
  return (
    <ul className="px-4 py-2">
      {tropes.map(({ from, to }) => {
        const conjunction = listFormatter.formatToParts(from);
        return (
          <li key={to} id={to} className="list-disc list-inside">
            <Em>{to}</Em> is available from{' '}
            {conjunction.map(({ type, value }, index) => {
              if (type === 'element') return <Em key={index}>{value}</Em>;
              return <Fragment key={index}>{value}</Fragment>;
            })}
          </li>
        );
      })}
    </ul>
  );
}

const Em = ({ children }: { children: ReactNode }) => (
  <em className="not-italic font-semibold font-mono tracking-wide text-lg">{children}</em>
);
