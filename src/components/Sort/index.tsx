import React, { useRef, memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, setOrderType } from '../../redux/filter/slice';
import { SortPropertyEnum, typeSort } from '../../redux/filter/types';
import { filterSelector } from '../../redux/filter/selectors';

type typeSortProps = {
	value: typeSort;
};
type typeSortItem = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export const sortList: typeSortItem[] = [
	{ name: 'популярности', sortProperty: SortPropertyEnum.RATING },
	{ name: 'цене', sortProperty: SortPropertyEnum.PRICE },
	{ name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

const Sort: React.FC<typeSortProps> = memo(({ value }) => {
	const dispatch = useDispatch();
	const { orderType } = useSelector(filterSelector);
	const sortRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const onClickListItem = (obj: typeSortItem) => {
		dispatch(setSort(obj));
		setOpen(false);
	};

	const onChangeOrder = () => {
		dispatch(setOrderType(orderType === 'asc' ? 'desc' : 'asc'));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!event.composedPath().includes(sortRef.current!)) {
				setOpen(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		// component Unmount.
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<>
			<div ref={sortRef} className='sort'>
				<div className='sort__label'>
					<svg
						className={`sort__arrow ${open ? 'active' : ''}`}
						width='10'
						height='6'
						viewBox='0 0 10 6'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
							fill='#2C2C2C'
						/>
					</svg>
					<b>Сортировка по:</b>
					<span onClick={() => setOpen(!open)}>{value.name}</span>
				</div>
				{open && (
					<div className='sort__popup'>
						<ul>
							{sortList.map((obj, i) => (
								<li
									onClick={() => onClickListItem(obj)}
									key={i}
									className={value.sortProperty === obj.sortProperty ? 'active' : ''}
								>
									{obj.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<div className='buttons__orderType'>
				<button onClick={onChangeOrder} className={`button button--setOrder`}>
					⇅
				</button>
			</div>
		</>
	);
});

export default Sort;
