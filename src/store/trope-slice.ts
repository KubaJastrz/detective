import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Trope {
  from: string;
  to: string;
}

export interface Card {
  id: string;
  seen: boolean;
  description?: string;
}

interface TropeState {
  tropes: Trope[];
  cardsById: Record<string, Card>;
}

const initialState: TropeState = {
  tropes: [],
  cardsById: {},
};

export const tropeSlice = createSlice({
  name: 'trope',
  initialState,
  reducers: {
    addTrope(state, action: PayloadAction<Trope>) {
      state.tropes.push(action.payload);
    },
    investigateNewTrope(
      state,
      action: PayloadAction<{
        from: string;
        to: { id: string; description: string }[];
        seen: boolean;
      }>,
    ) {
      const { from, to: toList, seen } = action.payload;
      for (const { id, description } of toList) {
        state.tropes.push({ from, to: id });
        state.cardsById[id] = {
          id: id,
          description,
          seen: false,
        };
      }
      state.cardsById[from] = {
        id: from,
        seen,
      };
    },
  },
});
