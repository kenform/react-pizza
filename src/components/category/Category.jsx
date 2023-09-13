import React, { useState } from 'react';

const Category = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const onClickCategory = (index) => {
		setActiveIndex(index);
	};
	return (
		<div className='categories'>
			<ul>
				{categories.map((category, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={activeIndex === i ? 'active' : ''}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Category;
