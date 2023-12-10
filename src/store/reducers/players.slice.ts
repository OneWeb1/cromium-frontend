import { createSlice } from '@reduxjs/toolkit/react';
import { IAppState } from '../../components/Players/interfaces';

const initialState = {
	players: {},
} as IAppState;

const playersSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		addPlayers: (state, action) => {
			state.players = { ...action.payload };
		},
	},
});

export const { addPlayers } = playersSlice.actions;
export default playersSlice.reducer;
