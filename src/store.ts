import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import undoable, { ActionCreators as UndoActionCreators } from 'redux-undo';

import { cardSlice } from './store/card-slice';

export const store = configureStore({
  reducer: {
    card: undoable(cardSlice.reducer),
  },
});

const undoableActions = {
  undo: UndoActionCreators.undo,
  redo: UndoActionCreators.redo,
  jump: UndoActionCreators.jump,
};

export const actions = {
  card: bindActionCreators({ ...cardSlice.actions, ...undoableActions }, store.dispatch),
};

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
