import React, { memo } from 'react';

type TypeCategoriesProps = {
	value: number;
	onChangeCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Category: React.FC<TypeCategoriesProps> = memo(({ value, onChangeCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
});
export default Category;
