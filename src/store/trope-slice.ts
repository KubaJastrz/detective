import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CardId = string;

export interface Trope {
  from: CardId;
  to: CardId;
}

interface TropeState {
  list: Trope[];
  seenCards: Record<CardId, boolean>;
}

const initialState: TropeState = {
  list: [],
  seenCards: {},
};

export const tropeSlice = createSlice({
  name: 'trope',
  initialState,
  reducers: {
    addTrope(state, action: PayloadAction<Trope>) {
      state.list.push(action.payload);
    },
    addTropes(state, action: PayloadAction<{ from: CardId; to: CardId[]; isSeen: boolean }>) {
      for (const to of action.payload.to) {
        state.list.push({ from: action.payload.from, to });
      }
      if (action.payload.isSeen) {
        state.seenCards[action.payload.from] = true;
      }
    },
  },
});
