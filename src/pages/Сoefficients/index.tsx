import { useEffect, useState } from 'react';

import { coefficientBackground } from '../../utils';

import styles from './Coefficients.module.scss';

const Coefficients = () => {
	const [coefficients, setCoefficients] = useState<string[]>([]);
	const [isReload, setIsReload] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('click', () => {
			setIsReload(!isReload);
		});
	}, []);
	useEffect(() => {
		fetch('https://lucky-cromium-cfltw.run-eu-central1.goorm.site/coefficients')
			.then(res => res.json())
			.then((data: string[]) => {
				setCoefficients(data);
			});
	}, [isReload]);

	return (
		<div className={styles.coefficients}>
			<div className={styles.title}>История раундов</div>
			<div className={styles.coefficientsWrapper}>
				{!coefficients.length && 'Загрузка...'}
				{coefficients.map(coefficient => {
					const number = Number(coefficient.split('x')[0]);
					const style = {
						background: coefficientBackground(number),
					};
					return (
						<div style={style} className={styles.coefficient}>
							{coefficient}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Coefficients;
