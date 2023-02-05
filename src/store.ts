import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import undoable, { ActionCreators as UndoActionCreators } from 'redux-undo';

import { tropeSlice } from './store/trope-slice';

export const store = configureStore({
  reducer: {
    trope: undoable(tropeSlice.reducer),
  },
});

const undoableActions = {
  undo: UndoActionCreators.undo,
  redo: UndoActionCreators.redo,
  jump: UndoActionCreators.jump,
};

export const actions = {
  trope: bindActionCreators({ ...tropeSlice.actions, ...undoableActions }, store.dispatch),
};

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
