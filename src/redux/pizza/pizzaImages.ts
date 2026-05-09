export const getPizzaImageUrl = (id?: string | number): string => {
	const numericId = Number(id);
	const safeId = Number.isFinite(numericId) && numericId > 0 ? ((numericId - 1) % 8) + 1 : 1;

	return `/img/pizzas/pizza-${safeId}.svg`;
};

export const withLocalPizzaImage = <T extends { id?: string | number; imageUrl?: string }>(pizza: T): T => ({
	...pizza,
	imageUrl: getPizzaImageUrl(pizza.id),
});
