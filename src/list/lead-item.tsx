import { Tooltip } from '@reach/tooltip';
import { Fragment, MouseEventHandler, ReactNode } from 'react';

const listFormatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

interface Props {
  lead: { to: string; description?: string; from: string[] };
  focusNewLead: (cardId: string) => void;
}

export function LeadItem({ lead, focusNewLead }: Props) {
  const { from, description, to } = structuredClone(lead) as Props['lead'];

  const conjunction = listFormatter.formatToParts(
    from.sort((a, b) => {
      return a.localeCompare(b);
    }),
  );

  return (
    <li className="list-disc list-inside">
      <To onClick={() => focusNewLead(to)} label={description}>
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