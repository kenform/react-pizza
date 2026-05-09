import { typePizza } from './types';
import { getPizzaImageUrl } from './pizzaImages';

export type FallbackPizza = typePizza & {
  category: number;
  rating: number;
};

export const fallbackPizzas: FallbackPizza[] = [
  {
    id: '1',
    title: 'Пепперони Fresh',
    price: 803,
    imageUrl: getPizzaImageUrl('1'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 4,
  },
  {
    id: '2',
    title: 'Сырная',
    price: 245,
    imageUrl: getPizzaImageUrl('2'),
    sizes: [26, 30, 40],
    types: [0],
    category: 2,
    rating: 6,
  },
  {
    id: '3',
    title: 'Цыпленок барбекю',
    price: 295,
    imageUrl: getPizzaImageUrl('3'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 7,
  },
  {
    id: '4',
    title: 'Кисло-сладкий цыпленок',
    price: 275,
    imageUrl: getPizzaImageUrl('4'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 3,
    rating: 2,
  },
  {
    id: '5',
    title: 'Чизбургер-пицца',
    price: 415,
    imageUrl: getPizzaImageUrl('5'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 2,
    rating: 8,
  },
  {
    id: '6',
    title: 'Крэйзи пепперони',
    price: 580,
    imageUrl: getPizzaImageUrl('6'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 1,
    rating: 9,
  },
  {
    id: '7',
    title: 'Маргарита',
    price: 450,
    imageUrl: getPizzaImageUrl('7'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 4,
    rating: 10,
  },
  {
    id: '8',
    title: 'Четыре сезона',
    price: 395,
    imageUrl: getPizzaImageUrl('8'),
    sizes: [26, 30, 40],
    types: [0, 1],
    category: 5,
    rating: 5,
  },
];
