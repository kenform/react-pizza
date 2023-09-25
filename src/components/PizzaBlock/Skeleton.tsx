import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton:React.FC = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={500}
		viewBox='0 0 280 500'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<circle cx='134' cy='136' r='125' />
		<rect x='0' y='279' rx='10' ry='10' width='280' height='23' />
		<rect x='0' y='326' rx='10' ry='10' width='280' height='88' />
		<rect x='9' y='436' rx='0' ry='0' width='0' height='2' />
		<rect x='0' y='450' rx='10' ry='10' width='130' height='45' />
		<rect x='150' y='450' rx='10' ry='10' width='130' height='45' />
	</ContentLoader>
);

export default Skeleton;
