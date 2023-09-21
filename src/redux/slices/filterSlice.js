import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	searchValue: '',
	currentPage: 1,
	orderId: 0,
	orderType:'asc',
};
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},

		setOrderId(state, action) {
			state.orderId = action.payload;
			state.orderType = action.payload;
			console.log(state.orderType);
		},

		setFilters(state, action) {
			state.orderType = action.payload.orderType;
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setOrderId, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
