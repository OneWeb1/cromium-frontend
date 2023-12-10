import React, { FC } from 'react';

import styles from './MessagePlayers.module.scss';

interface IMessagePlayers {
	value: string;
}

const MessagePlayers: FC<IMessagePlayers> = ({ value }) => {
	return <div className={styles.notFound}>{value}</div>;
};

export default MessagePlayers;
