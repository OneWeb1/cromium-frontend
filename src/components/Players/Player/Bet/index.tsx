import { FC } from 'react';

import {
	formatNumberWithSpaces,
	coefficientBackground,
} from '../../../../utils';

import { IRound } from '../../interfaces';
import styles from './Bet.module.scss';

interface IBet {
	game: IRound;
}

const Bet: FC<IBet> = ({ game }) => {
	const parseData = (number: number) => (number < 10 ? `0${number}` : number);
	const getHours = (hours: number): number => {
		return hours === 24 ? 0 : hours === 25 ? 1 : hours === 26 ? 2 : hours;
	};
	const hours: number = getHours(game.date.hours + 2);

	const dateString = `${parseData(hours)}:${parseData(
		game.date.minutes,
	)}:${parseData(game.date.seconds)}`;

	const styleBackground = {
		background:
			game.x === '-'
				? coefficientBackground(Number(game.roundX.split('x')[0]))
				: coefficientBackground(game.xNumber),
	};

	const betWin = game.betWin;
	let betFormated =
		`${betWin}` === '-' ? '-' : `${formatNumberWithSpaces(betWin)} ₽`;
	if (typeof betWin === 'number') {
		const slice = `${betWin}`.split('.');
		if (slice.length === 2) {
			betFormated = `${formatNumberWithSpaces(
				Number(betWin.toFixed()),
			)}.${slice[1].slice(0, 2)} ₽`;
		}
	}
	return (
		<div className={styles.bet}>
			<div className={styles.date}>{dateString}</div>
			<div className={styles.rightWrapper}>
				<div className={styles.sumBet}>{game.betString}</div>
				<div className={styles.coefficientWrapper}>
					<div className={styles.coefficient} style={styleBackground}>
						{game.x === '-' ? game.roundX : game.x}
					</div>
				</div>
				<div className={styles.sumWinWrapper}>
					<div title={`${betFormated}`} className={styles.sumWin}>
						{betFormated}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bet;
