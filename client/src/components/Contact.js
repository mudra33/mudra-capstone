import React, { useEffect, useState } from 'react';

const Contact = () => {
	const [userData, setUserData] = useState({
		name: ' ',
		email: '',
		phone: '',
		message: '',
	});

	const userContact = async () => {
		try {
			const res = await fetch('/getdata', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();
			setUserData({
				...userData,
				name: data.name,
				email: data.email,
				phone: data.phone,
			});

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const contactForm = async (e) => {
		console.log('inside contact');
		e.preventDefault();
		const { name, email, phone, message } = userData;

		const res = await fetch('/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				phone,
				message,
			}),
		});

		const data = await res.json();

		console.log(data, 'Data');

		if (!data) {
			console.log('message not send');
		} else {
			alert('Message Send');
			setUserData({ ...userData, message: '' });
		}
	};

	useEffect(() => {
		userContact();
	}, []);

	//we are storing data in states

	const handleInputs = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserData({
			...userData,
			[name]: value,
		});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-lg-10 offset lg-1 d-flex justify-content-between'>
					<div className='d-flex justify-content-start align-items-center'>
						<div className='card'>
							<div className='card-body'>Phone : 89564732391</div>
						</div>
					</div>
					<div className='d-flex justify-content-start align-items-center'>
						<div className='card'>
							<div className='card-body'>Email : mudra.s@ahduni.edu.in</div>
						</div>
					</div>
					<div className='d-flex justify-content-start align-items-center'>
						<div className='card'>
							<div className='card-body'>Address : Ahmedabad</div>
						</div>
					</div>
				</div>

				<section className='mb-4'>
					<h2 className='h1-responsive font-weight-bold text-center my-4'>
						Contact us
					</h2>

					<p className='text-center w-responsive mx-auto mb-5'>
						Do you have any questions? Please do not hesitate to contact us
						directly. Our team will come back to you within a matter of hours to
						help you.
					</p>

					<div className='row mt-5'>
						<div className='mx-auto mb-5 '>
							<form
								id='contact-form'
								name='contact-form'
								action='mail.php'
								method='POST'
							>
								<div className='row'>
									<div className='col-md-6 '>
										<div className='md-form mb-0 '>
											<input
												type='text'
												id='name'
												value={userData.name}
												name='name'
												placeholder='name'
												className='form-control'
											/>
										</div>
									</div>

									<div className='col-md-6'>
										<div className='md-form mb-0'>
											<input
												type='email'
												value={userData.email}
												onChange={handleInputs}
												id='email'
												name='email'
												placeholder='email'
												className='form-control'
											/>
										</div>
									</div>
								</div>

								<div className='row mt-3'>
									<div className='col-md-12'>
										<div className='md-form mb-0'>
											<input
												type='number'
												id='phone'
												value={userData.phone}
												onChange={handleInputs}
												name='phone'
												placeholder='phone'
												className='form-control'
											/>
										</div>
									</div>
								</div>

								<div className='row mt-3'>
									<div className='col-md-12'>
										<div className='md-form'>
											<textarea
												type='text'
												id='message'
												value={userData.message}
												onChange={handleInputs}
												placeholder='message'
												name='message'
												rows='2'
												className='form-control md-textarea'
											></textarea>
										</div>
									</div>
								</div>
							</form>

							<div className='text-center text-md-left mt-1'>
								<button
									type='submit'
									className='btn btn-primary'
									onClick={contactForm}
								>
									Send Message
								</button>
							</div>
							<div className='status'></div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Contact;
