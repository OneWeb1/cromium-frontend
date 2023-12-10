import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './reducers/players.slice';

export const store = configureStore({
	reducer: {
		players: playersSlice,
	},
});
