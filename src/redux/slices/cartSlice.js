import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			findItem
				? findItem.count++ && state.totalCount++
				: state.items.push({ ...action.payload, count: 1 }) && state.totalCount++;

			//* increment  totalPrice
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		deleteItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			findItem.count > 1 && findItem.count-- && state.totalCount--;
			state.totalPrice -= findItem.price;
		},

		removeItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.totalPrice -= findItem.price * findItem.count;
			state.totalCount -= findItem.count;
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const { addItem, deleteItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
