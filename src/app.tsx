import { TropeList } from './list';
import { actions, store } from './store';
import { Provider as StoreProvider } from 'react-redux';
import { AddCard } from './add';
import { TimeTravel } from './time-travel';

actions.trope.addTrope({ from: 'START', to: '#100' });
actions.trope.addTrope({ from: '#101', to: 'ACT@101' });
actions.trope.addTrope({ from: '#101', to: '#102' });
actions.trope.addTrope({ from: 'START', to: '#102' });

export function App() {
  return (
    <StoreProvider store={store}>
      <AddCard />
      <TropeList />
      <aside className="fixed bottom-2 left-1">
        <TimeTravel />
      </aside>
    </StoreProvider>
  );
}
