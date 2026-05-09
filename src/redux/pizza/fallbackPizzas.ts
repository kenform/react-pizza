import { typePizza } from './types';

export type FallbackPizza = typePizza & {
  category: number;
  rating: number;
};

export const fallbackPizzas: FallbackPizza[] = [
  {
    id: '1',
    title: 'Пепперони Fresh',
    price: 803,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d61015e6d438b4f00b104d0c3e8_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 4,
  },
  {
    id: '2',
    title: 'Сырная',
    price: 245,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d610d2925109ab2e1c92cc5383c_292x292.webp',
    sizes: [26, 30, 40],
    types: [0],
    category: 2,
    rating: 6,
  },
  {
    id: '3',
    title: 'Цыпленок барбекю',
    price: 295,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d6110059795842d33b63f3e2c29_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 7,
  },
  {
    id: '4',
    title: 'Кисло-сладкий цыпленок',
    price: 275,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d61125b3f17a6df8f17b1f38d4f_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 3,
    rating: 2,
  },
  {
    id: '5',
    title: 'Чизбургер-пицца',
    price: 415,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d610df56f22910cfeb8f510a03d_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 2,
    rating: 8,
  },
  {
    id: '6',
    title: 'Крэйзи пепперони',
    price: 580,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d610bc5ef76b3b0a2d257817a6f_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 9,
  },
  {
    id: '7',
    title: 'Маргарита',
    price: 450,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d610f0f2e0cb6f92a71c2397c6f_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 4,
    rating: 10,
  },
  {
    id: '8',
    title: 'Четыре сезона',
    price: 395,
    imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/11ee7d6114525f4fbb2f938c6f7f6253_292x292.webp',
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 5,
    rating: 5,
  },
];
