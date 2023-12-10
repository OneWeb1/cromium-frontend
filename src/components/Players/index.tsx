import { FC, useState, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { addPlayers } from '../../store/reducers/players.slice';

import { isBlockedRequest } from '../../utils';
import { fetchPlayers } from './players.api';

import Player from './Player';
import MessagePlayers from './MessagePlayers';
import { IGamer } from './interfaces';

import styles from './Players.module.scss';
import ViewSort from './ViewSort';

interface IPlayerData {
	[name: string]: IGamer;
}

const Players: FC = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState<IPlayerData>({});
	const [dataKeys, setDataKeys] = useState<string[]>([]);
	const [activeTab, setActiveTab] = useState<string>('all');
	const [refresh, setRefresh] = useState<boolean>(false);
	const [searchNotFound, setSearchNotFound] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [playersLength, setPlayersLength] = useState<number>(0);

	const playersRef = useRef<HTMLDivElement | null>(null);
	const requestsRef = useRef<number[]>([]);

	const notFoundMessage = 'По вашему запросу ничего не найдено';

	useEffect(() => {
		const fetchingPlayers = () => {
			setData({} as IPlayerData);
			setDataKeys([]);
			fetchPlayers(
				activeTab,
				searchValue,
				(data: IPlayerData, sorted: string[]): void => {
					setDataKeys(sorted);
					setSearchNotFound(!!sorted.length);
					setData(data);
					setPlayersLength(Object.keys(data).length);
					dispatch(addPlayers(data));
					if (playersRef) playersRef.current?.scrollTo(0, 0);
				},
			);
		};
		const isBlocked = isBlockedRequest(requestsRef, () => fetchingPlayers());
		if (!isBlocked) fetchingPlayers();
	}, [dispatch, searchValue, activeTab, refresh]);

	return (
		<div className={styles.wrapper}>
			<ViewSort
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				refresh={refresh}
				setRefresh={setRefresh}
				setDataKeys={setDataKeys}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<div className={styles.players} ref={playersRef}>
				{!playersLength ? (
					<MessagePlayers value={'Загрузка...'} />
				) : playersLength && !dataKeys.length && searchNotFound ? (
					<MessagePlayers value={'Загрузка...'} />
				) : (
					!searchNotFound && <MessagePlayers value={notFoundMessage} />
				)}
				{dataKeys.map((key: string, id: number) => (
					<Player
						key={id}
						games={data[key].games}
						name={key}
						avatar={data[key].avatar}
					/>
				))}
			</div>

			<div className={styles.bottom}>
				<div className={styles.leftWrapper}>
					Кол-во игроков:
					<div className={styles.playerNumbers}>{playersLength}</div>
				</div>
			</div>
		</div>
	);
};

export default Players;
