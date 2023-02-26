import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Lead {
  from: string;
  to: string;
}

export interface Card {
  id: string;
  seen: boolean;
  description?: string;
}

interface CardState {
  leads: Lead[];
  cardsById: Record<string, Card>;
}

const initialState: CardState = {
  leads: [],
  cardsById: {},
};

export const cardSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    addLead(state, action: PayloadAction<Lead>) {
      state.leads.push(action.payload);
    },
    investigateNewLead(
      state,
      action: PayloadAction<{
        from: string;
        to: { id: string; description: string }[];
        seen: boolean;
      }>,
    ) {
      const { from, to: toList, seen } = action.payload;
      for (const { id, description } of toList) {
        state.leads.push({ from, to: id });
        state.cardsById[id] = {
          id,
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
