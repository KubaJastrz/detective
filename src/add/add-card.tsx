import clsx from 'clsx';
import {
  ComponentProps,
  FormEventHandler,
  forwardRef,
  KeyboardEventHandler,
  KeyboardEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { actions } from '../store';

interface Props {
  fromInput: string;
  setFromInput: (value: string) => void;
}

export function AddCard({ fromInput, setFromInput }: Props) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState(1);
  const addMore = () => setInputs((s) => s + 1);
  const adding = useRef<number>();

  const focusLeadInput = (key: number) => {
    const inputs = document.querySelectorAll('input[name^="to."') as NodeListOf<HTMLInputElement>;
    Array.from(inputs).at(key)?.focus();
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        submitRef.current?.click();
      } else {
        event.preventDefault();
        callback();
      }
    }
  };

  const handleFromInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    handleEnterKey(event, () => {
      focusLeadInput(0);
    });
  };

  const handleLeadInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    handleEnterKey(event, () => {
      adding.current = inputs;
      addMore();
    });
  };

  useLayoutEffect(() => {
    if (adding.current) {
      focusLeadInput(adding.current);
      adding.current = undefined;
    }
  }, [inputs]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const from = (data.get('from') as string).trim();

    if (!from) return;

    const to = Array.from(data.entries()).reduce<{ id: string; description: string }[]>(
      (acc, [key, _value]) => {
        const id = key.match(/^to\.(\d+)/)?.[1];
        const value = ((_value as string) ?? '').trim();

        if (id && value) {
          const description = (data.get(`to_desc.${id}`) || undefined) as string;

          return acc.concat({
            id: value,
            description,
          });
        }
        return acc;
      },
      [],
    );

    actions.card.investigateNewLead({ from, to, seen: data.get('seen') === 'on' });

    setFromInput('');
    event.currentTarget.reset();
    setInputs(1);
    fromRef.current?.focus();
  };

  const leadInputs = Array.from({ length: inputs }).map((_, index) => {
    return (
      <div key={index} className="space-x-1">
        <Input name={`to.${index}`} onKeyDown={handleLeadInputKeyDown} placeholder="id" />
        <Input
          name={`to_desc.${index}`}
          onKeyDown={handleLeadInputKeyDown}
          placeholder="description"
          className="w-52"
        />
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit} className="p-2 flex space-x-4">
      <fieldset className="border px-2 pt-2 pb-4">
        <legend className="px-1">Investigate new lead</legend>

        <div className="space-y-3">
          <fieldset className="space-y-1">
            <legend className="text-sm">Lead</legend>
            <div className="flex flex-col space-y-1">
              <Input
                ref={fromRef}
                name="from"
                required
                value={fromInput}
                onChange={(event) => setFromInput(event.currentTarget.value)}
                onKeyDown={handleFromInputKeyDown}
                placeholder="id"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-1 flex flex-col items-start">
            <div className="self-stretch flex items-center justify-between">
              <legend className="text-sm">Leading to…</legend>
              <button
                onClick={() => addMore()}
                type="button"
                className="text-sm font-mono tracking-wide font-bold"
                tabIndex={-1}
              >
                +1
              </button>
            </div>
            {leadInputs}
          </fieldset>

          <fieldset className="space-x-1.5">
            <input type="checkbox" id="seen" name="seen" defaultChecked />
            <label htmlFor="seen">Mark as seen</label>
          </fieldset>
        </div>
      </fieldset>

      <button
        ref={submitRef}
        type="submit"
        className="uppercase font-mono tracking-wide font-semibold"
      >
        Save
      </button>
    </form>
  );
}

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => (
  <input
    ref={ref}
    type="text"
    {...props}
    className={clsx('text-slate-900 px-1 w-40', props.className)}
  />
));
