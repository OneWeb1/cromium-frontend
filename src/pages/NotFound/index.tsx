import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<img
						src='https://lucky-jet.gamedev-atech.cc/assets/media/3caa6b7c2d37c3ae0bd198c86b81bb13.svg'
						alt='logo'
					/>
				</div>
				<div className={styles.text}>Page not found</div>
				<div className={styles.code}>404</div>
				<Link className={styles.href} to='/'>
					<div className={styles.button}>На главную</div>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
