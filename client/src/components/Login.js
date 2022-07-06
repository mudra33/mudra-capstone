import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
	const { state, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();
		const res = await fetch('/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = res.json();

		if (res.status === 400 || !data) {
			window.alert('Invalid Credentials');
		} else {
			dispatch({ type: 'USER', payload: true });
			window.alert('Login Successfull');
			navigate('/');
		}
	};

	return (
		<>
			<div className='container mt-5'>
				<div class='col-md-6'>
					<form method='POST'>
						<h3>Login</h3>

						<div className='mb-3'>
							<label>Email address</label>
							<input
								name='email'
								value={email}
								id='email'
								type='email'
								className='form-control'
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder='Enter email'
							/>
						</div>

						<div className='mb-3'>
							<label>Password</label>
							<input
								name='password'
								value={password}
								id='password'
								type='password'
								className='form-control'
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								placeholder='Enter password'
							/>
						</div>

						<div className='d-grid'>
							<button
								name='submit'
								id='submit'
								type='submit'
								onClick={loginUser}
								className='btn btn-primary'
							>
								Login
							</button>
						</div>
						<p className='forgot-password text-right'>
							Dont have an account <NavLink to='/signup'>Sign Up?</NavLink>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
