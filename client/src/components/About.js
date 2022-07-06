import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});

	const callAboutPage = async () => {
		try {
			const res = await fetch('/about', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
			});

			const data = await res.json();
			console.log(data);
			setUserData(data);

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
			navigate('/login');
		}
	};

	useEffect(() => {
		callAboutPage();
	}, []);

	return (
		<>
			<div>
				<form method='GET'>
					<div className='row'>
						<div className='col-md-4'></div>
						<div className='col-md-6'>
							<h5>{userData.name}</h5>
							<h6>{userData.work}</h6>
							<p className='mt-3 mb-5'>Rankings :: 1/10</p>
							<ul className='nav nav-tabs' role='tablist'>
								<li className='nav-item'>
									<a
										className='nav-link active'
										id='home-tab'
										aria-current='page'
										href='#home'
										role='tab'
									>
										About
									</a>
								</li>
								<li className='nav-item'>
									<a
										className='nav-link '
										id='profile-tab'
										aria-current='page'
										href='#profile'
										role='tab'
									>
										Timeline
									</a>
								</li>
							</ul>
						</div>
						{/* <div className='col-md-2'>
							<input type='text' value='Edit Profile' />
						</div> */}
					</div>

					<div className='row'>
						<div className='col-md-4'>
							<p>{userData.work}</p>
						</div>
						<div className='col-md-8 pl-5 about-info'>
							<div className='tab-content-profile-tab' id='myTabContent'>
								<div
									className='tab-pane fade show active'
									id='home'
									role='tabpanel'
									aria-labelledby='home-tab'
								>
									<div className='row'>
										<div className='col-md-6'>
											<label>'User ID'</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.phone}</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>Name</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.name}</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>Name</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.name}</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>Name</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.name}</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>Name</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.name}</p>
										</div>
									</div>{' '}
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>Name</label>
										</div>
										<div className='col-md-6'>
											<p>{userData.name}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-4'>
							<p>Work</p>
						</div>
						<div className='col-md-8 pl-5 '>
							<div className='tab-content-profile-tab' id='myTabContent'>
								<div
									className='tab-pane fade'
									id='profile'
									role='tabpanel'
									aria-labelledby='profile-tab'
								>
									<div className='row'>
										<div className='col-md-6'>
											<label>'Work Experinece '</label>
										</div>
										<div className='col-md-6'>
											<p>Date of Joining</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>{userData.work}</label>
										</div>
										<div className='col-md-6'>
											<p>9th September</p>
										</div>
									</div>
									<div className='row mt-3'>
										<div className='col-md-6'>
											<label>3 years</label>
										</div>
										<div className='col-md-6'>
											<p>1st September</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default About;
