import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import undoable from 'redux-undo';

import { tropeSlice } from './store/trope-slice';

export const store = configureStore({
  reducer: {
    trope: undoable(tropeSlice.reducer),
  },
});

export const actions = {
  trope: bindActionCreators(tropeSlice.actions, store.dispatch),
};

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
