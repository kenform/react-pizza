import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	searchValue: '',
	currentPage: 1,
	orderType: '',
	clickOrder: false,
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

		//TODO FIXME
		setOrderType(state, action) {
			state.orderType = action.payload;
			state.clickOrder = !state.clickOrder;
		},
		setFilters(state, action) {
			state.clickOrder = action.payload.clickOrder;
			state.orderType = action.payload.orderType;
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setOrderType, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
