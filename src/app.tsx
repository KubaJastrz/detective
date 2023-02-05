import { TropeList } from './list';
import { actions, store } from './store';
import { Provider as StoreProvider } from 'react-redux';
import { AddCard } from './add';

actions.trope.addTrope({ from: 'START', to: '#100' });
// actions.trope.addTrope({ from: 'START', to: '101' });
// actions.trope.addTrope({ from: 'START', to: '102' });
actions.trope.addTrope({ from: '#101', to: 'ACT@101' });
actions.trope.addTrope({ from: '#101', to: '#102' });
actions.trope.addTrope({ from: 'START', to: '#102' });
// actions.trope.addTrope({ from: '102', to: '104' });
// actions.trope.addTrope({ from: '103', to: '103b' });
// actions.trope.addTrope({ from: '103', to: '105' });

export function App() {
  return (
    <StoreProvider store={store}>
      <AddCard />
      <TropeList />
    </StoreProvider>
  );
}
