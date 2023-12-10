import React, { FC, useState, useRef, ChangeEvent } from 'react';

import classNames from 'classnames';

import { LuRefreshCcw } from 'react-icons/lu';
import { BsFilterRight } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

import styles from './ViewSort.module.scss';

interface IViewSort {
	activeTab: string;
	setActiveTab: (type: string) => void;
	refresh: boolean;
	setRefresh: (is: boolean) => void;
	setDataKeys: (data: string[]) => void;
	searchValue: string;
	setSearchValue: (value: string) => void;
}

interface TimerRef {
	id: ReturnType<typeof setTimeout> | null;
}

const ViewSort: FC<IViewSort> = ({
	activeTab,
	setActiveTab,
	refresh,
	setRefresh,
	setDataKeys,
	searchValue,
	setSearchValue,
}) => {
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const searchRef = useRef<HTMLInputElement | null>(null);

	const timer = useRef<TimerRef>({ id: null });

	const isAllTab = activeTab === 'all';
	const isNewTab = activeTab === 'new';
	const isOldTab = activeTab === 'old';

	const sortHandler = (type: string) => {
		if (activeTab === type) return;
		setDataKeys([]);
		setActiveTab(type);
	};

	const searchHandler = () => {
		setSearchVisible(!searchVisible);
		if (searchVisible) {
			setSearchValue('');
			setValue('');
			if (searchRef.current) searchRef.current.value = searchValue;
		} else {
			setTimeout(() => {
				searchRef.current?.focus();
			}, 100);
		}
	};

	const sendRequest = (value: string): void => {
		setSearchValue(value);
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (timer.current.id) clearTimeout(timer.current.id);

		setValue(e.target.value);

		timer.current.id = setTimeout(() => sendRequest(e.target.value), 500);
	};

	return (
		<div
			style={{ paddingBottom: searchVisible ? '45px' : '0px' }}
			className={styles.view}>
			<div className={styles.infoWrapper}>
				<div className={styles.leftWrapper}>
					<div
						className={classNames(
							styles.filterType,
							isAllTab && styles.filterActive,
						)}
						onClick={() => sortHandler('all')}>
						Все
					</div>
					<div
						className={classNames(
							styles.filterType,
							isNewTab && styles.filterActive,
						)}
						onClick={() => sortHandler('new')}>
						Новые
					</div>
					<div
						className={classNames(
							styles.filterType,
							isOldTab && styles.filterActive,
						)}
						onClick={() => sortHandler('old')}>
						Старые
					</div>
				</div>
				<div className={styles.rightWrapper}>
					<div
						className={styles.refresh}
						onClick={() => {
							setDataKeys([]);
							setRefresh(!refresh);
						}}>
						<LuRefreshCcw />
					</div>
					<div className={styles.search} onClick={() => searchHandler()}>
						{searchVisible ? <IoMdClose /> : <IoSearch />}
					</div>
					<div className={styles.filter}>
						<BsFilterRight />
					</div>
				</div>
			</div>

			{searchVisible && (
				<div className={styles.searchWrapper}>
					<div className={styles.searchContent}>
						<input
							type='text'
							value={value}
							placeholder='Введите имя для поиска...'
							onChange={e => changeHandler(e)}
							ref={searchRef}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewSort;
