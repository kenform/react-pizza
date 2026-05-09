import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fallbackPizzas } from '../redux/pizza/fallbackPizzas';

const API_URL = 'https://6501b4e2736d26322f5c28ca.mockapi.io/items';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  } | null>(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      const fallbackPizza = fallbackPizzas.find((item) => item.id === id) || fallbackPizzas[0];

      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        setPizza(data || fallbackPizza);
      } catch (error) {
        console.warn('Pizza details API is unavailable, using local fallback.');
        setPizza(fallbackPizza);
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return (
      <div className="container">
        <div className="full__pizza">
          <h2>Загрузка...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="full__pizza">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
        <Link to="/" className="button button--black">
          <span>Назад</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
