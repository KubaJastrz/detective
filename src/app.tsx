import { LeadList } from './list';
import { store } from './store';
import { Provider as StoreProvider } from 'react-redux';
import { AddCard } from './add';
import { TimeTravel } from './time-travel';
import { useState } from 'react';

export function App() {
  const [fromInput, setFromInput] = useState('START');

  return (
    <StoreProvider store={store}>
      <AddCard fromInput={fromInput} setFromInput={setFromInput} />
      <LeadList focusNewLead={setFromInput} />
      <aside className="fixed bottom-2 left-1">
        <TimeTravel />
      </aside>
    </StoreProvider>
  );
}
