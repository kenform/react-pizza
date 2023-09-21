import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

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

	// TODO useSelector - функция, чтобы вытащить state.  Берем из filter -> filterSlice.js -> состояние (categoryId)
	const { items, status } = useSelector((state) => state.pizza);
	const { categoryId, sort, orderType, searchValue, currentPage } = useSelector(
		(state) => state.filter,
	);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		const sortType = sort.sortProperty;

		dispatch(
			fetchPizzas({
				category,
				search,
				sortType,
				orderType,
				currentPage,
			}),
		);
		window.scrollTo(0, 0);
	};

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	// Если изменили параметры и был 1 рендер то вшиваем строку в поиск из redux
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
				orderType,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, orderType]);

	// Если был первый рендер, то проверяем URL- параметры и сохраняем в redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, orderType, searchValue, currentPage]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Category value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<img width={50} height={50} src={process.env.PUBLIC_URL + '/img/sad-smile.svg'} alt='' />
					<div>
						<h2>Произошла ошибка</h2>
						<p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
					</div>
					<img width={50} height={50} src={process.env.PUBLIC_URL + '/img/sad-smile.svg'} alt='' />
				</div>
			) : (
				<div className='content__items'>
					{/* create an array of 6 undefined and replace them with Skeleton, otherwise render the elements */}
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};
export default Home;
