import { typeCartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: typeCartItem[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
