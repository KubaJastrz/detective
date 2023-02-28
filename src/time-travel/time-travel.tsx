import { actions, useAppSelector } from '../store';

export function TimeTravel() {
  const total = useAppSelector((state) => state.card.limit || 0);
  const index = useAppSelector((state) => state.card.index || 0);
  const canUndo = useAppSelector((state) => state.card.past.length > 0);
  const canRedo = useAppSelector((state) => state.card.future.length > 0);

  const restart = () => {
    if (window.confirm('Are you sure you want to restart?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <fieldset className="flex items-center">
      <button type="button" disabled={!canUndo} onClick={() => actions.card.undo()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <input type="range" min={0} max={total - 1} value={index} readOnly className="w-60" />

      <button type="button" disabled={!canRedo} onClick={() => actions.card.redo()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <button type="button" onClick={restart} className="rounded border px-0.5 text-sm">
        Restart
      </button>
    </fieldset>
  );
}
