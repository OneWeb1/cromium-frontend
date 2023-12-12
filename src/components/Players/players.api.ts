import { IPlayerData } from './interfaces';
import { sortKeys } from './sort';
import { getBalance } from '../../utils';

let balanceSortType = 0;
window.addEventListener('dblclick', () => {
	if (balanceSortType === -1) {
		balanceSortType = 0;
		return;
	}
	balanceSortType = balanceSortType === 0 ? 1 : -1;
});

export const fetchPlayers = (
	activeTab: string,
	searchValue: string,
	callback: (data: IPlayerData, sorted: string[]) => void,
) => {
	fetch('https://lucky-cromium-gukfi.run-eu-central1.goorm.site/players')
		.then(res => res.json())
		.then(data => {
			setTimeout(() => {
				const keysData = Object.keys(data);
				let sorted: string[] = [];
				if (activeTab === 'all') {
					const sortedKeys: string[] = keysData.sort((a: string, b: string) =>
						a.localeCompare(b),
					);
					sorted = sortedKeys;
				} else if (activeTab === 'new') {
					const sortedKeys: string[] = sortKeys(data, -1);

					sorted = sortedKeys;
				} else if (activeTab === 'old') {
					const sortedKeys: string[] = sortKeys(data, 1);
					sorted = sortedKeys;
				}

				const search = (query: string) => {
					const results = sorted.filter(item =>
						item.toLowerCase().match(query.toLowerCase()),
					);
					return results;
				};

				if (searchValue.length) {
					sorted = search(searchValue);
				}

				if (balanceSortType !== 0) {
					sorted = sorted.sort((a, b) =>
						balanceSortType === 1
							? getBalance(data[b].games) - getBalance(data[a].games)
							: getBalance(data[a].games) - getBalance(data[b].games),
					);
				}

				callback(data, sorted);
			}, 0);
		});
};
