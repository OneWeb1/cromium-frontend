import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { FaChartGantt } from 'react-icons/fa6';

import styles from './Header.module.scss';

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<img
					src='https://lucky-jet.gamedev-atech.cc/assets/media/3caa6b7c2d37c3ae0bd198c86b81bb13.svg'
					alt='logo'
				/>
			</div>
			<div className={styles.btnCoefficients}>
				<Link to={'/coefficients'}>
					<FaChartGantt />
				</Link>
			</div>
		</div>
	);
};

export default Header;
