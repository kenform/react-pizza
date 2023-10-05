import { typeCartItem } from '../redux/cart/types';

export const calcTotalCount = (items: typeCartItem[]) => {
	return items.length;
};
