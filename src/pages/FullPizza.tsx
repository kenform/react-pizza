import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>({
		imageUrl: '',
		title: '',
		price: 0,
	});
	const { id } = useParams();
	useEffect(() => {
		async function fetchPizzas() {
			try {
				const { data } = await axios.get(`https://6501b4e2736d26322f5c28ca.mockapi.io/items/${id}`);
				setPizza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы!');
			}
		}
		fetchPizzas();
	}, []);

	// if (!pizza) {
	// 	return <>Загрузка...</>;
	// }

	return (
		<div className='container'>
			<div className='full__pizza'>
				<img src={pizza.imageUrl} alt='Full Pizza' />
				<h2>{pizza.title}</h2>
				<h4>{pizza.price} ₽</h4>
			</div>
		</div>
	);
};

export default FullPizza;
