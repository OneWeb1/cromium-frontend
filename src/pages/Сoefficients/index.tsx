import { useEffect, useState } from 'react';

import { coefficientBackground } from '../../utils';

import styles from './Coefficients.module.scss';

const Coefficients = () => {
	const [coefficients, setCoefficients] = useState<string[]>([]);
	useEffect(() => {
		fetch('https://lucky-cromium-gukfi.run-eu-central1.goorm.site/coefficients')
			.then(res => res.json())
			.then((data: string[]) => {
				setCoefficients(data);
			});
	}, []);

	return (
		<div className={styles.coefficients}>
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
