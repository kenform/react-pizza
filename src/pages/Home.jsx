import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import {
	setCategoryId,
	setCurrentPage,
	setOrderType,
	setFilters,
} from '../redux/slices/filterSlice';

import Sort, { sortList } from '../components/Sort';
import Category from '../components/Category';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// TODO useSelector - функция, чтобы вытащить state.  Берем из filter -> filterSlice.js -> состояние (categoryId)
	const { categoryId, sort, orderType, clickOrder, searchValue, currentPage } = useSelector(
		(state) => state.filter,
	);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const fetchPizzas = () => {
		setIsLoading(true);
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		const sortType = sort.sortProperty;
		axios
			.get(
				`https://6501b4e2736d26322f5c28ca.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});
	};

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangeOrder = (type) => {
		dispatch(setOrderType(type));
	};

	useEffect(() => {
		// Если изменили параметры и был 1 рендер то вшиваем строку в поиск из redux
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
				orderType,
				clickOrder,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, orderType, clickOrder]);

	// Если был первый рендер, то проверяем URL- параметры и сохраняем в redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			console.log(params, 'Я ИЗ PARAMS');

			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
			console.log(sort, 'Я ИЗ sort');

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
	}, [categoryId, sort.sortProperty, orderType, searchValue, currentPage]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Category value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
				<div className='buttons__orderType'>
					<button
						className={`button button--setOrder ${clickOrder ? '_active' : ''}`}
						onClick={() => onChangeOrder('asc')}
					>
						↑
					</button>
					<button
						className={`button button--setOrder ${!clickOrder ? '_active' : ''}`}
						onClick={() => onChangeOrder('desc')}
					>
						↓
					</button>
				</div>
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			<div className='content__items'>
				{/* create an array of 6 undefined and replace them with Skeleton, otherwise render the elements */}
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};
export default Home;
