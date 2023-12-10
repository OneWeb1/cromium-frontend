export interface IDate {
	year: number;
	month: number;
	date: number;
	day: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export interface IRound {
	betNumber: number;
	betString: string;
	x: string;
	xNumber: number;
	roundX: string;
	betWin: number;
	date: IDate;
}

export interface IGamer {
	avatar: string;
	name: string;
	games: IRound[];
}

export interface IPlayerData {
	[name: string]: IGamer;
}

export interface IAppState {
	players: IPlayerData;
}
