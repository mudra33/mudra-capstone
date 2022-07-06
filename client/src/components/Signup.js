import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: ' ',
		email: '',
		phone: '',
		work: '',
		password: '',
		cpassword: '',
	});

	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;

		setUser({ ...user, [name]: value });
	};

	const PostData = async (e) => {
		e.preventDefault();
		const { name, email, phone, work, password, cpassword } = user;
		const res = await fetch('/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
			}),
		});

		const data = await res.json();

		if (res.status === 422 || !data) {
			window.alert('Invalid Registration');
		} else {
			window.alert(' Registration Successfull');
			navigate('/login');
		}
	};

	return (
		<>
			<div className='container mt-5'>
				<div class='col-md-6'>
					<form method='POST'>
						<h3>Sign Up</h3>
						<div className='mb-3'>
							<label>First name</label>
							<input
								name='name'
								id='name'
								type='text'
								className='form-control'
								value={user.name}
								onChange={handleInputs}
								placeholder='Your name'
							/>
						</div>
						<div className='mb-3'>
							<label>Email address</label>
							<input
								name='email'
								id='email'
								type='email'
								className='form-control'
								value={user.email}
								onChange={handleInputs}
								placeholder='Enter email'
							/>
						</div>
						<div className='mb-3'>
							<label>Phone</label>
							<input
								name='phone'
								id='phone'
								type='number'
								className='form-control'
								value={user.phone}
								onChange={handleInputs}
								placeholder='Enter Phone'
							/>
						</div>
						<div className='mb-3'>
							<label>Work</label>
							<input
								name='work'
								id='work'
								type='text'
								className='form-control'
								value={user.work}
								onChange={handleInputs}
								placeholder='Enter Profession'
							/>
						</div>
						<div className='mb-3'>
							<label>Password</label>
							<input
								name='password'
								id='password'
								type='password'
								className='form-control'
								value={user.password}
								onChange={handleInputs}
								placeholder='Enter password'
							/>
						</div>

						<div className='mb-3'>
							<label>Confirm Password</label>
							<input
								name='cpassword'
								id='cpassword'
								type='password'
								className='form-control'
								value={user.cpassword}
								onChange={handleInputs}
								placeholder='Enter confirm spassword'
							/>
						</div>
						<div className='d-grid'>
							<button
								name='submit'
								id='submit'
								type='submit'
								className='btn btn-primary'
								onClick={PostData}
							>
								Register
							</button>
						</div>
						<p className='forgot-password text-right'>
							Already registered <NavLink to='/login'>Login?</NavLink>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
