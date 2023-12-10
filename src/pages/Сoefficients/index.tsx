import { useEffect, useState } from 'react';

import { coefficientBackground } from '../../utils';

import styles from './Coefficients.module.scss';

const Coefficients = () => {
	const [coefficients, setCoefficients] = useState<string[]>([]);
	useEffect(() => {
		fetch('http://51.20.121.253:3003/coefficients')
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
