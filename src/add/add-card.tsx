import {
  ComponentProps,
  FormEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useReducer,
  useRef,
  useState,
} from 'react';
import { actions } from '../store';

export function AddCard() {
  const submitRef = useRef<HTMLButtonElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState(1);
  const addMore = () => setInputs((s) => s + 1);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        submitRef.current?.click();
      } else {
        event.preventDefault();
        addMore();
      }
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const from = (data.get('from') as string).trim();

    if (!from) return;

    const to = Array.from(data.entries()).reduce<string[]>((acc, [key, value]) => {
      if (key.match(/^to\.\d+/) && (value as string).trim())
        return acc.concat((value as string).trim());
      return acc;
    }, []);

    actions.trope.addTropes({ from, to, isSeen: data.get('seen') === 'on' });

    event.currentTarget.reset();
    setInputs(1);
    fromRef.current?.focus();
  };

  const tropeInputs = Array.from({ length: inputs }).map((_, index) => {
    return <Input key={index} name={`to.${index}`} onKeyDown={handleKeyDown} />;
  });

  return (
    <form onSubmit={handleSubmit} className="p-2 flex space-x-4">
      <fieldset className="border px-2 pt-2 pb-4">
        <legend className="px-1">Investigate new trope</legend>

        <div className="space-y-3">
          <fieldset className="space-y-1">
            <legend className="text-sm">Trope</legend>
            <Input ref={fromRef} name="from" required />
          </fieldset>

          <fieldset className="space-y-1 flex flex-col items-start">
            <legend className="text-sm">Leading to…</legend>
            {tropeInputs}
            <button
              onClick={() => addMore()}
              type="button"
              className="text-sm font-mono tracking-wide font-bold"
            >
              +1
            </button>
          </fieldset>
        </div>

        <fieldset className="space-x-1.5">
          <input type="checkbox" id="seen" name="seen" defaultChecked />
          <label htmlFor="seen">Mark as seen</label>
        </fieldset>
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
  <input ref={ref} type="text" className="text-slate-900 px-1" {...props} />
));
