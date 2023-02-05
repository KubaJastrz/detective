import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import undoable, { ActionCreators as UndoActionCreators, includeAction } from 'redux-undo';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { cardSlice } from './store/card-slice';

const rootReducer = combineReducers({
  card: undoable(cardSlice.reducer, {
    filter: includeAction([cardSlice.actions.investigateNewLead.type]),
  }),
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE] },
    }),
});

export const persistor = persistStore(store);

const undoableActions = {
  undo: UndoActionCreators.undo,
  redo: UndoActionCreators.redo,
  jump: UndoActionCreators.jump,
};

export const actions = {
  card: bindActionCreators({ ...cardSlice.actions, ...undoableActions }, store.dispatch),
} as const;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
