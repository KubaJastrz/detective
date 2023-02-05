import { Fragment, ReactNode } from 'react';
import { useAppSelector } from '../store';
import { TropeItem } from './trope-item';

function useAvailableTropes() {
  const list = useAppSelector((state) => state.trope.present.tropes);
  const cards = useAppSelector((state) => state.trope.present.cardsById);

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
  focusNewTrope: (cardId: string) => void;
}

export function TropeList({ focusNewTrope }: Props) {
  const tropes = useAvailableTropes();
  if (!tropes.length) {
    return <p className="px-4 py-2">Add more tropes above ⬆️</p>;
  }
  return (
    <ul className="px-4 py-2">
      {tropes.map((trope) => {
        return <TropeItem trope={trope} key={trope.to} focusNewTrope={focusNewTrope} />;
      })}
    </ul>
  );
}
