import { FC, useState, MouseEvent } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { formatNumberWithSpaces, getBalance } from '../../../utils';

import Bet from './Bet';

import { IRound } from '../interfaces';
import styles from './Player.module.scss';

interface IPlayer {
	games: IRound[];
	name: string;
	avatar: string;
}

const Player: FC<IPlayer> = ({ games, name, avatar }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [deg, setDeg] = useState<number>(0);

	const gamesReverce = [...games].reverse();

	const getAvatar = (name: string): string => {
		return name.split('').splice(0, 2).join('');
	};

	const viewPlayerHandler = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const menuConfigHandler = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const clickHandler = (): void => {
		setIsOpen(!isOpen);
		setDeg(!isOpen ? 90 : 0);
	};

	const arrowRotate = {
		transform: `rotate(${deg}deg)`,
	};
	const avatarBackground = { background: avatar };

	return (
		<div className={styles.playerWrapper}>
			<div className={styles.player} onClick={clickHandler}>
				<div className={styles.leftWrapper}>
					<div style={arrowRotate} className={styles.arrow}>
						<MdKeyboardArrowRight />
					</div>
					<div
						title={`${name}`}
						style={{ display: 'flex', alignItems: 'center' }}>
						<div
							className={styles.avatar}
							style={avatarBackground}
							onClick={viewPlayerHandler}>
							<Link
								to={`/profile/${name}`}
								className={classNames(styles.link, styles.avatarColor)}>
								{getAvatar(name)}
							</Link>
						</div>
						<div className={styles.name} onClick={viewPlayerHandler}>
							<Link to={`/profile/${name}`} className={styles.link}>
								{name}
							</Link>
						</div>
					</div>
				</div>

				<div className={styles.rightWrapper}>
					<div className={styles.balanceWrapper}>
						<div className={styles.balance}>
							{formatNumberWithSpaces(getBalance(gamesReverce))} ₽
						</div>
					</div>
					<div className={styles.dots} onClick={menuConfigHandler}>
						<BsThreeDotsVertical />
					</div>
				</div>
			</div>

			<div className={styles.menuListWrapper}>
				{isOpen && gamesReverce.map((game: IRound) => <Bet game={game} />)}
				{isOpen && !games.length && (
					<div
						className={classNames(styles.player, styles.flex)}
						style={{ cursor: 'default' }}>
						Список истории пуст
					</div>
				)}
			</div>
		</div>
	);
};

export default Player;
