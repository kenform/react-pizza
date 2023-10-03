import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type typeCartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
};
interface CartSliceState {
	totalPrice: number;
	items: typeCartItem[];
	totalCount: number;
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
	totalCount: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Находим объект в массиве, если объекта нет, то добавляем и задаем ему счетчик count, если объект есть, то увеличиваем личный и общий счетчик на 1
		// todo Сделать добавление пиццы по выбраному размеру и типу( тонкое, традиционное)
		addItem(state, action: PayloadAction<typeCartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			findItem
				? findItem.count++ && state.totalCount++
				: state.items.push({ ...action.payload, count: 1 }) && state.totalCount++;

			//* increment  totalPrice
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		reduceItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count > 1 && findItem.count-- && state.totalCount--;
				state.totalPrice -= findItem.price;
			}
		},

		removeItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				state.totalPrice -= findItem.price * findItem.count;
				state.totalCount -= findItem.count;
				state.items = state.items.filter((obj) => obj.id !== action.payload);
			}
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);

export const { addItem, reduceItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
