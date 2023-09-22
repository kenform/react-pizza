import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params,thunkApi) => {
	const { currentPage, category, sortType, orderType, search } = params;
	const { data } = await axios.get(
		`https://6501b4e2736d26322f5c28ca.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
	);
	return data;
});

const initialState = {
	items: [],
	status:'loading', // loading, success, error

};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});

export const pizzaDataSelector = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
