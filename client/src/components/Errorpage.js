import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
	return (
		<div>
			<h1>404 Not Found</h1>
			<h2>We are Sorry !! Page Not found</h2>
			<p className='mb-5'>
				The Page You are looking for might have been removed had its name
				changed or its temporarily unavailable
			</p>
			<NavLink to='/'>Back to HomePage</NavLink>
		</div>
	);
};

export default Errorpage;
