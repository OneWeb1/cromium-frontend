import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Players from '../../components/Players';
import styles from './Home.module.scss';
import { IAppState } from '../../components/Players/interfaces';
import Profile from '../../components/Profile';

const Home = () => {
	const players = useSelector((state: IAppState) => state.players.players);
	const location = useLocation();
	const { name } = useParams();
	const isPath = location.pathname === `/profile/${name}`;
	const isSomeName = !Object.keys(players).some(key => key === name);

	if (isPath && isSomeName) {
		return <Navigate to={'/404'} />;
	}

	return (
		<div className={styles.Home}>
			<Header />
			<div className={styles.contentWrapper}>
				<Players />
				<div className={styles.profileWrapper}>
					{name && <Profile name={name} />}
					{!name && <div className={styles.message}>Профиль еще не открыт</div>}
				</div>
			</div>
		</div>
	);
};

export default Home;
