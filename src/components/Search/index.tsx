import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search: React.FC = () => {
	const dispatch = useDispatch();

	// Этот локальный state отвечает за быстрое отображение данных в input
	const [value, setValue] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		 
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	// todo useCallback получает ссылку на функцию и возвращает функцию в переменную testDebounce. Функция не пересоздается
	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 300),
		[],
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg 
				className={styles.icon}
				viewBox='0 0 512 512'
				width='512'
				xmlns='http://www.w3.org/2000/svg'
			>
				<title />
				<path d='M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z' />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					version='1.1'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g id='grid_system' />
					<g id='_icons'>
						<path d='M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z' />
					</g>
				</svg>
			)}
		</div>
	);
};

export default Search;
