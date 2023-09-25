import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock:React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span>😕</span>
				<br />
				<p>Ничего не найдено</p>
				<p className={styles.description}>
					К сожалению данная страница отсутствует в нашем интернет-магазине{' '}
				</p>
			</h1>
		</div>
	);
};

export default NotFoundBlock;
