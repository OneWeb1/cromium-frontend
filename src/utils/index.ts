import { IRound } from '../components/Players/interfaces';

const randomRGBA = () => {
	const random = (): number => Math.floor(Math.random() * 150);
	return `rgba(${random()}, ${random()}, ${random()}, 1)`;
};

const formatNumberWithSpaces = (number: number) => {
	let numberString = number.toString();
	let isMinus = false;
	if (numberString.split('-').length === 2) {
		numberString = numberString.split('-')[1];
		isMinus = true;
	}
	const parts = [];
	while (numberString.length > 0) {
		parts.unshift(numberString.slice(-3));
		numberString = numberString.slice(0, -3);
	}

	if (isMinus) return `-${parts.join(' ')}`;

	return parts.join(' ');
};

const getBalance = (games: IRound[]): number => {
	let betMoney = 0;
	let winMoney = 0;
	games.forEach(game => {
		betMoney += game.betNumber;
		winMoney += game.betNumber * game.xNumber;
	});
	winMoney = Number(winMoney.toFixed());
	betMoney = Number(betMoney.toFixed());

	return winMoney - betMoney;
};

type IRef = { current: number[] };
const isBlockedRequest = (ref: IRef, callback: () => void) => {
	const currentTime = Date.now();
	if (ref.current.length < 50) {
		ref.current.unshift(currentTime);
		return false;
	} else if (ref.current.length === 50) {
		const lastRequestTime = ref.current[4];
		const diffTime = (currentTime - lastRequestTime) / 1000;
		if (diffTime > 10) {
			ref.current = [];
			callback();
			return false;
		}
		return true;
	}

	return true;
};

const coefficientBackground = (number: number): string => {
	return number >= 2 && number < 10
		? 'rgb(117, 62, 194)'
		: number < 2
		? 'rgb(62, 91, 194)'
		: 'rgb(222, 139, 3)';
};

export {
	randomRGBA,
	formatNumberWithSpaces,
	getBalance,
	isBlockedRequest,
	coefficientBackground,
};
