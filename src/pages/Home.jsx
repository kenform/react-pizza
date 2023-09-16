import React, { useState, useEffect } from 'react';

import Sort from '../components/Sort';
import Category from '../components/Category';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
const Home = ({ searchValue }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
	const [orderType, setOrderType] = useState('asc');
	const [openOrder, setOpenOrder] = useState(false);

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		setIsLoading(true);
		fetch(
			`https://6501b4e2736d26322f5c28ca.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=${orderType}${search}
`,
		)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, orderType, searchValue]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Category value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
				<div className='buttons__orderType'>
					<button
						className={`button button--setOrder ${!openOrder ? '_active' : ''}`}
						onClick={() => {
							setOrderType('asc');
							setOpenOrder(!openOrder);
						}}
					>
						↑
					</button>
					<button
						className={`button button--setOrder ${openOrder ? '_active' : ''}`}
						onClick={() => {
							setOrderType('desc');
							setOpenOrder(!openOrder);
						}}
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
		</div>
	);
};
export default Home;
