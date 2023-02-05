import { Tooltip } from '@reach/tooltip';
import { Fragment, MouseEventHandler, ReactNode } from 'react';

const listFormatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

interface Props {
  trope: { to: string; description?: string; from: string[] };
  focusNewTrope: (cardId: string) => void;
}

export function TropeItem({ trope, focusNewTrope }: Props) {
  const { from, description, to } = structuredClone(trope) as Props['trope'];

  const conjunction = listFormatter.formatToParts(
    from.sort((a, b) => {
      return a.localeCompare(b);
    }),
  );

  return (
    <li className="list-disc list-inside">
      <To onClick={() => focusNewTrope(to)} label={description}>
        {to}
      </To>{' '}
      is available from{' '}
      {conjunction.map(({ type, value }, index) => {
        if (type === 'element') return <From key={index}>{value}</From>;
        return <Fragment key={index}>{value}</Fragment>;
      })}
    </li>
  );
}

function To({
  children,
  label,
  onClick,
}: {
  children: string;
  label?: string;
  onClick: MouseEventHandler;
}) {
  const text = children.includes('@') ? children : `#${children}`;
  if (label) {
    return (
      <Tooltip label={label}>
        <button type="button" onClick={onClick}>
          <Em>{text}</Em>
        </button>
      </Tooltip>
    );
  }
  return <Em>{children}</Em>;
}

function From({ children }: { children: ReactNode }) {
  return <Em>{children}</Em>;
}

function Em({ children }: { children: ReactNode }) {
  return <em className="not-italic font-semibold font-mono tracking-wide text-lg">{children}</em>;
}
