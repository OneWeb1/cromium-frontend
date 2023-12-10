import React, { FC } from 'react';

import styles from './Profile.module.scss';

interface IProfile {
	name: string;
}

const Profile: FC<IProfile> = ({ name }) => {
	return <div className={styles.profile}>{name}</div>;
};

export default Profile;
