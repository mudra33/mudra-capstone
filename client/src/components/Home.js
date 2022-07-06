import React, { useEffect, useState } from 'react';

const Home = () => {
	const [userName, setUserName] = useState('');
	const [show, setShow] = useState(false);

	const userHomePage = async () => {
		try {
			const res = await fetch('/getdata', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();
			setUserName(data.name);
			setShow(true);

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		userHomePage();
	}, []);

	//we are storing data in states

	return (
		<div>
			<p className='mt-5 '>Welcome {userName}Welcome To Home Page!</p>
			<h2>
				{' '}
				{show ? 'Happy to see you back !' : 'We Are The Mern Developer'}{' '}
			</h2>
		</div>
	);
};

export default Home;
