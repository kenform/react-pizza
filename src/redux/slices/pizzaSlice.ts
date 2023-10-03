import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

//* All keys -> string and all value -> string
// currentPage, category, sortType, orderType, search

export const fetchPizzas = createAsyncThunk<typePizza[], typeSearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { currentPage, category, sortType, orderType, search } = params;
		const { data } = await axios.get<typePizza[]>(
			`https://6501b4e2736d26322f5c28ca.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
		);
		return data;
	},
);

type typePizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

export type typeSearchPizzaParams = {
	category: string;
	sortType: string;
	orderType: string;
	search: string;
	currentPage: string;
};
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}


interface IPizzaSliceState {
	items: typePizza[];
	status: Status;
}
const initialState: IPizzaSliceState = {
	items: [],
	status: Status.LOADING, // loading, success, error
};


export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<typePizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const pizzaDataSelector = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
