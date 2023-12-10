import { IPlayerData } from './interfaces';

export const sortKeys = (data: IPlayerData, number: number): string[] => {
	const keysData = Object.keys(data);
	return [...keysData].sort((a, b) => {
		const dateA = data[a].games[data[a].games.length - 1].date;
		const dateB = data[b].games[data[b].games.length - 1].date;
		const timeA: number = Date.UTC(
			dateA.year,
			dateA.month,
			dateA.date,
			dateA.hours,
			dateA.minutes,
			dateA.seconds,
		);
		const timeB: number = Date.UTC(
			dateB.year,
			dateB.month,
			dateB.date,
			dateB.hours,
			dateB.minutes,
			dateB.seconds,
		);
		return number === 1 ? timeA - timeB : timeB - timeA;
	});
};
