import React, { useState, useEffect } from 'react';

import Sort from './components/sort/Sort';
import Category from './components/category/Category';
import Header from './components/header/Header';
import PizzaBlock from './components/pizzaBlock/PizzaBlock';
import './scss/app.scss';

function App() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch('https://6501b4e2736d26322f5c28ca.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => setItems(arr));
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Category />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>

					<div className='content__items'>
						{items.map((obj) => (
							<PizzaBlock {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
