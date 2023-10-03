import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum  SortPropertyEnum {
	RATING = 'rating',
	TITLE = 'title',
	PRICE = 'price',
}
export type typeSort = {
	name: string;
	sortProperty: SortPropertyEnum;
};
export interface IFilterSliceState {
	categoryId: number;
	searchValue: string;
	currentPage: number;
	orderType: string;
	sort: typeSort;
}
const initialState: IFilterSliceState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING,
	},
	searchValue: '',
	currentPage: 1,
	orderType: 'asc',
};
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action: PayloadAction<typeSort>) {
			state.sort = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},

		setOrderType(state, action: PayloadAction<string>) {
			state.orderType = action.payload;
		},

		setFilters(state, action: PayloadAction<IFilterSliceState>) {
			state.orderType = action.payload.orderType;
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const filterSelector = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setOrderType, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
