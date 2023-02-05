import { Fragment, ReactNode } from 'react';
import { useAppSelector } from '../store';
import { LeadItem } from './lead-item';

function useAvailableLeads() {
  const list = useAppSelector((state) => state.card.present.leads);
  const cards = useAppSelector((state) => state.card.present.cardsById);

  const record = list.reduce<Record<string, string[]>>((acc, cur) => {
    const seen = !!cards[cur.to]?.seen;
    if (!seen) {
      acc[cur.to] = (acc[cur.to] ?? []).concat(cur.from);
    }
    return acc;
  }, {});

  return Object.entries(record).map(([to, from]) => {
    return { to, from, description: cards[to].description };
  });
}

interface Props {
  focusNewLead: (cardId: string) => void;
}

export function LeadList({ focusNewLead }: Props) {
  const leads = useAvailableLeads();
  if (!leads.length) {
    return <p className="px-4 py-2">Add more leads above ⬆️</p>;
  }
  return (
    <ul className="px-4 py-2">
      {leads.map((lead) => {
        return <LeadItem lead={lead} key={lead.to} focusNewLead={focusNewLead} />;
      })}
    </ul>
  );
}
