import { LeadList } from './list';
import { persistor, store } from './store';
import { Provider as StoreProvider } from 'react-redux';
import { AddCard } from './add';
import { TimeTravel } from './time-travel';
import { ReactNode, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </StoreProvider>
  );
}

export function App() {
  const [fromInput, setFromInput] = useState('START');

  return (
    <Providers>
      <AddCard fromInput={fromInput} setFromInput={setFromInput} />
      <LeadList focusNewLead={setFromInput} />
      <aside className="fixed bottom-2 left-1">
        <TimeTravel />
      </aside>
    </Providers>
  );
}
