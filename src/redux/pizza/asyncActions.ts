import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { typePizza, typeSearchPizzaParams } from './types';
import { fallbackPizzas } from './fallbackPizzas';
import { withLocalPizzaImage } from './pizzaImages';

const API_URL = 'https://6501b4e2736d26322f5c28ca.mockapi.io/items';

const getFallbackPizzas = (params: Partial<typeSearchPizzaParams>): typePizza[] => {
  const currentPage = Number(params.currentPage || 1);
  const limit = 4;
  const categoryId = Number(String(params.category || '').replace('category=', ''));
  const searchValue = String(params.search || '').replace('&search=', '').trim().toLowerCase();
  const sortType = params.sortType || 'rating';
  const orderType = params.orderType || 'desc';

  let items = [...fallbackPizzas];

  if (categoryId > 0) {
    items = items.filter((pizza) => pizza.category === categoryId);
  }

  if (searchValue) {
    items = items.filter((pizza) => pizza.title.toLowerCase().includes(searchValue));
  }

  items.sort((a, b) => {
    const left = a[sortType as keyof typeof a];
    const right = b[sortType as keyof typeof b];

    if (typeof left === 'number' && typeof right === 'number') {
      return orderType === 'asc' ? left - right : right - left;
    }

    return orderType === 'asc'
      ? String(left).localeCompare(String(right), 'ru')
      : String(right).localeCompare(String(left), 'ru');
  });

  return items.slice((currentPage - 1) * limit, currentPage * limit);
};

export const fetchPizzas = createAsyncThunk<typePizza[], typeSearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params = {} as typeSearchPizzaParams) => {
    const { currentPage = '1', category = '', sortType = 'rating', orderType = 'desc', search = '' } = params;

    try {
      const { data } = await axios.get<typePizza[]>(
        `${API_URL}?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
      );

      if (Array.isArray(data) && data.length > 0) {
        return data.map(withLocalPizzaImage);
      }

      return getFallbackPizzas(params).map(withLocalPizzaImage);
    } catch (error) {
      console.warn('MockAPI is unavailable, using local pizza fallback.');
      return getFallbackPizzas(params).map(withLocalPizzaImage);
    }
  },
);
