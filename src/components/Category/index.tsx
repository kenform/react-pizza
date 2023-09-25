import React from 'react';

type TypeCategoriesProps = {
	value:number;
	onChangeCategory:any;
}
const Category: React.FC<TypeCategoriesProps> = ({ value, onChangeCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
};

export default Category;
